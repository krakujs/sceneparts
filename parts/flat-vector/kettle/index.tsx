import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kettle: stovetop kettle with an arched handle and side spout, or an electric kettle with a window and a cordless base.
// Origin = resting point (bottom centre); faces the viewer, honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const dk = shade(c, 0.2);
  const handleC = C.brownDark;
  const electric = p.variant === "electric";
  let body: React.ReactNode;
  if (electric) {
    body = (
      <g>
        {/* handle on the back side, drawn behind the body */}
        <path d="M 96 -250 C 150 -250 150 -120 96 -120" fill="none" stroke={dk} strokeWidth={22} strokeLinecap="round" />
        <rect x={-40} y={-40} width={80} height={40} rx={8} fill={dk} />
        <rect x={-100} y={-300} width={200} height={262} rx={36} fill={c} />
        <rect x={62} y={-296} width={34} height={254} rx={17} fill={dk} opacity={0.35} />
        {/* beak spout on the left */}
        <path d="M -96 -206 L -168 -252 Q -180 -242 -170 -230 L -96 -172 Z" fill={c} />
        {/* lid */}
        <rect x={-90} y={-314} width={180} height={22} rx={10} fill={dk} />
        {/* water level window and power light */}
        <rect x={-58} y={-232} width={14} height={120} rx={6} fill="#FFFFFF" opacity={0.4} />
        <circle cx={18} cy={-150} r={9} fill={C.yellow} />
        {/* cordless base */}
        <rect x={-92} y={-40} width={184} height={40} rx={16} fill={dk} />
      </g>
    );
  } else {
    body = (
      <g>
        {/* arched handle, behind the lid */}
        <path d="M -96 -150 Q 0 -340 96 -150" fill="none" stroke={handleC} strokeWidth={20} strokeLinecap="round" />
        {/* spout on the right */}
        <path d="M 120 -110 Q 190 -120 204 -196" fill="none" stroke={c} strokeWidth={26} strokeLinecap="round" />
        <ellipse cx={204} cy={-196} rx={10} ry={6} fill={dk} transform="rotate(-60 204 -196)" />
        {/* domed body */}
        <path d="M -112 -20 C -150 -90 -140 -196 0 -200 C 140 -196 150 -90 112 -20 Z" fill={c} />
        <path d="M 70 -196 C 120 -180 138 -120 126 -70 C 118 -46 106 -30 98 -20 C 132 -60 140 -120 120 -160 C 110 -180 92 -192 70 -196 Z" fill={dk} />
        {/* lid */}
        <path d="M -66 -190 C -60 -226 60 -226 66 -190 Z" fill={shade(c, 0.1)} />
        <ellipse cx={0} cy={-190} rx={66} ry={10} fill={dk} />
        <circle cx={0} cy={-222} r={13} fill={handleC} />
        {/* foot */}
        <rect x={-96} y={-18} width={192} height={18} rx={8} fill={dk} />
      </g>
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={electric ? 120 : 130} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>{body}</g>
    </g>
  );
}
