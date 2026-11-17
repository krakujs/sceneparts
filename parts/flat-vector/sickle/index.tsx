import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const col = (v: unknown, d: string) => (typeof v === "string" && v && v !== "none" ? v : d);

// Harvest sickle standing on its handle end: short wooden handle, steel ferrule and a wide crescent blade curving
// up and over to the right. Origin = ground centre. Hero size: about 460 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = col(p.color, C.grey), wood = col(p.color2, C.brown);
  const anim: string = p.anim ?? "none";
  const sw = anim === "swing" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 36) * 18)} -130 -20)` : motion(anim, f);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={sw}>
        <path d="M-140,-216 C-170,-430 150,-500 196,-270 C150,-410 -70,-390 -100,-216 Z" fill={steel} />
        <path d="M196,-270 C150,-410 -70,-390 -100,-216 L-112,-216 C-86,-404 156,-430 196,-270 Z" fill={C.white} opacity={0.55} />
        <path d="M-140,-216 C-162,-380 30,-450 120,-400" fill="none" stroke={shade(steel, 0.25)} strokeWidth={10} strokeLinecap="round" />
        <rect x={-146} y={-236} width={52} height={36} rx={8} fill={shade(steel, 0.3)} />
        <rect x={-140} y={-206} width={40} height={200} rx={18} fill={wood} />
        <rect x={-116} y={-200} width={12} height={186} rx={6} fill={shade(wood, 0.2)} />
      </g>
    </g>
  );
}
