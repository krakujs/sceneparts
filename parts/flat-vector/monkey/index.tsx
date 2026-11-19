import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector small brown monkey with a tan face and belly and a long curling tail.
// Origin = bottom centre (seat or paws), faces right, honours flip. About 350 px tall at s = 1.
// pose sit: seated, tail swishing from p.f. pose walk: on all fours, legs cycling from p.f.

type P = [number, number];
const FUR = "#8A5A3C", DARK = shade(FUR, 0.22), TAN = "#E8C79A", TAN_DK = "#C9A077", EYE = "#1F2433", NOSE = "#4A2C20";

const limb = (a: P, b: P, w0: number, w1: number, col: string) =>
  taper(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

function Head({ hx, hy, r }: { hx: number; hy: number; r: number }) {
  const E = (u: number, v: number, rx: number, ry: number, fill: string) => (
    <ellipse cx={hx + r * u} cy={hy + r * v} rx={r * rx} ry={r * ry} fill={fill} />
  );
  return (
    <g>
      {E(-0.9, -0.1, 0.32, 0.32, FUR)}
      {E(-0.9, -0.1, 0.18, 0.18, TAN)}
      <ellipse cx={hx} cy={hy} rx={r} ry={r * 0.95} fill={FUR} />
      {E(0.44, 0.24, 0.5, 0.62, TAN)}
      {E(0.5, -0.1, 0.09, 0.1, EYE)}
      {E(0.52, -0.14, 0.03, 0.03, "#FFFFFF")}
      {E(0.9, 0.12, 0.07, 0.06, NOSE)}
      <path d={`M ${hx + r * 0.6} ${hy + r * 0.5} Q ${hx + r * 0.75} ${hy + r * 0.56} ${hx + r * 0.9} ${hy + r * 0.44}`} fill="none" stroke={NOSE} strokeWidth={r * 0.05} strokeLinecap="round" />
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, walk = p.pose === "walk";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const transform = `translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`;

  if (walk) {
    const ph = f * 0.2, sw = Math.sin(ph), wag = Math.sin(f / 6) * 12;
    return (
      <g transform={transform}>
        {taper([-100, -170], [-200, -150], [-190 + wag, -250], 18, 8, DARK, undefined, true)}
        {limb([-60, -150], [-70 - sw * 24, -14], 40, 28, DARK)}
        {limb([60, -180], [84 - sw * 24, -14], 36, 26, DARK)}
        <ellipse cx={-70 - sw * 24} cy={-8} rx={20} ry={11} fill={DARK} />
        <ellipse cx={84 - sw * 24} cy={-8} rx={18} ry={11} fill={DARK} />
        <ellipse cx={0} cy={-150} rx={110} ry={58} fill={FUR} />
        <ellipse cx={20} cy={-122} rx={70} ry={26} fill={TAN} />
        {limb([-60, -150], [-56 + sw * 24, -14], 42, 30, FUR)}
        {limb([60, -180], [90 + sw * 24, -14], 38, 28, FUR)}
        <ellipse cx={90 + sw * 24} cy={-8} rx={18} ry={11} fill={TAN_DK} />
        <ellipse cx={-56 + sw * 24} cy={-8} rx={20} ry={11} fill={TAN_DK} />
        <Head hx={150} hy={-250} r={56} />
      </g>
    );
  }

  const tailWag = Math.sin(f / 14) * 10;
  return (
    <g transform={transform}>
      {taper([-62, -48], [-200, -40], [-190 + tailWag, -150], 18, 12, FUR, undefined, true)}
      {taper([-190 + tailWag, -150], [-180 + tailWag, -250], [-110 + tailWag, -250], 12, 9, FUR)}
      {limb([-6, -226], [12, -150], 34, 28, DARK)}
      {limb([30, -60], [104, -70], 56, 44, DARK)}
      {limb([104, -70], [110, -18], 44, 30, DARK)}
      <ellipse cx={120} cy={-10} rx={34} ry={14} fill={DARK} />
      <ellipse cx={0} cy={-170} rx={70} ry={92} fill={FUR} />
      <ellipse cx={20} cy={-160} rx={38} ry={68} fill={TAN} />
      <ellipse cx={0} cy={-56} rx={84} ry={58} fill={FUR} />
      {limb([30, -60], [104, -70], 56, 44, FUR)}
      {limb([104, -70], [110, -18], 44, 30, FUR)}
      <ellipse cx={120} cy={-10} rx={34} ry={14} fill={FUR} />
      {limb([18, -230], [44, -160], 34, 28, FUR)}
      {limb([44, -160], [54, -100], 28, 24, FUR)}
      <ellipse cx={56} cy={-92} rx={18} ry={14} fill={TAN} />
      <Head hx={18} hy={-300} r={56} />
    </g>
  );
}
