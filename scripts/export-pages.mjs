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
        const assetPath = new URL(request.url).pathname.replace(/^\/+/, "");
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
if (basePath) {
  html = html
    .replaceAll('href="/', `href="${basePath}/`)
    .replaceAll('src="/', `src="${basePath}/`)
    .replaceAll('import("/', `import("${basePath}/`)
    .replaceAll('\\"/', `\\"${basePath}/`);
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
if (unresolvedReferences.length || unresolvedImports.length) {
  throw new Error(
    `Static export still contains unprefixed root paths: ${[
      ...unresolvedReferences,
      ...unresolvedImports,
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
