import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bent pry bar (crowbar) lying on the floor: flat wedge tip on the left, long bar, claw bent up on the right.
// Origin = floor centre. Hero size: about 460 px long at s = 1.
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
  const steel = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-6} cy={0} rx={235} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M-200,-17 L120,-17 Q170,-17 185,-65 L210,-150" fill="none" stroke={steel} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="-236,-17 -200,-34 -200,0" fill={steel} />
        <path d="M-200,-27 L120,-27 Q160,-27 174,-66" fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.25} />
      </g>
    </g>
  );
}
