import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Woven twig bird nest with three pale-blue eggs and no bird. Origin = bottom centre (rests on y).
// About 480 px wide and 210 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const twig = pick(p.color, "#A9764A");
  const eggC = pick(p.color2, "#BFE3F5");
  const anim: string = p.anim ?? "none";
  const egg = (cx: number, cy: number, rx: number, ry: number, k: number) => (
    <g key={k}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={eggC} />
      <ellipse cx={cx} cy={cy + ry * 0.55} rx={rx * 0.85} ry={ry * 0.3} fill={shade(eggC, 0.15)} opacity={0.6} />
      <ellipse cx={cx - rx * 0.32} cy={cy - ry * 0.38} rx={rx * 0.2} ry={ry * 0.28} fill={C.white} opacity={0.6} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={260} ry={16} fill={C.shadow} />
        {/* twig sticks poking out of the sides */}
        <path d="M -226 -100 L -268 -132 M 226 -96 L 262 -124" stroke={shade(twig, 0.2)} strokeWidth={10} strokeLinecap="round" />
        {/* back rim and inside of the bowl */}
        <ellipse cx={0} cy={-112} rx={222} ry={44} fill={shade(twig, 0.2)} />
        <ellipse cx={0} cy={-110} rx={196} ry={30} fill={shade(twig, 0.5)} />
        {egg(-72, -132, 40, 50, 0)}
        {egg(4, -146, 42, 54, 1)}
        {egg(78, -130, 40, 50, 2)}
        {/* front wall of the woven bowl */}
        <path d="M -222 -110 C -236 -40 -160 0 0 0 C 160 0 236 -40 222 -110 C 200 -72 110 -62 0 -62 C -110 -62 -200 -72 -222 -110 Z" fill={twig} />
        {[
          "M -200 -84 Q -120 -44 -40 -74", "M -150 -34 Q -60 -16 10 -46", "M 40 -28 Q 120 -8 200 -66",
          "M -60 -94 Q 0 -66 70 -96", "M -180 -20 Q -110 -8 -70 -28", "M 100 -40 Q 150 -36 180 -20",
        ].map((d, i) => (
          <path key={i} d={d} stroke={shade(twig, 0.3)} strokeWidth={9} strokeLinecap="round" fill="none" />
        ))}
      </g>
    </g>
  );
}
