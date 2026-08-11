import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Builds and exports the GitHub Pages artifact.
//
// The build itself has to know the base path, not just the export step. Vite resolves the
// dynamic-import dependency map ("assets/page-*.js") against its configured `base` at runtime, so
// with the default base those chunks are requested from the domain root and 404 under a project
// Pages URL. Rewriting the HTML afterwards cannot reach them, because the paths live inside the
// emitted JavaScript.
//
// PAGES_BASE_PATH is set here rather than inline in an npm script so the command stays portable
// across cmd, PowerShell, and POSIX shells.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function normalizeBasePath(value) {
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

const cliBasePath = process.argv
  .find((argument) => argument.startsWith("--base-path="))
  ?.split("=")[1];
const basePath = normalizeBasePath(cliBasePath ?? process.env.PAGES_BASE_PATH);
const env = { ...process.env, PAGES_BASE_PATH: basePath };

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    stdio: "inherit",
    // A bare command string with no argument array: npm resolves through the platform shell
    // (npm.cmd on Windows) without the shell re-splitting anything.
    shell: args === undefined,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npm run build");
run(process.execPath, [
  path.join(root, "scripts", "export-pages.mjs"),
  `--base-path=${basePath}`,
]);
