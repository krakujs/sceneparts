import React from "react";
import type { PartProps } from "@sceneparts/core";
import KitePart from "../kite/index";

// Five kites at different heights and sizes, each drawn by the kite part and swaying with its own phase.
// Positions are absolute at the default x = 540, y = 600; the whole group moves with x and y.
/* eslint-disable @typescript-eslint/no-explicit-any */
const KITES = [
  { x: 200, y: 430, s: 0.8, color: "#3D6FE0", accent: "#FFC83D" },
  { x: 430, y: 280, s: 0.9, color: "#FF8A3D", accent: "#F27BA6" },
  { x: 660, y: 520, s: 0.85, color: "#1FA39A", accent: "#FFC83D" },
  { x: 880, y: 300, s: 0.75, color: "#F27BA6", accent: "#3D6FE0" },
  { x: 330, y: 680, s: 0.6, color: "#7B5CD6", accent: "#A8D85A" },
];

export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 600, s = p.s ?? 1;
  const anim: string = p.anim ?? "fly";
  const dx = x - 540, dy = y - 600;
  return (
    <g transform={`translate(${dx} ${dy}) translate(540 600) scale(${p.flip ? -s : s} ${s}) translate(-540 -600)`}>
      {KITES.map((k, i) => {
        const q: any = { ...p, x: k.x, y: k.y, s: k.s, color: k.color, accent: k.accent, anim, flip: false };
        // stagger each kite's sway so they do not move in step
        const f = (p.f ?? 0) + i * 17;
        return <KitePart key={i} {...q} f={f} />;
      })}
    </g>
  );
}
