import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sherwani, a long formal coat with a tall mandarin collar, a row of buttons down the front, embroidered
// trim strips and a trimmed hem, on a wooden hanger. Origin = bottom centre (the hem rests on y).
// About 560 px wide and 740 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.purple;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const buttons = Array.from({ length: 7 }, (_, i) => -500 + i * 56);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* long fitted sleeves and a slightly flared coat body */}
          <path d="M -60 -586 L 60 -586 L 140 -574 L 210 -520 L 220 -240 L 170 -240 L 168 -430 L 190 0 L -190 0 L -168 -430 L -170 -240 L -220 -240 L -210 -520 L -140 -574 Z" fill={main} />
          <path d="M 124 -430 Q 150 -200 180 0 L 190 0 L 168 -430 Z" fill={shade(main, 0.12)} />
          {/* mandarin collar */}
          <rect x={-48} y={-614} width={96} height={42} rx={14} fill={shade(main, 0.18)} />
          <rect x={-48} y={-614} width={96} height={10} rx={5} fill={trim} />
          {/* embroidered trim strips down each side of the front */}
          <rect x={-74} y={-560} width={16} height={556} fill={trim} />
          <rect x={58} y={-560} width={16} height={556} fill={trim} />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <circle cx={-66} cy={-534 + i * 46} r={4} fill={shade(trim, 0.4)} />
              <circle cx={66} cy={-534 + i * 46} r={4} fill={shade(trim, 0.4)} />
            </g>
          ))}
          {/* centre front closure and buttons */}
          <path d="M 0 -560 L 0 -6" stroke={shade(main, 0.3)} strokeWidth={5} fill="none" />
          {buttons.map((by, i) => (
            <circle key={i} cx={0} cy={by} r={9} fill={trim} stroke={shade(trim, 0.3)} strokeWidth={2} />
          ))}
          {/* cuff trim and hem band */}
          <rect x={164} y={-254} width={60} height={16} rx={4} fill={trim} />
          <rect x={-224} y={-254} width={60} height={16} rx={4} fill={trim} />
          <rect x={-190} y={-34} width={380} height={34} fill={trim} />
          <path d="M -190 -18 L 190 -18" stroke={shade(trim, 0.3)} strokeWidth={3} strokeDasharray="10 8" />
        </g>
      </g>
    </g>
  );
}
