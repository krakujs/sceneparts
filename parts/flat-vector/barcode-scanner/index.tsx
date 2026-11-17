import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld pistol-grip barcode scanner. Origin = bottom of the grip (it stands on y); head and beam face right.
// anim "beam": the red laser flickers as if scanning.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const laser = p.laser && p.laser !== "none" ? p.laser : C.red;
  const anim: string = p.anim ?? "none";
  const beaming = anim === "beam";
  const flick = beaming ? 0.5 + 0.5 * Math.abs(Math.sin(f * 1.9) * Math.cos(f * 0.61 + 0.7)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {beaming && <circle cx={160} cy={-226} r={30} fill={laser} opacity={0.3 * flick} />}
        <polygon points="184,-232 430,-262 430,-190 184,-220" fill={laser} opacity={0.45 * flick} />
        <line x1={184} y1={-226} x2={430} y2={-226} stroke={laser} strokeWidth={3} opacity={flick} />
        <path d="M -62 -190 L 36 -190 L 8 -28 Q 4 0 -22 0 L -60 0 Q -84 0 -80 -28 Z" fill={shade(body, 0.12)} />
        <rect x={-62} y={-170} width={12} height={120} rx={6} fill={C.white} opacity={0.22} />
        <rect x={4} y={-184} width={22} height={46} rx={11} fill={shade(body, 0.3)} />
        <rect x={-90} y={-290} width={270} height={110} rx={46} fill={body} />
        <rect x={-74} y={-282} width={230} height={18} rx={9} fill={C.white} opacity={0.25} />
        <rect x={140} y={-262} width={40} height={66} rx={10} fill={C.ink} />
        <rect x={150} y={-254} width={22} height={50} rx={6} fill={C.inkSoft} />
        <circle cx={170} cy={-226} r={9} fill={laser} />
      </g>
    </g>
  );
}
