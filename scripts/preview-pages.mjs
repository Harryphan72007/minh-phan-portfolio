import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist-pages");
const basePath = `/${(process.env.PAGES_BASE_PATH || "minh-phan-portfolio").replace(/^\/+|\/+$/g, "")}`;
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  if (!url.pathname.startsWith(basePath)) {
    response.writeHead(302, { location: `${basePath}/` });
    response.end();
    return;
  }

  const relativePath = decodeURIComponent(url.pathname.slice(basePath.length)).replace(/^\/+/, "");
  let filePath = path.join(outputDir, relativePath || "index.html");
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = path.join(outputDir, "404.html");
  }

  response.writeHead(filePath.endsWith("404.html") && relativePath ? 404 : 200, {
    "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`GitHub Pages preview: http://localhost:${port}${basePath}/`);
});
