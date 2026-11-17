import fs from "node:fs";
import path from "node:path";
import { closure, loadRegistry, scanParts } from "./parts.mjs";
import { tileSheet, toPng } from "./frames.mjs";
import { indexLine } from "./search.mjs";

/** Static gallery: site/index.html (client-side search) + one preview PNG per part. */
export async function buildGallery(root, out) {
  const avail = scanParts(root);
  const ids = Object.keys(avail).sort();
  const reg = await loadRegistry(avail, closure(avail, ids));
  fs.mkdirSync(path.join(out, "previews"), { recursive: true });
  const entries = [];
  for (const id of ids) {
    const m = avail[id].manifest;
    const file = `previews/${id.replace("/", "__")}.png`;
    if (m.type !== "style") {
      try { fs.writeFileSync(path.join(out, file), toPng(tileSheet(reg, [{ id, example: m.example ?? {}, styleId: m.style, frame: 20, label: "" }], { cols: 1, tile: 240 }))); } catch (e) { console.error(`gallery: ${id}: ${e.message}`); }
    }
    entries.push({ ...indexLine(m), img: m.type === "style" ? null : file, example: m.example, author: m.author });
  }
  fs.writeFileSync(path.join(out, "index.html"), html(entries));
  return entries.length;
}

const html = (entries) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>SceneParts gallery</title>
<style>
:root{--bg:#f6f1e4;--card:#fffdf7;--ink:#1a1410;--muted:#6b5d4d;--line:#e2d8c3;--accent:#c8413a}
@media (prefers-color-scheme: dark){:root{--bg:#17130f;--card:#211b16;--ink:#f3ead8;--muted:#b3a58f;--line:#3a3128}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,sans-serif}
header{padding:28px 16px 8px;max-width:1200px;margin:auto}h1{margin:0 0 4px;font:700 28px Georgia,serif}p{margin:0;color:var(--muted)}
.bar{display:flex;gap:8px;flex-wrap:wrap;max-width:1200px;margin:16px auto;padding:0 16px}
input,select{font:inherit;padding:9px 12px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink)}input{flex:1;min-width:200px}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;max-width:1200px;margin:0 auto 40px;padding:0 16px}
.c{background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.c img{width:100%;aspect-ratio:240/461;object-fit:cover;object-position:center 65%;background:#e6cb94}
.c div{padding:10px 12px}.id{font:600 13px ui-monospace,monospace;cursor:pointer}.id:hover{color:var(--accent)}.s{font-size:13px;color:var(--muted);margin-top:4px}
.t{font-size:11px;color:var(--muted);margin-top:6px}
</style></head><body>
<header><h1>SceneParts</h1><p>${entries.length} open, MIT-licensed parts for animated videos. Click an id to copy it. Use them with <code>sceneparts add &lt;id&gt;</code> or the Claude plugin.</p></header>
<div class="bar"><input id="q" placeholder="Search: jackal god, scales, fire…" autofocus><select id="ty"><option value="">All types</option></select><select id="st"><option value="">All styles</option></select></div>
<main id="g"></main>
<script>
const E=${JSON.stringify(entries)};
const g=document.getElementById('g'),q=document.getElementById('q'),ty=document.getElementById('ty'),st=document.getElementById('st');
[...new Set(E.map(e=>e.type))].sort().forEach(v=>ty.add(new Option(v,v)));[...new Set(E.map(e=>e.style))].sort().forEach(v=>st.add(new Option(v,v)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function draw(){const w=q.value.toLowerCase().split(/\\s+/).filter(Boolean);
g.innerHTML=E.filter(e=>(!ty.value||e.type===ty.value)&&(!st.value||e.style===st.value)&&w.every(x=>(e.id+' '+e.name+' '+e.summary+' '+e.tags.join(' ')).toLowerCase().includes(x)))
.map(e=>'<div class="c">'+(e.img?'<img loading="lazy" src="'+e.img+'" alt="'+esc(e.name)+'">':'')+'<div><div class="id" title="copy id">'+esc(e.id)+'</div><div class="s">'+esc(e.summary)+'</div><div class="t">'+esc(e.type)+' · by '+esc(e.author)+'</div></div></div>').join('');}
g.addEventListener('click',ev=>{const t=ev.target.closest('.id');if(t)navigator.clipboard?.writeText(t.textContent).catch(()=>{});});
[q,ty,st].forEach(el=>el.addEventListener('input',draw));draw();
</script></body></html>
`;
