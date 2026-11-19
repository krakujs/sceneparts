import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";

// Stadium scoreboard on two posts: a wide frame with two dark digit panels, the home score on the left
// and the away score on the right, and a yellow strip along the bottom edge. Origin = floor centre.
// Room-scale: about 780 px wide and 560 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const clampScore = (v: unknown) => {
  const n = Math.round(Number(v));
  return String(Number.isFinite(n) ? Math.max(0, Math.min(99, n)) : 0);
};
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frameC = p.color && p.color !== "none" ? p.color : C.navy;
  const panelC = p.color2 && p.color2 !== "none" ? p.color2 : C.ink;
  const anim: string = p.anim ?? "none";
  const home = clampScore(p.home ?? 0), away = clampScore(p.away ?? 0);
  const BX = -390, BW = 780, BY = -1060, BH = 390;
  const digit = (cx: number, v: string, col: string) => (
    <text x={cx} y={BY + 24 + (BH - 110) / 2 + 80} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={230} fill={col}>{v}</text>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={450} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* posts and feet */}
        <rect x={-330} y={BY + BH} width={26} height={-(BY + BH)} fill={C.greyDark} />
        <rect x={304} y={BY + BH} width={26} height={-(BY + BH)} fill={C.greyDark} />
        <rect x={-380} y={-24} width={120} height={24} rx={8} fill={C.greyDark} />
        <rect x={260} y={-24} width={120} height={24} rx={8} fill={C.greyDark} />
        {/* board frame with a shaded underside */}
        <rect x={BX} y={BY} width={BW} height={BH} rx={26} fill={frameC} />
        <rect x={BX} y={BY + BH - 24} width={BW} height={24} rx={12} fill={shade(frameC, 0.25)} />
        {/* yellow trim strip along the bottom */}
        <rect x={BX + 20} y={BY + BH - 56} width={BW - 40} height={14} rx={7} fill={C.yellow} />
        {/* digit panels */}
        <rect x={BX + 24} y={BY + 24} width={336} height={BH - 110} rx={18} fill={panelC} />
        <rect x={BX + BW - 24 - 336} y={BY + 24} width={336} height={BH - 110} rx={18} fill={panelC} />
        {digit(BX + 24 + 168, home, C.yellow)}
        {digit(BX + BW - 24 - 168, away, C.orange)}
        {/* small centre dash between the panels */}
        <rect x={-12} y={BY + BH / 2 - 14} width={24} height={28} rx={6} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
