import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small wooden rowboat, side view facing right. Origin = waterline centre. Room scale: about 560 px wide.
// anim "drive": the boat rocks and both oars row in and out of the water.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 1.8)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 60} y={8} width={70} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 130} y={18} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const rowing = anim === "drive";
  // Oar: pivots at its oarlock on the gunwale; the blade dips into the water.
  const oar = (x0: number, phase: number) => {
    const a = 17 + (rowing ? Math.sin((f * 2 * Math.PI) / 60 + phase) * 4 : 0);
    return (
      <g transform={`translate(${x0} -92) rotate(${f1(a)})`}>
        <rect x={0} y={-6} width={300} height={12} rx={6} fill={trim} />
        <rect x={270} y={-15} width={58} height={30} rx={13} fill={shade(trim, 0.15)} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* hull: wooden planks, gunwale and thwarts */}
        <path d="M -270 -84 L 270 -84 L 206 14 L -206 14 Z" fill={wood} />
        <rect x={-250} y={-62} width={500} height={6} fill={shade(wood, 0.2)} />
        <rect x={-236} y={-40} width={470} height={6} fill={shade(wood, 0.2)} />
        <rect x={-280} y={-100} width={560} height={18} rx={9} fill={shade(wood, 0.25)} />
        <rect x={-130} y={-84} width={44} height={14} fill={trim} />
        <rect x={70} y={-84} width={44} height={14} fill={trim} />
        {oar(-40, 0)}
        {oar(0, 1.2)}
      </g>
      <Water w={600} />
    </g>
  );
}
