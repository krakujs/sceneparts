import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hand saw lying on the floor: wooden handle at the top left, steel blade with a row of teeth along the bottom.
// Origin = floor centre. Hero size: about 480 px long at s = 1. anim "saw": the blade slides back and forth.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const handle = p.color && p.color !== "none" ? p.color : C.brown;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const sawX = anim === "saw" ? f1(Math.sin((f * 2 * Math.PI) / 40) * 22) : "0";
  const teeth = Array.from({ length: 13 }, (_, i) => -90 + i * 24);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "saw" ? "none" : anim, f)}>
        <g transform={`translate(${sawX} 0)`}>
          <rect x={-230} y={-172} width={150} height={92} rx={36} fill={handle} />
          <rect x={-200} y={-148} width={60} height={28} rx={14} fill={shade(handle, 0.45)} />
          <rect x={-96} y={-84} width={346} height={50} rx={6} fill={steel} />
          <rect x={-96} y={-84} width={346} height={10} rx={5} fill={C.white} opacity={0.3} />
          {teeth.map((tx) => (
            <polygon key={tx} points={`${tx},-34 ${tx + 12},-8 ${tx + 24},-34`} fill={steel} />
          ))}
          <circle cx={-55} cy={-60} r={7} fill={shade(steel, 0.35)} />
        </g>
      </g>
    </g>
  );
}
