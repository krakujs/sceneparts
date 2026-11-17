import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wristwatch: analogue wristwatch with a strap above and below the case, a round face with dot markers, hour and minute
// hands and a thin second hand. anim "tick": the second hand jumps once a second and the minute hand creeps on.
// Origin = bottom centre (end of the lower strap); faces the viewer, honours flip, s and anim. Hero size.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const strap = p.color && p.color !== "none" ? p.color : C.brown;
  const strapDk = shade(strap, 0.2);
  const cy = -330; // face centre
  const secs = Math.floor(f / 30);
  const secAngle = (p.anim === "tick" ? secs * 6 : 0) % 360;
  const minAngle = (p.anim === "tick" ? secs * 0.1 : 0) + 40;
  const hourAngle = minAngle / 12 + 300;
  const markers = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim === "tick" ? "none" : (p.anim ?? "none"), f)}>
        {/* straps: lower strap to the ground, upper strap going up */}
        <rect x={-92} y={-190} width={184} height={190} rx={26} fill={strap} />
        <rect x={-80} y={-200} width={160} height={24} rx={8} fill={strapDk} />
        <rect x={-92} y={-600} width={184} height={220} rx={26} fill={strap} />
        <rect x={-66} y={-600} width={20} height={220} rx={8} fill={strapDk} opacity={0.5} />
        {/* strap holes */}
        {[-150, -128].map((hy) => (
          <circle key={hy} cx={0} cy={hy} r={8} fill={strapDk} />
        ))}
        {/* case */}
        <circle cx={0} cy={cy} r={178} fill={C.greyLight} />
        <circle cx={0} cy={cy} r={160} fill={shade(C.greyLight, 0.12)} />
        <circle cx={0} cy={cy} r={146} fill={C.white} />
        {/* crown */}
        <rect x={166} y={cy - 16} width={24} height={32} rx={8} fill={C.greyDark} />
        {/* markers */}
        {markers.map((a) => (
          <rect key={a} x={-7} y={cy - 128} width={14} height={a % 90 === 0 ? 30 : 18} rx={5} fill={C.ink} transform={`rotate(${a} 0 ${cy})`} />
        ))}
        {/* hour and minute hands */}
        <g transform={`translate(0 ${cy}) rotate(${f1(hourAngle)})`}>
          <rect x={-9} y={-82} width={18} height={92} rx={9} fill={C.ink} />
        </g>
        <g transform={`translate(0 ${cy}) rotate(${f1(minAngle)})`}>
          <rect x={-7} y={-116} width={14} height={126} rx={7} fill={C.blue} />
        </g>
        {/* second hand (thin) */}
        <g transform={`translate(0 ${cy}) rotate(${f1(secAngle)})`}>
          <rect x={-2.5} y={-130} width={5} height={150} fill={C.red} />
        </g>
        <circle cx={0} cy={cy} r={12} fill={C.ink} />
      </g>
    </g>
  );
}
