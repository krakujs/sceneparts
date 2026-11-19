import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Willow: a short trunk under a domed crown with a curtain of long hanging leafy strands. Origin = centre of the trunk base.
// About 780 px wide and 920 px tall at s = 1. anim sway makes the strands swing.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

const DOME = { cx: 0, cy: -740, rx: 350, ry: 170 };
const CLUMPS = Array.from({ length: 26 }, (_, i) => {
  const a = i * 2.39996, r = Math.sqrt((i + 0.5) / 26);
  return { x: DOME.cx + Math.cos(a) * r * DOME.rx, y: DOME.cy + Math.sin(a) * r * DOME.ry, rad: 62 + 28 * hash(i + 3) };
});
const STRANDS = Array.from({ length: 36 }, (_, i) => {
  const x = -330 + (660 * (i + 0.5)) / 36 + (hash(i) - 0.5) * 12;
  const edge = DOME.cy + DOME.ry * Math.sqrt(Math.max(0, 1 - (x / DOME.rx) ** 2));
  return { x, y0: edge - 40, len: 240 + 200 * hash(i + 50), w: i % 3 ? 22 : 14 };
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const strand = (st: typeof STRANDS[number], i: number, c: string) => {
    const bend = 16 + (anim === "sway" ? 12 * Math.sin((f * 2 * Math.PI) / 100 + i * 0.5) : 0);
    const ex = st.x + bend * 1.5, ey = st.y0 + st.len;
    return <path key={i} d={`M ${f1(st.x)} ${f1(st.y0)} Q ${f1(st.x + bend)} ${f1(st.y0 + st.len / 2)} ${f1(ex)} ${f1(ey)}`} stroke={c} strokeWidth={st.w} strokeLinecap="round" fill="none" />;
  };
  const pop = anim === "pop" ? `scale(${f1(popS(f))})` : "";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={pop}>
        {/* trunk splitting into limbs */}
        <path d="M -60 0 C -50 -200 -40 -360 -90 -560 L 90 -560 C 40 -360 50 -200 60 0 Z" fill={bark} />
        <path d="M 0 0 L 60 0 C 50 -200 40 -360 90 -560 L 0 -560 Z" fill={shade(bark, 0.2)} />
        <path d="M -40 -420 Q -110 -500 -150 -600" stroke={bark} strokeWidth={30} strokeLinecap="round" fill="none" />
        <path d="M 40 -420 Q 110 -500 150 -600" stroke={shade(bark, 0.2)} strokeWidth={28} strokeLinecap="round" fill="none" />
        {/* strands behind the dome */}
        {STRANDS.map((st, i) => strand(st, i, shade(leaf, 0.25)))}
        {CLUMPS.map((c, i) => <circle key={`s${i}`} cx={c.x + 12} cy={c.y + 16} r={c.rad} fill={shade(leaf, 0.2)} />)}
        {CLUMPS.map((c, i) => <circle key={`m${i}`} cx={c.x} cy={c.y} r={c.rad} fill={leaf} />)}
        {/* strands in front */}
        {STRANDS.map((st, i) => (i % 2 ? strand({ ...st, w: st.w * 0.7 }, i, leaf) : null))}
      </g>
    </g>
  );
}
