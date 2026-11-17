import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Warehouse forklift facing right: counterweight, overhead guard, mast, carriage and forks, optional pallet with boxes.
// Room scale: about 900 px tall and 720 px wide at s = 1. Origin = floor centre under the chassis.
// anim "lift": the carriage, forks, pallet and boxes rise and fall on the mast.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lift = anim === "lift" ? (120 * (1 - Math.cos((f * 2 * Math.PI) / 120))) / 2 : 0;
  const wheel = (cx: number, cy: number, r: number) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.ink} />
      <circle cx={cx} cy={cy} r={r * 0.5} fill={C.greyLight} />
      <circle cx={cx} cy={cy} r={r * 0.22} fill={frame} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* counterweight at the back */}
        <rect x={-380} y={-340} width={130} height={200} rx={22} fill={frame} />
        {/* chassis and seat */}
        <rect x={-270} y={-300} width={330} height={180} rx={24} fill={body} />
        <rect x={-200} y={-430} width={80} height={130} rx={16} fill={frame} />
        {/* overhead guard */}
        <rect x={-272} y={-610} width={20} height={320} rx={6} fill={frame} />
        <rect x={-150} y={-610} width={20} height={320} rx={6} fill={frame} />
        <rect x={-292} y={-640} width={180} height={34} rx={10} fill={frame} />
        {/* mast */}
        <rect x={70} y={-920} width={22} height={770} rx={6} fill={frame} />
        <rect x={124} y={-920} width={22} height={770} rx={6} fill={frame} />
        <rect x={62} y={-930} width={96} height={24} rx={8} fill={frame} />
        <rect x={100} y={-560} width={20} height={20} fill={shade(frame, 0.2)} />
        {/* wheels */}
        {wheel(-200, -70, 70)}
        {wheel(60, -60, 60)}
        {/* carriage, forks and load */}
        <g transform={`translate(0 ${f1(-lift)})`}>
          <rect x={66} y={-520} width={84} height={260} rx={8} fill={shade(frame, 0.1)} />
          <rect x={146} y={-372} width={200} height={20} rx={6} fill={frame} />
          <rect x={146} y={-352} width={200} height={14} rx={5} fill={shade(frame, 0.25)} />
          {p.pallet !== false && (
            <g>
              <rect x={196} y={-500} width={150} height={100} rx={6} fill={C.sand} />
              <rect x={216} y={-500} width={8} height={100} fill={shade(C.sand, 0.2)} />
              <rect x={286} y={-500} width={8} height={100} fill={shade(C.sand, 0.2)} />
              <rect x={206} y={-408} width={130} height={8} fill={C.brown} opacity={0.6} />
              <rect x={200} y={-402} width={142} height={16} rx={5} fill={C.brown} />
              <rect x={200} y={-386} width={40} height={14} fill={shade(C.brown, 0.2)} />
              <rect x={252} y={-386} width={40} height={14} fill={shade(C.brown, 0.2)} />
              <rect x={304} y={-386} width={38} height={14} fill={shade(C.brown, 0.2)} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}
