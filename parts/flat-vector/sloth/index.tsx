import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector sleepy sloth hanging from a short horizontal branch by long claws.
// Origin = centre of the branch (x, y default 540, 900). About 450 px long. Faces right, honours flip.
// pose hang: sways gently on the branch from p.f. pose reach: stretches one arm further along the branch.

type P = [number, number];
const FUR = "#A08B70", FUR_LT = "#C9B79B", DARK = shade(FUR, 0.2), FACE = "#E6D8BE", PATCH = "#3E3026", CLAW = "#4A3F35", BRANCH = "#8A5A3C", INK = "#1F2433";

const limb = (a: P, b: P, w0: number, w1: number, col: string) =>
  taper(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

// three little claws hooking over the branch at a grip point
const Claws = ({ at, col }: { at: P; col: string }) => (
  <g>
    {[-10, 0, 10].map((dx) => (
      <React.Fragment key={dx}>{taper([at[0] + dx, at[1] + 6], [at[0] + dx - 2, at[1] - 2], [at[0] + dx + 3, at[1] - 9], 6, 2, col)}</React.Fragment>
    ))}
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, reach = p.pose === "reach";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 900;
  const sway = reach ? Math.sin(f * 0.02) * 1.5 : Math.sin(f * 0.025) * 3;
  const dx = reach ? 60 : 0;
  const nearSh: P = [40, 90], nearEl: P = reach ? [120, 40] : [60, 40];
  const nearWr: P = reach ? [172 + Math.sin(f * 0.02) * 12, 8] : [40, 8];
  const farWr: P = [-30, 8];
  const hd: P = [160, 190];

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${sway})`}>
        {taper([-270, 0], [0, 8], [270, -6], 28, 18, BRANCH, undefined, true)}
        <g transform={`translate(${dx} 0)`}>
          {limb([-10, 270], [-30, 345], 56, 44, DARK)}
          <ellipse cx={-34} cy={352} rx={20} ry={11} fill={CLAW} />
          {limb([-20, 90], [-40, 40], 50, 40, DARK)}
          {limb([-40, 40], farWr, 40, 30, DARK)}
          <Claws at={farWr} col={CLAW} />
          <ellipse cx={10} cy={185} rx={122} ry={110} fill={FUR} />
          <ellipse cx={34} cy={205} rx={70} ry={78} fill={FUR_LT} />
          {limb([60, 270], [78, 350], 62, 46, FUR)}
          <ellipse cx={84} cy={356} rx={22} ry={12} fill={CLAW} />
          <ellipse cx={hd[0]} cy={hd[1]} rx={68} ry={66} fill={FUR} />
          <ellipse cx={hd[0] + 22} cy={hd[1] + 14} rx={40} ry={40} fill={FACE} />
          <ellipse cx={hd[0] + 24} cy={hd[1] - 8} rx={30} ry={18} fill={PATCH} />
          <path d={`M ${hd[0] + 6} ${hd[1] - 9} Q ${hd[0] + 22} ${hd[1] - 2} ${hd[0] + 38} ${hd[1] - 9}`} fill="none" stroke={FACE} strokeWidth={5} strokeLinecap="round" />
          <circle cx={hd[0] + 56} cy={hd[1] - 2} r={4} fill={INK} />
          <path d={`M ${hd[0] + 22} ${hd[1] + 34} Q ${hd[0] + 40} ${hd[1] + 46} ${hd[0] + 56} ${hd[1] + 26}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
          <circle cx={hd[0] + 62} cy={hd[1] + 16} r={6} fill={PATCH} />
          {limb(nearSh, nearEl, 54, 42, FUR)}
          {limb(nearEl, nearWr, 42, 32, FUR)}
          <Claws at={nearWr} col={CLAW} />
        </g>
      </g>
    </g>
  );
}
