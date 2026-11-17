import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long blacksmith's forge tongs lying on the floor, crossed at a rivet, with wooden grips and jaws holding a glowing hot bar.
// Origin = floor centre under the middle of the tongs. Hero size: about 500 px long at s = 1.
// anim "glow": the hot bar pulses with heat.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const iron = p.color && p.color !== "none" ? p.color : C.greyDark;
  const hot = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const glow = anim === "glow" ? 0.25 + 0.2 * Math.sin((f * 2 * Math.PI) / 40) : 0.3;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={300} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform="scale(0.75)">
          <ellipse cx={260} cy={-66} rx={80} ry={34} fill={hot} opacity={glow} />
          <path d="M-400,-120 L220,-36" fill="none" stroke={iron} strokeWidth={28} strokeLinecap="round" />
          <path d="M-400,-20 L220,-96" fill="none" stroke={iron} strokeWidth={28} strokeLinecap="round" />
          <path d="M-400,-120 L-300,-106" fill="none" stroke={C.brown} strokeWidth={40} strokeLinecap="round" />
          <path d="M-400,-20 L-300,-34" fill="none" stroke={C.brown} strokeWidth={40} strokeLinecap="round" />
          <rect x={200} y={-78} width={120} height={24} rx={10} fill={hot} />
          <rect x={206} y={-74} width={90} height={6} rx={3} fill={C.yellow} opacity={0.6} />
          <circle cx={-20} cy={-67} r={12} fill={shade(iron, 0.3)} />
          <circle cx={220} cy={-36} r={12} fill={iron} />
          <circle cx={220} cy={-96} r={12} fill={iron} />
        </g>
      </g>
    </g>
  );
}
