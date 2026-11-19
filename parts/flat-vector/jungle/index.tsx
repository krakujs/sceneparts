import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import Palm from "../palm-tree/index";

// Jungle vignette: a dense back layer of dark foliage, two palms, hanging lianas and big tropical leaves at the front.
// Origin = centre of the vignette on the ground. About 1000 px wide and 1200 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Back foliage blobs: [x, y, rx, ry]
const BACK: [number, number, number, number][] = [
  [-420, -560, 180, 120], [-200, -700, 220, 150], [60, -640, 230, 150], [330, -560, 190, 130], [-40, -420, 300, 110],
  [-380, -330, 150, 90], [390, -330, 160, 90],
];
// Front big leaves rooted on the ground: [x, rotation, length, width, colour index]
const FRONT: [number, number, number, number, number][] = [
  [-420, -38, 380, 120, 0], [-240, -14, 430, 130, 1], [30, 12, 410, 124, 0], [250, 30, 380, 118, 1], [420, 56, 300, 100, 2],
];
const LEAF_COLS = [C.green, C.greenDark, C.teal];
// Lianas hanging from the canopy: [x, length]
const LIANAS: [number, number][] = [[-360, 900], [-120, 1000], [110, 760], [340, 860]];
const leafPath = (len: number, w: number) => `M 0 0 C ${f1(-w)} ${f1(-len * 0.3)} ${f1(-w * 0.9)} ${f1(-len * 0.8)} 0 ${f1(-len)} C ${f1(w * 0.9)} ${f1(-len * 0.8)} ${f1(w)} ${f1(-len * 0.3)} 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = (p.s ?? 1) * 0.72, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const anim: string = p.anim ?? "none";
  const dense = p.color && p.color !== "none" ? p.color : C.greenDark;
  const vineC = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const kid = { f: p.f, d: p.d, t: p.t, style: p.style, render: p.render, anim };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={480} ry={22} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {BACK.map(([bx, by, rx, ry], i) => {
          const sw = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 100 + i) : 0;
          return (
            <g key={`b${i}`} transform={`rotate(${f1(sw)} ${bx} ${by + ry})`}>
              <ellipse cx={f1(bx + 14)} cy={f1(by + 18)} rx={rx} ry={ry} fill={shade(dense, 0.25)} />
              <ellipse cx={f1(bx)} cy={f1(by)} rx={rx} ry={ry} fill={i % 2 ? shade(dense, 0.1) : dense} />
            </g>
          );
        })}
        {/* lianas hanging down from the canopy */}
        {LIANAS.map(([lx, len0], i) => { const len = Math.min(len0, 700); return (
          <path key={`l${i}`} d={`M ${lx} -800 Q ${lx + 40} ${-800 + len / 2} ${lx - 10} ${-800 + len}`} stroke={vineC} strokeWidth={10} strokeLinecap="round" fill="none" />
        ); })}
        <Palm {...kid} x={-300} y={0} s={0.78} />
        <Palm {...kid} x={170} y={0} s={0.7} flip />
        {FRONT.map(([lx, rot, len, w, ci], i) => (
          <g key={`f${i}`} transform={`translate(${lx} 0) rotate(${rot})`}>
            <path d={leafPath(len, w)} fill={LEAF_COLS[ci]} />
            <path d={`M 0 0 Q ${f1(w * 0.9)} ${f1(-len * 0.8)} 0 ${f1(-len)}`} fill="none" stroke={shade(LEAF_COLS[ci], 0.3)} strokeWidth={5} strokeLinecap="round" />
          </g>
        ))}
      </g>
    </g>
  );
}
