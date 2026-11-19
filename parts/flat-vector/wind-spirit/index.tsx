import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wind spirit: an airy, translucent pale-cyan spirit. Four tapered spiral strokes curl up from the ground into a
// small round head with friendly eyes. Wind streaks trail out to the side and a couple of leaves swirl past.
// Origin = bottom centre of the swirl (ground); about 760 px tall at s = 1. No stacked tiers: only spirals and
// flowing tapered strokes. anim swirl: the spiral turns, the head bobs and the streaks and leaves drift.
/* eslint-disable @typescript-eslint/no-explicit-any */
const AIR = "#9EE3F0", AIR_D = "#6CCBDF", LEAF = C.green, LEAF_D = C.greenDark, INK = C.ink;
const f1 = (v: number) => v.toFixed(1);
const N = 24;      // segments per strand
const TOP = -660;  // height of the top of the spiral

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const swirl = p.anim === "swirl";
  const turn = swirl ? (f * 2 * Math.PI) / 70 : 0;
  const bob = swirl ? Math.sin((f * 2 * Math.PI) / 60) * 10 : 0;
  const drift = swirl ? (f * 2) % 120 : 0;
  const sway = swirl ? Math.sin((f * 2 * Math.PI) / 80) * 8 : 0;

  // Spiral strand: x swings with a shrinking amplitude as it rises, phase offset per strand.
  const strand = (k: number) => {
    const segs: React.ReactNode[] = [];
    const phase0 = (k * Math.PI) / 2 + turn;
    const pt = (i: number) => {
      const t = i / N;
      const amp = 170 * Math.pow(1 - t, 0.85) + 26;
      return [amp * Math.sin(phase0 + t * 2 * Math.PI * 1.25), TOP * t - 20 * t];
    };
    for (let i = 0; i < N; i++) {
      const [x1, y1] = pt(i), [x2, y2] = pt(i + 1);
      const t = (i + 0.5) / N;
      const w = 34 * (1 - t) + 8;
      segs.push(<line key={i} x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={k % 2 ? AIR : "#D2F4FB"} strokeWidth={f1(w)} strokeLinecap="round" />);
    }
    return <g key={k} opacity={0.72}>{segs}</g>;
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      {/* faint ground patch the wind is stirring */}
      <ellipse cx={0} cy={-6} rx={200} ry={20} fill={AIR_D} opacity={0.22} />
      {/* spiral body: four strands, drawn back to front */}
      {[0, 1, 2, 3].map((k) => strand(k))}
      {/* wind streaks trailing off to the sides */}
      <g opacity={0.8} stroke="#FFFFFF" strokeWidth={9} fill="none" strokeLinecap="round">
        <path d={`M ${f1(150 + drift * 0.6)} -470 Q 270 -500 ${f1(360 + drift * 0.2)} -470`} />
        <path d={`M ${f1(-170 - drift * 0.5)} -340 Q -290 -360 ${f1(-380 - drift * 0.3)} -330`} />
        <path d={`M ${f1(120 + drift * 0.4)} -250 Q 230 -270 ${f1(340 + drift * 0.3)} -240`} strokeWidth={6} />
      </g>
      {/* head with friendly eyes, bobbing on top of the spiral */}
      <g transform={`translate(${f1(sway * 0.3)} ${f1(TOP - 30 + bob)})`}>
        <circle cx={0} cy={0} r={82} fill={AIR} opacity={0.9} />
        <path d="M -60 -10 Q -40 -62 0 -66" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
        <ellipse cx={-28} cy={-8} rx={11} ry={15} fill={INK} />
        <ellipse cx={28} cy={-8} rx={11} ry={15} fill={INK} />
        <circle cx={-24} cy={-13} r={4.5} fill="#FFFFFF" />
        <circle cx={30} cy={-13} r={4.5} fill="#FFFFFF" />
        <circle cx={-44} cy={18} r={11} fill="#F27BA6" opacity={0.45} />
        <circle cx={44} cy={18} r={11} fill="#F27BA6" opacity={0.45} />
        <path d="M -14 26 Q 0 40 14 26" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      {/* a couple of leaves caught in the swirl */}
      <g transform={`translate(190 ${f1(-560 + sway * 0.5)}) rotate(${f1(-25 + sway)}) scale(1.4)`}>
        <path d="M 0 0 Q 34 -36 84 -30 Q 50 8 0 0 Z" fill={LEAF} />
        <path d="M 4 -2 Q 40 -14 74 -28" stroke={LEAF_D} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      <g transform={`translate(-200 ${f1(-400 - sway * 0.5)}) rotate(${f1(160 - sway)}) scale(1.4)`}>
        <path d="M 0 0 Q 30 -34 78 -28 Q 46 8 0 0 Z" fill={shade(LEAF, 0.08)} />
        <path d="M 4 -2 Q 36 -12 68 -26" stroke={LEAF_D} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
