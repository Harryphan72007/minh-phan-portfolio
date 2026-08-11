import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist-pages");
const clientDir = path.join(root, "dist", "client");
const workerEntry = path.join(root, "dist", "server", "index.js");

function normalizeBasePath(value) {
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

const cliBasePath = process.argv.find((argument) => argument.startsWith("--base-path="))?.split("=")[1];
const basePath = normalizeBasePath(cliBasePath ?? process.env.PAGES_BASE_PATH);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerModule = await import(`${pathToFileURL(workerEntry).href}?pages-export=${Date.now()}`);
const response = await workerModule.default.fetch(
  new Request("https://portfolio.local/"),
  {
    ASSETS: {
      fetch: async (request) => {
        // A base-aware build asks for assets under the base path; they are on disk without it.
        const requestPath = new URL(request.url).pathname;
        const assetPath = (
          basePath && requestPath.startsWith(`${basePath}/`)
            ? requestPath.slice(basePath.length)
            : requestPath
        ).replace(/^\/+/, "");
        try {
          return new Response(await readFile(path.join(clientDir, assetPath)));
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}.`);
}

let html = await response.text();

// The inlined font stylesheet points at the build machine's absolute path on Windows, where the
// font plugin fails to recognise the emitted files as client assets. Map it back onto the exported
// asset directory so a local preview matches what CI deploys.
const localFontPrefix = `${root.replaceAll("\\", "/")}/.vinext/fonts/`;
html = html.replaceAll(`url(${localFontPrefix}`, "url(/assets/_vinext_fonts/");

if (basePath) {
  // Vite's `base` already prefixes the bundled assets it emits, but references written by hand in
  // the application (the résumé, the social image, anything served straight out of public/) still
  // point at the root. Prefixing is therefore applied per reference and skipped when the value is
  // already inside the base path, so running over a base-aware build cannot double-prefix.
  const prefix = (value) =>
    value === basePath || value.startsWith(`${basePath}/`) ? value : `${basePath}${value}`;

  html = html
    .replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, attribute, value) => `${attribute}="${prefix(value)}"`)
    // Font faces are inlined in a <style> block, so they are never covered by the attribute
    // rewrites above. Without this the deployed page silently falls back to system fonts.
    .replace(/url\((\/(?!\/)[^)]*)\)/g, (_, value) => `url(${prefix(value)})`)
    .replace(/import\("(\/(?!\/)[^"]*)"\)/g, (_, value) => `import("${prefix(value)}")`)
    // Paths embedded in the escaped JSON of the RSC payload.
    .replace(/\\"(\/(?!\/)[^"\\]*)/g, (_, value) => `\\"${prefix(value)}`);
}

const rootReferences = [...html.matchAll(/(?:href|src)=["'](\/(?!\/|#)[^"']*)/g)].map((match) => match[1]);
const unresolvedReferences = basePath
  ? rootReferences.filter((reference) => reference !== basePath && !reference.startsWith(`${basePath}/`))
  : [];
const unresolvedImports = basePath
  ? [...html.matchAll(/import\(["'](\/(?!\/)[^"']*)/g)]
      .map((match) => match[1])
      .filter((reference) => !reference.startsWith(`${basePath}/`))
  : [];
const unresolvedUrls = basePath
  ? [...html.matchAll(/url\((\/(?!\/)[^)]*)\)/g)]
      .map((match) => match[1])
      .filter((reference) => !reference.startsWith(`${basePath}/`))
  : [];
if (unresolvedReferences.length || unresolvedImports.length || unresolvedUrls.length) {
  throw new Error(
    `Static export still contains unprefixed root paths: ${[
      ...unresolvedReferences,
      ...unresolvedImports,
      ...unresolvedUrls,
    ]
      .slice(0, 8)
      .join(", ")}`,
  );
}

await Promise.all([
  writeFile(path.join(outputDir, "index.html"), html),
  writeFile(path.join(outputDir, "404.html"), html),
  writeFile(path.join(outputDir, ".nojekyll"), ""),
]);

console.log(`Exported GitHub Pages site to ${outputDir}${basePath ? ` with base path ${basePath}` : ""}.`);
