import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit } from "../fruit/index";

// Peach (preset of flat-vector/fruit): orange-pink round with a red blush, fuzz and a leaf. Extra SVG: a soft seam.
const HW = 160, H = 300;
const LOOK = { shape: "round", w: 320, h: H, color: "#FFA27A", color2: "#EE7262", texture: "fuzz", stem: "short", stemColor: "#6B4A2E", leaves: 1, leafColor: "#4BB46A", shine: true };
const extras = <path d="M 52 -282 Q 80 -150 22 -22" fill="none" stroke="#E0695A" strokeWidth={5} strokeLinecap="round" opacity={0.6} />;

// Same motion as the fruit generator, applied to the body and the extra details together.
const f1 = (v: number) => v.toFixed(1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const easeOutBounce = (t: number) => {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) { const u = t - 1.5 / d; return n * u * u + 0.75; }
  if (t < 2.5 / d) { const u = t - 2.25 / d; return n * u * u + 0.9375; }
  const u = t - 2.625 / d; return n * u * u + 0.984375;
};
const motion = (anim: string, f: number, hw: number, h: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "bounce") { const t = f / 30; return `translate(0 ${f1(t < 1 ? -(1 - easeOutBounce(t)) * 400 : 0)})`; }
  if (anim === "roll") {
    const e = 1 - (1 - clamp01(f / 50)) ** 3;
    const dx = -(1 - e) * 700, ang = ((-(1 - e) * 700) / hw) * (180 / Math.PI);
    return `translate(${f1(dx)} 0) rotate(${f1(ang)} 0 ${f1(-h / 2)})`;
  }
  if (anim === "pop") return `scale(${f1(easeOutBack(clamp01(f / 20)))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, flip = !!q.flip;
  return (
    <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${flip ? -s : s} ${s})`}>
      <g transform={motion(q.anim ?? "none", q.f ?? 0, HW, H)}>
        <Fruit {...q} x={0} y={0} s={1} flip={false} anim="none" />
        {extras}
      </g>
    </g>
  );
}
