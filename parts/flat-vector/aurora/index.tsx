import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Aurora: wavy translucent light curtains in green, teal, lime and purple, about 1080 wide. Origin = centre.
// anim "wave": the curtains ripple along their length, one full ripple every 120 frames.
const XS: number[] = [];
for (let x = -540; x <= 540; x += 40) XS.push(x);
const CURTAINS = [
  { base: -210, h: 230, a: 36, k: 0.011, c: C.teal },
  { base: -150, h: 200, a: 44, k: 0.008, c: C.green },
  { base: -270, h: 150, a: 28, k: 0.015, c: C.purple },
  { base: -90, h: 170, a: 30, k: 0.013, c: C.lime },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const wave = (p.anim ?? "none") === "wave";
  const t = wave ? (f * 2 * Math.PI) / 120 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {CURTAINS.map((cu, idx) => {
        const top = (px: number) => cu.base + cu.a * Math.sin(px * cu.k + idx * 1.3 + t * (1 + idx * 0.25));
        const bot = (px: number) => top(px) + cu.h + cu.a * 0.6 * Math.sin(px * cu.k * 1.7 + idx + t * 1.4);
        const d =
          `M ${XS[0]} ${top(XS[0]).toFixed(1)} ` +
          XS.slice(1).map((px) => `L ${px} ${top(px).toFixed(1)}`).join(" ") + " " +
          [...XS].reverse().map((px) => `L ${px} ${bot(px).toFixed(1)}`).join(" ") + " Z";
        return <path key={idx} d={d} fill={cu.c} opacity={0.5} />;
      })}
    </g>
  );
}
