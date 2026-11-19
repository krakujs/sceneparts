import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Countertop card reader: keypad, small screen and a card in the top slot. Origin = bottom centre (stands on y).
// anim "process": the screen progress bar fills, keys light in turn and the status LED blinks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const COLS = [-112, -32, 48];
const ROWS = [-272, -220, -168, -116];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.sky;
  const anim: string = p.anim ?? "none";
  const busy = anim === "process";
  const prog = busy ? (f % 90) / 90 : 0.7;
  const litKey = busy ? Math.floor(f / 12) % 12 : -1;
  const led = busy && Math.floor(f / 15) % 2 === 1 ? C.greenDark : C.green;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* card sticking out of the top slot, behind the body */}
        <rect x={-92} y={-540} width={184} height={112} rx={10} fill={C.blue} />
        <rect x={-92} y={-506} width={184} height={20} fill={C.navy} />
        <rect x={-70} y={-522} width={36} height={26} rx={5} fill={C.yellow} />
        <rect x={-160} y={-460} width={320} height={460} rx={40} fill={body} />
        <rect x={-140} y={-450} width={280} height={14} rx={7} fill={C.white} opacity={0.15} />
        <rect x={-112} y={-470} width={224} height={16} rx={8} fill={C.ink} />
        <circle cx={112} cy={-436} r={6} fill={led} />
        {/* screen */}
        <rect x={-128} y={-424} width={256} height={128} rx={16} fill={C.ink} />
        <rect x={-116} y={-412} width={232} height={104} rx={10} fill={scr} />
        <rect x={-96} y={-390} width={130} height={14} rx={7} fill={C.white} />
        <rect x={-96} y={-364} width={80} height={10} rx={5} fill={C.white} opacity={0.6} />
        <rect x={-96} y={-326} width={200} height={10} rx={5} fill={C.white} opacity={0.35} />
        <rect x={-96} y={-326} width={200 * prog} height={10} rx={5} fill={C.white} />
        <circle cx={90} cy={-352} r={20} fill={C.green} />
        <polyline points="80,-352 88,-344 102,-360" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        {/* keypad */}
        {ROWS.map((ry, r) => COLS.map((kx, c) => {
          const k = r * 3 + c;
          const fill = k === litKey ? C.yellow : r === 3 && c === 2 ? C.green : C.greyLight;
          return (
            <g key={`${r}-${c}`}>
              <rect x={kx} y={ry + 4} width={64} height={40} rx={9} fill={shade(C.greyLight, 0.3)} />
              <rect x={kx} y={ry} width={64} height={40} rx={9} fill={fill} />
            </g>
          );
        }))}
        <rect x={-100} y={-40} width={200} height={14} rx={7} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
