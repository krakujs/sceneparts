import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ship-to-shore container gantry crane, side view facing right. Origin = floor centre on the rails.
// About 970 px wide and 680 px tall at s = 1. Two A-frame legs on rails form a portal you could drive under,
// a long boom reaches out over the water, a machinery house sits on top and a trolley runs under the boom.
// anim "drive": the trolley runs along the boom and the spreader lowers and raises a container.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => (anim === "pop"
  ? (() => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; })()
  : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const boom = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const drive = anim === "drive";
  const tx = drive ? 290 + Math.sin((f * 2 * Math.PI) / 240) * 240 : 290;
  const lower = drive ? 60 - 60 * Math.cos((f * 2 * Math.PI) / 240) : 0;
  const cTop = -250 + lower;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* rails on the ground */}
        <rect x={-360} y={-10} width={800} height={10} rx={4} fill={C.ink} />
        {/* A-frame legs with a cross brace and bogies */}
        <path d="M -330 -10 L -280 -10 L -200 -570 L -230 -570 Z" fill={frame} />
        <path d="M 40 -10 L 90 -10 L 70 -570 L 40 -570 Z" fill={frame} />
        <line x1={-290} y1={-200} x2={50} y2={-200} stroke={shade(frame, 0.3)} strokeWidth={10} />
        <line x1={-260} y1={-420} x2={60} y2={-420} stroke={shade(frame, 0.3)} strokeWidth={10} />
        <rect x={-345} y={-20} width={40} height={10} rx={4} fill={C.ink} />
        <rect x={30} y={-20} width={70} height={10} rx={4} fill={C.ink} />
        {/* boom reaching out over the water, with a dark stripe */}
        <rect x={-240} y={-602} width={880} height={32} rx={6} fill={boom} />
        <rect x={-240} y={-588} width={880} height={5} fill={shade(boom, 0.2)} />
        {/* machinery house on top */}
        <rect x={-200} y={-680} width={180} height={80} rx={8} fill={boom} />
        <rect x={-186} y={-664} width={90} height={36} rx={5} fill={C.sky} />
        <rect x={-200} y={-690} width={180} height={12} rx={6} fill={frame} />
        {/* trolley on the boom, cables and the spreader holding a container */}
        <g transform={`translate(${f1(tx)} 0)`}>
          <rect x={-34} y={-566} width={68} height={24} rx={5} fill={frame} />
          <rect x={-30} y={-542} width={5} height={cTop - 12 + 542} fill={C.greyDark} />
          <rect x={25} y={-542} width={5} height={cTop - 12 + 542} fill={C.greyDark} />
          <rect x={-70} y={cTop - 12} width={140} height={12} rx={4} fill={C.greyDark} />
          <rect x={-80} y={cTop} width={160} height={92} rx={4} fill={C.teal} />
          {[-50, -16, 18, 52].map((rx) => (
            <rect key={rx} x={rx - 3} y={cTop} width={6} height={92} fill={shade(C.teal, 0.2)} />
          ))}
        </g>
      </g>
    </g>
  );
}
