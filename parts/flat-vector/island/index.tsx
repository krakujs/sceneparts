import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small sand island with one palm tree, ringed by sea water. Origin = centre of the base. About 1000 px wide and 420 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const FRONDS: [number, number][] = [[-178, 230], [-150, 200], [-105, 150], [-70, 170], [-35, 210], [-6, 240], [24, 160]];

const frond = (tx: number, ty: number, a: number, L: number, w: number, fill: string, key: number) => {
  const r = (a * Math.PI) / 180;
  const ex = tx + L * Math.cos(r), ey = ty + L * Math.sin(r) + L * 0.45;
  const mx = tx + L * 0.5 * Math.cos(r), my = ty + L * 0.5 * Math.sin(r) - w;
  const nx = -Math.sin(r) * w, ny = Math.cos(r) * w;
  return (
    <path key={key} fill={fill}
      d={`M ${f1(tx)} ${f1(ty)} Q ${f1(mx + nx)} ${f1(my + ny)} ${f1(ex)} ${f1(ey)} Q ${f1(mx - nx)} ${f1(my - ny)} ${f1(tx)} ${f1(ty)} Z`} />
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const deep = col(p.color, "#2F86C6");
  const shallow = col(p.color2, "#7CC9E8");
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin(f / 30) * 4 : 0;
  const tx = 20, ty = -400;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={500} ry={14} fill={C.shadow} />
        {/* sea: deep ring, shallow ring, sand */}
        <ellipse cx={0} cy={-80} rx={500} ry={80} fill={deep} />
        <ellipse cx={0} cy={-78} rx={400} ry={62} fill={shallow} />
        <path d="M -320 -26 q 14 -10 28 0 M 268 -134 q 14 -10 28 0 M -470 -70 q 18 -14 36 0 M 420 -62 q 18 -14 36 0"
          stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.8}
          transform={`translate(${f1(anim === "flow" ? Math.sin(f / 25) * 10 : 0)} 0)`} />
        <ellipse cx={0} cy={-70} rx={300} ry={48} fill={shade(C.sand, 0.1)} />
        <ellipse cx={0} cy={-80} rx={280} ry={40} fill={C.sand} />
        {/* palm */}
        <path d={`M 30 -100 Q 60 -260 ${tx} ${ty}`} stroke={C.brown} strokeWidth={26} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${f1(sw)} ${tx} ${ty})`}>
          {FRONDS.map(([a, L], j) => frond(tx, ty, a, L, 26, j % 2 ? C.greenDark : C.green, j))}
          <circle cx={tx - 14} cy={ty + 16} r={13} fill={C.brownDark} />
          <circle cx={tx + 12} cy={ty + 18} r={13} fill={C.brownDark} />
        </g>
      </g>
    </g>
  );
}
