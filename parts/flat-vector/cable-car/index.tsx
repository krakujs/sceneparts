import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cable car: a cabin hanging from a sheave on a straight cable that spans the part width.
// Origin = cabin bottom centre. Room scale: about 1040 px wide at s = 1.
// anim "drive": the cabin slides along the cable and back; vx moves the whole car along x (px per frame).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const dx = anim === "drive" ? Math.sin((f * 2 * Math.PI) / 150) * 240 : 0;
  const cab = shade(body, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* cable across the part and two pylons */}
        <rect x={-520} y={-446} width={1040} height={12} rx={6} fill={frame} />
        {[-500, 500].map((px) => (
          <g key={px}>
            <rect x={px - 18} y={-442} width={36} height={502} rx={6} fill={frame} />
            <rect x={px - 40} y={-452} width={80} height={22} rx={8} fill={shade(frame, 0.2)} />
            <rect x={px - 50} y={56} width={100} height={22} rx={8} fill={shade(frame, 0.2)} />
          </g>
        ))}
        {/* sheave, hanger arm and cabin */}
        <g transform={`translate(${f1(dx)} 0)`}>
          <rect x={-8} y={-416} width={16} height={116} fill={frame} />
          <circle cx={0} cy={-440} r={24} fill={frame} />
          <circle cx={0} cy={-440} r={9} fill={shade(frame, 0.4)} />
          <rect x={-130} y={-300} width={260} height={46} rx={26} fill={cab} />
          <rect x={-115} y={-270} width={230} height={270} rx={34} fill={body} />
          <rect x={-95} y={-230} width={85} height={110} rx={14} fill={C.sky} />
          <rect x={10} y={-230} width={85} height={110} rx={14} fill={C.sky} />
          <rect x={-120} y={-26} width={240} height={26} rx={12} fill={cab} />
        </g>
      </g>
    </g>
  );
}
