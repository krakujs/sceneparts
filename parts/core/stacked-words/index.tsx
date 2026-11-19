import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Stacked words: 2-4 words stacked in lines that alternate colour and size, each one slamming in after the last.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const raw = String(p.text ?? "");
  const lines = (raw.includes("|") ? raw.split("|") : raw.split(" ")).map((l) => l.trim()).filter(Boolean).slice(0, 4);
  if (!lines.length) return null;
  const big = Number(p.size ?? 150);
  const sizes = lines.map((l, i) => fitSize(l, i % 2 ? big * 0.7 : big, 980, 0.74));
  // Baselines: each line sits 0.92 of its own size below the previous one (caps are ~0.72 of size tall).
  const ys: number[] = [];
  let y = 0;
  sizes.forEach((sz, i) => { if (i > 0) y += 0.92 * sz; ys.push(y); });
  const top = ys[0] - 0.72 * sizes[0];
  const off = -(top + ys[ys.length - 1]) / 2;
  const stagger = Math.max(1, Number(p.stagger ?? 8));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {lines.map((l, i) => {
        const sz = sizes[i];
        const t = clamp((lf - i * stagger) / 10);
        const sc = 1 + 1.8 * Math.pow(1 - t, 2);
        const op = clamp((lf - i * stagger) / 3);
        const odd = i % 2 === 1;
        return (
          <g key={i} opacity={op} transform={`translate(0 ${(ys[i] + off).toFixed(1)}) scale(${sc.toFixed(3)})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
              fill={odd ? u.white : u.accent} stroke={u.ink} strokeWidth={sz * 0.06} paintOrder="stroke" strokeLinejoin="round">{l}</text>
          </g>
        );
      })}
    </g>
  );
}
