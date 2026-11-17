import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector meerkat: sandy, slim and alert, with dark eye patches and a thin tail.
// Origin = feet (bottom centre), faces right, honours flip. About 300 px tall at s = 1.
// pose sentry: upright on its hind legs, head turning on watch from p.f. pose walk: low on all fours, legs cycling from p.f.

type P = [number, number];
const SAND = "#D9B27C", DARK = shade(SAND, 0.2), BELLY = "#F1DEB4", PATCH = "#3B2A20", EYE = "#1F2433", NOSE = "#2A1C18";

const limb = (a: P, b: P, w0: number, w1: number, col: string) =>
  taper(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, walk = p.pose === "walk";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const transform = `translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`;

  if (walk) {
    const sw = Math.sin(f * 0.25);
    return (
      <g transform={transform}>
        {taper([-64, -118], [-100, -100], [-118, -2], 10, 4, DARK, undefined, true)}
        {limb([-36, -100], [-40 - sw * 14, -10], 22, 16, DARK)}
        {limb([40, -100], [46 - sw * 14, -10], 22, 16, DARK)}
        <ellipse cx={-38 - sw * 14} cy={-6} rx={14} ry={7} fill={PATCH} />
        <ellipse cx={48 - sw * 14} cy={-6} rx={14} ry={7} fill={PATCH} />
        <ellipse cx={0} cy={-104} rx={70} ry={34} fill={SAND} />
        <ellipse cx={20} cy={-94} rx={40} ry={16} fill={BELLY} />
        {limb([-36, -100], [-44 + sw * 14, -10], 22, 16, SAND)}
        {limb([40, -100], [52 + sw * 14, -10], 22, 16, SAND)}
        <ellipse cx={-46 + sw * 14} cy={-6} rx={14} ry={7} fill={PATCH} />
        <ellipse cx={54 + sw * 14} cy={-6} rx={14} ry={7} fill={PATCH} />
        {taper([58, -118], [76, -150], [100, -170], 26, 20, SAND, undefined, true)}
        <circle cx={104} cy={-176} r={22} fill={SAND} />
        <ellipse cx={116} cy={-170} rx={18} ry={12} fill={BELLY} />
        <ellipse cx={104} cy={-186} rx={11} ry={8} fill={PATCH} />
        <circle cx={112} cy={-184} r={4} fill={EYE} />
        <circle cx={130} cy={-172} r={3} fill={NOSE} />
      </g>
    );
  }

  const turn = Math.sin(f / 16) * 6, arm = Math.sin(f / 30) * 2;
  return (
    <g transform={transform}>
      {taper([-30, -124], [-70, -70], [-100, -2], 11, 5, DARK, undefined, true)}
      {taper([-84, -30], [-92, -16], [-100, -2], 6, 3, PATCH)}
      {limb([-12, -110], [-14, -58], 22, 16, DARK)}
      {limb([-12, -58], [-14, -4], 18, 14, DARK)}
      <ellipse cx={-14} cy={-3} rx={14} ry={6} fill={PATCH} />
      {limb([4, -110], [10, -58], 24, 17, SAND)}
      {limb([10, -58], [6, -4], 19, 15, SAND)}
      <ellipse cx={8} cy={-3} rx={14} ry={6} fill={PATCH} />
      <ellipse cx={0} cy={-170} rx={36} ry={80} fill={SAND} />
      <ellipse cx={14} cy={-166} rx={20} ry={58} fill={BELLY} />
      {limb([-6, -212], [18 + arm, -190], 14, 12, DARK)}
      <ellipse cx={22 + arm} cy={-188} rx={8} ry={7} fill={BELLY} />
      <g transform={`rotate(${turn} -4 -236)`}>
        <ellipse cx={-6} cy={-288} rx={6} ry={7} fill={PATCH} />
        <circle cx={12} cy={-272} r={32} fill={SAND} />
        <ellipse cx={18} cy={-272} rx={14} ry={11} fill={PATCH} />
        <circle cx={22} cy={-276} r={5} fill={EYE} />
        <circle cx={23} cy={-278} r={1.5} fill="#FFFFFF" />
        <ellipse cx={24} cy={-254} rx={14} ry={10} fill={BELLY} />
        <ellipse cx={44} cy={-258} rx={10} ry={7} fill={NOSE} />
      </g>
    </g>
  );
}
