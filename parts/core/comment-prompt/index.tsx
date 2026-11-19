import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Comment prompt: a speech-bubble icon with typing dots, then a short comment bubble pops out beside it.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const t = Math.max(0, p.f - at);
  const popAt = Number(p.popAt ?? 30);
  const text = String(p.text ?? "So true!");
  const bw = 430, bh = 130, bx = -120;
  const tfs = fitSize(text, 50, bw - 90);
  const k = popIn(p.f, at, 12);
  const cm = popIn(p.f, at + popAt, 12);
  const dotsDone = Math.min(1, Math.max(0, (p.f - at - popAt) / 4));
  const accent = p.color ?? u.accent;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <rect x={-330} y={-70} width={150} height={104} rx={40} fill={accent} stroke={u.ink} strokeWidth={6} />
      <path d="M-300 26 L-300 60 L-266 30 Z" fill={accent} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-318} y={-30} width={0} height={0} />
      {[0, 1, 2].map((i) => {
        const dy = -Math.abs(Math.sin(t * 0.3 - i * 0.7)) * 12;
        return <circle key={i} cx={-290 + i * 30} cy={-18 + dy} r={9} fill={u.white} opacity={0.4 + 0.6 * (1 - dotsDone)} />;
      })}
      <g transform={`translate(${bx} 0) scale(${cm})`} opacity={cm > 0 ? 1 : 0}>
        <rect x={0} y={-bh / 2} width={bw} height={bh} rx={36} fill={u.card} stroke={u.ink} strokeWidth={6} />
        <Txt x={bw / 2} y={tfs * 0.36} u={u} size={tfs} weight={800} maxW={bw - 90}>{text}</Txt>
      </g>
    </g>
  );
}
