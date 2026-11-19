import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Card, Txt } from "../stat-card/index";

// Answer reveal: a card with a question and a covered answer; the cover slides away and a tick sparkle appears.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const W = 860, H = 400;
  const question = String(p.question ?? "How many hearts does an octopus have?");
  const answer = String(p.answer ?? "Three");
  const qs = fitSize(question, 50, W - 120);
  const as = fitSize(answer, 60, W - 260);
  const k = popIn(p.f, at, 12);
  const revealAt = Number(p.revealAt ?? 24);
  const rt = clamp((p.f - at - revealAt) / 16);
  const slide = 1 - (1 - rt) * (1 - rt) * (1 - rt);
  const eQ = enter(p.f, at + 4, 12);
  const tick = popIn(p.f, at + revealAt + 10, 10);
  const cx = W / 2 - 90, cy = 60;
  const cid = `ar-${Math.round(p.x ?? 540)}-${Math.round(p.y ?? 960)}`;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <defs>
        <clipPath id={cid}><rect x={-W / 2} y={-H / 2} width={W} height={H} rx={36} /></clipPath>
      </defs>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} r={36} />
      <g opacity={eQ}>
        <Txt x={-W / 2 + 60} y={-H / 2 + 100} u={u} size={qs} weight={800} anchor="start" maxW={W - 120}>{question}</Txt>
      </g>
      <line x1={-W / 2 + 60} x2={W / 2 - 60} y1={-30} y2={-30} stroke={u.muted} strokeWidth={4} strokeDasharray="14 12" opacity={eQ} />
      <g clipPath={`url(#${cid})`}>
        <g transform={`translate(${slide * (W + 40)} 0)`}>
          <rect x={-W / 2 + 40} y={-10} width={W - 80} height={150} rx={26} fill={u.accent} stroke={u.ink} strokeWidth={5} />
          <Txt x={0} y={100} u={u} size={64} weight={900} fill={u.white}>?</Txt>
        </g>
      </g>
      <g opacity={rt}>
        <Txt x={-70} y={100} u={u} size={as} weight={900} fill={u.ink} maxW={W - 260}>{answer}</Txt>
      </g>
      <g transform={`translate(${cx} ${cy}) scale(${tick})`}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i * Math.PI) / 2 + Math.PI / 4;
          return (
            <line key={i} x1={Math.cos(a) * 58} y1={Math.sin(a) * 58} x2={Math.cos(a) * (58 + 26 * rt)} y2={Math.sin(a) * (58 + 26 * rt)}
              stroke={u.warn} strokeWidth={8} strokeLinecap="round" opacity={rt} />
          );
        })}
        <circle r={42} fill={u.good} stroke={u.ink} strokeWidth={5} />
        <path d="M-18 2 L-5 16 L20 -12" fill="none" stroke={u.white} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}
