import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Vinyl record: black disc with grooves and a coloured blank centre label, standing upright.
// Origin = centre of the record (floating item). anim "spin": the record turns and the label rotates with it.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const label = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? (f * 4) % 360 : 0;
  const grooves = [250, 226, 202, 178, 154, 130];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={300} rx={220} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(spin)})`}>
          <circle cx={0} cy={0} r={300} fill={C.ink} />
          {grooves.map((r) => <circle key={r} cx={0} cy={0} r={r} fill="none" stroke={C.inkSoft} strokeWidth={3} />)}
          <path d="M -240 -120 A 260 260 0 0 1 -120 -240" fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.12} />
          {/* coloured blank label */}
          <circle cx={0} cy={0} r={108} fill={label} />
          <circle cx={0} cy={0} r={108} fill="none" stroke={shade(label, 0.25)} strokeWidth={6} />
          <rect x={-60} y={-22} width={120} height={12} rx={6} fill={C.white} opacity={0.7} />
          <rect x={-40} y={6} width={80} height={10} rx={5} fill={C.white} opacity={0.5} />
          <circle cx={0} cy={0} r={14} fill={C.ink} />
        </g>
        <path d="M -150 -210 Q -90 -260 -20 -270" fill="none" stroke={C.white} strokeWidth={16} strokeLinecap="round" opacity={0.2} />
      </g>
    </g>
  );
}
