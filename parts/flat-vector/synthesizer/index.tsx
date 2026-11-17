import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tabletop synthesizer: control panel with knobs, sliders and a small display, above a short 8-key keybed.
// Origin = bottom centre (sits on y). About 520 px wide and 300 px tall at s = 1.
// anim "tweak": knobs turn, sliders move and the display blinks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const KW = 60;
const BLACK_AFTER = [0, 1, 3, 4, 5];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.teal;
  const anim: string = p.anim ?? "none";
  const tweak = anim === "tweak";
  const blink = tweak && Math.floor(f / 20) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-260} y={-300} width={520} height={300} rx={20} fill={body} />
        <rect x={-260} y={-20} width={520} height={20} rx={10} fill={shade(body, 0.3)} />
        <rect x={-240} y={-282} width={480} height={120} rx={12} fill={shade(body, 0.2)} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const kx = -190 + i * 64;
          const a = tweak ? 120 * Math.sin((f * 2 * Math.PI) / 90 + i) : i * 25 - 60;
          return (
            <g key={i} transform={`translate(${kx} -240)`}>
              <circle r={20} fill={C.ink} />
              <circle r={14} fill={C.greyLight} />
              <rect x={-2} y={-13} width={4} height={12} rx={2} fill={C.ink} transform={`rotate(${f1(a)})`} />
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => {
          const tx = -200 + i * 100;
          const cap = tweak ? 35 + 28 * Math.sin((f * 2 * Math.PI) / 70 + i * 1.3) : 35 + i * 6;
          return (
            <g key={i}>
              <rect x={tx} y={-199} width={70} height={6} rx={3} fill={C.ink} />
              <rect x={tx + cap - 6} y={-206} width={12} height={20} rx={3} fill={accent} />
            </g>
          );
        })}
        <rect x={184} y={-262} width={52} height={44} rx={6} fill={C.ink} />
        <rect x={190} y={-256} width={40} height={32} rx={4} fill={blink ? accent : C.teal} />
        {/* keybed: 8 white keys */}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <rect x={-240 + i * KW + 1} y={-150} width={KW - 2} height={138} rx={4} fill={C.white} />
            <rect x={-240 + i * KW + 1} y={-18} width={KW - 2} height={6} rx={3} fill={C.greyLight} />
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6].filter((i) => BLACK_AFTER.includes(i)).map((i) => (
          <rect key={i} x={-240 + (i + 1) * KW - 16} y={-150} width={32} height={84} rx={4} fill={C.ink} />
        ))}
      </g>
    </g>
  );
}
