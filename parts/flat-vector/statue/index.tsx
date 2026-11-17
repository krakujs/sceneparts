import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic hero statue: a featureless figure with one arm raised in a salute-like gesture, on a stepped stone plinth.
// It is not any real statue or person. Origin = bottom centre on the ground. About 420 px wide and 1150 px tall at s = 1.
// anim "lights": the raised arm lifts and lowers gently with f (a slow wave).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.greyLight;
  const plinth = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const wave = anim === "lights" ? Math.sin((f / 60) * Math.PI * 2) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={300} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stepped plinth */}
        <rect x={-260} y={-70} width={520} height={70} rx={10} fill={shade(plinth, 0.15)} />
        <rect x={-220} y={-150} width={440} height={80} rx={8} fill={plinth} />
        <rect x={-170} y={-260} width={340} height={110} rx={8} fill={shade(plinth, 0.08)} />
        <rect x={-170} y={-260} width={340} height={12} fill={shade(plinth, 0.25)} />
        {/* legs and robe */}
        <path d="M -90 -260 L -110 -560 L 110 -560 L 90 -260 Z" fill={stone} />
        <path d="M -40 -560 L -40 -262 M 40 -560 L 40 -262" stroke={shade(stone, 0.12)} strokeWidth={4} />
        {/* torso, shoulders and head */}
        <path d="M -120 -560 Q -130 -760 -70 -800 L 70 -800 Q 130 -760 120 -560 Z" fill={stone} />
        <ellipse cx={0} cy={-850} rx={44} ry={54} fill={stone} />
        <rect x={-14} y={-810} width={28} height={30} rx={8} fill={shade(stone, 0.08)} />
        {/* left arm hangs down */}
        <path d="M -120 -740 Q -170 -640 -150 -540 L -115 -545 Q -130 -630 -95 -720 Z" fill={stone} />
        {/* right arm raised in a gesture, with a wave */}
        <g transform={`rotate(${f1(wave)} 110 -740)`}>
          <path d="M 100 -740 Q 180 -800 200 -920 L 232 -912 Q 210 -790 128 -710 Z" fill={stone} />
          <ellipse cx={218} cy={-930} rx={22} ry={28} fill={stone} />
        </g>
        {/* plinth engraving band (plain) */}
        <rect x={-150} y={-230} width={300} height={10} rx={4} fill={shade(plinth, 0.25)} />
      </g>
    </g>
  );
}
