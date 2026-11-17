import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toilet, 3/4 front view with the cistern at the back and the seat lid standing up behind it. About 430 px tall to the cistern top and 240 px to the seat at s = 1.
// Origin = bottom centre (the base plate rests on y). anim "flush" makes the water swirl.
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
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const swirl = p.anim === "flush" ? 1 + 0.05 * Math.sin((f * 2 * Math.PI) / 30) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(0.66)`}>
      <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* seat lid standing up behind the cistern */}
        <rect x={-200} y={-660} width={400} height={290} rx={100} fill={shade(c, 0.08)} />
        {/* cistern */}
        <rect x={-180} y={-610} width={360} height={220} rx={30} fill={c} />
        <rect x={130} y={-606} width={46} height={212} rx={20} fill={shade(c, 0.2)} />
        <rect x={-190} y={-634} width={380} height={30} rx={14} fill={shade(c, 0.1)} />
        <rect x={96} y={-652} width={56} height={20} rx={10} fill={C.greyDark} />
        {/* bowl: wide at the rim, narrowing to the base */}
        <path d="M -210 -390 C -226 -300 -232 -110 -200 -50 Q -160 0 0 0 Q 160 0 200 -50 C 232 -110 226 -300 210 -390 Z" fill={c} />
        <path d="M 120 -390 C 150 -300 160 -120 130 -40 Q 160 -20 200 -50 C 232 -110 226 -300 210 -390 Z" fill={shade(c, 0.2)} />
        {/* seat ring, dark interior and water */}
        <ellipse cx={0} cy={-390} rx={214} ry={52} fill={shade(c, 0.08)} />
        <ellipse cx={0} cy={-390} rx={180} ry={38} fill={shade(c, 0.25)} />
        <ellipse cx={0} cy={-388} rx={160} ry={28} fill={C.skyDeep} transform={`translate(0 -388) scale(${f1(swirl)} 1) translate(0 388)`} />
        {/* base plate */}
        <rect x={-170} y={-40} width={340} height={40} rx={16} fill={shade(c, 0.15)} />
      </g>
    </g>
  );
}
