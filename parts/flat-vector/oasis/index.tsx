import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small blue pond in a ring of grass on sand, with two palm trees. Origin = centre of the base. About 1000 px wide and 470 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
// Fronds: [angle in degrees (negative = up), length]
const FRONDS: [number, number][] = [[-178, 230], [-150, 200], [-105, 150], [-70, 170], [-35, 210], [-6, 240], [24, 160]];
const TUFTS: [number, number][] = [[-300, -66], [-120, -44], [70, -36], [290, -58], [180, -30]];

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
  const water = col(p.color, "#4AA3D9");
  const sand = col(p.color2, C.sand);
  const anim: string = p.anim ?? "none";
  const trunk = C.brown, leaf = C.green;
  const palm = (bx: number, by: number, cx: number, cy: number, tx: number, ty: number, k: number) => {
    const sw = anim === "sway" ? Math.sin(f / 30 + k) * 4 : 0;
    return (
      <g key={k}>
        <path d={`M ${f1(bx)} ${f1(by)} Q ${f1(cx)} ${f1(cy)} ${f1(tx)} ${f1(ty)}`} stroke={trunk} strokeWidth={26} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${f1(sw)} ${f1(tx)} ${f1(ty)})`}>
          {FRONDS.map(([a, L], j) => frond(tx, ty, a, L, 26, j % 2 ? C.greenDark : leaf, j))}
          <circle cx={tx - 14} cy={ty + 16} r={13} fill={C.brownDark} />
          <circle cx={tx + 12} cy={ty + 18} r={13} fill={C.brownDark} />
        </g>
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={500} ry={18} fill={C.shadow} />
        {/* sand mound */}
        <ellipse cx={0} cy={-80} rx={500} ry={80} fill={sand} />
        {/* grass ring */}
        <ellipse cx={0} cy={-92} rx={330} ry={62} fill={C.green} />
        {TUFTS.map(([x0, y0], i) => (
          <path key={i} d={`M ${x0 - 14} ${y0} Q ${x0 - 10} ${y0 - 16} ${x0 - 14} ${y0 - 30} Q ${x0 - 4} ${y0 - 18} ${x0} ${y0 - 38} Q ${x0 + 4} ${y0 - 18} ${x0 + 14} ${y0 - 28} Q ${x0 + 10} ${y0 - 14} ${x0 + 14} ${y0} Z`} fill={C.greenDark} />
        ))}
        {/* pond */}
        <ellipse cx={0} cy={-92} rx={230} ry={46} fill={water} />
        <ellipse cx={-30} cy={-98} rx={150} ry={20} fill={shade(water, -0.35)} opacity={0.5} />
        {palm(-250, -60, -262, -220, -225, -390, 0)}
        {palm(250, -56, 262, -230, 235, -370, 1)}
      </g>
    </g>
  );
}
