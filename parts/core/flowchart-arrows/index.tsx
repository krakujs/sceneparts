import React from "react";
import { type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Flowchart: start oval, a decision diamond, then Yes and No branches to two boxes. Arrows draw between them.
const wrap = (t: string, size: number, maxW: number) => {
  const per = Math.max(4, Math.floor(maxW / (size * 0.56)));
  const out: string[] = [];
  let cur = "";
  for (const w of String(t ?? "").split(/\s+/).filter(Boolean)) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > per && cur) { out.push(cur); cur = w; } else cur = next;
  }
  if (cur) out.push(cur);
  return out.length ? out : [""];
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const F = (k: number) => f0 + k;
  const start = String(p.start ?? "Start");
  const question = String(p.question ?? "Ready to ship?");
  const yes = String(p.yes ?? "Publish the update");
  const no = String(p.no ?? "Fix the bugs first");

  const eStart = popIn(p.f, F(0), 10);
  const eArrow1 = enter(p.f, F(4), 10);
  const dia = popIn(p.f, F(12), 10);
  const eBranch = enter(p.f, F(20), 10);
  const eLab = enter(p.f, F(28), 8);
  const bl = popIn(p.f, F(30), 10);
  const br = popIn(p.f, F(32), 10);
  const hLine = (d: string, k: number) => (
    <DrawPath d={d} fill="none" stroke={u.ink} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round"
      k={k} />
  );
  const boxLines = (t: string) => wrap(t, 40, 270);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g transform="translate(0 126)">
        {/* start oval */}
        <g transform={`translate(0 -330) scale(${eStart})`}>
          <ellipse rx={170} ry={52} fill={u.accent} stroke={u.ink} strokeWidth={6} />
          <Txt x={0} y={17} u={u} size={50} weight={900} fill={u.white}>{start}</Txt>
        </g>
        {/* arrow start -> decision */}
        <DrawPath d="M0 -278 L0 -238" fill="none" stroke={u.ink} strokeWidth={8} strokeLinecap="round"
          k={eArrow1} />
        <path d="M-13 -238 L13 -238 L0 -218 Z" fill={u.ink} opacity={eArrow1} />
        {/* decision diamond */}
        <g transform={`translate(0 -100) scale(${dia}) translate(0 100)`}>
          <polygon points="0,-220 230,-100 0,20 -230,-100" fill={u.warn} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
          {wrap(question, 40, 360).map((l, j, a) => (
            <Txt key={j} x={0} y={-100 + (j - (a.length - 1) / 2) * 46 + 14} u={u} size={40} weight={900} maxW={360}>{l}</Txt>
          ))}
        </g>
        {/* branches */}
        {hLine("M-230 -100 H-300 V-36", eBranch)}
        {hLine("M230 -100 H300 V-36", eBranch)}
        <path d="M-313 -36 L-287 -36 L-300 -16 Z" fill={u.ink} opacity={eBranch} />
        <path d="M287 -36 L313 -36 L300 -16 Z" fill={u.ink} opacity={eBranch} />
        <Txt x={-265} y={-112} u={u} size={38} weight={900} fill={u.bad} opacity={eLab}>No</Txt>
        <Txt x={265} y={-112} u={u} size={38} weight={900} fill={u.good} opacity={eLab}>Yes</Txt>
        {/* result boxes */}
        <g transform={`translate(-300 57) scale(${bl})`}>
          <rect x={-160} y={-75} width={320} height={150} rx={26} fill={u.bad} stroke={u.ink} strokeWidth={6} />
          {boxLines(no).map((l, j, a) => (
            <Txt key={j} x={0} y={(j - (a.length - 1) / 2) * 46 + 14} u={u} size={40} weight={800} fill={u.white} maxW={280}>{l}</Txt>
          ))}
        </g>
        <g transform={`translate(300 57) scale(${br})`}>
          <rect x={-160} y={-75} width={320} height={150} rx={26} fill={u.good} stroke={u.ink} strokeWidth={6} />
          {boxLines(yes).map((l, j, a) => (
            <Txt key={j} x={0} y={(j - (a.length - 1) / 2) * 46 + 14} u={u} size={40} weight={800} fill={u.white} maxW={280}>{l}</Txt>
          ))}
        </g>
      </g>
    </g>
  );
}
