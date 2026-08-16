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
  assert.match(html, /Aerial Object Detection Benchmark/);
  assert.match(html, /NoteFlow AI/);
  assert.match(html, /Vietnamese Legal AI/);
  assert.match(html, /Software Engineering Intern/);
  assert.match(html, /Undergraduate Research Volunteer/);
  assert.match(html, /The Shape of Noise/);
  assert.doesNotMatch(html, /link pending|address pending|Repository link pending/i);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /Passionate developer|Technology enthusiast|senior engineer/i);
  assert.doesNotMatch(html, /cutting-edge|revolutionary|state-of-the-art/i);
});

test("project titles map to the repositories that back them", async () => {
  const html = await (await render()).text();
  const repositories = [
    "Harryphan72007/aerial-object-detection-benchmark",
    "Harryphan72007/NoteFlow-AI",
    "Harryphan72007/LegalConflict-RAG",
    "Harryphan72007/VietLegalCorpus",
    "Harryphan72007/HybridClauseSearch",
    "Harryphan72007/ClauseConflictEngine",
  ];
  for (const repository of repositories) {
    assert.ok(
      html.includes(`https://github.com/${repository}`),
      `missing repository link: ${repository}`,
    );
  }
});

test("states project maturity and research authorship honestly", async () => {
  const html = await (await render()).text();
  // Every card carries a maturity label; unfinished work is never shown as complete.
  assert.match(html, /Infrastructure built · GPU runs pending/);
  assert.match(html, /Released v0\.1\.0 · Prototype/);
  assert.match(html, /Architecting · Scaffolding published/);
  // The benchmark has no results yet, so no accuracy or latency figure may appear for it.
  assert.doesNotMatch(html, /\bmAP\b|\bFPS\b/);
  // The workshop paper is co-authored; the site must not imply sole authorship.
  assert.match(html, /Son Nguyen/);
  assert.match(html, /Trong P\. Le/);
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

  // Scroll reveals must never be able to hide content on their own: the hidden state is gated on
  // a class the reveal script adds, so a bundle that fails to load leaves the page readable.
  assert.match(css, /\.js-reveal \.reveal \{[^}]*opacity: 0/);
  assert.doesNotMatch(css, /^\.reveal \{[^}]*opacity: 0/m);
  assert.match(page, /classList\.add\("js-reveal"\)/);
  assert.ok(resume.length > 20_000);
  assert.ok(og.length > 100_000);
});

test("exports a base-path-safe GitHub Pages artifact", async () => {
  const html = await readFile(new URL("../dist-pages/index.html", import.meta.url), "utf8");
  const basePath = "/minh-phan-portfolio";
  assert.match(html, /\/minh-phan-portfolio\/assets\//);
  assert.match(html, /\/minh-phan-portfolio\/quang-minh-phan-resume\.pdf/);
  const rootReferences = [
    ...html.matchAll(/(?:href|src|poster)=["'](\/(?!\/|#)[^"']*)["']/g),
  ].map((match) => match[1]);
  const srcsetReferences = [...html.matchAll(/srcset=["']([^"']*)["']/g)].flatMap((match) =>
    match[1]
      .split(",")
      .map((candidate) => candidate.trim().split(/\s+/, 1)[0])
      .filter((reference) => reference.startsWith("/") && !reference.startsWith("//")),
  );
  assert.ok(
    [...rootReferences, ...srcsetReferences].every(
      (reference) =>
        (reference === basePath || reference.startsWith(`${basePath}/`)) &&
        !reference.startsWith(`${basePath}${basePath}/`),
    ),
  );
  assert.doesNotMatch(html, /import\(["']\/assets\//);

  // Font faces live in an inlined <style> block, so they bypass the href/src rewrite. When they
  // are missed the page still renders, just with system fonts, which is why this is asserted
  // rather than eyeballed.
  const cssUrls = [...html.matchAll(/url\(\s*["']?(\/(?!\/)[^"')]+)/g)].map(
    (match) => match[1],
  );
  assert.ok(
    cssUrls.every((reference) => reference.startsWith("/minh-phan-portfolio/")),
    `unprefixed CSS url(): ${cssUrls.filter((r) => !r.startsWith("/minh-phan-portfolio/")).join(", ")}`,
  );
  assert.ok(
    html.includes("/minh-phan-portfolio/assets/_vinext_fonts/"),
    "expected the Geist font faces to resolve under the Pages base path",
  );
  assert.doesNotMatch(html, /url\([A-Za-z]:\//, "build machine path leaked into the export");

  const dynamicImports = [...html.matchAll(/import\(["'](\/(?!\/)[^"']*)["']\)/g)].map(
    (match) => match[1],
  );
  const exportedReferences = new Set([
    ...rootReferences,
    ...srcsetReferences,
    ...cssUrls,
    ...dynamicImports,
  ]);
  await Promise.all(
    [...exportedReferences].map(async (reference) => {
      const pathname = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
      const relativePath = pathname.slice(basePath.length).replace(/^\/+/, "");
      const target = relativePath && !relativePath.endsWith("/") ? relativePath : "index.html";
      await access(new URL(`../dist-pages/${target}`, import.meta.url));
    }),
  );

  await Promise.all([
    access(new URL("../dist-pages/404.html", import.meta.url)),
    access(new URL("../dist-pages/.nojekyll", import.meta.url)),
    access(new URL("../dist-pages/quang-minh-phan-resume.pdf", import.meta.url)),
    access(new URL("../dist-pages/og-ml-systems.png", import.meta.url)),
    access(new URL("../dist-pages/noteflow-dashboard.png", import.meta.url)),
  ]);
});
