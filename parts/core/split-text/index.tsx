import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Split text: the word is cut into a top and a bottom half that slide apart, then join back into one word.
// Each half is the same word with a hard-edged gradient that keeps only its half visible (no clipPath).

const top: [number, number][] = [[0, 1], [0.5, 1], [0.5001, 0], [1, 0]];
const bot: [number, number][] = [[0, 0], [0.4999, 0], [0.5, 1], [1, 1]];

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 150), 980, 0.74);
  const uid = String(p.seed ?? "split").replace(/[^a-zA-Z0-9]/g, "") || "split";
  const dur = Math.max(4, Number(p.dur ?? 36));
  const g = sz * 0.4 * Math.sin(clamp(lf / dur) * Math.PI);
  // Gradients live in each half's own (translated) space, so the midline sits at +g for the top half and -g for the bottom.
  const grad = (id: string, color: string, stops: [number, number][], mid: number) => (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} y1={-2 * sz + mid} x2={0} y2={2 * sz + mid}>
      {stops.map(([o, op], i) => <stop key={i} offset={o} stopColor={color} stopOpacity={op} />)}
    </linearGradient>
  );
  const half = (suffix: string, stops: [number, number][], mid: number, dy: number) => (
    <g transform={`translate(0 ${dy.toFixed(2)})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={`url(#${uid}-${suffix}f)`} stroke={`url(#${uid}-${suffix}s)`} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">{text}</text>
    </g>
  );
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <defs>
        {grad(`${uid}-tf`, u.accent, top, g)}
        {grad(`${uid}-ts`, u.ink, top, g)}
        {grad(`${uid}-bf`, u.accent, bot, -g)}
        {grad(`${uid}-bs`, u.ink, bot, -g)}
      </defs>
      {half("t", top, g, -g)}
      {half("b", bot, -g, g)}
    </g>
  );
}
