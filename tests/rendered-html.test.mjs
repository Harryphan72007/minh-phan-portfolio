import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the portfolio content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Quang Minh Phan/);
  assert.match(html, /Building and studying/);
  assert.match(html, /The Shape of Noise/);
  assert.match(html, /Mega-ASR Studio/);
  assert.match(html, /NoteFlow AI/);
  assert.match(html, /Let(?:&#x27;|')s build something/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("keeps portfolio metadata, responsive styles, and resume asset", async () => {
  const [page, layout, css, packageJson, resume] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/quang-minh-phan-resume.pdf", import.meta.url)),
  ]);

  assert.match(layout, /Quang Minh Phan \| ML Research & Efficient AI/);
  assert.match(page, /aria-label="Toggle navigation"/);
  assert.match(page, /role="dialog"/);
  assert.match(page, /aria-live="polite"/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.ok(resume.length > 20_000);
});
