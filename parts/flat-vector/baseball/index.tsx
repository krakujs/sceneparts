import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Baseball: a white ball with two curved red seams, each double-stitched (a red line with white dashes
// along it). Origin = bottom centre; the ball rests on y. Hero size about 240 px across at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 120, cy = -R - 4;
  const red = p.color && p.color !== "none" ? p.color : "#D9322B";
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 80 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const k = 1 - 0.3 * (lift / 80);
  const left = `M ${f1(-0.42 * R)} ${f1(-0.85 * R)} Q ${f1(-0.95 * R)} 0 ${f1(-0.42 * R)} ${f1(0.85 * R)}`;
  const right = `M ${f1(0.42 * R)} ${f1(-0.85 * R)} Q ${f1(0.95 * R)} 0 ${f1(0.42 * R)} ${f1(0.85 * R)}`;
  const stitches = (d: string) => (
    <g>
      <path d={d} fill="none" stroke={red} strokeWidth={9} strokeLinecap="round" transform="translate(-5 0)" />
      <path d={d} fill="none" stroke={red} strokeWidth={9} strokeLinecap="round" transform="translate(5 0)" />
      <path d={d} fill="none" stroke={C.white} strokeWidth={3} strokeDasharray="4 9" transform="translate(-5 0)" />
      <path d={d} fill="none" stroke={C.white} strokeWidth={3} strokeDasharray="4 9" transform="translate(5 0)" />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={100 * k} ry={9 * k} fill={C.shadow} />
      <g transform={`translate(0 ${f1(cy - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={C.greyLight} />
        <circle cx={-5} cy={-7} r={R - 5} fill={C.white} />
        {stitches(left)}
        {stitches(right)}
      </g>
    </g>
  );
}
