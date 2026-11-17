import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Electronic keyboard piano on an X-stand: 14 white keys with black keys, an LCD, knobs and buttons on the front panel.
// Origin = bottom centre (feet on y). About 600 px wide and 360 px tall at s = 1.
// anim "play": keys light up in turn and the knobs turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const WHITE = 14;
const KW = 580 / WHITE;
const BUTTONS = [C.red, C.green, C.yellow, C.blue];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const anim: string = p.anim ?? "none";
  const playing = anim === "play" ? Math.floor(f / 10) % WHITE : -1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* X-stand */}
        <line x1={-250} y1={-190} x2={230} y2={-4} stroke={C.greyDark} strokeWidth={22} strokeLinecap="round" />
        <line x1={250} y1={-190} x2={-230} y2={-4} stroke={C.greyDark} strokeWidth={22} strokeLinecap="round" />
        <rect x={-270} y={-12} width={80} height={12} rx={6} fill={C.inkSoft} />
        <rect x={190} y={-12} width={80} height={12} rx={6} fill={C.inkSoft} />
        <rect x={-260} y={-200} width={520} height={16} rx={8} fill={C.greyDark} />
        {/* chassis */}
        <rect x={-300} y={-340} width={600} height={170} rx={16} fill={body} />
        <rect x={-270} y={-318} width={130} height={40} rx={6} fill={C.ink} />
        <rect x={-262} y={-310} width={114} height={24} rx={4} fill={C.skyDeep} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-252 + i * 34} y={-302 + (i === 1 ? 4 : 0)} width={22} height={14 - (i === 1 ? 4 : 0)} rx={2} fill={C.white} />
        ))}
        {[0, 1, 2, 3].map((i) => {
          const a = anim === "play" ? playing * 12 + i * 40 : i * 30 - 45;
          return (
            <g key={i} transform={`translate(${-110 + i * 56} -298)`}>
              <circle r={16} fill={C.greyLight} />
              <line x1={0} y1={0} x2={0} y2={-12} stroke={C.ink} strokeWidth={3} strokeLinecap="round" transform={`rotate(${a})`} />
            </g>
          );
        })}
        {BUTTONS.map((bc, i) => (
          <rect key={i} x={130 + i * 38} y={-312} width={26} height={18} rx={5} fill={bc} />
        ))}
        <rect x={130} y={-280} width={140} height={6} rx={3} fill={accent} />
        {/* keybed */}
        <rect x={-290} y={-258} width={580} height={80} rx={4} fill={C.inkSoft} />
        {Array.from({ length: WHITE }, (_, i) => (
          <g key={i}>
            <rect x={-290 + i * KW + 1} y={-258} width={KW - 2} height={78} rx={3} fill={i === playing ? C.yellow : C.white} />
            <rect x={-290 + i * KW + 1} y={-190} width={KW - 2} height={6} rx={3} fill={C.greyLight} />
          </g>
        ))}
        {Array.from({ length: WHITE - 1 }, (_, i) => i).filter((i) => [0, 1, 3, 4, 5].includes(i % 7)).map((i) => (
          <rect key={i} x={-290 + (i + 1) * KW - 12} y={-258} width={24} height={50} rx={3} fill={C.ink} />
        ))}
      </g>
    </g>
  );
}
