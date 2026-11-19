import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Surfboard standing upright on its tail: a wide round-tipped body that narrows to a pointed nose,
// a white centre stripe and a fin at the base. Origin = bottom tail centre. About 760 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 60) * 2.5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const board = p.color && p.color !== "none" ? p.color : C.teal;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={8} fill={C.shadow} />
      {/* fin, behind the board at the tail */}
      <path d="M -6 -40 L 40 -40 L 26 -120 L -6 -120 Z" fill={C.navy} />
      <g transform={motion(anim, f)}>
        {/* board outline: round tail at the bottom, pointed nose at the top */}
        <path d="M 0 -700 Q 70 -560 118 -320 Q 140 -190 110 -110 Q 70 -40 0 -36 Q -70 -40 -110 -110 Q -140 -190 -118 -320 Q -70 -560 0 -700 Z" fill={board} />
        {/* shaded half for depth */}
        <path d="M 0 -700 Q 70 -560 118 -320 Q 140 -190 110 -110 Q 70 -40 0 -36 Q 30 -200 0 -700 Z" fill={shade(board, 0.18)} />
        {/* centre stripe */}
        <path d="M -8 -640 Q -14 -400 -6 -120 L 8 -120 Q 16 -400 8 -640 Z" fill={stripe} />
        {/* rail line */}
        <path d="M -104 -300 Q -92 -150 -70 -90" stroke={shade(board, 0.3)} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.6} />
      </g>
    </g>
  );
}
