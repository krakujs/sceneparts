import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Diamond kite with cross spars, two colour panels and a tail of bows on a string, drawn in the sky.
// Origin = centre of the kite body (x, y). About 260 px wide and 340 px tall at s = 1, tail hangs below.
// anim "fly": the kite sways side to side and the tail bows ripple.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 600;
  const main = p.color && p.color !== "none" ? p.color : C.red;
  const second = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const sway = anim === "fly" ? Math.sin((f * 2 * Math.PI) / 80) * 6 : 0;
  const rise = anim === "fly" ? Math.sin((f * 2 * Math.PI) / 80) * 8 : 0;
  const ripple = (i: number) => (anim === "fly" ? Math.sin((f * 2 * Math.PI) / 40 + i * 0.9) * 10 : 0);
  // Kite body: top (0,-170), right (130,0), bottom (0,170), left (-130,0). Tail starts at (0,170).
  const bows = [0, 1, 2, 3].map((i) => {
    const by = 200 + i * 70;
    const sway2 = ripple(i);
    return { x: sway2, y: by };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(${f1(sway)} ${f1(rise)}) ${motion(anim, f)}`}>
        {/* string from the tail down to the bows */}
        <path d={`M 0 170 Q ${f1(bows[0].x * 0.5)} 220 ${f1(bows[0].x)} ${bows[0].y} L ${f1(bows[1].x)} ${bows[1].y} L ${f1(bows[2].x)} ${bows[2].y} L ${f1(bows[3].x)} ${bows[3].y}`} fill="none" stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" />
        {/* bows on the tail */}
        {bows.map((b, i) => (
          <g key={i} transform={`translate(${f1(b.x)} ${f1(b.y)})`}>
            <path d="M 0 0 L -22 -12 L -22 12 Z" fill={i % 2 ? second : main} />
            <path d="M 0 0 L 22 -12 L 22 12 Z" fill={i % 2 ? second : main} />
            <circle cx={0} cy={0} r={5} fill={C.ink} />
          </g>
        ))}
        {/* kite body: two triangles, upper main colour, lower second colour */}
        <path d="M 0 -170 L 130 0 L 0 170 L -130 0 Z" fill={main} />
        <path d="M -130 0 L 130 0 L 0 170 Z" fill={second} />
        {/* cross spars */}
        <line x1={0} y1={-170} x2={0} y2={170} stroke={C.ink} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        <line x1={-130} y1={0} x2={130} y2={0} stroke={C.ink} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        <circle cx={0} cy={0} r={12} fill={C.white} opacity={0.6} />
        <circle cx={-60} cy={-80} r={14} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
