import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open parachute canopy, front view: eight striped gores, scalloped skirt, lines down to a small harness bar.
// No person. Origin = bottom of the harness bar; about 700 px wide and 520 px tall at s = 1.
// anim "fly": sways from side to side while drifting down slowly.
const f1 = (v: number) => v.toFixed(1);
const CANOPY = "M -350 -220 C -350 -440 -200 -520 0 -520 C 200 -520 350 -440 350 -220 Q 306 -188 262 -220 Q 218 -188 175 -220 Q 131 -188 87 -220 Q 44 -188 0 -220 Q -44 -188 -87 -220 Q -131 -188 -175 -220 Q -218 -188 -262 -220 Q -306 -188 -350 -220 Z";
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 900;
  const x0 = p.x ?? 540;
  const a = p.color && p.color !== "none" ? p.color : C.red;
  const b = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const fly = anim === "fly";
  const sway = fly ? Math.sin((f * 2 * Math.PI) / 120) * 22 : 0;
  const drop = fly ? f * 0.35 : 0;
  const tilt = fly ? Math.sin((f * 2 * Math.PI) / 120) * 4 : 0;
  const skirt = [-350, -262.5, -175, -87.5, 0, 87.5, 175, 262.5, 350];
  return (
    <g transform={`translate(${f1(x0 + sway)} ${f1((p.y ?? 900) + drop)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(tilt)}) scale(${f1(popScale(anim, f))})`}>
        {/* suspension lines, behind the canopy */}
        {skirt.map((sx, k) => (
          <line key={k} x1={sx} y1={-214} x2={sx * 0.16} y2={-24} stroke={C.inkSoft} strokeWidth={4} strokeLinecap="round" />
        ))}
        <defs>
          <clipPath id="fv-chute-canopy"><path d={CANOPY} /></clipPath>
        </defs>
        {/* canopy with eight gores */}
        <g clipPath="url(#fv-chute-canopy)">
          {Array.from({ length: 8 }, (_, k) => (
            <rect key={k} x={-350 + k * 87.5} y={-560} width={87.5} height={380} fill={k % 2 ? b : a} />
          ))}
          <rect x={120} y={-560} width={240} height={380} fill={C.ink} opacity={0.1} />
        </g>
        {/* harness bar */}
        <rect x={-62} y={-24} width={124} height={24} rx={12} fill={C.greyDark} />
        <rect x={-30} y={-34} width={60} height={10} rx={5} fill={shade(C.greyDark, 0.2)} />
      </g>
    </g>
  );
}
