import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of tabla drums seen from the front: a larger metal bayan on the left and a smaller wooden dayan
// on the right, each with a cream skin, a black centre spot and a tuning band of straps.
// Origin = bottom centre. About 520 px wide and 330 px tall at s = 1. anim "play" bounces each drum in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const metal = p.accent && p.accent !== "none" ? p.accent : C.greyLight;
  const anim: string = p.anim ?? "none";
  // which drum is up on this beat: the bayan on even beats, the dayan on odd beats
  const bounce = (k: number) => (anim === "play" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 20 + k * Math.PI)) * 10 : 0);
  const drum = (cx: number, w: number, h: number, body: string, band: string, k: number, straps: boolean) => {
    const top = -h, rx = w / 2, dy = -bounce(k);
    return (
      <g transform={`translate(${f1(cx)} ${f1(dy)})`}>
        <ellipse cx={0} cy={0} rx={rx * 0.9} ry={14} fill={C.shadow} />
        {/* body: a slightly bulged barrel */}
        <path d={`M ${-rx} ${top + 40} Q ${-rx - 10} ${-h / 2} ${-rx + 14} 0 L ${rx - 14} 0 Q ${rx + 10} ${-h / 2} ${rx} ${top + 40} Z`} fill={body} />
        <rect x={-rx + 8} y={-40} width={w - 16} height={40} rx={6} fill={shade(body, 0.3)} />
        {/* tuning band of straps */}
        {straps && Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-rx + 6 + i * (w - 12) / 8} y1={top + 62} x2={-rx + 20 + i * (w - 40) / 8} y2={-30} stroke={C.ink} strokeWidth={4} opacity={0.5} />
        ))}
        <rect x={-rx - 6} y={top + 40} width={w + 12} height={18} rx={9} fill={band} />
        {/* skin head */}
        <ellipse cx={0} cy={top + 36} rx={rx + 6} ry={26} fill={C.sand} />
        <ellipse cx={0} cy={top + 36} rx={rx - 10} ry={16} fill={C.white} opacity={0.5} />
        {/* black centre spot */}
        <ellipse cx={0} cy={top + 36} rx={rx * 0.28} ry={rx * 0.14} fill={C.ink} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {drum(-120, 240, 300, metal, C.yellowDark, 0, false)}
        {drum(130, 170, 260, wood, C.redDark, 1, true)}
      </g>
    </g>
  );
}
