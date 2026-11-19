import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Industrial pipe run: a horizontal pipe with a rounded elbow turning up into a vertical pipe, bolted flanges and a floor support.
// Origin = bottom centre of the footprint (the floor line). Room scale: at s = 1 about 400 px wide and 680 px tall. Use s about 0.5 for a plant-room scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Bolt = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r={9} fill={C.ink} />
    <circle cx={x - 3} cy={y - 3} r={3} fill={C.white} opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const flange = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* support leg and foot */}
        <rect x={-140} y={-250} width={40} height={230} fill={flange} />
        <rect x={-170} y={-20} width={100} height={20} rx={6} fill={flange} />
        {/* pipe: horizontal run, quarter-round elbow, vertical run */}
        <path d="M-210,-300 H30 A120,120 0 0 0 150,-420 V-640" fill="none" stroke={body} strokeWidth={80} />
        <path d="M-200,-318 H20" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.25} />
        {/* flanges with bolts */}
        <rect x={-202} y={-350} width={24} height={100} rx={6} fill={flange} />
        <Bolt x={-190} y={-335} /><Bolt x={-190} y={-265} />
        <rect x={-52} y={-352} width={24} height={104} rx={6} fill={flange} />
        <Bolt x={-40} y={-335} /><Bolt x={-40} y={-265} />
        <rect x={100} y={-555} width={100} height={30} rx={6} fill={flange} />
        <Bolt x={125} y={-540} /><Bolt x={175} y={-540} />
        <rect x={100} y={-678} width={100} height={36} rx={6} fill={flange} />
        <Bolt x={125} y={-660} /><Bolt x={175} y={-660} />
        <rect x={100} y={-690} width={100} height={12} rx={6} fill={shade(flange, 0.2)} />
      </g>
    </g>
  );
}
