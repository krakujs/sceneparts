import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stretched canvas leaning upright: a wooden stretcher frame around a canvas face with a painting.
// Origin = bottom centre of the frame. art: blank, landscape (hills and sun) or abstract (colour blocks).
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const W = 230, H = 290; // half-width and height of the canvas face (frame is 20 px outside)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.frame && p.frame !== "none" ? p.frame : "#C9A46C";
  const art: string = p.art ?? "blank";
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 1.5 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  const top = -H - 40; // top edge of the frame
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 40} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(rock)} 0 0) scale(${f1(pop)})`}>
        {/* wooden stretcher frame (back edge visible on the side for depth) */}
        <rect x={-W - 40} y={top} width={2 * W + 80} height={H + 40 + 0} rx={6} fill={shade(frame, 0.25)} />
        <rect x={-W - 20} y={top + 20} width={2 * W + 40} height={H + 20} rx={4} fill={frame} />
        {/* canvas face */}
        <rect x={-W} y={top + 40} width={2 * W} height={H} fill="#FFFFFF" />
        <clipPath id="canvas-clip"><rect x={-W} y={top + 40} width={2 * W} height={H} /></clipPath>
        <g clipPath="url(#canvas-clip)">
          {art === "landscape" && (
            <g>
              <rect x={-W} y={top + 40} width={2 * W} height={H} fill={C.sky} />
              <circle cx={120} cy={top + 110} r={44} fill={C.yellow} />
              <path d={`M ${-W} ${top + 220} Q -80 ${top + 120} 20 ${top + 200} Q 120 ${top + 150} ${W} ${top + 190} L ${W} ${top + 340} L ${-W} ${top + 340} Z`} fill={C.green} />
              <path d={`M ${-W} ${top + 270} Q -40 ${top + 230} 60 ${top + 275} Q 140 ${top + 250} ${W} ${top + 280} L ${W} ${top + 340} L ${-W} ${top + 340} Z`} fill={C.greenDark} />
            </g>
          )}
          {art === "abstract" && (
            <g>
              <rect x={-W} y={top + 40} width={2 * W} height={H} fill={C.paper} />
              <rect x={-W} y={top + 40} width={150} height={150} fill={C.red} />
              <circle cx={60} cy={top + 230} r={80} fill={C.blue} />
              <rect x={20} y={top + 110} width={200} height={70} fill={C.yellow} />
              <rect x={-40} y={top + 300} width={210} height={40} rx={4} fill={C.purple} />
              <path d={`M 90 ${top + 40} L ${W} ${top + 40} L ${W} ${top + 150} Z`} fill={C.teal} />
            </g>
          )}
        </g>
        {/* front-edge highlight */}
        <rect x={-W - 20} y={top + 20} width={6} height={H + 20} fill="#FFFFFF" opacity={0.2} />
      </g>
    </g>
  );
}
