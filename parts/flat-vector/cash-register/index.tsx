import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shop cash register (till): keypad with keys, open cash drawer, lock and a customer-facing display on a pole.
// Origin = bottom centre (stands on y). About 520 px wide and 560 px tall at s = 1 (counter size).
// anim "tally": display bars change height and the key presses light in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const KEY_X = [-150, -70, 10, 90];
const KEY_Y = [-328, -303, -278];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const display = p.display && p.display !== "none" ? p.display : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const tally = anim === "tally";
  const litKey = tally ? Math.floor(f / 10) % 12 : -1;
  const bars = [0, 1, 2].map((i) => (tally ? 30 + 26 * (0.5 + 0.5 * Math.sin(f * 0.12 + i * 1.7)) : [46, 60, 34][i]));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* pole and customer display */}
        <rect x={150} y={-460} width={22} height={170} rx={6} fill={C.greyDark} />
        <rect x={40} y={-560} width={230} height={110} rx={14} fill={C.ink} />
        <rect x={54} y={-546} width={202} height={82} rx={8} fill={display} />
        {bars.map((h, i) => (
          <rect key={i} x={76 + i * 60} y={-464 - h} width={36} height={h} rx={6} fill={C.white} />
        ))}
        {/* main body */}
        <rect x={-240} y={-300} width={480} height={300} rx={22} fill={body} />
        <rect x={-224} y={-284} width={448} height={12} rx={6} fill={C.white} opacity={0.25} />
        {/* sloped keyboard panel */}
        <path d="M -240 -260 L 240 -260 L 212 -336 L -212 -336 Z" fill={shade(body, 0.12)} />
        {KEY_Y.map((ky, r) => KEY_X.map((kx, c) => {
          const k = r * 4 + c;
          return (
            <g key={`${r}-${c}`}>
              <rect x={kx - 32} y={ky + 2} width={64} height={18} rx={4} fill={shade(C.greyLight, 0.3)} />
              <rect x={kx - 32} y={ky} width={64} height={18} rx={4} fill={k === litKey ? C.yellow : C.greyLight} />
            </g>
          );
        }))}
        <circle cx={-200} cy={-290} r={12} fill={C.yellowDark} />
        <rect x={-203} y={-294} width={6} height={8} rx={2} fill={C.ink} />
        {/* cash drawer, pulled out slightly */}
        <rect x={-220} y={-220} width={440} height={90} rx={10} fill={shade(body, 0.35)} />
        <rect x={-200} y={-190} width={400} height={36} rx={8} fill={C.greyLight} />
        <rect x={-100} y={-190} width={6} height={36} fill={C.grey} />
        <circle cx={-160} cy={-172} r={12} fill={C.yellow} />
        <circle cx={-40} cy={-172} r={12} fill={C.yellowDark} />
        <rect x={20} y={-186} width={90} height={26} rx={3} fill={C.green} />
        <rect x={-210} y={-150} width={420} height={22} rx={6} fill={shade(body, 0.2)} />
        <rect x={-240} y={-22} width={480} height={22} rx={10} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
