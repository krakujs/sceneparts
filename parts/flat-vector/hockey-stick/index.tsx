import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Field hockey stick standing upright: a straight shaft with a grip at the top and a curved hook at the bottom
// whose flat face lies on the ground pointing right. Origin = centre of the shaft at the foot; the hook rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const shaftC = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const tap = anim === "tap" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 50)) * 6 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 40) + 1) * 8 : 0;
  const hook = "M -10 -760 L -10 -180 Q -10 -62 74 -42 L 150 -17";
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={80} cy={0} rx={130} ry={8} fill={C.shadow} />
      <g transform={`rotate(${f1(tap * 0.6)} 150 -17)`}>
        <path d={hook} fill="none" stroke={shaftC} strokeWidth={34} strokeLinecap="butt" strokeLinejoin="round" />
        <path d={hook} fill="none" stroke={shade(shaftC, 0.2)} strokeWidth={10} strokeLinecap="butt" transform="translate(12 0)" />
        {/* hook face and toe */}
        <path d="M 60 -58 L 166 -10 Q 176 0 164 0 L 60 -2 Z" fill={shade(shaftC, 0.1)} />
      </g>
      {/* grip tape at the top */}
      <path d="M -10 -760 L -10 -630" fill="none" stroke={C.ink} strokeWidth={34} strokeLinecap="butt" />
      {[0, 1, 2].map((i) => <line key={i} x1={-27} y1={-740 + i * 36} x2={7} y2={-728 + i * 36} stroke={C.inkSoft} strokeWidth={5} />)}
    </g>
  );
}
