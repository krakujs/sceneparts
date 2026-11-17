import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Resvg } from "@resvg/resvg-js";
import { StoryFrame, shotWindows, partStory } from "@sceneparts/core";

const h = React.createElement;
export const frameSvg = (story, reg, frame, uid = "f") => renderToStaticMarkup(h(StoryFrame, { story, frame, reg, uid }));
export const place = (svg, x, y, w) =>
  svg.replace(/^<svg([^>]*)>/, (_, attrs) => `<svg${attrs.replace(/\s(width|height|xmlns)="[^"]*"/g, "")} x="${x}" y="${y}" width="${w}" height="${(w * 1920) / 1080}">`);
export const toPng = (svg, width) =>
  new Resvg(svg, { fitTo: width ? { mode: "width", value: width } : { mode: "original" }, font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Serif" } }).render().asPng();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const sheet = (W, H, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f4ecd8"/><text x="16" y="34" font-size="24" font-weight="700" fill="#1a1410">${esc(title)}</text>${body}</svg>`;

/** Contact sheet: one row per shot, `per` frames across. */
export function contactSheet(story, reg, { per = 3, tile = 240 } = {}) {
  const fps = story.fps ?? 30;
  const ws = shotWindows(story, fps);
  const th = (tile * 1920) / 1080, pad = 16, labelW = 150;
  const W = labelW + per * (tile + pad) + pad, H = ws.length * (th + pad) + pad + 40;
  let body = "";
  ws.forEach((w, r) => {
    const y = 40 + pad + r * (th + pad);
    const kind = w.shot.template ? w.shot.template : w.shot.loop ? "loop-in" : `${(w.shot.items ?? []).length} items`;
    body += `<text x="16" y="${y + 28}" font-size="22" font-weight="700" fill="#1a1410">#${r} · ${w.shot.at}s</text><text x="16" y="${y + 56}" font-size="16" fill="#5a4a3a">${esc(kind)}</text><text x="16" y="${y + 80}" font-size="16" fill="#5a4a3a">${(w.len / fps).toFixed(1)} s</text>`;
    for (let c = 0; c < per; c++) {
      const fr = w.start + Math.min(w.len - 1, Math.round(((c + 0.5) / per) * w.len));
      const x = labelW + pad + c * (tile + pad);
      body += place(frameSvg(story, reg, fr, `r${r}c${c}`), x, y, tile) + `<rect x="${x}" y="${y}" width="${tile}" height="${th}" fill="none" stroke="#1a1410" stroke-width="2"/>`;
    }
  });
  return sheet(W, H, `${story.title ?? "story"} – ${ws.length} shots, ${((ws.at(-1).start + ws.at(-1).len) / fps).toFixed(1)} s`, body);
}

/** Tiles of single parts: [{ label, id, example, frame, styleId, extra }]. */
export function tileSheet(reg, tiles, { cols = 4, tile = 220, title = "" } = {}) {
  const th = (tile * 1920) / 1080, pad = 14, lab = 34, top = title ? 44 : 0;
  const rows = Math.ceil(tiles.length / cols);
  const W = cols * (tile + pad) + pad, H = top + rows * (th + lab + pad) + pad;
  let body = "";
  tiles.forEach((tl, i) => {
    const x = pad + (i % cols) * (tile + pad), y = top + pad + Math.floor(i / cols) * (th + lab + pad);
    const story = partStory(tl.id, tl.example, tl.styleId, tl.extra ?? []);
    body += place(renderToStaticMarkup(h(StoryFrame, { story, frame: tl.frame ?? 20, reg, uid: `t${i}` })), x, y, tile);
    body += `<rect x="${x}" y="${y}" width="${tile}" height="${th}" fill="none" stroke="#1a1410" stroke-width="2"/><text x="${x + tile / 2}" y="${y + th + 24}" text-anchor="middle" font-size="17" font-weight="700" fill="#1a1410">${esc(tl.label)}</text>`;
  });
  return title ? sheet(W, H, title, body) : `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f4ecd8"/>${body}</svg>`;
}
