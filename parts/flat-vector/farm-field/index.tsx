import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Farm field: ploughed brown furrows in perspective, with a band of green crop across the middle.
// Origin = centre of the near edge. About 1000 px wide and 420 px tall at s = 1. Static scenery.
const f1 = (v: number) => v.toFixed(1);
const SOIL_A = "#B07B4F", SOIL_B = "#9C6A41", FURROW = "#6E4628", CROP = "#5DAA55", CROP_DK = "#3E8C48";
const DEPTH = 420; // height of the field on screen
const VP_Y = -1200; // vanishing point of the furrows (above the field)
const N = 16;
// half width of the field at screen height y (y <= 0)
const half = (y: number) => 500 - 175 * (-y / DEPTH);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1600;
  const soilA = p.color && p.color !== "none" ? p.color : SOIL_A;
  const crop = p.color2 && p.color2 !== "none" ? p.color2 : CROP;
  const xb = (i: number) => -500 + (i * 1000) / N;
  const topX = (i: number) => xb(i) * (1 - (-DEPTH) / VP_Y);
  const bands = Array.from({ length: N }, (_, i) => (
    <path key={i} d={`M ${f1(xb(i))} 0 L ${f1(xb(i + 1))} 0 L ${f1(topX(i + 1))} ${-DEPTH} L ${f1(topX(i))} ${-DEPTH} Z`} fill={i % 2 ? shade(soilA, 0.1) : soilA} />
  ));
  const furrows = Array.from({ length: N + 1 }, (_, i) => (
    <line key={i} x1={f1(xb(i))} y1={0} x2={f1(topX(i))} y2={-DEPTH} stroke={FURROW} strokeWidth={5} opacity={0.5} />
  ));
  const stripTop = -150, stripBot = -250;
  const rows = Array.from({ length: 7 }, (_, i) => {
    const yy = stripBot + 12 + i * 15;
    const hw = half(yy) - 14;
    return <line key={i} x1={f1(-hw)} y1={f1(yy)} x2={f1(hw)} y2={f1(yy)} stroke={CROP_DK} strokeWidth={5} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={520} ry={14} fill={C.shadow} />
      {bands}
      {furrows}
      {/* green crop strip across the middle of the field */}
      <path d={`M ${f1(-half(stripTop))} ${stripTop} L ${f1(half(stripTop))} ${stripTop} L ${f1(half(stripBot))} ${stripBot} L ${f1(-half(stripBot))} ${stripBot} Z`} fill={crop} />
      {rows}
      <rect x={-500} y={0} width={1000} height={10} rx={4} fill={shade(soilA, 0.3)} />
    </g>
  );
}
