import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fruit, profile } from "../fruit/index";

// Eggplant (preset of flat-vector/fruit, shape long): purple, lying on its side as the generator draws long shapes.
// Extra SVG: a big green calyx cap with a stalk on the stem end (right-hand end, at (H/2, -maxBottom)).
const HW = 85, H = 440;
const LOOK = { shape: "long", w: 170, h: H, color: "#5A40A8", color2: "#43297A", stem: "none", leaves: 0, shine: true };

const bend = (u: number) => -HW * 0.22 * Math.sin(Math.PI * u);
let maxBottom = 0;
for (let i = 0; i <= 36; i++) { const u = i / 36; maxBottom = Math.max(maxBottom, HW * profile("long", u) + bend(u)); }
const CX = H / 2 - 36, CY = -maxBottom;
const star = Array.from({ length: 10 }, (_, k) => {
  const a = (k * Math.PI) / 5, m = k % 2 ? 0.55 : 1;
  return `${(CX + Math.cos(a) * 72 * m).toFixed(1)} ${(CY + Math.sin(a) * 74 * m).toFixed(1)}`;
}).join(" ");
const extras = (
  <g>
    <path d={`M ${CX + 40} ${CY} L ${CX + 86} ${CY - 8}`} stroke="#348A4F" strokeWidth={12} strokeLinecap="round" />
    <polygon points={star} fill="#348A4F" />
  </g>
);

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
