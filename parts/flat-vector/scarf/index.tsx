import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Knitted scarf: a loose wrap over the top with two striped, fringed ends that flare out at the hem.
// Origin = bottom centre (y). About 460 px wide and 620 px tall at s = 1. anim "sway": the ends swing.
const f1 = (v: number) => v.toFixed(1);

// One scarf end: a tapered panel from a narrow top to a wider, flared hem, with stripes and fringe.
const End = ({ side, c, c2, rot, len }: { side: 1 | -1; c: string; c2: string; rot: number; len: number }) => {
  const top = -400, bot = top + len;
  const k = (v: number) => v * side;
  const inner = 60, outer = 150;
  const hemIn = 74, hemOut = 218;
  const panel = `M ${k(inner)} ${top} L ${k(outer)} ${top} L ${k(hemOut)} ${bot} L ${k(hemIn)} ${bot} Z`;
  const bands: number[] = [];
  for (let yy = top + 70; yy < bot - 40; yy += 62) bands.push(yy);
  return (
    <g transform={`rotate(${f1(rot)} 0 ${top})`}>
      <path d={panel} fill={c} />
      <path d={`M ${k(outer - 26)} ${top} L ${k(outer)} ${top} L ${k(hemOut)} ${bot} L ${k(hemOut - 28)} ${bot} Z`} fill={shade(c, 0.2)} opacity={0.55} />
      {bands.map((yy) => {
        const half = (yy - top) / len;
        const l = inner + (hemIn - inner) * half, r = outer + (hemOut - outer) * half;
        return <path key={yy} d={`M ${k(l)} ${yy} L ${k(r)} ${yy} L ${k(r)} ${yy + 22} L ${k(l)} ${yy + 22} Z`} fill={c2} />;
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const fx = hemIn + ((hemOut - hemIn) * i) / 5;
        return <line key={i} x1={k(fx)} y1={bot} x2={k(fx)} y2={bot + 44} stroke={c2} strokeWidth={7} strokeLinecap="round" />;
      })}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wool = p.color && p.color !== "none" ? p.color : C.red;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) * 5 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform="translate(0 0)">
        {/* loop over the top: a thick wrap around the neck, with a stripe across it */}
        <path d="M -150 -390 Q -160 -570 0 -570 Q 160 -570 150 -390" stroke={wool} strokeWidth={116} fill="none" strokeLinecap="round" />
        <path d="M -150 -390 Q -160 -500 0 -500 Q 160 -500 150 -390" stroke={shade(wool, 0.2)} strokeWidth={22} fill="none" opacity={0.45} />
        <path d="M -120 -600 Q -60 -618 10 -612" stroke={C.white} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.28} />
        <path d="M -150 -560 Q -40 -600 0 -560 Q 40 -520 150 -560" stroke={stripe} strokeWidth={18} fill="none" opacity={0.95} />
        <End side={-1} c={wool} c2={stripe} rot={-sw} len={330} />
        <End side={1} c={wool} c2={stripe} rot={sw * 0.8} len={300} />
      </g>
    </g>
  );
}
