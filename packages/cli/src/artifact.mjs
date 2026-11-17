import fs from "node:fs";
import path from "node:path";

// Fetch real museum photos that are safe for monetised videos: CC0 / public domain only.
// met = The Met Open Access, aic = Art Institute of Chicago. Non-commercial licences are never used.
const UA = { "User-Agent": "sceneparts/0.1 (+https://github.com/krakujs/sceneparts)" };
const jget = async (url) => {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};

async function metObject(oid) {
  const o = await jget(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${oid}`);
  if (!o.isPublicDomain || !o.primaryImage) return null;
  return { source: "met", id: `met:${oid}`, title: o.title ?? "", date: o.objectDate ?? "", place: o.culture || o.country || o.region || "", image: o.primaryImage, page: o.objectURL ?? "", licence: "CC0 (The Met Open Access)", commercialOk: true, credit: `${o.title}, ${o.objectDate}. The Metropolitan Museum of Art, ${o.creditLine ?? ""} (CC0)` };
}
async function metSearch(q, limit) {
  // The Met retired search v1 on 1 Oct 2026; v1.1 is current. Fall back to v1 for older mirrors.
  let ids = [], lastErr;
  for (const v of ["v1.1", "v1"]) {
    try { ids = (await jget(`https://collectionapi.metmuseum.org/public/collection/${v}/search?hasImages=true&q=${encodeURIComponent(q)}`)).objectIDs ?? []; lastErr = null; break; } catch (e) { lastErr = e; }
  }
  if (lastErr) throw new Error(`The Met API unreachable: ${lastErr.cause?.code ?? lastErr.message}`);
  const out = [];
  for (const id of ids.slice(0, limit * 4)) {
    try { const o = await metObject(id); if (o) out.push(o); } catch { /* skip */ }
    if (out.length >= limit) break;
  }
  return out;
}
const aicNorm = (d) => (!d?.is_public_domain || !d.image_id ? null : { source: "aic", id: `aic:${d.id}`, title: d.title ?? "", date: d.date_display ?? "", place: d.place_of_origin ?? "", image: `https://www.artic.edu/iiif/2/${d.image_id}/full/843,/0/default.jpg`, page: `https://www.artic.edu/artworks/${d.id}`, licence: "CC0 (Art Institute of Chicago)", commercialOk: true, credit: `${d.title}, ${d.date_display}. Art Institute of Chicago, ${d.credit_line ?? ""} (CC0)` });
const AIC_F = "id,title,image_id,is_public_domain,date_display,place_of_origin,credit_line";
const aicSearch = async (q, limit) => ((await jget(`https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(q)}&limit=${limit * 3}&fields=${AIC_F}`)).data ?? []).map(aicNorm).filter(Boolean).slice(0, limit);
const aicObject = async (id) => aicNorm((await jget(`https://api.artic.edu/api/v1/artworks/${id}?fields=${AIC_F}`)).data);

const label = (it) => [it.title.split(",")[0].slice(0, 40), it.place.slice(0, 24), it.date.slice(0, 24)].filter(Boolean).join(" · ");
const score = (it, q) => q.toLowerCase().split(/\s+/).filter((w) => (it.title + " " + it.place).toLowerCase().includes(w)).length * 10 - it.title.length / 100;

export async function artifact({ query, id, source = "met", n = 1, list = false, out = "public/artifacts", labelText }) {
  let items = [];
  if (id) {
    const [src, oid] = id.split(":");
    const it = src === "met" ? await metObject(oid) : src === "aic" ? await aicObject(oid) : null;
    if (!it) throw new Error(`${id} is not public domain, has no image, or the source is unknown (met|aic) – refused`);
    items = [it];
  } else if (query) {
    for (const s of source === "all" ? ["met", "aic"] : [source]) {
      try { items.push(...(await (s === "met" ? metSearch : aicSearch)(query, Math.max(n, 5)))); } catch (e) { console.error(`[artifact] ${s} search failed: ${e.message}`); }
    }
    items.sort((a, b) => score(b, query) - score(a, query));
  } else throw new Error("give --query or --id");
  if (list || !items.length) {
    for (const it of items.slice(0, 15)) console.log(`${it.id.padEnd(16)} ${label(it)}  ${it.page}`);
    if (!items.length) console.log("no CC0 results – try a broader query (e.g. 'Egyptian jackal amulet')");
    return [];
  }
  fs.mkdirSync(out, { recursive: true });
  const manPath = path.join(path.dirname(out), "artifacts.json");
  const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, "utf8")) : { items: [] };
  const saved = [];
  for (const it of items.slice(0, n)) {
    if (!it.commercialOk) continue;
    const file = path.join(out, `artifact${String(man.items.length + 1).padStart(2, "0")}.jpg`);
    const r = await fetch(it.image, { headers: UA });
    if (!r.ok) { console.error(`[artifact] download failed ${r.status}`); continue; }
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    Object.assign(it, { file, label: labelText ?? label(it), fetched: new Date().toISOString().slice(0, 10) });
    man.items.push(it);
    saved.push(it);
    console.log(`[artifact] ${file}  <-  ${it.id}  ${it.label}`);
    console.log(`  story.json: "artifact": ${JSON.stringify({ src: path.relative(path.dirname(out), file), label: it.label, credit: it.credit, at: 10 })}`);
  }
  fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + "\n");
  console.log(`[artifact] credits for your video description: ${manPath}`);
  return saved;
}
