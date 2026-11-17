import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pickaxe standing upright on its handle end, double-pointed head at the top. Origin = floor under the handle.
// Hero scale: about 480 px tall and 460 px wide at s = 1; use about 0.25 next to a person.
// anim "swing": the head rocks side to side around the socket, as if about to strike.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const swing = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 50) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={anim === "swing" ? `rotate(${f1(swing)} 0 -440)` : motion(anim, f)}>
        <rect x={-18} y={-460} width={36} height={460} rx={18} fill={wood} />
        <rect x={-24} y={-150} width={48} height={44} rx={10} fill={shade(wood, 0.2)} />
        <path d="M -230 -418 Q 0 -540 230 -418 L 206 -392 Q 0 -488 -206 -392 Z" fill={metal} />
        <path d="M -190 -408 Q 0 -500 190 -408" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.35} />
        <rect x={-34} y={-476} width={68} height={40} rx={12} fill={shade(metal, 0.25)} />
      </g>
    </g>
  );
}
