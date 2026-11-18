import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tennis ball: fluorescent yellow-green felt with two curved white seams, one bulging left and one right.
// Origin = bottom centre; the ball rests on y. Hero size about 230 px across at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 115, cy = -R - 4;
  const felt = p.color && p.color !== "none" ? p.color : "#C9E23A";
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 80 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const k = 1 - 0.3 * (lift / 80);
  const seamL = `M ${f1(-0.55 * R)} ${f1(-0.83 * R)} Q ${f1(-0.45 * R)} 0 ${f1(-0.55 * R)} ${f1(0.83 * R)}`;
  const seamR = `M ${f1(0.55 * R)} ${f1(-0.83 * R)} Q ${f1(0.45 * R)} 0 ${f1(0.55 * R)} ${f1(0.83 * R)}`;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={104 * k} ry={9 * k} fill={C.shadow} />
      <g transform={`translate(0 ${f1(cy - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={shade(felt, 0.2)} />
        <circle cx={-5} cy={-7} r={R - 5} fill={felt} />
        <path d={seamL} fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" />
        <path d={seamR} fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" />
        <path d={seamL} fill="none" stroke={shade(C.white, 0.18)} strokeWidth={3} transform="translate(5 0)" />
        <path d={seamR} fill="none" stroke={shade(C.white, 0.18)} strokeWidth={3} transform="translate(5 0)" />
      </g>
    </g>
  );
}
