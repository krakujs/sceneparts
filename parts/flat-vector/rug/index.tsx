import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rug: a wide, very flat rounded rectangle lying on the floor, seen in perspective. Its centre sits on y, so
// half is just above and half just below the floor line. A coloured border ring and a row of diamonds.
// No ground shadow. Origin = centre of the rug.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `scale(1 ${f1(1 + Math.sin((f * 2 * Math.PI) / 60) * 0.02)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 0.6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const W = 380, H = 66; // half width and half height in perspective
  const dk = shade(c, 0.12);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* the rug body and a slightly darker lower edge for a hint of depth */}
        <rect x={-W} y={-H + 6} width={2 * W} height={2 * H} rx={36} fill={dk} />
        <rect x={-W} y={-H} width={2 * W} height={2 * H - 6} rx={36} fill={accent} />
        {/* inner field */}
        <rect x={-W + 22} y={-H + 16} width={2 * W - 44} height={2 * H - 38} rx={24} fill={c} />
        {/* inner border line in accent */}
        <rect x={-W + 52} y={-H + 30} width={2 * W - 104} height={2 * H - 66} rx={16} fill={accent} opacity={0.85} />
        <rect x={-W + 70} y={-H + 40} width={2 * W - 140} height={2 * H - 86} rx={12} fill={c} />
        {/* row of diamonds across the middle, squashed for perspective */}
        {[-240, -120, 0, 120, 240].map((dx) => (
          <path key={dx} d={`M ${dx} -36 L ${dx + 22} 0 L ${dx} 36 L ${dx - 22} 0 Z`} fill={accent} />
        ))}
      </g>
    </g>
  );
}
