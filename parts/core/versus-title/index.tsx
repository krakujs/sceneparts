import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize, popIn } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Versus title: two names slide in from opposite sides of a diagonal split band, with a VS badge popping in the middle.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const left = String(p.left ?? "Cats");
  const right = String(p.right ?? "Dogs");
  const vs = String(p.text ?? "VS");
  const nameSize = Number(p.size ?? 110);
  const sl = fitSize(left, nameSize, 300, 0.74);
  const sr = fitSize(right, nameSize, 300, 0.74);
  const e = 1 - Math.pow(1 - clamp(lf / 16), 3);
  const band = clamp(lf / 6);
  const badge = popIn(lf, 14, 10);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`} opacity={band}>
      <polygon points="-600,-180 60,-180 -60,180 -600,180" fill={u.accent} />
      <polygon points="60,-180 600,-180 600,180 -60,180" fill={u.ink} />
      <line x1={60} y1={-180} x2={-60} y2={180} stroke={u.white} strokeWidth={12} />
      <g transform={`translate(${(-700 * (1 - e)).toFixed(1)} 0)`}>
        <text x={-290} y={sl * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sl}
          fill={u.white} stroke={u.ink} strokeWidth={sl * 0.06} paintOrder="stroke" strokeLinejoin="round">{left}</text>
      </g>
      <g transform={`translate(${(700 * (1 - e)).toFixed(1)} 0)`}>
        <text x={290} y={sr * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sr}
          fill={u.white} stroke={u.ink} strokeWidth={sr * 0.06} paintOrder="stroke" strokeLinejoin="round">{right}</text>
      </g>
      <g transform={`rotate(-8) scale(${badge.toFixed(3)})`}>
        <circle r={70} fill={u.white} stroke={u.ink} strokeWidth={9} />
        <text x={0} y={25} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={66} fill={u.accent}>{vs}</text>
      </g>
    </g>
  );
}
