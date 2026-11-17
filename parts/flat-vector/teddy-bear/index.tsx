import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Teddy bear: generic plush bear sitting front-on, round ears, light muzzle with a stitched mouth, no clothes or accessories.
// Origin = bottom centre (between the feet); faces the viewer, honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const dk = shade(c, 0.2);
  const belly = shade(c, -0.15);
  const ink = C.ink;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* feet */}
        <ellipse cx={-82} cy={-26} rx={58} ry={34} fill={dk} />
        <ellipse cx={82} cy={-26} rx={58} ry={34} fill={dk} />
        {/* body */}
        <ellipse cx={0} cy={-160} rx={132} ry={150} fill={c} />
        <path d="M 60 -300 A 132 150 0 0 1 80 -40 A 132 150 0 0 0 60 -300 Z" fill={dk} />
        {/* belly */}
        <ellipse cx={0} cy={-150} rx={80} ry={96} fill={belly} opacity={0.5} />
        {/* arms resting in the lap */}
        <ellipse cx={-146} cy={-170} rx={40} ry={78} fill={c} transform="rotate(14 -146 -170)" />
        <ellipse cx={146} cy={-170} rx={40} ry={78} fill={dk} transform="rotate(-14 146 -170)" />
        {/* ears */}
        <circle cx={-104} cy={-478} r={52} fill={c} />
        <circle cx={104} cy={-478} r={52} fill={c} />
        <circle cx={-104} cy={-478} r={28} fill={dk} />
        <circle cx={104} cy={-478} r={28} fill={dk} />
        {/* head */}
        <circle cx={0} cy={-374} r={136} fill={c} />
        <path d="M 70 -508 A 136 136 0 0 1 84 -250 A 136 136 0 0 0 70 -508 Z" fill={dk} />
        {/* muzzle */}
        <ellipse cx={0} cy={-326} rx={66} ry={50} fill={belly} />
        {/* stitched seam on the muzzle */}
        <path d="M -24 -302 Q 0 -286 24 -302" fill="none" stroke={ink} strokeWidth={6} strokeLinecap="round" strokeDasharray="7 7" />
        {/* nose */}
        <ellipse cx={0} cy={-350} rx={20} ry={14} fill={ink} />
        {/* eyes with glints */}
        <circle cx={-50} cy={-406} r={17} fill={ink} />
        <circle cx={50} cy={-406} r={17} fill={ink} />
        <circle cx={-44} cy={-412} r={5} fill={C.white} />
        <circle cx={56} cy={-412} r={5} fill={C.white} />
      </g>
    </g>
  );
}
