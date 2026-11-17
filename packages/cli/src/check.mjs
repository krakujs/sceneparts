import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import Ajv from "ajv/dist/2020.js";
import { closure, loadRegistry } from "./parts.mjs";
import { frameSvg, tileSheet, toPng } from "./frames.mjs";
import { partStory } from "@sceneparts/core";

const here = path.dirname(fileURLToPath(import.meta.url));
const ajv = new Ajv({ allErrors: true, strict: false });
const validateManifest = ajv.compile(JSON.parse(fs.readFileSync(path.join(here, "part.schema.json"), "utf8")));

export const LIMITS = { bytes: 40 * 1024, msPerFrame: 50 };

const FORBIDDEN = [
  [/\bMath\.random\b/, "Math.random (parts must be deterministic; derive variation from f or a seed param)"],
  [/\bnew Date\b|\bDate\.now\b|\bperformance\.now\b/, "clock access (parts must be deterministic)"],
  [/\bfetch\s*\(|XMLHttpRequest|WebSocket|navigator\./, "network or browser APIs"],
  [/\beval\s*\(|new Function\s*\(|\bFunction\s*\(/, "eval / Function"],
  [/dangerouslySetInnerHTML/, "dangerouslySetInnerHTML"],
  [/<script\b|<foreignObject\b|<iframe\b/i, "<script>, <foreignObject> or <iframe>"],
  [/\b(?:href|xlinkHref|src)\s*=\s*["'{`]\s*(?:https?:)?\/\//, "external URL (parts can't load remote files)"],
  [/\bprocess\.|\brequire\s*\(|\bimport\s*\(|globalThis|\bwindow\b|\bdocument\b|localStorage/, "runtime / global access (process, require, dynamic import, window, document)"],
];

// Well-known characters, brands and real people. A hit doesn't fail the check; it asks a human reviewer to look.
const IP_WORDS = ["mickey", "minnie", "donald duck", "goofy", "mario", "luigi", "pikachu", "pokemon", "spongebob", "batman", "superman", "spider-man", "spiderman", "marvel", "disney", "pixar", "dreamworks", "simpsons", "shrek", "elsa", "frozen", "harry potter", "hogwarts", "star wars", "darth vader", "yoda", "sonic", "hello kitty", "peppa", "paw patrol", "minion", "garfield", "snoopy", "barbie", "lego", "nike", "adidas", "coca-cola", "coca cola", "pepsi", "mcdonald", "starbucks", "google", "facebook", "instagram", "tiktok", "youtube", "naruto", "goku", "dragon ball", "one piece", "luffy", "doraemon", "totoro", "ghibli", "transformers", "optimus", "hulk", "iron man", "avengers", "joker", "wonder woman", "minecraft", "fortnite", "among us", "zelda", "kirby", "scooby", "tom and jerry", "bugs bunny", "looney", "winnie", "pooh", "sesame", "muppet", "teletubb", "bluey", "cocomelon", "trump", "biden", "musk", "obama", "modi", "putin", "taylor swift", "messi", "ronaldo", "beyonce", "kardashian", "logo"];

const relId = (from, spec) => {
  const m = spec.match(/^\.\.\/([a-z0-9-]+)\/index(?:\.js|\.tsx)?$/);
  if (m) return `${from.split("/")[0]}/${m[1]}`;
  const m2 = spec.match(/^\.\.\/\.\.\/([a-z0-9-]+)\/([a-z0-9-]+)\/index(?:\.js|\.tsx)?$/);
  if (m2) return `${m2[1]}/${m2[2]}`;
  return null;
};

/** Static checks on one part folder. Returns { errors, warnings, flags }. */
export function staticCheck(id, entry, avail, index = []) {
  const errors = [], warnings = [], flags = new Set();
  const m = entry.manifest;
  if (m._error) return { errors: [m._error], warnings, flags: [] };
  if (!validateManifest(m)) for (const e of validateManifest.errors) errors.push(`part.json${e.instancePath}: ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ""}`);
  if (m.id !== id) errors.push(`part.json id "${m.id}" must match the folder parts/${id}`);
  if (m.style !== id.split("/")[0]) errors.push(`style "${m.style}" must match the folder parts/${id.split("/")[0]}`);
  if (m.type !== "style" && !avail[`${m.style}/style`]) errors.push(`style "${m.style}" has no style part (parts/${m.style}/style); create it first`);
  if (m.type === "style" && id.split("/")[1] !== "style") errors.push(`a style part must live at parts/${m.style}/style`);
  for (const u of m.uses ?? []) if (!avail[u]) errors.push(`uses "${u}" which does not exist`);
  const files = fs.readdirSync(entry.dir);
  for (const f of files) if (!["part.json", "index.tsx", "README.md"].includes(f)) errors.push(`unexpected file ${f} (a part is part.json + index.tsx, optional README.md)`);
  const srcPath = path.join(entry.dir, "index.tsx");
  if (!fs.existsSync(srcPath)) { errors.push("index.tsx is missing"); return { errors, warnings, flags: [...flags] }; }
  const src = fs.readFileSync(srcPath, "utf8");
  const bytes = Buffer.byteLength(src);
  if (bytes > LIMITS.bytes) errors.push(`index.tsx is ${(bytes / 1024).toFixed(1)} KB; the limit is 40 KB – split it into parts that use each other`);
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
  for (const [re, what] of FORBIDDEN) if (re.test(code)) errors.push(`index.tsx uses ${what}`);
  const used = new Set();
  for (const mm of code.matchAll(/(?:import|export)\s[^;]*?from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g)) {
    const spec = mm[1] ?? mm[2];
    if (spec === "react" || spec === "@sceneparts/core") continue;
    const rid = relId(id, spec);
    if (!rid) { errors.push(`import "${spec}" is not allowed (only react, @sceneparts/core and other parts as "../<name>/index")`); continue; }
    used.add(rid);
    if (rid !== `${m.style}/style` && !(m.uses ?? []).includes(rid)) errors.push(`imports ${rid} but it is not listed in "uses"`);
    if (!avail[rid]) errors.push(`imports ${rid}, which does not exist`);
  }
  for (const u of m.uses ?? []) if (!used.has(u) && u !== `${m.style}/style`) warnings.push(`"uses" lists ${u} but index.tsx never imports it`);
  if (m.type !== "style" && !/export\s+default\s+/.test(code)) errors.push("index.tsx needs a default export (the part component)");
  const text = [m.id, m.name, m.summary, ...(m.tags ?? [])].join(" ").toLowerCase();
  const hits = IP_WORDS.filter((w) => new RegExp(`\\b${w.replace(/[-]/g, "[- ]?")}`).test(text));
  if (hits.length) { flags.add("needs-ip-check"); warnings.push(`mentions ${hits.join(", ")} – a reviewer will check it isn't a copyrighted character, brand or real person`); }
  const name = (m.name ?? "").toLowerCase();
  const dup = index.filter((e) => e.id !== m.id && e.type === m.type && (e.name.toLowerCase() === name || jaccard(e.tags, m.tags ?? []) >= 0.8));
  if (dup.length) { flags.add("possible-duplicate"); warnings.push(`looks similar to ${dup.slice(0, 3).map((e) => e.id).join(", ")} – reuse or extend it if it fits`); }
  if (/\btodo\b/i.test(`${m.summary} ${(m.tags ?? []).join(" ")} ${m.name}`)) errors.push("part.json still has TODO placeholders (summary, tags or name)");
  if (/your-github-handle/.test(m.author ?? "")) errors.push('author must be your GitHub handle (sceneparts new … --author <handle>)');
  if (/<rect x=\{-150\} y=\{-600\} width=\{300\} height=\{600\} rx=\{40\} fill="#cccccc"/.test(src)) errors.push("index.tsx is still the scaffold placeholder – draw the part");
  for (const p of m.params ?? []) if (p.type === "enum" && !p.values) errors.push(`param ${p.name}: type enum needs "values"`);
  if (m.type !== "style" && m.type !== "template" && m.example && Object.keys(m.example).length === 0) warnings.push("example is empty – show the part's most typical use");
  return { errors, warnings, flags: [...flags] };
}
const jaccard = (a, b) => { const A = new Set(a), B = new Set(b); const i = [...A].filter((x) => B.has(x)).length; return i / Math.max(1, new Set([...A, ...B]).size); };

/** Render checks: example and every enum value render without throwing, within the time limit. Returns preview tiles too. */
export async function renderCheck(id, avail) {
  const errors = [], warnings = [];
  const m = avail[id].manifest;
  if (m.type === "style") return { errors, warnings, tiles: [] };
  let reg;
  const exRefs = [];
  const walk = (v) => { if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object") { if (typeof v.t === "string") exRefs.push(v.t); Object.values(v).forEach(walk); } };
  walk(m.example);
  for (const t of exRefs) if (!t.includes("/") || !avail[t]) errors.push(`example uses "${t}" – use a full part id (<style>/<name>) that exists`);
  if (errors.length) return { errors, warnings, tiles: [] };
  try { reg = await loadRegistry(avail, closure(avail, [id, ...exRefs])); } catch (e) { return { errors: [`does not compile: ${e.errors?.[0]?.text ?? e.message}`], warnings, tiles: [] }; }
  const ex = m.example ?? {};
  const tiles = [0, 20, 60].map((frame) => ({ id, example: ex, styleId: m.style, frame, label: `example · f${frame}` }));
  const en = (m.params ?? []).find((p) => p.type === "enum" && p.values?.length > 1 && ex[p.name] === undefined) ?? (m.params ?? []).find((p) => p.type === "enum" && p.values?.length > 1);
  if (en) for (const v of en.values.slice(0, 9)) tiles.push({ id, example: { ...ex, [en.name]: v }, styleId: m.style, frame: 20, label: `${en.name}: ${v}` });
  for (const p of m.params ?? []) if (p.type === "enum" && p !== en) for (const v of p.values ?? []) {
    try { frameSvg(partStory(id, { ...ex, [p.name]: v }, m.style), reg, 10); } catch (e) { errors.push(`${p.name}: "${v}" throws: ${e.message}`); }
  }
  try {
    const story = partStory(id, ex, m.style);
    frameSvg(story, reg, 0);
    const t0 = performance.now();
    for (let f = 0; f < 10; f++) frameSvg(story, reg, f * 9);
    const base = partStory("core/rect", { o: 0 }, m.style);
    const t1 = performance.now();
    for (let f = 0; f < 10; f++) frameSvg(base, reg.__base ?? reg, f * 9);
    const ms = ((t1 - t0) - (performance.now() - t1)) / 10;
    if (ms > LIMITS.msPerFrame) errors.push(`renders in ${ms.toFixed(0)} ms per frame; the limit is ${LIMITS.msPerFrame} ms`);
  } catch (e) { errors.push(`example throws: ${e.message}`); }
  for (const tl of tiles) { try { frameSvg(partStory(tl.id, tl.example, tl.styleId), reg, tl.frame); } catch (e) { errors.push(`${tl.label} throws: ${e.message}`); } }
  return { errors, warnings, tiles, reg };
}

export const previewPng = (reg, id, tiles) => toPng(tileSheet(reg, tiles, { cols: 3, tile: 200, title: id }));
