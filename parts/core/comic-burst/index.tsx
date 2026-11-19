import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Txt } from "../stat-card/index";

// Comic burst: a jagged comic-book speech burst with a bold ink outline and a word that pops in with overshoot.
// The text is drawn with a white outline so it reads on any background. Shape and word are closed-form per frame.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "comic");
  const R = Math.max(80, Number(p.r ?? 320));
  const size = Number(p.size ?? 150);
  const tilt = Number(p.tilt ?? -8);
  const text = String(p.text ?? "POW!");
  const k = popIn(lf, 0, 9);
  const N = 18;
  const pts = Array.from({ length: N * 2 }, (_, i) => {
    const a = (i / (N * 2)) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? R * (0.92 + 0.16 * random(`${sd}-${i}`)) : R * (0.62 + 0.12 * random(`${sd}-${i}`));
    return `${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`;
  });
  const d = "M" + pts.join(" L") + " Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${tilt}) scale(${k.toFixed(3)})`}>
      <path d={d} fill="#FFE14D" stroke={u.ink} strokeWidth={14} strokeLinejoin="miter" />
      <Txt x={0} y={size * 0.36} u={u} size={size} weight={900} fill={u.accent} stroke="#FFFFFF" sw={12} maxW={R * 1.45}>{text}</Txt>
    </g>
  );
}
