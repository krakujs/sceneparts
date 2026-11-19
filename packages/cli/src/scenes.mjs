import fs from "node:fs";
import path from "node:path";

// Scene packs: complete Remotion scene components from real channels (scenes/<pack>/). Unlike parts they need
// Remotion and their pack's kit, and take SceneProps ({ scene: { visual, ... }, ep, dur }). Catalogued from comments.
const titleCase = (s) => s.replace(/^ep\d+_?/, "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();

export function sceneCatalog(root) {
  const base = path.join(root, "scenes");
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const pack of fs.readdirSync(base).sort()) {
    const pdir = path.join(base, pack);
    if (!fs.statSync(pdir).isDirectory()) continue;
    for (const sub of ["custom", "scenes"]) {
      const dir = path.join(pdir, sub);
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".tsx")).sort()) {
        const src = fs.readFileSync(path.join(dir, file), "utf8");
        const comps = [...src.matchAll(/export const ([A-Z]\w*): React\.FC<SceneProps>/g)].map((m) => m[1]);
        if (!comps.length) continue;
        const lines = src.split("\n");
        const comment = [];
        let started = false;
        for (const l of lines.slice(0, 40)) {
          if (/^\/\/ /.test(l)) { started = true; comment.push(l.slice(3)); } else if (started && !/^\/\//.test(l)) break;
        }
        const text = comment.join(" ");
        const visIdx = text.search(/visual:/);
        const summary = (visIdx > 0 ? text.slice(0, visIdx) : text).replace(/\s+/g, " ").trim() || titleCase(file.replace(/\.tsx$/, ""));
        const visual = visIdx >= 0 ? text.slice(visIdx).replace(/\s+/g, " ").trim() : "";
        const assets = [...new Set([...src.matchAll(/staticFile\(\s*[`"']([^`"']+)[`"']/g)].map((m) => m[1]))];
        const name = titleCase(file.replace(/\.tsx$/, ""));
        out.push({ id: `${pack}/${file.replace(/\.tsx$/, "")}`, pack, file: `scenes/${pack}/${sub}/${file}`, components: comps, name, summary: summary.slice(0, 400), visual: visual.slice(0, 1200), assets, kind: sub === "scenes" ? "generic" : "episode" });
      }
    }
  }
  return out;
}

export function searchScenes(cat, query, limit = 10) {
  const q = query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1);
  return cat
    .map((s) => {
      const hay = `${s.id} ${s.name} ${s.summary} ${s.components.join(" ")}`.toLowerCase();
      const score = q.reduce((n, w) => n + (s.name.toLowerCase().includes(w) ? 5 : 0) + (hay.includes(w) ? 2 : 0), 0);
      return { s, score };
    })
    .filter((x) => !q.length || x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.s);
}
