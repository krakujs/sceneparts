import React from "react";
import type { PartProps } from "@sceneparts/core";
import { poseAt } from "../person/index";
import { C, shade } from "../style/index";

// Robot person: original boxy robot with a screen face, a blinking antenna light and segmented arms and legs.
// Custom drawing with its own walk cycle from p.f (body space: feet at 0,0, faces right, ~1060 px tall at s = 1).
/* eslint-disable @typescript-eslint/no-explicit-any */
const TH = 235, SH = 215, UP = 165, FO = 150, HIP = -470, SHY = -775;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, y: number, a: number, l: number): [number, number] => [x + Math.sin(rad(a)) * l, y + Math.cos(rad(a)) * l];
const metal = "#B9C3CF", dark = "#4B5566", glow = C.skyDeep;

function Chain({ pts, w, c }: { pts: [number, number][]; w: number; c: string }) {
  return <path d={"M " + pts.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L ")} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
}

export default function Part(p: PartProps<any>) {
  const { x, y = 1560, s = 1, f, flip, pose = "walk" } = p as any;
  const P = poseAt(pose, f);
  const lv = (l: [number, number]) => TH * Math.cos(rad(l[0])) + SH * Math.cos(rad(l[0] - l[1]));
  const dy = TH + SH - Math.max(lv(P.bl), lv(P.fl)) - P.jump;
  const up = `rotate(${P.lean} 0 ${HIP})`;
  const blink = Math.floor(f / 10) % 2 === 0;
  const eye = (cx: number) => (
    <rect x={cx - 16} y={-958} width={32} height={blink ? 30 : 6} rx={10} fill={glow} />
  );
  const leg = (l: [number, number], hx: number, back: boolean) => {
    const h: [number, number] = [hx, HIP];
    const k = pt(h[0], h[1], l[0], TH);
    const an = pt(k[0], k[1], l[0] - l[1], SH);
    const c = back ? shade(metal, 0.2) : metal;
    return (
      <g>
        <Chain pts={[h, k]} w={58} c={c} />
        <Chain pts={[k, an]} w={48} c={back ? shade(dark, 0.1) : dark} />
        <Chain pts={[k, an]} w={0} c={c} />
        <path d={`M ${an[0] - 36} ${an[1] - 4} L ${an[0] + 50} ${an[1] - 4} L ${an[0] + 50} ${an[1] + 36} L ${an[0] - 36} ${an[1] + 36} Z`} fill={back ? shade(dark, 0.2) : dark} />
      </g>
    );
  };
  const arm = (l: [number, number], sx: number, back: boolean) => {
    const sh: [number, number] = [sx, SHY];
    const el = pt(sh[0], sh[1], l[0], UP);
    const ha = pt(el[0], el[1], l[0] + l[1], FO);
    const c = back ? shade(metal, 0.2) : metal;
    return (
      <g>
        <Chain pts={[sh, el]} w={46} c={c} />
        <Chain pts={[el, ha]} w={36} c={back ? shade(dark, 0.1) : dark} />
        <circle cx={ha[0]} cy={ha[1]} r={24} fill={back ? shade(dark, 0.2) : C.greyLight} />
      </g>
    );
  };
  const hand = arm(P.fa, 48, false);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${dy})`}>
        <g transform={up}>
          {arm(P.ba, -44, true)}
        </g>
        {leg(P.bl, -24, true)}
        {leg(P.fl, 26, false)}
        <g transform={up}>
          <rect x={-86} y={-800} width={172} height={300} rx={34} fill={metal} />
          <rect x={-60} y={-760} width={120} height={150} rx={18} fill={dark} />
          <circle cx={0} cy={-700} r={20} fill={blink ? glow : C.teal} />
          <rect x={-40} y={-600} width={80} height={12} rx={6} fill={glow} opacity={0.8} />
          <rect x={-30} y={-566} width={60} height={12} rx={6} fill={C.yellow} />
          <rect x={-86} y={-512} width={172} height={20} rx={8} fill={dark} />
          <rect x={-30} y={-842} width={60} height={46} rx={14} fill={shade(metal, 0.15)} />
          <rect x={-100} y={-1000} width={200} height={206} rx={44} fill={metal} />
          <rect x={-78} y={-978} width={156} height={122} rx={26} fill={dark} />
          {eye(-38)}
          {eye(38)}
          <path d="M -26 -918 Q 0 -898 26 -918" stroke={glow} strokeWidth={9} fill="none" strokeLinecap="round" />
          <rect x={-10} y={-1000} width={20} height={0} />
          <line x1={0} y1={-1000} x2={0} y2={-1062} stroke={dark} strokeWidth={10} />
          <circle cx={0} cy={-1074} r={16} fill={blink ? C.red : shade(C.red, 0.6)} />
          {hand}
        </g>
      </g>
    </g>
  );
}
