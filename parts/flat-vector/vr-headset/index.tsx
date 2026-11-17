import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic VR headset: a visor with two lenses and a strap, floating-free, origin = bottom centre of the visor.
// anim "float": the headset drifts up and down slowly.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  if (anim === "float") return `translate(0 ${f1(Math.sin((f * 2 * Math.PI) / 90) * 10)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* strap around the back of the head */}
        <path d="M -330 -230 Q -340 -330 0 -330 Q 340 -330 330 -230" fill="none" stroke={shade(body, 0.3)} strokeWidth={34} strokeLinecap="round" />
        <path d="M -330 -230 Q -340 -330 0 -330 Q 340 -330 330 -230" fill="none" stroke={C.greyDark} strokeWidth={6} strokeDasharray="12 10" opacity={0.4} />
        {/* visor body */}
        <rect x={-270} y={-300} width={540} height={230} rx={70} fill={body} />
        <rect x={-270} y={-120} width={540} height={50} rx={24} fill={shade(body, 0.25)} />
        <path d="M -200 -270 Q -100 -300 40 -280" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.25} />
        {/* front face with two lenses */}
        <rect x={-230} y={-270} width={460} height={150} rx={46} fill={C.ink} />
        <circle cx={-110} cy={-195} r={58} fill={shade(C.blue, 0.2)} />
        <circle cx={110} cy={-195} r={58} fill={shade(C.blue, 0.2)} />
        <circle cx={-110} cy={-195} r={42} fill={C.skyDeep} />
        <circle cx={110} cy={-195} r={42} fill={C.skyDeep} />
        <path d="M -135 -218 Q -120 -238 -96 -236" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
        <path d="M 85 -218 Q 100 -238 124 -236" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
        {/* small status light and side buttons */}
        <circle cx={0} cy={-150} r={9} fill={C.green} />
        <rect x={-300} y={-220} width={30} height={60} rx={12} fill={shade(body, 0.25)} />
        <rect x={270} y={-220} width={30} height={60} rx={12} fill={shade(body, 0.25)} />
      </g>
    </g>
  );
}
