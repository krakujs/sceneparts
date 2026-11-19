import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yeti: a big white-blue shaggy snow creature with a friendly face, waving one arm. No horns. Custom drawing.
// Feet at 0,0, faces right, ~950 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const FURS = "#9FBDD6", FACE = "#E2EEF7";
// shaggy outline: alternating outer tufts and inner points on an ellipse
const shag = (cx: number, cy: number, rx: number, ry: number, n: number, amp: number) => {
  const P: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = i % 2 ? 1 : 1 + amp;
    P.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const c = P[i], q = P[(i + 1) % n];
    d += ` Q ${c[0].toFixed(1)} ${c[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  }
  return d + " Z";
};
export default function Part(p: PartProps<any>) {
  const FUR = (p as any).color || "#F2F8FC", FURD = shade(FUR, 0.1);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const wave = Math.sin(f / 7);
  const breathe = Math.sin(f / 22) * 8;
  const blink = f % 120 < 5;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={260} ry={26} fill={C.shadow} />
      {/* feet */}
      <path d={shag(-130, -60, 110, 60, 16, 0.08)} fill={FURD} />
      <path d={shag(130, -60, 110, 60, 16, 0.08)} fill={FURD} />
      {/* body */}
      <path d={shag(0, -500 + breathe, 260, 320, 30, 0.07)} fill={FUR} />
      <path d={shag(40, -520 + breathe, 200, 250, 24, 0.06)} fill={FURS} opacity={0.22} />
      {/* back arm */}
      <path d="M -200 -640 Q -290 -520 -250 -360" stroke={FURD} strokeWidth={110} fill="none" strokeLinecap="round" />
      <circle cx={-250} cy={-340} r={62} fill={FURD} />
      {/* head */}
      <path d={shag(0, -880 + breathe * 0.5, 170, 150, 30, 0.07)} fill={FUR} />
      <ellipse cx={0} cy={-850 + breathe * 0.5} rx={108} ry={84} fill={FACE} />
      <g transform={`translate(0 ${breathe * 0.5})`}>
        {blink ? (
          <g>
            <path d="M -62 -900 Q -48 -890 -34 -900" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M 34 -900 Q 48 -890 62 -900" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <ellipse cx={-44} cy={-900} rx={14} ry={18} fill={C.ink} />
            <ellipse cx={44} cy={-900} rx={14} ry={18} fill={C.ink} />
            <circle cx={-40} cy={-906} r={5} fill={C.white} />
            <circle cx={48} cy={-906} r={5} fill={C.white} />
          </g>
        )}
        <ellipse cx={0} cy={-858} rx={20} ry={14} fill={C.ink} />
        <path d="M -48 -836 Q 0 -790 48 -836 Q 30 -800 0 -806 Q -30 -800 -48 -836 Z" fill={C.inkSoft} />
        <path d="M -20 -820 Q 0 -810 20 -820" stroke={C.pink} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
        <circle cx={-80} cy={-860} r={16} fill={C.pink} opacity={0.35} />
        <circle cx={80} cy={-860} r={16} fill={C.pink} opacity={0.35} />
      </g>
      {/* front arm waving */}
      <path d={`M 190 -640 Q ${300 + wave * 10} ${-600 - wave * 20} ${320 + wave * 16} ${-760 + wave * 12}`} stroke={FUR} strokeWidth={110} fill="none" strokeLinecap="round" />
      <path d={shag(320 + wave * 16, -790 + wave * 12, 62, 62, 14, 0.1)} fill={FUR} />
    </g>
  );
}
