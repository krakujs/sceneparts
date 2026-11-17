import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slim video doorbell mounted on a wall: a tall rounded body, a round lens at the top and a button ring below.
// It is wall mounted: x,y is the bottom centre of the doorbell (its base plate sits on y), no ground shadow.
// anim "glow": the button ring glows softly.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1260;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const glow = anim === "glow" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-110} y={-14} width={220} height={14} rx={6} fill={shade(body, 0.3)} />
        <rect x={-100} y={-460} width={200} height={448} rx={60} fill={body} />
        <rect x={-80} y={-440} width={16} height={300} rx={8} fill={C.white} opacity={0.18} />
        <circle cx={0} cy={-360} r={58} fill={shade(body, 0.35)} />
        <circle cx={0} cy={-360} r={44} fill={C.ink} />
        <circle cx={0} cy={-360} r={30} fill={C.navy} />
        <circle cx={-10} cy={-370} r={8} fill={C.white} opacity={0.5} />
        <rect x={-22} y={-292} width={44} height={6} rx={3} fill={shade(body, 0.4)} />
        <circle cx={0} cy={-190} r={glow > 0 ? 60 : 0} fill={C.yellow} opacity={f1(0.15 + 0.35 * glow)} />
        <circle cx={0} cy={-190} r={48} fill={shade(body, 0.2)} />
        <circle cx={0} cy={-190} r={36} fill={C.greyLight} />
        <circle cx={0} cy={-190} r={12} fill={glow > 0 ? C.yellow : C.grey} />
        <circle cx={0} cy={-100} r={5} fill={C.greyLight} />
      </g>
    </g>
  );
}
