import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Asteroid: a lumpy grey space rock with craters, lit from the top left and shaded at the lower right.
// Origin = centre of the rock; about 420 px across at s = 1.
// anim "tumble": the rock turns slowly.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const N = 36;
const ROCK = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2;
  const r = 190 + 22 * Math.sin(3 * a + 0.5) + 14 * Math.sin(5 * a + 1.3) + 9 * Math.cos(8 * a);
  return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
});
const ROCK_PATH = ROCK.map(([rx, ry], i) => `${i === 0 ? "M" : "L"} ${f1(rx)} ${f1(ry)}`).join(" ") + " Z";
const CRATERS: [number, number, number][] = [[-70, -40, 44], [90, 30, 32], [-120, 90, 22], [20, -120, 28], [150, -60, 16], [-10, 110, 20]];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const turn = p.anim === "tumble" ? f * 0.5 : 0;
  const base = p.color && p.color !== "none" ? p.color : C.grey;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(turn)})`}>
        <clipPath id="asteroid-clip">
          <path d={ROCK_PATH} />
        </clipPath>
        <path d={ROCK_PATH} fill={base} />
        {/* shadowed lower-right side */}
        <g clipPath="url(#asteroid-clip)">
          <circle cx={70} cy={70} r={260} fill={shade(base, 0.35)} opacity={0.75} />
          <circle cx={-40} cy={-30} r={200} fill={base} />
        </g>
        {CRATERS.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r + 5} fill={shade(base, 0.2)} opacity={0.35} transform={`translate(-4 -4)`} />
            <circle cx={cx} cy={cy} r={r} fill={C.greyDark} />
            <circle cx={cx + r * 0.2} cy={cy + r * 0.2} r={r * 0.72} fill={shade(base, 0.3)} />
          </g>
        ))}
        {/* light speckles */}
        {[[-150, -120, 6], [120, -150, 5], [170, 110, 7]].map(([cx, cy, r], i) => (
          <circle key={`k${i}`} cx={cx} cy={cy} r={r} fill={C.white} opacity={0.35} />
        ))}
      </g>
    </g>
  );
}
