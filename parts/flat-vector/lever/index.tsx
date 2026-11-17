import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Floor-mounted lever / switch handle: a housing bolted to the floor, a steel rod and a round knob.
// Hero scale: about 420 px tall at s = 1. Origin = floor centre under the housing.
// anim "pull": the lever swings over to the left and back, as if being pulled.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const knob = p.color && p.color !== "none" ? p.color : C.red;
  const rod = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const pull = anim === "pull" ? (-24 * (1 - Math.cos((f * 2 * Math.PI) / 80))) / 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* floor plate and housing */}
        <rect x={-120} y={-44} width={240} height={44} rx={12} fill={shade(C.greyDark, 0.2)} />
        <rect x={-72} y={-130} width={144} height={92} rx={18} fill={C.greyDark} />
        <circle cx={-44} cy={-96} r={8} fill={C.greyLight} />
        <circle cx={44} cy={-96} r={8} fill={C.greyLight} />
        {/* lever: rod and knob swing about the pivot */}
        <g transform={`rotate(${f1(pull)} 0 -116)`}>
          <line x1={0} y1={-116} x2={92} y2={-380} stroke={rod} strokeWidth={30} strokeLinecap="round" />
          <circle cx={92} cy={-398} r={58} fill={knob} />
          <circle cx={72} cy={-420} r={14} fill={C.white} opacity={0.55} />
          <circle cx={0} cy={-116} r={34} fill={shade(C.greyDark, 0.1)} />
        </g>
      </g>
    </g>
  );
}
