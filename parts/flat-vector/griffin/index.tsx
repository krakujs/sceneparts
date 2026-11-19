import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Griffin: eagle head with a hooked beak, feathered wings and front talons on a golden lion body with a tufted tail.
// Side view facing right. Feet at (0,0); about 900 px tall at s = 1. anim: idle (tail tuft sways) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const LION = "#E9B44C", LION_D = "#C98A2E", EAGLE = "#8A5A3C", EAGLE_D = "#5E3B26", CREAM = "#F4E3B5";
const feather = (L: number, w: number) =>
  `M ${-w * 0.5} 0 C ${-w * 0.9} ${-L * 0.35} ${-w * 0.6} ${-L * 0.8} 0 ${-L} C ${w * 0.6} ${-L * 0.8} ${w * 0.9} ${-L * 0.35} ${w * 0.5} 0 Z`;
const FEATHERS: [number, number, number][] = [[-14, 460, 80], [-34, 430, 78], [-54, 390, 72], [-74, 340, 64]];

const Wing = ({ root, fill, tip, dark }: { root: [number, number]; fill: string; tip: string; dark: string }) => (
  <g transform={`translate(${root[0]} ${root[1]})`}>
    {FEATHERS.map(([a, L, w], i) => (
      <path key={i} d={feather(L, w)} transform={`rotate(${a})`} fill={i % 2 ? fill : tip} stroke={dark} strokeWidth={3} />
    ))}
  </g>
);

const Paw = ({ x, c }: { x: number; c: string }) => (
  <g>
    <path d={`M ${x} -300 L ${x + 6} -60`} stroke={c} strokeWidth={70} strokeLinecap="round" />
    <ellipse cx={x + 14} cy={-40} rx={60} ry={28} fill={c} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const anim: string = p.anim ?? "idle";
  const sway = anim === "idle" ? Math.sin(f * 0.07) * 6 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={420} ry={22} fill={C.shadow} />
      <g transform="scale(0.92)">
        <path d="M -320 -430 Q -440 -420 -470 -300 Q -480 -240 -440 -210" stroke={LION} strokeWidth={26} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${sway} -440 -210)`}>
          <ellipse cx={-445} cy={-200} rx={36} ry={46} fill={EAGLE} />
        </g>
        <Paw x={-290} c={LION_D} />
        <Paw x={-210} c={LION_D} />
        <Wing root={[60, -560]} fill={EAGLE_D} tip={CREAM} dark={shade(EAGLE_D, 0.2)} />
        <path d="M -360 -420 C -360 -520 -180 -560 0 -540 C 170 -520 300 -470 300 -400 C 300 -330 240 -300 150 -300 L -260 -300 C -330 -300 -360 -350 -360 -420 Z" fill={LION} />
        <path d="M -200 -360 Q -60 -330 80 -360" stroke={LION_D} strokeWidth={10} fill="none" strokeLinecap="round" />
        <Paw x={150} c={LION_D} />
        <Paw x={205} c={LION} />
        <Wing root={[40, -560]} fill={EAGLE} tip={CREAM} dark={EAGLE_D} />
        <path d="M 210 -520 Q 270 -640 300 -720" stroke={CREAM} strokeWidth={140} strokeLinecap="round" fill="none" />
        <path d="M 250 -800 L 180 -840 L 240 -770 Z" fill={EAGLE} />
        <path d="M 262 -840 L 220 -890 L 278 -815 Z" fill={EAGLE_D} />
        <ellipse cx={330} cy={-760} rx={105} ry={92} fill={CREAM} />
        <path d="M 345 -806 Q 380 -840 418 -806 Q 380 -820 345 -806 Z" fill={EAGLE} />
        <circle cx={385} cy={-770} r={26} fill={C.yellow} />
        <circle cx={392} cy={-768} r={13} fill={C.ink} />
        <circle cx={397} cy={-774} r={4} fill="#FFFFFF" />
        <path d="M 425 -770 Q 480 -775 490 -730 Q 480 -700 460 -716 Q 448 -722 428 -712 Z" fill={C.yellow} />
        <path d="M 428 -742 Q 455 -742 470 -735" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M 240 -40 Q 262 -30 256 -10 Q 252 -26 236 -24 Z M 262 -40 Q 284 -30 278 -10 Q 274 -26 258 -24 Z" fill={C.yellow} />
      </g>
    </g>
  );
}
