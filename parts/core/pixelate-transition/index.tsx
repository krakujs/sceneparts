import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Pixelate transition: the frame is covered by a grid of square blocks that fill in (mode in) or clear (mode out)
// in a deterministic shuffled order. The order comes from random(seed + cell index), so it is stable every render.

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 24));
  const block = clamp(Number(p.block ?? 120), 40, 400);
  const sd = String(p.seed ?? "pixel");
  const prog = ease(clamp(lf / len));
  const k = out ? 1 - prog : prog;
  const cols = Math.ceil(1080 / block), rows = Math.ceil(1920 / block);
  let d = "";
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const rank = random(`${sd}-${r}-${col}`);
      if (k > rank * 0.85) {
        d += `M${col * block} ${r * block}h${block}v${block}h${-block}Z`;
        count++;
      }
    }
  }
  if (!count) return null;
  if (count === cols * rows) return <rect x={-40} y={-40} width={1160} height={2000} fill={c} />;
  return <path d={d} fill={c} />;
}
