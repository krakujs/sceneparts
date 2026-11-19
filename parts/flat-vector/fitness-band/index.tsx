import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fitness band lying flat: two strap lengths and a pill display with a heart and a steps bar.
// Origin = bottom centre (the band lies on y). anim "beat": the heart pulses.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const strap = p.color && p.color !== "none" ? p.color : C.teal;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.navy;
  const anim: string = p.anim ?? "none";
  const beatK = anim === "beat" ? 1 + 0.14 * Math.pow(Math.max(0, Math.sin((f * 2 * Math.PI) / 34)), 6) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-340} y={-88} width={260} height={56} rx={28} fill={strap} />
        <rect x={80} y={-88} width={260} height={56} rx={28} fill={strap} />
        {[-310, -282].map((hx) => <circle key={hx} cx={hx} cy={-60} r={5} fill={shade(strap, 0.35)} />)}
        {[282, 310].map((hx) => <circle key={hx} cx={hx} cy={-60} r={5} fill={shade(strap, 0.35)} />)}
        <rect x={-110} y={-120} width={220} height={120} rx={60} fill={shade(strap, 0.35)} />
        <rect x={-96} y={-106} width={192} height={92} rx={46} fill={scr} />
        <g transform={`translate(-44 -60) scale(${f1(beatK)}) translate(44 60)`}>
          <circle cx={-50} cy={-68} r={11} fill={C.red} />
          <circle cx={-34} cy={-68} r={11} fill={C.red} />
          <polygon points="-61,-64 -23,-64 -42,-40" fill={C.red} />
        </g>
        <rect x={-10} y={-74} width={66} height={10} rx={5} fill={C.white} opacity={0.3} />
        <rect x={-10} y={-74} width={44} height={10} rx={5} fill={C.green} />
        <rect x={-10} y={-54} width={66} height={10} rx={5} fill={C.white} opacity={0.25} />
        <rect x={-10} y={-54} width={24} height={10} rx={5} fill={C.yellow} />
      </g>
    </g>
  );
}
