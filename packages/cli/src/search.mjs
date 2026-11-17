import fs from "node:fs";
import path from "node:path";
import { scanParts } from "./parts.mjs";

/** One compact line per part. */
export const indexLine = (m) => ({ id: m.id, type: m.type, style: m.style, name: m.name, summary: m.summary, tags: m.tags, params: (m.params ?? []).map((p) => p.name), ...(m.uses?.length ? { uses: m.uses } : {}) });

export function buildIndex(root) {
  const parts = scanParts(root);
  return Object.keys(parts).sort().map((id) => JSON.stringify(indexLine(parts[id].manifest))).join("\n") + "\n";
}

export function readIndex(root) {
  const f = path.join(root, "index", "parts.jsonl");
  if (fs.existsSync(f)) return fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  return buildIndex(root).trim().split("\n").map((l) => JSON.parse(l));
}

const words = (s) => String(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1);
const stem = (w) => w.replace(/(ies|es|s)$/, "");

/** Simple ranked keyword search over id, name, tags and summary. */
export function search(index, query, { type, style, limit = 10 } = {}) {
  const q = words(query).map(stem);
  if (!q.length) return [];
  return index
    .filter((e) => (!type || e.type === type) && (!style || e.style === style || e.style === "core"))
    .map((e) => {
      const name = words(e.name).map(stem), tags = e.tags.flatMap(words).map(stem), sum = words(e.summary).map(stem), idw = words(e.id).map(stem);
      let score = 0;
      for (const w of q) {
        if (idw.includes(w)) score += 6;
        if (name.includes(w)) score += 5;
        if (tags.includes(w)) score += 4;
        if (sum.includes(w)) score += 2;
        if (!idw.includes(w) && [...name, ...tags].some((x) => x.startsWith(w) && w.length >= 3)) score += 1;
      }
      if (style && e.style === style) score += 0.5;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.id.localeCompare(b.e.id))
    .slice(0, limit)
    .map((x) => x.e);
}
