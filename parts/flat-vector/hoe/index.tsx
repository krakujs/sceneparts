import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long-handled garden hoe standing upright, flat blade at the foot angled forward. Origin = floor under the blade.
// Hero scale: about 500 px tall and 200 px wide at s = 1; use about 0.25 next to a person.
// anim "chop": the blade rocks up and down around its heel, as if hoeing.
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
  const chop = anim === "chop" ? -(0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 45)) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={40} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={anim === "chop" ? `rotate(${f1(chop)} 0 -26)` : motion(anim, f)}>
        <rect x={-17} y={-500} width={34} height={470} rx={17} fill={wood} />
        <rect x={-22} y={-500} width={44} height={34} rx={11} fill={shade(wood, 0.2)} />
        <path d="M -22 -50 L 150 -50 L 184 -14 Q 190 0 176 0 L -22 0 Z" fill={metal} />
        <path d="M -22 -14 L 176 -14 Q 190 0 176 0 L -22 0 Z" fill={shade(metal, 0.25)} />
        <rect x={-26} y={-62} width={52} height={26} rx={8} fill={shade(metal, 0.2)} />
        <rect x={0} y={-42} width={130} height={8} rx={4} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
