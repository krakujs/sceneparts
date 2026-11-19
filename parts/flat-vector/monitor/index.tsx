import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Monitor: wide panel on a neck and foot. Origin = bottom centre (the foot rests on y).
// anim "scan": a pale light bar sweeps down the screen.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.sky;
  const anim: string = p.anim ?? "none";
  const scanY = -514 + ((f * 3) % 268);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={11} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-40} y={-236} width={80} height={236} fill={shade(body, 0.1)} />
        <rect x={-170} y={-18} width={340} height={18} rx={9} fill={shade(body, 0.25)} />
        <rect x={-260} y={-530} width={520} height={300} rx={22} fill={body} />
        <rect x={-244} y={-514} width={488} height={268} rx={8} fill={scr} />
        <rect x={-244} y={-514} width={488} height={26} fill={C.white} opacity={0.5} />
        <rect x={-224} y={-494} width={250} height={200} rx={10} fill={C.white} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-204 + i * 42} y={-340 - [40, 70, 55, 95, 60][i]} width={26} height={[40, 70, 55, 95, 60][i]} rx={5} fill={C.blue} />
        ))}
        <rect x={40} y={-494} width={190} height={110} rx={10} fill={C.yellow} opacity={0.9} />
        <rect x={40} y={-370} width={190} height={90} rx={10} fill={C.teal} opacity={0.85} />
        <rect x={-244} y={-262} width={488} height={16} fill={C.inkSoft} opacity={0.35} />
        {anim === "scan" && <rect x={-244} y={scanY} width={488} height={8} fill={C.white} opacity={0.35} />}
        <circle cx={220} cy={-238} r={4} fill={C.green} />
      </g>
    </g>
  );
}
