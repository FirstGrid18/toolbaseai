import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.resolve(root, "dist");

// ── Route list ────────────────────────────────────────────────────────────────

const { default: categories } = await import("../src/config/categories.js");
const { default: tools } = await import("../src/data/tools.js");
const { default: bestForPages } = await import("../src/data/bestfor.js");
const comparisonsModule = await import("../src/data/comparisons.js").catch(() => null);
const comparisons = comparisonsModule?.default ?? [];

const routes = [
  "/",
  "/submit",
  "/contact",
  "/404",
  ...categories.map((c) => `/category/${c.slug}`),
  ...bestForPages.map((p) => `/use-cases/${p.slug}`),
  ...bestForPages.map((p) => `/best-for/${p.slug}`),
  ...(Array.isArray(comparisons) ? comparisons.map((c) => `/compare/${c.slug}`) : []),
  ...tools.map((t) => `/tools/${t.slug}`),
];

// ── Load server bundle and template ──────────────────────────────────────────

const { render } = await import("../dist/server/entry-server.js");
const template = await fs.readFile(path.resolve(distDir, "index.html"), "utf-8");

// ── React 19 renders <title>/<meta>/<link> inline in the component output.
//    Extract them into the real <head> and strip from the body HTML.
function hoistHeadTags(appHtml) {
  const extracted = [];

  // title tags (self-closing not possible, always has content or is empty)
  appHtml = appHtml.replace(/<title>(.*?)<\/title>/gs, (match) => {
    extracted.push(match);
    return "";
  });

  // meta tags (self-closing)
  appHtml = appHtml.replace(/<meta\s[^>]*\/?>/g, (match) => {
    // Keep charset/viewport metas out — they're already in the template head
    if (/charset|viewport/.test(match)) return match;
    extracted.push(match);
    return "";
  });

  // link tags (canonical, etc.)
  appHtml = appHtml.replace(/<link\s[^>]*\/?>/g, (match) => {
    // Keep stylesheet/font links out — already in template
    if (/stylesheet|preconnect|fonts\.g/i.test(match)) return match;
    extracted.push(match);
    return "";
  });

  return { headTags: extracted.join("\n    "), cleanHtml: appHtml };
}

// ── Render each route ─────────────────────────────────────────────────────────

let rendered = 0;
let errored = 0;

for (const route of routes) {
  try {
    const { html: appHtml } = render(route);
    const { headTags, cleanHtml } = hoistHeadTags(appHtml);

    const html = template
      .replace("<!--app-head-->", headTags)
      .replace("<!--app-html-->", cleanHtml);

    const filePath =
      route === "/"
        ? path.resolve(distDir, "index.html")
        : path.resolve(distDir, route.slice(1), "index.html");

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html, "utf-8");

    rendered++;
    process.stdout.write(`  ✓ ${route}\n`);
  } catch (err) {
    errored++;
    process.stderr.write(`  ✗ ${route}: ${err.message}\n`);
  }
}

// ── Clean up server bundle (not needed in deploy) ────────────────────────────
await fs.rm(path.resolve(distDir, "server"), { recursive: true, force: true });

console.log(`\nPrerender complete: ${rendered} pages rendered, ${errored} errors.`);
if (errored > 0) process.exit(1);
