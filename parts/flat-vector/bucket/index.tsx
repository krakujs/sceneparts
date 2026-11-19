import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bucket: plastic bucket with a wire handle and water inside. Origin = bottom centre; hero size.
// anim "slosh" moves the water surface side to side inside the rim.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const slosh = p.anim === "slosh" ? Math.sin((f * 2 * Math.PI) / 50) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={10} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wire handle, behind the rim */}
        <path d="M -160 -372 C -160 -560 160 -560 160 -372" fill="none" stroke={C.greyDark} strokeWidth={18} strokeLinecap="round" />
        {/* tapered body with a darker right side */}
        <path d="M -170 -380 L -128 -6 Q 0 6 128 -6 L 170 -380 Z" fill={c} />
        <path d="M 70 -380 L 170 -380 L 128 -6 Q 100 -2 70 -6 Z" fill={shade(c, 0.2)} />
        {/* rim, dark interior and water */}
        <ellipse cx={0} cy={-380} rx={170} ry={30} fill={shade(c, 0.1)} />
        <ellipse cx={0} cy={-380} rx={152} ry={24} fill={shade(c, 0.35)} />
        <ellipse cx={slosh} cy={-372} rx={146} ry={20} fill={C.skyDeep} />
        <ellipse cx={slosh - 40} cy={-376} rx={34} ry={4} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}
