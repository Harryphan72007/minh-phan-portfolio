import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("server-renders the ML-systems-focused portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /ML Engineering/);
  assert.match(html, /Aerial Detection Benchmark/);
  assert.match(html, /NoteFlow AI/);
  assert.match(html, /Software Engineering Intern/);
  assert.match(html, /Undergraduate Research Volunteer/);
  assert.match(html, /The Shape of Noise/);
  assert.doesNotMatch(html, /link pending|address pending|Repository link pending/i);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /Passionate developer|Technology enthusiast|senior engineer/i);
});

test("includes recruiter-facing metadata and accessible interaction hooks", async () => {
  const [page, layout, css, resume, og] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/quang-minh-phan-resume.pdf", import.meta.url)),
    readFile(new URL("../public/og-ml-systems.png", import.meta.url)),
  ]);

  assert.match(layout, /Minh Phan \| ML Engineering & Systems/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /canonical:/);
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /aria-controls="primary-mobile-menu"/);
  assert.match(page, /role="dialog"/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /:focus-visible/);
  assert.ok(resume.length > 20_000);
  assert.ok(og.length > 100_000);
});

test("exports a base-path-safe GitHub Pages artifact", async () => {
  const html = await readFile(new URL("../dist-pages/index.html", import.meta.url), "utf8");
  assert.match(html, /\/minh-phan-portfolio\/assets\//);
  assert.match(html, /\/minh-phan-portfolio\/quang-minh-phan-resume\.pdf/);
  const rootReferences = [
    ...html.matchAll(/(?:href|src)=["'](\/(?!\/|#)[^"']*)["']/g),
  ].map((match) => match[1]);
  assert.ok(
    rootReferences.every((reference) =>
      reference.startsWith("/minh-phan-portfolio/"),
    ),
  );
  assert.doesNotMatch(html, /import\(["']\/assets\//);

  await Promise.all([
    access(new URL("../dist-pages/404.html", import.meta.url)),
    access(new URL("../dist-pages/.nojekyll", import.meta.url)),
    access(new URL("../dist-pages/quang-minh-phan-resume.pdf", import.meta.url)),
    access(new URL("../dist-pages/og-ml-systems.png", import.meta.url)),
    access(new URL("../dist-pages/noteflow-dashboard.png", import.meta.url)),
  ]);
});
