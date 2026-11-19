import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Biker-style leather jacket on a wooden hanger: wide lapels, an off-centre zip, cuff straps and
// shiny highlights. Origin = bottom centre (the hem rests on y). About 640 px wide, 720 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const lift = (hex: string, k: number) => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.round(v + (255 - v) * k).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const zip = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const lapel = lift(main, 0.16);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* sleeves and body */}
          <path d="M -64 -586 L 64 -586 L 146 -572 L 232 -520 L 246 -240 L 192 -240 L 178 -440 L 170 0 L -170 0 L -178 -440 L -192 -240 L -246 -240 L -232 -520 L -146 -572 Z" fill={main} />
          <path d="M 130 -440 Q 150 -200 160 0 L 170 0 L 178 -440 Z" fill={shade(main, 0.3)} />
          {/* cuffs and belt */}
          <path d="M 194 -256 L 248 -258 L 246 -240 L 192 -240 Z" fill={shade(main, 0.35)} />
          <path d="M -194 -256 L -248 -258 L -246 -240 L -192 -240 Z" fill={shade(main, 0.35)} />
          <rect x={-170} y={-40} width={340} height={40} fill={shade(main, 0.35)} />
          {/* V opening and wide lapels */}
          <path d="M -20 -560 L -16 -470 L 0 -380 L 16 -470 L 20 -560 Z" fill={shade(main, 0.5)} />
          <path d="M -64 -586 L -150 -372 L -16 -470 L -20 -560 Z" fill={lapel} />
          <path d="M 64 -586 L 150 -372 L 16 -470 L 20 -560 Z" fill={lapel} />
          {/* off-centre zip running from the right lapel to the right hem */}
          <path d="M 30 -470 L 66 -120" stroke={zip} strokeWidth={6} strokeDasharray="6 5" fill="none" />
          <rect x={22} y={-482} width={16} height={30} rx={5} fill={zip} />
          {/* cuff straps and pocket seams */}
          <path d="M -120 -150 L -62 -170" stroke={shade(main, 0.5)} strokeWidth={6} strokeLinecap="round" />
          <path d="M 120 -150 L 62 -170" stroke={shade(main, 0.5)} strokeWidth={6} strokeLinecap="round" />
          {/* shiny highlights */}
          <path d="M -120 -556 Q -100 -580 -60 -584" stroke={C.white} strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.25} />
          <path d="M -212 -460 L -212 -300" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.22} />
          <path d="M -120 -330 L -120 -190" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.14} />
        </g>
      </g>
    </g>
  );
}
