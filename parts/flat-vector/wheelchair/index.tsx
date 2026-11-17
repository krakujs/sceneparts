import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Empty manual wheelchair, side view, facing right: a big rear wheel with a push rim, a small front castor,
// seat, backrest, armrest, footrest and frame. Hero prop, about 450 px wide at s = 1. Origin = floor centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const frame = p.color && p.color !== "none" ? p.color : C.blue;
  const tyre = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const RW = 170, rwx = -110, rwy = -RW; // big rear wheel: centre and radius
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* big rear wheel: tyre, rim, spokes, push rim */}
          <circle cx={rwx} cy={rwy} r={RW} fill={tyre} />
          <circle cx={rwx} cy={rwy} r={RW - 22} fill={C.greyLight} />
          <g transform={`rotate(${f1(spin)} ${rwx} ${rwy})`}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <line key={k} x1={rwx} y1={rwy} x2={rwx} y2={rwy - RW + 30} stroke={C.greyDark} strokeWidth={5}
                transform={`rotate(${k * 60} ${rwx} ${rwy})`} />
            ))}
          </g>
          <circle cx={rwx} cy={rwy} r={18} fill={C.greyDark} />
          <circle cx={rwx} cy={rwy} r={RW - 40} fill="none" stroke={C.greyDark} strokeWidth={10} />
          {/* frame: seat rail, backrest post, armrest, front down-tube */}
          <path d={`M ${rwx} ${rwy + 40} L 60 -240 L 180 -240`} fill="none" stroke={frame} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M -200 -270 L -210 -470" stroke={frame} strokeWidth={18} strokeLinecap="round" fill="none" />
          <path d="M -210 -470 L -150 -470" stroke={frame} strokeWidth={16} strokeLinecap="round" fill="none" />
          <path d="M 60 -240 L 130 -60 L 150 -40" stroke={frame} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* seat and backrest */}
          <rect x={-200} y={-270} width={250} height={34} rx={12} fill={C.ink} />
          <rect x={-224} y={-480} width={30} height={230} rx={12} fill={shade(frame, 0.2)} />
          {/* armrest */}
          <rect x={-170} y={-380} width={170} height={18} rx={9} fill={frame} />
          <rect x={-170} y={-380} width={18} height={100} rx={8} fill={shade(frame, 0.2)} />
          {/* footrest */}
          <rect x={140} y={-120} width={150} height={16} rx={8} fill={C.greyDark} />
          <rect x={250} y={-130} width={22} height={100} rx={8} fill={C.greyDark} />
          {/* small front castor */}
          <circle cx={170} cy={-40} r={40} fill={C.ink} />
          <circle cx={170} cy={-40} r={20} fill={C.greyLight} />
          <circle cx={170} cy={-40} r={7} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}
