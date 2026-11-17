import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slim closed kayak, side view facing right. Origin = waterline centre. Room scale: about 840 px wide.
// The cockpit is a dark hole on the deck. A double-bladed paddle swings across it in anim "drive".
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 1.5)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 90} y={8} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 180} y={18} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.teal;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const swing = anim === "drive" ? Math.sin((f * 2 * Math.PI) / 60) * 18 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* closed hull with a darker lower shade and a cockpit hole */}
        <path d="M -420 -66 Q 0 -30 420 -66 Q 300 12 0 12 Q -300 12 -420 -66 Z" fill={hull} />
        <path d="M -400 -56 Q 0 -22 400 -56 Q 280 -2 0 4 Q -280 -2 -400 -56 Z" fill={shade(hull, 0.2)} />
        <ellipse cx={10} cy={-52} rx={112} ry={18} fill={C.ink} />
        <ellipse cx={10} cy={-48} rx={98} ry={12} fill={shade(hull, 0.45)} />
        {/* double-bladed paddle: pivot above the cockpit, one blade dipping in the water */}
        <g transform={`translate(10 -160) rotate(${f1(44 + swing)})`}>
          <rect x={-240} y={-5} width={480} height={10} rx={5} fill={wood} />
          <rect x={-272} y={-22} width={62} height={44} rx={20} fill={shade(wood, 0.1)} />
          <rect x={210} y={-22} width={62} height={44} rx={20} fill={shade(wood, 0.1)} />
        </g>
      </g>
      <Water w={860} />
    </g>
  );
}
