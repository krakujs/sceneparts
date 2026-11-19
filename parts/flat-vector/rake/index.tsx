import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Garden rake standing upright on its tines, long wooden handle rising to the top. Origin = floor under the tines.
// Hero scale: about 500 px tall and 360 px wide at s = 1; use about 0.25 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const TINES = [-150, -100, -50, 0, 50, 100, 150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.greyDark;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={180} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-17} y={-500} width={34} height={430} rx={17} fill={wood} />
        <rect x={-22} y={-500} width={44} height={36} rx={12} fill={shade(wood, 0.2)} />
        {TINES.map((tx) => (
          <rect key={tx} x={tx - 8} y={-50} width={16} height={50} rx={7} fill={metal} />
        ))}
        <rect x={-180} y={-80} width={360} height={36} rx={12} fill={metal} />
        <rect x={-180} y={-80} width={360} height={10} rx={5} fill={C.white} opacity={0.2} />
        <rect x={-28} y={-96} width={56} height={30} rx={8} fill={shade(metal, 0.25)} />
      </g>
    </g>
  );
}
