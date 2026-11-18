import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector share icon sticker: a rounded box with a thick curved arrow leaving it up and to the right.
// Centre (x, y), about 480 px wide at s = 1. Motion comes only from p.f.

const Piece = ({ c, e }: { c: string; e: number }) => (
  <>
    <rect x={-150} y={-10} width={260} height={230} rx={52} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <path d="M 40 -10 Q 120 -140 228 -168" fill="none" stroke={c} strokeWidth={52 + e} strokeLinecap="round" />
    <polygon points="272,-186 236,-112 200,-226" fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.blue;
  const anim: string = p.anim ?? "nudge";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dx = 0, dy = 0;
  if (anim === "nudge") { dx = Math.sin(f * 0.15) * 8; dy = -Math.abs(Math.sin(f * 0.15)) * 8; }
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  return (
    <g transform={`translate(${x + dx * s} ${y + dy * s}) scale(${s * k * 1.25 * (p.flip ? -1 : 1)} ${s * k * 1.25}) translate(-60 -10)`}>
      <g transform="translate(0 18)"><Piece c={C.shadow} e={0} /></g>
      {p.border !== false && <Piece c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Piece c={shade(col, 0.22)} e={0} /></g>
      <Piece c={col} e={0} />
      <rect x={-120} y={20} width={180} height={18} rx={9} fill="#FFFFFF" opacity={0.35} />
    </g>
  );
}
