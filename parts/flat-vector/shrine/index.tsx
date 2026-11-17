import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small roadside shrine: tiled roof on a pillar-and-box, a lantern and a row of flowers. Origin = base on the ground.
// About 360 px wide and 620 px tall at s = 1 (roughly a person-sized street shrine).
// anim "lights": the lantern flame flickers.
const f1 = (v: number) => v.toFixed(1);
const flicker = (anim: string, f: number) => (anim === "lights" ? 0.7 + 0.3 * Math.sin(f / 3) : 1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const flowers = [
    { cx: -110, c: C.pink }, { cx: -70, c: C.yellow }, { cx: 70, c: C.orange }, { cx: 110, c: C.pink },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      {/* base stone */}
      <rect x={-150} y={-40} width={300} height={40} rx={8} fill={C.grey} />
      {/* flower bed */}
      <rect x={-150} y={-62} width={300} height={22} rx={10} fill={C.green} />
      {flowers.map((fl, i) => (
        <g key={i}>
          <line x1={fl.cx} y1={-62} x2={fl.cx} y2={-100} stroke={C.greenDark} strokeWidth={6} />
          <circle cx={fl.cx} cy={-108} r={16} fill={fl.c} />
          <circle cx={fl.cx} cy={-108} r={6} fill={C.white} />
        </g>
      ))}
      {/* body box */}
      <rect x={-120} y={-270} width={240} height={210} rx={10} fill={wall} />
      <rect x={-120} y={-270} width={240} height={14} rx={6} fill={shade(wall, 0.12)} />
      {/* small niche */}
      <path d="M -50 -62 L -50 -170 Q -50 -200 0 -200 Q 50 -200 50 -170 L 50 -62 Z" fill={C.brownDark} />
      <rect x={-34} y={-150} width={68} height={70} rx={6} fill={C.sand} />
      {/* pillars at the front corners */}
      <rect x={-130} y={-290} width={18} height={250} fill={shade(wall, 0.18)} />
      <rect x={112} y={-290} width={18} height={250} fill={shade(wall, 0.18)} />
      {/* tiled roof with eaves */}
      <path d="M -190 -270 L -150 -330 L 150 -330 L 190 -270 Z" fill={roof} />
      <rect x={-190} y={-282} width={380} height={16} rx={6} fill={shade(roof, 0.25)} />
      <rect x={-160} y={-348} width={320} height={22} rx={8} fill={roof} />
      <rect x={-138} y={-362} width={276} height={18} rx={8} fill={shade(roof, 0.15)} />
      {/* lantern hanging under the eave */}
      <line x1={0} y1={-282} x2={0} y2={-310} stroke={C.ink} strokeWidth={4} />
      <rect x={-30} y={-310} width={60} height={20} rx={4} fill={C.greyDark} />
      <path d="M -26 -290 L -26 -250 Q -26 -236 0 -236 Q 26 -236 26 -250 L 26 -290 Z" fill={C.yellow} opacity={flicker(anim, f)} />
      <rect x={-30} y={-290} width={60} height={8} rx={3} fill={C.greyDark} />
      {/* a small offering bowl */}
      <ellipse cx={0} cy={-72} rx={34} ry={8} fill={C.greyDark} />
    </g>
  );
}
