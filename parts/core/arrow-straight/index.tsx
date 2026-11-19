import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn } from "../stat-card/index";

// Straight arrow from (ax,ay) to (bx,by): the shaft draws itself, then the head pops.
// look: solid (accent fill) | outline (ink edge) | sketch (wobbly hand-drawn double line).
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
const HL = 58, HW = 38; // head length and half width

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const A: V = [p.ax ?? 240, p.ay ?? 960];
  const B: V = [p.bx ?? 840, p.by ?? 960];
  const look = String(p.look ?? "solid");
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
  const ux = dx / L, uy = dy / L;
  const ang = (Math.atan2(uy, ux) * 180) / Math.PI;
  const shaftLen = L - HL * 0.6;
  const prog = enter(p.f, at, 18);
  const headK = popIn(p.f, at + 16, 10);
  const headD = `M0 0 L${-HL} ${-HW} L${-HL} ${HW} Z`;
  const tip: V = [A[0] + ux * shaftLen * prog, A[1] + uy * shaftLen * prog];
  const head = (
    <g transform={`translate(${B[0]} ${B[1]}) rotate(${ang}) scale(${headK})`}>
      {look === "sketch" ? (
        <>
          <path d={`M0 0 L${-HL + (random("wa") - 0.5) * 8} ${-HW + (random("wb") - 0.5) * 8}`} stroke={u.accent} strokeWidth={12} strokeLinecap="round" fill="none" />
          <path d={`M0 0 L${-HL + (random("wc") - 0.5) * 8} ${HW + (random("wd") - 0.5) * 8}`} stroke={u.accent} strokeWidth={12} strokeLinecap="round" fill="none" />
        </>
      ) : look === "outline" ? (
        <>
          <path d={headD} fill={u.ink} stroke={u.ink} strokeWidth={18} strokeLinejoin="round" />
          <path d={headD} fill={u.accent} stroke={u.accent} strokeWidth={6} strokeLinejoin="round" />
        </>
      ) : (
        <path d={headD} fill={u.accent} stroke={u.accent} strokeWidth={8} strokeLinejoin="round" />
      )}
    </g>
  );
  let shaft: React.ReactNode;
  if (look === "sketch") {
    const N = 28;
    const pts: V[] = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      if (t > prog) break;
      const j = (random(`sk${i}`) - 0.5) * 7 * Math.sin(Math.PI * t);
      pts.push([A[0] + ux * shaftLen * t - uy * j, A[1] + uy * shaftLen * t + ux * j]);
    }
    pts.push(tip);
    const d = `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;
    shaft = (
      <>
        <path d={d} fill="none" stroke={u.accent} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={u.accent} strokeWidth={5} strokeLinecap="round" opacity={0.55} transform="translate(3 -3)" />
      </>
    );
  } else if (look === "outline") {
    shaft = (
      <>
        <line x1={A[0]} y1={A[1]} x2={tip[0]} y2={tip[1]} stroke={u.ink} strokeWidth={36} strokeLinecap="round" />
        <line x1={A[0]} y1={A[1]} x2={tip[0]} y2={tip[1]} stroke={u.accent} strokeWidth={22} strokeLinecap="round" />
      </>
    );
  } else {
    shaft = <line x1={A[0]} y1={A[1]} x2={tip[0]} y2={tip[1]} stroke={u.accent} strokeWidth={22} strokeLinecap="round" />;
  }
  return (
    <g transform={`translate(0 0) scale(${s})`}>
      {shaft}
      {head}
    </g>
  );
}
