import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Broom: upright broom with a long wooden handle, a collar and a straw head. Origin = floor point under the bristles.
// anim "sweep" tilts the whole broom back and forth from that floor point, as if sweeping.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "sweep") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 48) * 9)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const body = (
    <g>
      {/* long handle with a rounded top knob */}
      <rect x={-15} y={-880} width={30} height={580} rx={15} fill={C.brown} />
      <rect x={4} y={-872} width={11} height={564} rx={5} fill={shade(C.brown, 0.2)} />
      <circle cx={0} cy={-884} r={23} fill={C.brown} />
      {/* straw head: tapered, darker on the right, with a few strands */}
      <path d="M -48 -330 L 48 -330 L 132 -20 Q 0 20 -132 -20 Z" fill={c} />
      <path d="M 22 -330 L 48 -330 L 132 -20 Q 72 2 22 -6 Z" fill={shade(c, 0.2)} />
      {[-30, -10, 10, 30].map((xt) => (
        <path key={xt} d={`M ${xt} -322 L ${xt * 2.6} -30`} stroke={shade(c, 0.25)} strokeWidth={5} strokeLinecap="round" fill="none" />
      ))}
      {/* metal-looking collar that binds the bristles to the handle */}
      <rect x={-46} y={-372} width={92} height={62} rx={16} fill={C.greyDark} />
      <rect x={20} y={-372} width={26} height={62} rx={12} fill={C.ink} opacity={0.2} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>{body}</g>
    </g>
  );
}
