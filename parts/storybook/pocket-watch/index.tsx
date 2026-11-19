import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Pocket watch: gold pocket watch with a chain, open lid and a ticking second hand. Hero close-up; (x, y) is the bottom of the chain's loop.
export const PocketWatch: React.FC<{ x: number; y: number; s?: number; f?: number; gold?: string; open?: boolean; flip?: boolean }> = ({ x, y, s = 1, f = 0, gold = "#F2B544", open = true, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const CX = 0, CY = -200, R = 150;
  const sec = Math.floor(f / 30) * 6;
  const links = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const px = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * -200 + t * t * -250;
    const py = (1 - t) * (1 - t) * -360 + 2 * (1 - t) * t * -410 + t * t * -170;
    return { px, py, rot: (Math.atan2(-170 + 410, -250 + 200) * 180) / Math.PI };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={-40} cy={10} rx={300} ry={20} fill="#000" opacity={0.18} />
      {/* chain */}
      {links.map((l, i) => <ellipse key={i} cx={l.px} cy={l.py} rx={13} ry={8} transform={`rotate(${l.rot - 20} ${l.px} ${l.py})`} fill="none" stroke={C.ink} strokeWidth={10} />)}
      {links.map((l, i) => <ellipse key={`g${i}`} cx={l.px} cy={l.py} rx={13} ry={8} transform={`rotate(${l.rot - 20} ${l.px} ${l.py})`} fill="none" stroke={gold} strokeWidth={4} />)}
      {/* bow and stem */}
      <circle cx={0} cy={-388} r={26} fill="none" stroke={C.ink} strokeWidth={14} />
      <circle cx={0} cy={-388} r={26} fill="none" stroke={gold} strokeWidth={5} />
      <rect x={-14} y={-370} width={28} height={30} fill={gold} {...o} />
      {/* open back lid */}
      {open ? <ellipse cx={120} cy={CY} rx={56} ry={R} fill={C.sepia} {...o} /> : null}
      {/* case */}
      <circle cx={CX} cy={CY} r={R + 14} fill={gold} {...o} />
      <circle cx={CX} cy={CY} r={R - 6} fill="none" stroke={C.ink} strokeWidth={4} opacity={0.6} />
      {/* dial */}
      <circle cx={CX} cy={CY} r={118} fill={C.cream} stroke={C.ink} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 88 : 96, r2 = 110;
        return <line key={i} x1={Math.sin(a) * r1} y1={CY - Math.cos(a) * r1} x2={Math.sin(a) * r2} y2={CY - Math.cos(a) * r2} stroke={C.ink} strokeWidth={i % 3 === 0 ? 8 : 4} />;
      })}
      {/* hands */}
      <g transform={`translate(0 ${CY}) rotate(75)`}><rect x={-6} y={-54} width={12} height={62} rx={5} fill={C.ink} /></g>
      <g transform={`translate(0 ${CY}) rotate(240)`}><rect x={-5} y={-86} width={10} height={94} rx={5} fill={C.ink} /></g>
      <g transform={`translate(0 ${CY}) rotate(${sec})`}>
        <line x1={0} y1={18} x2={0} y2={-96} stroke={C.brick} strokeWidth={4} strokeLinecap="round" />
        <circle cx={0} cy={0} r={9} fill={C.brick} stroke={C.ink} strokeWidth={3} />
      </g>
      <circle cx={0} cy={CY} r={8} fill={C.ink} />
      {/* glass highlight */}
      <path d={`M ${-100} ${CY - 60} Q ${-70} ${CY - 110} ${-20} ${CY - 124}`} stroke="#FFFFFF" strokeWidth={8} opacity={0.35} fill="none" strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <PocketWatch x={p.x} y={p.y} s={p.s} f={p.f} gold={p.gold} open={p.open} flip={p.flip} />;
}
