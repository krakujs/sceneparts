import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic game console: a plain box console with a controller beside it. Original shapes, not any real console.
// Origin = bottom centre of the console. anim "glow": the status light on the front pulses.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1580;
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const anim: string = p.anim ?? "none";
  const glowing = anim === "glow";
  const lightOn = glowing ? (Math.sin((f * 2 * Math.PI) / 40) > -0.3 ? C.green : C.greenDark) : C.green;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={320} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "glow" ? "none" : anim, f)}>
        {/* console box */}
        <rect x={-260} y={-300} width={380} height={300} rx={28} fill={body} />
        <rect x={-260} y={-40} width={380} height={40} rx={16} fill={shade(body, 0.3)} />
        <path d="M -220 -270 Q -120 -290 40 -272" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.25} />
        {/* disc slot and front panel */}
        <rect x={-200} y={-200} width={240} height={14} rx={7} fill={C.ink} />
        <rect x={-200} y={-160} width={90} height={60} rx={10} fill={shade(body, 0.3)} />
        <circle cx={-80} cy={-130} r={9} fill={lightOn} />
        <rect x={-50} y={-146} width={60} height={32} rx={10} fill={C.greyDark} />
        {/* vents on the top-right */}
        {[0, 1, 2, 3].map((i) => <rect key={i} x={40} y={-230 + i * 22} width={100} height={9} rx={4} fill={shade(body, 0.3)} />)}
        {/* controller lying beside the console */}
        <path d="M 150 -60 Q 150 -120 210 -120 L 330 -120 Q 380 -120 380 -60 Q 380 -10 340 -10 Q 310 -10 300 -40 L 230 -40 Q 220 -10 190 -10 Q 150 -10 150 -60 Z" fill={C.greyDark} />
        <rect x={180} y={-108} width={60} height={18} rx={8} fill={C.ink} />
        <rect x={198} y={-120} width={18} height={44} rx={8} fill={C.ink} />
        <circle cx={316} cy={-92} r={11} fill={C.red} />
        <circle cx={342} cy={-72} r={11} fill={C.yellow} />
      </g>
    </g>
  );
}
