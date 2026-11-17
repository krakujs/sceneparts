import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wallet: folded leather wallet standing up, with a banknote edge and card edges peeking out of the top and a press-stud clasp.
// No currency text. Origin = bottom centre; faces the viewer, honours flip, s and anim. Hero size.
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
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* card edges peeking out of the top */}
        <rect x={-150} y={-268} width={300} height={90} rx={12} fill={C.white} />
        <rect x={-150} y={-268} width={300} height={16} rx={8} fill={C.greyLight} />
        <rect x={-140} y={-288} width={280} height={60} rx={12} fill={C.blue} opacity={0.9} />
        {/* banknote edge, plain green with a darker band */}
        <rect x={-120} y={-236} width={240} height={52} rx={8} fill={C.green} />
        <rect x={-120} y={-216} width={240} height={12} fill={C.greenDark} opacity={0.7} />
        {/* wallet body */}
        <rect x={-190} y={-200} width={380} height={200} rx={36} fill={c} />
        <path d="M 110 -200 H 154 A 36 36 0 0 1 190 -164 V -36 A 36 36 0 0 1 154 0 H 110 Z" fill={dk} />
        {/* flap */}
        <rect x={-190} y={-200} width={300} height={104} rx={36} fill={dk} opacity={0.55} />
        {/* stitching (thin dashed line) */}
        <rect x={-164} y={-176} width={328} height={152} rx={24} fill="none" stroke={shade(c, -0.25)} strokeWidth={5} strokeDasharray="12 10" />
        {/* press-stud clasp */}
        <circle cx={120} cy={-100} r={26} fill={C.yellow} />
        <circle cx={120} cy={-100} r={12} fill={C.yellowDark} />
      </g>
    </g>
  );
}
