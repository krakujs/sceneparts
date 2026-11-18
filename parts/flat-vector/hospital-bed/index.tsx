import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hospital bed, side view, about 900 px long at s = 1. The head section (the raised back) hinges at
// the middle of the mattress; side rails, pillow, blanket and wheels. Origin = bottom centre (wheels on y).
// anim "raise": the back rises from flat to raised and back again over 180 frames.
const f1 = (v: number) => v.toFixed(1);
const K = 0.78; // fits the whole bed inside the frame at s = 1
const HINGE_X = -40, HINGE_Y = -190; // hinge at the top of the bed frame, under the mattress

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : "#DDE2EA";
  const blanket = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const frameDk = shade(frame, 0.22);
  const metal = shade(frame, 0.4);
  const mattress = "#E6ECF4";
  const anim: string = p.anim ?? "none";
  // back angle in degrees: raised 30 by default; "raise" loops from flat up to 35 and back
  const back = anim === "raise" ? 17.5 * (1 - Math.cos((f * 2 * Math.PI) / 180)) : 30;
  const headRail = -156; // rail height in the head section's own coordinates
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(p.flip ? -s * K : s * K)} ${f1(s * K)})`}>
      <ellipse cx={0} cy={0} rx={460} ry={18} fill={C.shadow} />
      {/* wheels with hubs */}
      {[-300, 300].map((wx) => (
        <g key={wx}>
          <rect x={wx - 20} y={-112} width={40} height={50} fill={frameDk} />
          <circle cx={wx} cy={-36} r={36} fill={C.ink} />
          <circle cx={wx} cy={-36} r={13} fill={metal} />
        </g>
      ))}
      {/* base frame */}
      <rect x={-420} y={-190} width={840} height={80} rx={22} fill={frame} />
      <rect x={-420} y={-124} width={840} height={14} rx={7} fill={frameDk} />
      {/* foot board */}
      <rect x={404} y={-250} width={18} height={62} rx={8} fill={frame} />
      {/* head end panel */}
      <rect x={-440} y={-500} width={28} height={312} rx={12} fill={frame} />
      <rect x={-440} y={-500} width={28} height={36} rx={12} fill={frameDk} />

      {/* foot section of the mattress: fixed */}
      <rect x={-40} y={-300} width={440} height={110} rx={30} fill={mattress} />
      <rect x={-40} y={-300} width={440} height={16} rx={8} fill={C.white} opacity={0.7} />
      {/* blanket over the lower body */}
      <rect x={-10} y={-318} width={420} height={120} rx={26} fill={blanket} />
      <rect x={-10} y={-318} width={420} height={22} rx={11} fill={shade(blanket, 0.18)} />
      {/* foot-side rail */}
      <rect x={-30} y={-346} width={426} height={14} rx={7} fill={metal} />
      <rect x={-30} y={-346} width={12} height={50} rx={5} fill={metal} />
      <rect x={384} y={-346} width={12} height={50} rx={5} fill={metal} />

      {/* head section: the raised back, hinged at the middle */}
      <g transform={`translate(${HINGE_X} ${HINGE_Y}) rotate(${f1(back)})`}>
        <rect x={-360} y={-30} width={360} height={30} rx={8} fill={frameDk} />
        <rect x={-360} y={-110} width={360} height={110} rx={30} fill={mattress} />
        <rect x={-360} y={-110} width={360} height={16} rx={8} fill={C.white} opacity={0.7} />
        {/* head-side rail */}
        <rect x={-352} y={headRail} width={318} height={14} rx={7} fill={metal} />
        <rect x={-352} y={headRail} width={12} height={46} rx={5} fill={metal} />
        <rect x={-46} y={headRail} width={12} height={46} rx={5} fill={metal} />
        {/* pillow */}
        <rect x={-330} y={-196} width={170} height={86} rx={40} fill={C.white} />
        <rect x={-330} y={-130} width={170} height={20} rx={10} fill={shade(C.white, 0.1)} />
      </g>
    </g>
  );
}
