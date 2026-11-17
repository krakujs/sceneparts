import React from "react";
import { pop, type PartProps } from "@sceneparts/core";

export const Tag: React.FC<{ x: number; y: number; text: string; s?: number; ink: string; paper: string; accent: string; font: string }> = ({ x, y, text, s = 1, ink, paper, accent, font }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-(text.length * 17 + 40)} y={-46} width={text.length * 34 + 80} height={78} rx={14} fill={paper} stroke={ink} strokeWidth={8} />
    <text x={0} y={16} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={50} fill={accent}>{text}</text>
    <path d="M0 34 L0 120" fill="none" stroke={ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M-18 100 L0 126 L18 100" fill="none" stroke={ink} strokeWidth={8} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Tag x={p.x} y={p.y} text={String(p.text ?? "")} s={pop(p.f, (p.at ?? 0) * p.d)} ink={p.style.ink} paper={p.style.paper?.base ?? "#efe6cf"} accent={p.style.accent} font={p.style.font} />;
}
