import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flip-flops seen from above at a slight angle: two foam soles lying side by side, each with a Y-shaped thong strap.
// Origin = bottom centre (the lower sole rests on y). About 520 px wide and 260 px tall at s = 1.
// anim "wiggle": the pair rocks a little; "bob": the pair lifts and settles.
const f1 = (v: number) => v.toFixed(1);

const Flop = ({ sole, strap }: { sole: string; strap: string }) => (
  <g>
    {/* foam sole seen from above, with a darker rim underneath */}
    <path d="M -240 6 C -240 66 -150 76 0 72 C 150 68 240 62 240 6 C 240 -4 236 -10 232 -14 C 200 -60 120 -72 0 -72 C -150 -76 -236 -66 -240 6 Z" fill={shade(sole, 0.15)} />
    <path d="M -240 0 C -240 -70 -150 -76 0 -72 C 150 -68 240 -62 240 0 C 240 62 150 72 0 72 C -150 72 -240 70 -240 0 Z" fill={sole} />
    {/* Y-shaped thong: a stem to the toe post, then two arms to the sides */}
    <path d="M 120 0 L 40 0 L -120 -46" fill="none" stroke={strap} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 40 0 L -120 46" fill="none" stroke={strap} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={120} cy={0} r={15} fill={shade(strap, 0.2)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const strap = p.color && p.color !== "none" ? p.color : C.teal;
  const sole = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const wig = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* far flip-flop, slightly higher and angled the other way */}
        <g transform={`translate(-20 -190) rotate(${f1(-6 + wig)})`}>
          <Flop sole={shade(sole, 0.08)} strap={shade(strap, 0.08)} />
        </g>
        {/* near flip-flop resting on y */}
        <g transform={`translate(22 -72) rotate(${f1(4 - wig)})`}>
          <Flop sole={sole} strap={strap} />
        </g>
      </g>
    </g>
  );
}
