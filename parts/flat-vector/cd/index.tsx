import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Compact disc: shiny disc with a rainbow sheen and a centre hole, standing upright. Origin = centre of the disc (floating item).
// anim "spin": the disc turns around its centre and the sheen rotates with it.
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
  const disc = p.color && p.color !== "none" ? p.color : C.greyLight;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? (f * 3) % 360 : 0;
  const R = 300;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={R + 40} rx={200} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(spin)})`}>
          <circle cx={0} cy={0} r={R} fill={shade(disc, 0.08)} stroke={C.inkSoft} strokeWidth={8} />
          <circle cx={0} cy={0} r={R - 4} fill={disc} />
          {/* rainbow sheen as soft arcs */}
          {[C.skyDeep, C.pink, C.yellow, C.lime, C.teal, C.purple].map((c, i) => (
            <path key={i} d={`M ${f1(-230 + i * 12)} ${f1(-120 + i * 20)} Q 0 ${f1(-260 + i * 14)} ${f1(230 - i * 12)} ${f1(-120 + i * 20)}`} fill="none" stroke={c} strokeWidth={14} opacity={0.22} />
          ))}
          {/* data ring and inner ring */}
          <circle cx={0} cy={0} r={230} fill="none" stroke={C.white} strokeWidth={3} opacity={0.5} />
          <circle cx={0} cy={0} r={150} fill="none" stroke={C.grey} strokeWidth={2} opacity={0.4} />
          {/* hub area */}
          <circle cx={0} cy={0} r={78} fill={C.white} opacity={0.6} />
          <circle cx={0} cy={0} r={78} fill="none" stroke={C.grey} strokeWidth={2} opacity={0.4} />
          <circle cx={0} cy={0} r={24} fill={C.white} />
        </g>
        {/* glint that stays put */}
        <path d="M -200 -150 Q -120 -220 -40 -240" fill="none" stroke={C.white} strokeWidth={16} strokeLinecap="round" opacity={0.5} />
      </g>
    </g>
  );
}
