import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Marker slash across a word: x,y = centre of the word, w = its width. kind = line | double | cross.
// Each stroke draws itself left to right. Default colour is the red pen (u.bad).
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const col = p.color || base.bad;
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const cx = p.x ?? 540, cy = p.y ?? 960, w = p.w ?? 420;
  const kind = String(p.kind ?? "line");
  const stroke = (a: V, b: V, t0: number, key: string) => {
    const k = enter(p.f, at + t0, 16);
    const e: V = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    return <line key={key} x1={a[0]} y1={a[1]} x2={e[0]} y2={e[1]} stroke={col} strokeWidth={kind === "line" ? 18 : 14} strokeLinecap="round" />;
  };
  const x1 = cx - w / 2 - 24, x2 = cx + w / 2 + 24;
  const parts: React.ReactNode[] = [stroke([x1, cy + 12], [x2, cy - 12], 0, "a")];
  if (kind === "double") {
    parts.push(stroke([x1, cy + 40], [x2, cy + 16], 8, "b"));
  }
  if (kind === "cross") {
    parts.push(stroke([x2 - 10, cy - 46], [x1 + 10, cy + 46], 14, "c"));
  }
  return <g transform={`translate(0 0) scale(${s})`}>{parts}</g>;
}
