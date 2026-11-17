import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Keys: a metal split-style ring with three keys of different sizes hanging from it and a plain tag.
// Origin = bottom centre (the lowest key tip sits on y); faces the viewer, honours flip, s and anim. Hero size.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** One key hanging from the ring point (0,0): bow at the top, shaft and two teeth. len sets the shaft length. */
const Key = ({ angle, len, c, bow }: { angle: number; len: number; c: string; bow: number }) => (
  <g transform={`rotate(${angle})`}>
    <circle cx={0} cy={bow} r={bow * 0.9} fill={c} />
    <circle cx={0} cy={bow} r={bow * 0.36} fill={C.paper} opacity={0.9} />
    <rect x={-10} y={bow} width={20} height={len} rx={6} fill={shade(c, 0.12)} />
    <rect x={10} y={bow + len * 0.62} width={26} height={16} rx={4} fill={c} />
    <rect x={10} y={bow + len * 0.82} width={20} height={16} rx={4} fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.yellow;
  const tagC = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const ringY = -290;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* ring */}
        <circle cx={0} cy={ringY} r={70} fill="none" stroke={C.greyDark} strokeWidth={18} />
        <g transform={`translate(0 ${ringY})`}>
          {/* plain tag, behind the keys */}
          <g transform="translate(0 60) rotate(-6)">
            <rect x={-50} y={0} width={100} height={132} rx={22} fill={tagC} />
            <rect x={-50} y={0} width={100} height={22} rx={11} fill={shade(tagC, 0.2)} />
            <circle cx={0} cy={36} r={10} fill={C.paper} />
          </g>
          {/* three keys hanging from the ring */}
          <g transform="translate(-6 62)"><Key angle={-38} len={230} c={metal} bow={46} /></g>
          <g transform="translate(4 62)"><Key angle={0} len={190} c={C.greyDark} bow={40} /></g>
          <g transform="translate(12 62)"><Key angle={30} len={150} c={shade(metal, 0.1)} bow={34} /></g>
        </g>
      </g>
    </g>
  );
}
