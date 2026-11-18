import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Desktop stapler, side view. The top arm hinges at the back and presses down at the front.
// anim "staple": the top arm presses down and springs back in a loop (60 frames).
// Origin = bottom centre (the metal base rests on y).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const press = anim === "staple" ? 8 * (1 - Math.cos((f * 2 * Math.PI) / 60)) / 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={270} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* anvil base plate */}
        <rect x={-250} y={-40} width={500} height={40} rx={10} fill={C.greyDark} />
        {/* lower body */}
        <rect x={-230} y={-100} width={460} height={64} rx={14} fill={shade(body, 0.25)} />
        {/* top arm, pressed down at the front */}
        <g transform={`rotate(${f1(press)} -190 -120)`}>
          <path d="M -220 -120 Q -220 -190 -150 -190 L 150 -190 Q 215 -190 230 -120 L 232 -100 L -220 -100 Z" fill={body} />
          <rect x={150} y={-150} width={78} height={34} rx={10} fill={shade(body, 0.12)} />
          <circle cx={-190} cy={-120} r={22} fill={C.greyDark} />
          <rect x={-120} y={-170} width={200} height={14} rx={7} fill={shade(body, 0.2)} />
        </g>
      </g>
    </g>
  );
}
