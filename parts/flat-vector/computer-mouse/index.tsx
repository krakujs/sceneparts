import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Computer mouse seen from above and a little in front, on the desk. Origin = bottom centre (y is the desk line).
// Hero scale: at s = 1 about 320 px wide and 480 px tall. Use s about 0.25–0.35 next to a person.
// The two buttons sit at the top (front of the mouse); the cable leaves at the bottom. wired = false hides the cable.
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
  const body = p.color && p.color !== "none" ? p.color : C.grey;
  const btn = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const wired = p.wired !== false;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={230} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {wired && <path d="M0,-6 C70,30 -60,70 40,130" fill="none" stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" />}
        <rect x={-160} y={-480} width={320} height={480} rx={160} fill={body} />
        <path d="M-160,-250 L-160,-320 A160,160 0 0 1 160,-320 L160,-250 Z" fill={btn} />
        <rect x={-160} y={-256} width={320} height={12} fill={shade(body, 0.2)} />
        <rect x={-4} y={-478} width={8} height={226} rx={4} fill={shade(btn, 0.3)} />
        <rect x={-26} y={-430} width={52} height={96} rx={26} fill={shade(btn, 0.35)} />
        <ellipse cx={-92} cy={-300} rx={16} ry={70} fill={C.white} opacity={0.35} />
      </g>
    </g>
  );
}
