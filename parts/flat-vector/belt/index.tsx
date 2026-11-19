import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Leather belt loosely coiled into an oval, with a metal buckle at the gap and a row of holes along the tail.
// Seen from a slight angle. Origin = bottom centre (the coil rests on y). About 540 px wide, 300 px tall at s = 1.
// anim "sway": the coil rocks slightly; "pop": it springs in once.
const f1 = (v: number) => v.toFixed(1);

const RX = 230, RY = 112, W = 84, CY = -(RY + W / 2), CX = 0;
const pt = (deg: number, dx = 0, dy = 0) => {
  const a = (deg * Math.PI) / 180;
  return [CX + dx + RX * Math.cos(a), CY + dy + RY * Math.sin(a)] as [number, number];
};
// the coil is an arc with a gap at the left, where the buckle sits
const arcD = (dx: number, dy: number) => {
  const [x0, y0] = pt(200, dx, dy);
  const [x1, y1] = pt(160, dx, dy);
  return `M ${f1(x0)} ${f1(y0)} A ${RX} ${RY} 0 1 1 ${f1(x1)} ${f1(y1)}`;
};

const pop = (f: number) => {
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const leather = p.color && p.color !== "none" ? p.color : C.brown;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : "#C9D1DC";
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 2.5 : 0;
  const k = anim === "pop" ? pop(f) : 1;
  const holes: [number, number][] = [];
  for (let a = 300; a <= 380; a += 9) holes.push(pt(a));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={14} fill={C.shadow} />
      <g transform={`translate(0 0) rotate(${f1(sway)} 0 0) scale(${f1(k)})`}>
        {/* lower coil, peeking out underneath */}
        <path d={arcD(0, 18)} fill="none" stroke={shade(leather, 0.3)} strokeWidth={W} strokeLinecap="butt" />
        {/* upper coil */}
        <path d={arcD(0, 0)} fill="none" stroke={leather} strokeWidth={W} strokeLinecap="butt" />
        {/* highlight along the top of the coil */}
        <path d={`M ${f1(pt(225)[0])} ${f1(pt(225)[1] - 2)} A ${RX - 14} ${RY - 12} 0 0 1 ${f1(pt(300)[0])} ${f1(pt(300)[1] - 2)}`} fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.25} />
        {/* stitching-style holes along the tail */}
        {holes.map(([hx, hy], i) => (
          <circle key={i} cx={f1(hx)} cy={f1(hy)} r={10} fill={shade(leather, 0.5)} />
        ))}
        {/* buckle: a big metal frame with a tongue, sitting in the gap */}
        <rect x={CX - RX - 62} y={CY - 58} width={92} height={116} rx={14} fill="none" stroke={shade(metal, 0.25)} strokeWidth={22} />
        <rect x={CX - RX - 62} y={CY - 58} width={92} height={116} rx={14} fill="none" stroke={metal} strokeWidth={12} />
        <rect x={CX - RX - 20} y={CY - 10} width={22} height={20} rx={6} fill={shade(metal, 0.25)} />
      </g>
    </g>
  );
}
