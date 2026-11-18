import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Diploma: a rolled paper scroll lying on its side, tied with a red ribbon and bow. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const ribbon = p.color && p.color !== "none" ? p.color : C.red;
  const paper = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* paper sheet */}
        <rect x={-250} y={-170} width={500} height={160} fill={paper} />
        <rect x={-200} y={-128} width={130} height={10} rx={5} fill={C.grey} />
        <rect x={-200} y={-106} width={96} height={10} rx={5} fill={C.grey} />
        <rect x={70} y={-128} width={130} height={10} rx={5} fill={C.grey} />
        <rect x={70} y={-106} width={96} height={10} rx={5} fill={C.grey} />
        <circle cx={-140} cy={-56} r={26} fill={C.yellow} />
        <circle cx={-140} cy={-56} r={14} fill={C.yellowDark} />
        {/* rolled ends */}
        <ellipse cx={-250} cy={-90} rx={36} ry={80} fill={shade(paper, 0.14)} />
        <ellipse cx={-250} cy={-90} rx={14} ry={34} fill={shade(paper, 0.4)} />
        <ellipse cx={250} cy={-90} rx={36} ry={80} fill={shade(paper, 0.14)} />
        <ellipse cx={250} cy={-90} rx={14} ry={34} fill={shade(paper, 0.4)} />
        {/* ribbon band around the scroll */}
        <rect x={-34} y={-190} width={68} height={180} fill={ribbon} />
        <rect x={10} y={-190} width={24} height={180} fill={shade(ribbon, 0.2)} />
        {/* bow */}
        <path d="M 0 -200 C -40 -290 -130 -300 -120 -240 C -115 -212 -60 -200 0 -200 Z" fill={ribbon} />
        <path d="M 0 -200 C 40 -290 130 -300 120 -240 C 115 -212 60 -200 0 -200 Z" fill={shade(ribbon, 0.12)} />
        <path d="M -8 -196 L -40 -104 L -20 -104 L 0 -180 Z" fill={shade(ribbon, 0.2)} />
        <path d="M 8 -196 L 40 -104 L 18 -104 L 0 -180 Z" fill={ribbon} />
        <circle cx={0} cy={-200} r={20} fill={shade(ribbon, 0.25)} />
      </g>
    </g>
  );
}
