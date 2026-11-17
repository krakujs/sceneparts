import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import { resolveId } from "./parts.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const ajv = new Ajv({ allErrors: true, strict: false });
const validateSchema = ajv.compile(JSON.parse(fs.readFileSync(path.join(here, "story.schema.json"), "utf8")));
const RESERVED = new Set(["t", "at", "until", "layer"]);

/** { errors, warnings } for a story against the parts that are available. Messages say how to fix. */
export function validateStory(story, avail) {
  const errors = [], warnings = [];
  if (!validateSchema(story)) for (const e of validateSchema.errors) errors.push(`schema ${e.instancePath || "/"}: ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ""}`);
  const style = story.style;
  if (style && !avail[`${style}/style`]) errors.push(`style "${style}" not found – run \`sceneparts search --type style\` to list styles`);
  const shots = story.shots ?? [];
  const dur = story.duration ?? (shots.at(-1)?.at ?? 0) + 3;

  const checkItem = (it, where) => {
    if (!it || typeof it !== "object" || typeof it.t !== "string") return;
    const id = resolveId(avail, it.t, style);
    if (!id) { errors.push(`${where}: no part "${it.t}" in style ${style} or core – \`sceneparts search "${it.t}"\`, or draw it and contribute it`); return; }
    const m = avail[id].manifest;
    if (m.type === "style") { errors.push(`${where}: "${it.t}" is a style, not something to draw`); return; }
    const params = Object.fromEntries((m.params ?? []).map((p) => [p.name, p]));
    for (const [k, v] of Object.entries(it)) {
      if (RESERVED.has(k)) continue;
      const p = params[k];
      if (!p) { warnings.push(`${where} (${id}): unknown param "${k}" is ignored – \`sceneparts info ${id}\``); continue; }
      if (p.type === "enum" && p.values && !p.values.includes(v)) errors.push(`${where} (${id}): ${k} "${v}" not in [${p.values.join(", ")}]`);
      if (p.type === "number" && !(typeof v === "number" || (Array.isArray(v) && v.length === 2 && v.every((n) => typeof n === "number")))) errors.push(`${where} (${id}): ${k} must be a number or [from, to]`);
      if (p.type === "item") checkItem(v, `${where}.${k}`);
      if (p.type === "items" && Array.isArray(v)) v.forEach((x, j) => checkItem(x, `${where}.${k}[${j}]`));
    }
    if (["text", "bang"].includes(id.split("/")[1]) && typeof it.text === "string") {
      const size = Array.isArray(it.size) ? Math.max(...it.size) : it.size ?? (id.endsWith("bang") ? 140 : 64);
      const w = it.text.length * size * 0.62;
      if (w > 1000) warnings.push(`${where}: text is ~${Math.round(w)} px wide (canvas 1080) – shorten it or use size ${Math.floor(1000 / it.text.length / 0.62)}`);
    }
    if (typeof it.at === "number" && typeof it.until === "number" && it.until <= it.at) errors.push(`${where}: until must be after at`);
  };

  if (shots.length && shots[0].at !== 0) errors.push("shots[0].at must be 0");
  shots.forEach((s, i) => {
    const w = `shots[${i}]`;
    if (i > 0 && s.at <= shots[i - 1].at) errors.push(`${w}.at ${s.at} must be after shots[${i - 1}].at ${shots[i - 1].at}`);
    if (s.at >= dur) errors.push(`${w}.at ${s.at} is at or past the end (duration ${dur})`);
    const len = (i + 1 < shots.length ? shots[i + 1].at : dur) - s.at;
    if (len > 0 && len < 0.4 && s.loop !== "in") warnings.push(`${w} lasts ${len.toFixed(2)} s – very short for a cut`);
    if (len > 6) warnings.push(`${w} lasts ${len.toFixed(1)} s – Shorts feel slow past ~4 s per shot; add a cut`);
    if (s.loop === "in" && i !== shots.length - 1) errors.push(`${w}: loop "in" only works as the last shot`);
    if (s.template) {
      checkItem({ ...(s.params ?? {}), t: s.template }, `${w}.template`);
      const id = resolveId(avail, s.template, style);
      if (id && avail[id].manifest.type !== "template") warnings.push(`${w}: ${id} is a ${avail[id].manifest.type}, not a template – put it in items instead`);
      if (s.items?.length) warnings.push(`${w}: items are ignored on a template shot`);
    }
    (s.items ?? []).forEach((it, j) => checkItem(it, `${w}.items[${j}]`));
    (s.over ?? []).forEach((it, j) => checkItem(it, `${w}.over[${j}]`));
    if (!s.template && !s.loop && !(s.items ?? []).length) warnings.push(`${w} has no items`);
  });
  if (story.loop && shots.at(-1)?.loop !== "in") warnings.push(`loop: true but the last shot is not { "loop": "in" } – the end won't match frame 0`);
  (story.captions ?? []).forEach((c, i) => {
    if (c.to <= c.from) errors.push(`captions[${i}]: to must be after from`);
    if (c.to > dur + 0.01) errors.push(`captions[${i}] ends after the video (${dur} s)`);
    if (i > 0 && c.from < story.captions[i - 1].to - 0.01) warnings.push(`captions[${i}] overlaps the previous caption`);
    const n = c.text.split(/\s+/).length;
    if (n > 9) warnings.push(`captions[${i}] has ${n} words – keep captions under ~8 words`);
  });
  if (story.artifact && (story.artifact.at < 0 || story.artifact.at > dur)) errors.push("artifact.at is outside the video");
  if (story.artifact && !story.artifact.credit) warnings.push("artifact has no credit – add the museum credit line (and put it in the video description)");
  if (dur > 180) warnings.push("longer than 3 minutes – Shorts must be under 3 minutes");
  return { errors, warnings };
}
