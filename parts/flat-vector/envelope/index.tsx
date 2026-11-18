import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Closed envelope with a flap and a red wax seal. anim "open": the flap swings up over 50 frames and a
// letter slides partly out. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const t = anim === "open" ? Math.min(1, f / 50) : 0;
  const e = 1 - (1 - t) ** 3;
  const flapY = 1 - 2 * e;
  const letterY = -230 * Math.max(0, (e - 0.2) / 0.8);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* envelope body */}
        <rect x={-260} y={-340} width={520} height={340} rx={12} fill={paper} />
        {/* letter inside, slides up when opened */}
        <g transform={`translate(0 ${f1(letterY)})`}>
          <rect x={-210} y={-300} width={420} height={270} rx={6} fill={C.white} />
          <rect x={-170} y={-260} width={220} height={12} rx={6} fill={C.grey} />
          <rect x={-170} y={-230} width={300} height={12} rx={6} fill={C.grey} />
          <rect x={-170} y={-200} width={260} height={12} rx={6} fill={C.grey} />
        </g>
        {/* lower flaps */}
        <path d="M -260 0 L -40 -160 L 0 -140 L 40 -160 L 260 0 Z" fill={shade(paper, 0.08)} />
        {/* top flap, hinged on the top edge */}
        <g transform={`translate(0 -340) scale(1 ${f1(flapY)}) translate(0 340)`}>
          <path d="M -260 -340 L 0 -170 L 260 -340 Z" fill={shade(paper, 0.14)} />
        </g>
        {/* red wax seal */}
        <circle cx={0} cy={-170} r={42} fill={C.red} />
        <circle cx={0} cy={-170} r={30} fill={C.redDark} />
        <circle cx={-8} cy={-180} r={8} fill={C.white} opacity={0.35} />
      </g>
    </g>
  );
}
