import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Gramophone: wooden box gramophone with a big flared horn and a spinning record, with music notes floating up. Stands on (x, y) at floor level.
export const Gramophone: React.FC<{ x: number; y: number; s?: number; f?: number; playing?: boolean; wood?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, playing = true, wood = C.sepia, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const dark = "#5E4530";
  const brass = "#D9A441";
  const TX = -50, TY = -310;
  const th = playing ? f * 0.15 : 0;
  const lx = TX + Math.cos(th) * 42, ly = TY + Math.sin(th) * 42 * 0.22;
  const notes = [0, 1, 2].map((i) => {
    const t = ((f + i * 70) % 210) / 210;
    return { x: 180 + i * 40 + Math.sin(t * 6) * 16, y: -640 - t * 200, op: 1 - t };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={280} ry={20} fill="#000" opacity={0.18} />
      {/* cabinet on short legs */}
      <rect x={-200} y={-50} width={20} height={50} fill={dark} {...o} />
      <rect x={100} y={-50} width={20} height={50} fill={dark} {...o} />
      <rect x={-230} y={-300} width={370} height={256} rx={8} fill={wood} {...o} />
      <rect x={-210} y={-280} width={330} height={216} rx={6} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5} />
      <rect x={-200} y={-200} width={120} height={120} rx={6} fill={dark} stroke={C.ink} strokeWidth={5} />
      <path d="M -190 -190 L -90 -110" stroke="#FFFFFF" strokeWidth={6} opacity={0.2} strokeLinecap="round" />
      <circle cx={100} cy={-170} r={22} fill={brass} {...o} />
      <path d="M 100 -170 L 150 -130" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
      {/* turntable and record, seen as a tilted disc */}
      <ellipse cx={TX} cy={TY} rx={160} ry={34} fill={dark} {...o} />
      <ellipse cx={TX} cy={TY - 4} rx={132} ry={26} fill={C.ink} />
      {[110, 96, 82].map((r) => <ellipse key={r} cx={TX} cy={TY - 4} rx={r} ry={r * 0.2} fill="none" stroke={C.stone} strokeWidth={3} />)}
      <ellipse cx={lx} cy={ly - 4} rx={18} ry={4} fill={C.brick} />
      <ellipse cx={TX} cy={TY - 4} rx={8} ry={2} fill={brass} />
      {/* tone arm */}
      <path d="M 120 -330 Q 80 -340 40 -320" stroke={C.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 120 -330 Q 80 -340 40 -320" stroke={brass} strokeWidth={7} fill="none" strokeLinecap="round" />
      {/* horn: neck, then a flared bell */}
      <path d="M -120 -330 Q -110 -400 -60 -430" stroke={C.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M -120 -330 Q -110 -400 -60 -430" stroke={brass} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -66 -440 L -10 -600 Q 120 -700 250 -630 L 120 -456 Z" fill={brass} {...o} />
      <path d="M -10 -600 Q 120 -700 250 -630" fill="none" stroke={C.ink} strokeWidth={10} />
      <path d="M 250 -630 Q 280 -600 256 -560" fill="none" stroke={brass} strokeWidth={14} />
      <path d="M 40 -560 Q 90 -640 180 -640" stroke="#FFFFFF" strokeWidth={8} opacity={0.4} fill="none" strokeLinecap="round" />
      {/* music notes */}
      {playing ? notes.map((n, i) => (
        <g key={i} opacity={n.op}>
          <ellipse cx={n.x} cy={n.y} rx={13} ry={10} fill={C.ink} transform={`rotate(-20 ${n.x} ${n.y})`} />
          <rect x={n.x + 9} y={n.y - 50} width={5} height={56} fill={C.ink} />
        </g>
      )) : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Gramophone x={p.x} y={p.y} s={p.s} f={p.f} playing={p.playing} wood={p.wood} flip={p.flip} />;
}
