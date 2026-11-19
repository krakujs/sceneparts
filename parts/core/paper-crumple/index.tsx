import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Paper crumple: a flat sheet folds in on itself (its outline morphs into a crumpled ball), then the ball bounces.
// Creases fade out while the wrinkles of the ball fade in. Closed-form per frame, so any frame renders alone.

const SHEET: [number, number][] = [[-170, -220], [0, -235], [170, -220], [178, 0], [170, 220], [0, 235], [-170, 220], [-178, 0]];
const N = SHEET.length;
const CR = 30; // frames to crumple

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "crumple");
  const ball = SHEET.map((_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = 108 * (1 + 0.14 * (random(`${sd}-b${i}`) - 0.5) * 2);
    return [Math.cos(a) * r, Math.sin(a) * r * 0.96];
  });
  const pts = SHEET.map(([sx, sy], i) => {
    const k = ease(clamp((lf - i * 1.2) / (CR - 6)));
    const wr = Math.sin(k * Math.PI) * 26 * (random(`${sd}-w${i}`) - 0.5) * 2;
    return [sx + (ball[i][0] - sx) * k + wr, sy + (ball[i][1] - sy) * k - wr * 0.6];
  });
  const outline = pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join(" ") + " Z";
  const creases: [number, number][] = [[0, 3], [1, 5], [2, 6], [4, 7]];
  const flatOp = clamp(1 - lf / 22);
  const wrinkleOp = clamp((lf - 20) / 10) * 0.7;
  const tb = Math.max(0, lf - CR);
  const hop = Math.abs(Math.sin(tb * 0.13)) * 300 * Math.exp(-tb / 40);
  const shadow = clamp(lf / CR) * 0.25;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={132} rx={(110 - hop * 0.25).toFixed(1) as unknown as number} ry={18} fill={`rgba(0,0,0,${shadow.toFixed(3)})`} />
      <g transform={`translate(0 ${(-hop).toFixed(1)})`}>
        <path d={outline} fill="#FBF6EA" stroke={u.ink} strokeWidth={8} strokeLinejoin="round" />
        <g opacity={flatOp}>
          {creases.map(([a, b], i) => (
            <line key={i} x1={pts[a][0].toFixed(1)} y1={pts[a][1].toFixed(1)} x2={pts[b][0].toFixed(1)} y2={pts[b][1].toFixed(1)} stroke={u.muted} strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
        <g opacity={wrinkleOp}>
          {[0, 2, 4, 6].map((i) => (
            <path key={i} d={`M${(ball[i][0] * 0.45).toFixed(1)} ${(ball[i][1] * 0.45).toFixed(1)} Q0 0 ${(ball[(i + 3) % N][0] * 0.5).toFixed(1)} ${(ball[(i + 3) % N][1] * 0.5).toFixed(1)}`}
              fill="none" stroke={u.muted} strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
      </g>
    </g>
  );
}
