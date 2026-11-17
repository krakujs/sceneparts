import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Electric car charging post: a tall pedestal with a screen showing a bolt, a status bar, a card reader and a
// cable with a plug hanging from a side holder. Room scale (about 880 px tall). Origin = bottom centre on the ground.
// anim "charge": the bolt pulses and the status bar fills again and again.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 0.8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const charging = anim === "charge";
  const prog = charging ? (f % 90) / 90 : 0.7;
  const boltOp = charging ? 0.6 + 0.4 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 30)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-200} y={-16} width={400} height={16} rx={6} fill={C.greyDark} />
        <rect x={-150} y={-120} width={300} height={104} rx={16} fill={shade(body, 0.2)} />
        <path d="M 150 -420 C 270 -420 250 -250 232 -196" fill="none" stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" />
        <rect x={146} y={-460} width={26} height={80} rx={8} fill={C.greyDark} />
        <rect x={-150} y={-880} width={300} height={760} rx={40} fill={body} />
        <rect x={-130} y={-860} width={16} height={300} rx={8} fill={C.white} opacity={0.25} />
        <rect x={-110} y={-800} width={220} height={170} rx={18} fill={C.ink} />
        <polygon points="18,-780 -38,-704 -2,-704 -20,-652 38,-728 2,-728" fill={C.yellow} opacity={f1(boltOp)} />
        <rect x={-90} y={-606} width={180} height={16} rx={8} fill={C.greyDark} />
        <rect x={-90} y={-606} width={f1(180 * prog)} height={16} rx={8} fill={C.green} />
        <rect x={-40} y={-440} width={80} height={36} rx={10} fill={C.greyDark} />
        <circle cx={0} cy={-422} r={6} fill={C.green} />
        <rect x={204} y={-210} width={56} height={70} rx={14} fill={C.inkSoft} />
        <rect x={214} y={-142} width={36} height={32} rx={6} fill={C.greyDark} />
        <rect x={222} y={-130} width={8} height={12} rx={2} fill={C.ink} />
        <rect x={238} y={-130} width={8} height={12} rx={2} fill={C.ink} />
      </g>
    </g>
  );
}
