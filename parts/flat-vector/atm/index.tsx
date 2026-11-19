import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Freestanding room-scale cash machine: screen, keypad, card slot and cash slot. No branding.
// Origin = bottom centre (stands on y). Default size about 1000 px tall at s = 1.
// anim "screen": the menu highlight moves down the rows and the card LED blinks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const ROWS = [-760, -700, -640];
const KEY_X = [-170, -120, -70];
const KEY_Y = [-440, -390, -340, -290];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.teal;
  const anim: string = p.anim ?? "none";
  const hiRow = anim === "screen" ? Math.floor(f / 20) % 3 : -1;
  const led = anim === "screen" && Math.floor(f / 15) % 2 === 1 ? C.greenDark : C.green;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-290} y={-70} width={580} height={70} rx={12} fill={shade(body, 0.3)} />
        <rect x={-260} y={-960} width={520} height={900} rx={28} fill={body} />
        <rect x={-240} y={-940} width={480} height={100} rx={16} fill={shade(body, 0.2)} />
        <rect x={-200} y={-900} width={400} height={16} rx={8} fill={accent} />
        <rect x={-248} y={-920} width={14} height={760} rx={7} fill={C.white} opacity={0.18} />
        {/* screen */}
        <rect x={-210} y={-820} width={420} height={290} rx={22} fill={C.ink} />
        <rect x={-190} y={-800} width={380} height={250} rx={14} fill={C.sky} />
        {ROWS.map((ry, i) => (
          <g key={i}>
            <rect x={-170} y={ry} width={340} height={46} rx={12} fill={C.white} />
            <circle cx={-140} cy={ry + 23} r={14} fill={i === 0 ? accent : i === 1 ? C.green : C.orange} />
            <rect x={-100} y={ry + 17} width={200} height={12} rx={6} fill={C.greyLight} />
            {i === hiRow && <rect x={-176} y={ry - 4} width={352} height={54} rx={14} fill={C.yellow} opacity={0.5} />}
          </g>
        ))}
        {/* card slot and LED */}
        <rect x={-150} y={-510} width={300} height={22} rx={11} fill={C.ink} />
        <circle cx={185} cy={-499} r={9} fill={led} />
        {/* keypad */}
        <rect x={-210} y={-470} width={200} height={250} rx={16} fill={shade(body, 0.25)} />
        {KEY_Y.map((ky, r) => KEY_X.map((kx, c) => {
          const fill = r === 3 && c === 2 ? accent : r === 3 && c === 0 ? C.red : C.greyLight;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={kx} cy={ky + 3} r={18} fill={shade(C.greyLight, 0.3)} />
              <circle cx={kx} cy={ky} r={18} fill={fill} />
            </g>
          );
        }))}
        {/* cash slot with a bill sticking out */}
        <rect x={0} y={-446} width={240} height={56} rx={10} fill={shade(body, 0.3)} />
        <rect x={20} y={-452} width={190} height={20} rx={3} fill={C.green} />
        <rect x={10} y={-432} width={220} height={28} rx={8} fill={C.ink} />
        {/* cash tray and receipt slot */}
        <rect x={0} y={-350} width={240} height={70} rx={12} fill={shade(body, 0.3)} />
        <rect x={20} y={-330} width={200} height={14} rx={7} fill={C.ink} />
        <rect x={0} y={-250} width={240} height={26} rx={8} fill={C.ink} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-200} y={-200 + i * 24} width={400} height={10} rx={5} fill={shade(body, 0.3)} />
        ))}
      </g>
    </g>
  );
}
