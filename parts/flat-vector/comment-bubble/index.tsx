import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector comment bubble: a rounded chat bubble with a tail and three text lines.
// Centre (x, y), about 460 px wide at s = 1. Motion comes only from p.f.

const Piece = ({ c, e }: { c: string; e: number }) => (
  <>
    <rect x={-210} y={-160} width={420} height={300} rx={80} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <path d="M -150 110 L -130 250 L -20 118 Z" fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.teal;
  const anim: string = p.anim ?? "pop";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let sc = 1, dy = 0;
  if (anim === "pop") sc = 1 + Math.max(0, Math.sin(f * 0.2)) * 0.04;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  const dots = [0, 1, 2];
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc * (p.flip ? -1 : 1)} ${s * k * sc})`}>
      <g transform="translate(0 18)"><Piece c={C.shadow} e={0} /></g>
      {p.border !== false && <Piece c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Piece c={shade(col, 0.22)} e={0} /></g>
      <Piece c={col} e={0} />
      {[-70, 0, 70].map((ly, i) => (
        <rect key={dots[i]} x={-150 + (i === 1 ? 30 : 0)} y={ly - 16} width={i === 1 ? 240 : 300} height={32} rx={16} fill="#FFFFFF" />
      ))}
    </g>
  );
}
