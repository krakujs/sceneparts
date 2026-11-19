import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Scramble text: random characters flicker and then settle into the final text, left to right. Deterministic per frame.

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>/+01";

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 120), 980, 0.74);
  const uid = String(p.seed ?? "scramble").replace(/[^a-zA-Z0-9]/g, "") || "scramble";
  const st = Math.max(0, Number(p.stagger ?? 2));
  const hold = 14;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
        fill={u.muted} stroke={u.ink} strokeWidth={sz * 0.05} paintOrder="stroke" strokeLinejoin="round">
        {Array.from(text).map((ch, i) => {
          if (ch === " ") return " ";
          const resolved = lf >= i * st + hold;
          if (resolved) return <tspan key={i} fill={u.accent}>{ch}</tspan>;
          const pick = POOL[Math.floor(random(`${uid}-${i}-${Math.floor(lf / 2)}`) * POOL.length)];
          return <tspan key={i}>{pick}</tspan>;
        })}
      </text>
    </g>
  );
}
