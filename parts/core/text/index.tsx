import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";

export const Txt: React.FC<{ x: number; y: number; text: string; size?: number; c: string; ink: string; font: string; rot?: number }> = ({ x, y, text, size = 64, c, ink, font, rot = 0 }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={size} fill={c} transform={`rotate(${rot} ${x} ${y})`} stroke={c === ink ? "none" : ink} strokeWidth={c === ink ? 0 : 3}>{text}</text>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <g opacity={clamp((p.f - (p.at ?? 0) * p.d) / 4)}>
      <Txt x={p.x} y={p.y} text={String(p.text ?? "")} size={p.size} c={p.c ?? p.style.accent} ink={p.style.ink} font={p.style.font} rot={p.rot} />
    </g>
  );
}
