import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { build } from "esbuild";
import { CACHE } from "./paths.mjs";

/** All parts under <root>/parts as { id: { dir, manifest } }. */
export function scanParts(root) {
  const base = path.join(root, "parts");
  const out = {};
  if (!fs.existsSync(base)) return out;
  for (const style of fs.readdirSync(base)) {
    const sdir = path.join(base, style);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const name of fs.readdirSync(sdir)) {
      const dir = path.join(sdir, name);
      const mf = path.join(dir, "part.json");
      if (!fs.existsSync(mf)) continue;
      let manifest;
      try { manifest = JSON.parse(fs.readFileSync(mf, "utf8")); } catch (e) { manifest = { id: `${style}/${name}`, _error: `part.json is not valid JSON: ${e.message}` }; }
      out[`${style}/${name}`] = { dir, manifest };
    }
  }
  return out;
}

/** Project parts override registry parts with the same id. */
export const available = (registryRootDir, projectDir) => ({ ...(registryRootDir ? scanParts(registryRootDir) : {}), ...(projectDir ? scanParts(projectDir) : {}) });

export const resolveId = (avail, t, style) => (t.includes("/") ? (avail[t] ? t : null) : avail[`${style}/${t}`] ? `${style}/${t}` : avail[`core/${t}`] ? `core/${t}` : null);

/** The ids a part needs: itself, what it uses, its style, transitively. */
export function closure(avail, ids) {
  const need = new Set();
  const visit = (id) => {
    if (!id || need.has(id) || !avail[id]) return;
    need.add(id);
    const m = avail[id].manifest;
    for (const u of m.uses ?? []) visit(u);
    if (m.style) visit(`${m.style}/style`);
  };
  ids.forEach(visit);
  visit("core/style");
  return [...need].sort();
}

/** Every item reference in a story (including items inside item-typed params and template params). */
export function storyRefs(story) {
  const refs = [];
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      if (typeof v.t === "string") refs.push(v.t);
      Object.values(v).forEach(walk);
    }
  };
  for (const s of story.shots ?? []) {
    walk(s.items); walk(s.over);
    if (s.template) { refs.push(s.template); walk(s.params); }
  }
  return refs;
}

/** Bundle the given parts into one ESM module and import it: returns a Registry for @sceneparts/core. */
export async function loadRegistry(avail, ids) {
  const list = ids.map((id) => ({ id, ...avail[id] }));
  const lines = [];
  list.forEach((p, i) => {
    lines.push(`import m${i} from ${JSON.stringify(path.join(p.dir, "part.json"))};`);
    lines.push(`import * as c${i} from ${JSON.stringify(path.join(p.dir, "index.tsx"))};`);
  });
  lines.push("export default {");
  list.forEach((p, i) => lines.push(`  ${JSON.stringify(p.id)}: m${i}.type === "style" ? { manifest: m${i}, style: c${i}.default } : { manifest: m${i}, component: c${i}.default },`));
  lines.push("};");
  const contents = lines.join("\n");
  const stamp = list.map((p) => { const f = path.join(p.dir, "index.tsx"); return `${f}:${fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0}:${fs.statSync(path.join(p.dir, "part.json")).mtimeMs}`; }).join("|");
  const hash = crypto.createHash("sha1").update(contents + stamp).digest("hex").slice(0, 16);
  fs.mkdirSync(CACHE, { recursive: true });
  const out = path.join(CACHE, `registry-${hash}.mjs`);
  if (!fs.existsSync(out)) {
    await build({
      stdin: { contents, resolveDir: CACHE, sourcefile: "registry-entry.js", loader: "js" },
      bundle: true, format: "esm", platform: "node", jsx: "automatic", outfile: out, logLevel: "silent",
      external: ["react", "react-dom", "react/jsx-runtime", "@sceneparts/core"],
      loader: { ".json": "json", ".tsx": "tsx", ".ts": "ts" },
    });
  }
  return (await import(out)).default;
}
