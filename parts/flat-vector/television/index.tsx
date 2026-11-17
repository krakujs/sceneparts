import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Television: flat-screen TV on a small foot stand. Origin = centre of the foot on the floor.
// anim "glow" lets the screen flicker softly and throws a faint halo.
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
  const bez = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const glowing = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const flick = 0.5 + 0.5 * Math.sin(f * 1.7) * Math.sin(f * 0.53 + 1);
  const sheen = glowing ? 0.03 + 0.09 * flick * (0.6 + 0.4 * breathe) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {glowing && <rect x={-336} y={-506} width={672} height={446} rx={60} fill={scr} opacity={0.12 + 0.18 * breathe} />}
        <path d="M -36 -100 L -26 -30 L 26 -30 L 36 -100 Z" fill={shade(bez, 0.1)} />
        <rect x={-130} y={-30} width={260} height={30} rx={14} fill={shade(bez, 0.25)} />
        <rect x={-300} y={-470} width={600} height={380} rx={26} fill={bez} />
        <rect x={-272} y={-440} width={544} height={300} rx={14} fill={scr} />
        <path d="M -272 -140 Q -120 -262 40 -200 Q 150 -160 272 -226 L 272 -140 Z" fill={C.white} opacity={0.28} />
        <circle cx={150} cy={-362} r={38} fill={C.white} opacity={0.3} />
        <path d="M -190 -440 L -150 -440 L -262 -160 L -272 -190 Z" fill={C.white} opacity={0.16} />
        {glowing && <rect x={-272} y={-440} width={544} height={300} rx={14} fill={C.white} opacity={sheen} />}
        <circle cx={246} cy={-115} r={7} fill={C.green} />
      </g>
    </g>
  );
}
