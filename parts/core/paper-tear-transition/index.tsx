import React from "react";
import { clamp, ease, lerp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Paper tear transition: a full-frame sheet of paper (u.card) slides across with a torn, jagged edge.
// mode "in": the sheet slides in from the left and covers the frame and stays there.
// mode "out": the sheet starts covering the frame and slides off to the right, revealing what is underneath.
// The torn edge has a slight shadow and a light fibre line.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 24));
  const sd = String(p.seed ?? "tear");
  const t = clamp(lf / len);
  // Edge position across the frame: -40 covers nothing, 1120 covers everything.
  const e = lerp(-40, 1120, ease(t));
  if (lf < 0 && !out) return null;
  if (out ? e > 1100 : e < -20) return null;
  const N = 50;
  const pts: [number, number][] = [];
  for (let j = 0; j <= N; j++) {
    const yy = -40 + (j * (1920 + 80)) / N;
    const jag = (random(`${sd}-${j}`) - 0.5) * 70;
    pts.push([e + jag, yy]);
  }
  // The sheet is the torn edge plus a far corner: left of the edge for "in", right of it for "out".
  const sheet = (dx: number) => {
    const trace = pts.map(([px, py], j) => `${j || !out ? "L" : "M"}${(px + dx).toFixed(1)} ${py.toFixed(1)}`).join(" ");
    return out ? `${trace} L${1480 + dx} 1960 L${1480 + dx} -40 Z` : `M-400 -40 ${trace} L-400 1960 Z`;
  };
  const body = sheet(0);
  const sideDir = out ? -1 : 1;
  const shadowPath = (dx: number) => sheet(dx);
  const fibre = pts.map(([px, py], j) => `${j ? "L" : "M"}${(px - sideDir * 5).toFixed(1)} ${py.toFixed(1)}`).join(" ");
  return (
    <g>
      <path d={shadowPath(sideDir * 10)} fill={u.ink} opacity={0.1} />
      <path d={shadowPath(sideDir * 22)} fill={u.ink} opacity={0.08} />
      <path d={body} fill={u.card} />
      <path d={fibre} fill="none" stroke="#E6DCC4" strokeWidth={3} strokeLinejoin="round" opacity={0.9} />
    </g>
  );
}
