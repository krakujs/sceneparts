import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Heart } from "../heart/index";
import { Feather } from "../feather/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const PanThing: React.FC<{ k?: string }> = ({ k }) =>
  k === "heart" ? <Heart s={0.8} /> : k === "heart-heavy" ? <Heart s={1.1} c="#5a1414" /> : k === "feather" ? <Feather x={0} y={10} s={0.45} /> : null;
export const ScaleShape: React.FC<{ x: number; y: number; s?: number; tip?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, tip = 0, left, right }) => {
  const r = (tip * Math.PI) / 180;
  const ly = -Math.sin(r) * 260, ry = Math.sin(r) * 260;
  const Pan: React.FC<{ px: number; py: number; children?: React.ReactNode }> = ({ px, py, children }) => (
    <g>
      <path d={`M${px} ${-640 - py * -1} L${px - 90} ${-420 - py * -1} M${px} ${-640 - py * -1} L${px + 90} ${-420 - py * -1}`} stroke={INK} strokeWidth={6} />
      <path d={`M${px - 110} ${-420 + py} Q${px} ${-350 + py} ${px + 110} ${-420 + py} Z`} fill={P.gold} {...S} />
      <g transform={`translate(${px} ${-430 + py})`}>{children}</g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-120 0 L120 0 L60 -40 L-60 -40 Z" fill={P.lapis} {...S} />
      <path d="M0 -40 L0 -660" stroke={INK} strokeWidth={30} />
      <path d="M0 -40 L0 -660" stroke={P.gold} strokeWidth={16} />
      <g transform={`rotate(${-tip} 0 -650)`}>
        <path d="M-270 -650 L270 -650" stroke={INK} strokeWidth={26} strokeLinecap="round" />
        <path d="M-270 -650 L270 -650" stroke={P.gold} strokeWidth={12} strokeLinecap="round" />
      </g>
      <Pan px={-260 * Math.cos(r)} py={ly}>{left}</Pan>
      <Pan px={260 * Math.cos(r)} py={ry}>{right}</Pan>
      <path d="M-20 -700 Q0 -740 20 -700 Z" fill={P.green} {...S} strokeWidth={5} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <ScaleShape x={p.x} y={p.y} s={p.s} tip={p.tip} left={<PanThing k={p.left} />} right={<PanThing k={p.right} />} />;
}
