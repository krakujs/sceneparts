import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Candle stick: brass chamberstick with a finger ring and a dripping candle whose flame flickers. Hero close-up; (x, y) is the base.
export const CandleStick: React.FC<{ x: number; y: number; s?: number; f?: number; lit?: boolean; brass?: string; candle?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, lit = true, brass = "#D9A441", candle = C.cream, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const flick = 1 + Math.sin(f / 2.3) * 0.08 + Math.sin(f / 5.1) * 0.05;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={190} ry={18} fill="#000" opacity={0.2} />
      {lit ? <circle cx={0} cy={-420} r={150 * flick} fill={C.glow} opacity={0.25} /> : null}
      {/* finger ring */}
      <path d="M 130 -120 Q 250 -120 250 -60 Q 250 0 130 -10" stroke={C.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M 130 -120 Q 250 -120 250 -60 Q 250 0 130 -10" stroke={brass} strokeWidth={12} fill="none" strokeLinecap="round" />
      {/* base plate and drip pan */}
      <ellipse cx={0} cy={-34} rx={170} ry={30} fill={brass} {...o} />
      <ellipse cx={0} cy={-38} rx={120} ry={18} fill="none" stroke={C.ink} strokeWidth={4} opacity={0.5} />
      <path d="M -150 -40 Q -60 -20 0 -18 Q 60 -20 150 -40" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.45} strokeLinecap="round" />
      <rect x={-18} y={-110} width={36} height={80} fill={brass} {...o} />
      <ellipse cx={0} cy={-112} rx={84} ry={20} fill={brass} {...o} />
      {/* candle */}
      <rect x={-36} y={-360} width={72} height={252} fill={candle} {...o} />
      <path d="M -26 -340 L -26 -130" stroke="#FFFFFF" strokeWidth={8} opacity={0.6} strokeLinecap="round" />
      <path d="M -36 -262 Q -40 -240 -30 -230 Q -22 -226 -20 -214 L -20 -110 L -36 -110 Z" fill={candle} stroke="none" />
      <path d="M -36 -300 Q -30 -280 -36 -262" stroke={C.ink} strokeWidth={5} fill="none" />
      <path d="M 36 -320 Q 42 -296 36 -270 Q 40 -240 36 -200" stroke={C.ink} strokeWidth={5} fill="none" opacity={0.4} />
      <path d="M -36 -360 L 36 -360" stroke={C.ink} strokeWidth={6} />
      <line x1={0} y1={-360} x2={0} y2={-372} stroke={C.ink} strokeWidth={4} />
      {/* wax drips down the sides */}
      <path d="M -36 -340 Q -52 -330 -48 -300 Q -46 -290 -36 -292" fill={candle} {...o} />
      <path d="M 36 -350 Q 58 -342 56 -302 Q 54 -286 44 -286 L 36 -300" fill={candle} {...o} />
      {/* flame */}
      {lit ? (
        <g transform={`translate(0 -372) scale(${flick})`}>
          <path d="M 0 -110 Q 44 -48 28 -6 Q 0 22 -28 -6 Q -44 -48 0 -110 Z" fill="#F08A24" stroke={C.ink} strokeWidth={5} />
          <path d="M 0 -58 Q 14 -26 8 -6 Q 0 4 -8 -6 Q -14 -26 0 -58 Z" fill={C.glow} />
        </g>
      ) : null}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <CandleStick x={p.x} y={p.y} s={p.s} f={p.f} lit={p.lit} brass={p.brass} candle={p.candle} flip={p.flip} />;
}
