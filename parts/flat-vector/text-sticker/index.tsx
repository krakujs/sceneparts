import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, font, shade } from "../style/index";

// Flat vector text sticker generator: a bold word on a die-cut sticker shape (burst, circle, pill, cloud,
// speech bubble, badge or tag) with a white sticker edge, a soft drop shadow and a 3D offset block.
// Centre (x, y); the shape is about 560 px wide at s = 1. Pops in and idles with p.f only.
// Presets reuse it through the named export TextSticker.

export type TSShape = "burst" | "circle" | "pill" | "cloud" | "speech" | "badge" | "tag" | "star";
export type TSAnim = "none" | "wobble" | "pulse" | "shake" | "bob" | "spin";
export type TSSpec = { text?: string; shape?: TSShape; fill?: string; textColor?: string; textOutline?: string; tilt?: number; anim?: TSAnim; popIn?: boolean; border?: boolean; size?: number };

const star = (r: number, pts: number, inner: number, rot = 0) => {
  let d = "";
  for (let i = 0; i < pts * 2; i++) {
    const a = rot + (i * Math.PI) / pts - Math.PI / 2, rr = i % 2 ? r * inner : r;
    d += `${i ? "L" : "M"} ${(Math.cos(a) * rr * 1.18).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `;
  }
  return d + "Z";
};

/** Outline path of each shape, centred on 0,0, roughly 560 x 360. */
export function shapePath(shape: TSShape): string {
  switch (shape) {
    case "burst": return star(230, 14, 0.78);
    case "star": return star(250, 5, 0.55);
    case "circle": return "M -220 0 A 220 220 0 1 0 220 0 A 220 220 0 1 0 -220 0 Z";
    case "pill": return "M -200 -110 L 200 -110 A 110 110 0 0 1 200 110 L -200 110 A 110 110 0 0 1 -200 -110 Z";
    case "cloud": return "M -200 110 Q -290 110 -280 30 Q -270 -40 -200 -40 Q -200 -140 -100 -140 Q -40 -190 30 -150 Q 110 -200 170 -120 Q 270 -130 270 -30 Q 320 40 260 100 Q 230 130 180 110 Z";
    case "speech": return "M -230 -150 L 230 -150 Q 270 -150 270 -110 L 270 90 Q 270 130 230 130 L -40 130 L -130 210 L -110 130 L -230 130 Q -270 130 -270 90 L -270 -110 Q -270 -150 -230 -150 Z";
    case "badge": { let d = ""; for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2, r = i % 2 ? 215 : 235; d += `${i ? "L" : "M"} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)} `; } return d + "Z"; }
    case "tag": return "M -170 -120 L 250 -120 Q 270 -120 270 -100 L 270 100 Q 270 120 250 120 L -170 120 L -280 0 Z";
  }
  return "";
}

export function TextSticker(p: PartProps<any> & TSSpec) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const shape: TSShape = p.shape ?? "burst", fill = p.fill ?? C.yellow, text = String(p.text ?? "WOW");
  const tc = p.textColor ?? "#FFFFFF", to = p.textOutline ?? C.ink;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: TSAnim = p.anim ?? "wobble";
  let rot = p.tilt ?? -8, sc = 1, dx = 0, dy = 0;
  if (anim === "wobble") rot += Math.sin(f * 0.16) * 5;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.25) * 0.05;
  else if (anim === "shake") dx = Math.sin(f * 1.7) * 7;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  else if (anim === "spin") rot += f * 0.6;
  const d = shapePath(shape);
  const wide = [...text].reduce((a, ch) => a + (/[MW]/i.test(ch) ? 1.0 : /[I1!.]/.test(ch) ? 0.4 : 0.76), 0);
  const room = shape === "pill" || shape === "tag" || shape === "speech" ? 490 : shape === "cloud" ? 420 : 370;
  const fs = p.size ? p.size : Math.min(160, room / Math.max(1, wide));
  const ty = shape === "speech" ? -6 : shape === "cloud" ? 0 : 0;
  const txt = (extra: Record<string, any>) => (
    <text x={shape === "tag" ? 20 : 0} y={ty} dominantBaseline="central" textAnchor="middle" fontFamily={font} fontWeight={900} fontSize={fs} {...extra}>{text}</text>
  );
  return (
    <g transform={`translate(${x + dx * s} ${y + dy * s}) scale(${s * k * sc})`}>
      <g transform={`rotate(${rot})`}>
        <path d={d} transform="translate(0 18)" fill={C.shadow} />
        {p.border !== false && <path d={d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={36} strokeLinejoin="round" />}
        <path d={d} transform="translate(0 12)" fill={shade(fill, 0.22)} />
        <path d={d} fill={fill} />
        {shape === "tag" && <circle cx={-200} cy={0} r={18} fill="#FFFFFF" />}
        {txt({ fill: to, stroke: to, strokeWidth: fs * 0.16, strokeLinejoin: "round", transform: "translate(0 8)" })}
        {txt({ fill: tc, stroke: to, strokeWidth: fs * 0.1, strokeLinejoin: "round", paintOrder: "stroke" })}
      </g>
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <TextSticker {...p} />;
}
