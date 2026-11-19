import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Roast turkey on a platter: a golden bird lying on its side, a drumstick each side, a lighter breast,
// wing, rosemary sprigs and orange slices on the platter. Origin = bottom centre (the platter sits on y).
const f1 = (v: number) => v.toFixed(1);
const BONE = "#FFF6EC";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const skin = p.color && p.color !== "none" ? p.color : "#D9893B";
  const anim: string = p.anim ?? "none";
  const drum = shade(skin, 0.18);
  const steam = anim === "steam"
    ? [0, 1, 2].map((i) => {
        const t = ((f + i * 25) % 75) / 75;
        const sx = -120 + i * 120 + Math.sin(t * 6 + i) * 18;
        return <path key={i} d={`M ${f1(sx)} ${f1(-400 - t * 120)} q 22 -26 0 -52 t 0 -52`} fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={f1(0.7 * (1 - t))} />;
      })
    : null;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* platter */}
      <ellipse cx={0} cy={-30} rx={390} ry={58} fill={C.greyLight} />
      <ellipse cx={0} cy={-44} rx={380} ry={48} fill={C.white} />
      <ellipse cx={0} cy={-44} rx={300} ry={34} fill={shade(C.white, 0.05)} />
      {/* orange slices on the platter */}
      {[-300, 300].map((ox, i) => (
        <g key={i} transform={`translate(${ox} -58)`}>
          <ellipse cx={0} cy={0} rx={44} ry={24} fill={C.orange} />
          <ellipse cx={0} cy={0} rx={34} ry={17} fill="#FFD29A" />
          <line x1={0} y1={-16} x2={0} y2={16} stroke={C.orange} strokeWidth={3} />
          <line x1={-14} y1={-8} x2={14} y2={8} stroke={C.orange} strokeWidth={3} />
        </g>
      ))}
      {/* drumsticks, one each side, with bone ends */}
      {[[-190, -130, -345, -60], [180, -130, 340, -70]].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={drum} strokeWidth={116} strokeLinecap="round" />
          <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={skin} strokeWidth={100} strokeLinecap="round" />
          <circle cx={x2 + (i ? 14 : -14)} cy={y2 - 16} r={20} fill={BONE} />
          <circle cx={x2 + (i ? 4 : -4)} cy={y2 + 20} r={20} fill={BONE} />
        </g>
      ))}
      {/* body */}
      <ellipse cx={0} cy={-205} rx={290} ry={175} fill={drum} />
      <ellipse cx={0} cy={-212} rx={278} ry={164} fill={skin} />
      {/* breast and wing */}
      <ellipse cx={40} cy={-232} rx={176} ry={112} fill={shade(skin, -0.12)} opacity={0.9} />
      <ellipse cx={-150} cy={-200} rx={116} ry={54} transform="rotate(-18 -150 -200)" fill={drum} />
      {/* crisp highlights */}
      <path d="M -50 -330 Q 30 -360 120 -330" fill="none" stroke="#F6C27A" strokeWidth={14} strokeLinecap="round" opacity={0.7} />
      {/* rosemary sprigs */}
      {[[-70, -378, -30], [80, -372, 25]].map(([gx, gy, a], i) => (
        <g key={i} transform={`translate(${gx} ${gy}) rotate(${a})`}>
          <path d="M 0 0 L 0 -90" stroke={C.greenDark} strokeWidth={6} strokeLinecap="round" />
          {[-70, -50, -30, -10].map((ly, j) => (
            <ellipse key={j} cx={j % 2 ? 14 : -14} cy={ly} rx={14} ry={6} transform={`rotate(${j % 2 ? 30 : -30} ${j % 2 ? 14 : -14} ${ly})`} fill={C.green} />
          ))}
        </g>
      ))}
      {steam}
    </g>
  );
}
