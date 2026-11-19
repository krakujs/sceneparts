import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector dosa: a long crispy golden rolled dosa on a steel plate, with two small chutney bowls.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 460 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Dosa(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const dosaC = p.dosaColor ?? "#E9A94A";
  const chutneyC = p.chutneyColor ?? "#E0C27A";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // rolled dosa lies on the plate surface (plate width 460, surface centre y -74), tapering to the left
  const body = "M -190 -96 Q -40 -150 150 -112 Q 200 -104 190 -86 Q 180 -66 150 -66 Q -40 -40 -190 -70 Q -210 -84 -190 -96 Z";
  const rolls = [-120, -60, 0, 60, 120];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={460} fill="none" rimColor="#E9EEF3" vesselColor="#D5DCE5" />
      <g transform={tr}>
        {/* two small chutney bowls at the back */}
        <Dish x={-150} y={-30} vessel="cup" w={130} fill="liquid" fillColor={chutneyC} fillColor2="#C9A04E" />
        <Dish x={150} y={-30} vessel="cup" w={130} fill="liquid" fillColor="#D96C4A" fillColor2="#B5523A" />
        {/* the dosa, a long cone rolled from the wide end */}
        <path d={body} fill={dosaC} transform="translate(0 -6)" />
        <path d="M -190 -70 Q -40 -40 150 -66 Q 150 -56 150 -46 Q -40 -22 -190 -56 Z" fill={shade(dosaC, 0.22)} transform="translate(0 -6)" />
        {rolls.map((rx, i) => (
          <path key={i} d={`M ${rx} -118 Q ${rx + 16} -96 ${rx - 4} -74`} stroke={shade(dosaC, 0.3)} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7} />
        ))}
        <path d="M -150 -100 Q -60 -122 40 -116" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.3} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Dosa {...p} />;
}
