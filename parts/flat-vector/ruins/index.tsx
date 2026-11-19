import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ancient ruins: broken stone columns of different heights, a partial round arch, fallen blocks and rubble.
// Origin = bottom centre on the ground. About 900 px wide and 620 px tall at s = 1.
// anim "lights": dust motes drift up off the rubble with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const motes = [[-300, -260], [-120, -330], [60, -290], [250, -350], [-20, -400]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.sand;
  const moss = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const rise = anim === "lights" ? (f * 2) % 120 : 0;
  // column: shaft with a capital and a broken top edge
  const column = (cx: number, h: number, key: string) => (
    <g key={key}>
      <rect x={cx - 52} y={-40} width={104} height={20} rx={4} fill={shade(stone, 0.15)} />
      <rect x={cx - 40} y={-20 - h} width={80} height={h - 20} fill={stone} />
      <rect x={cx - 40} y={-20 - h} width={18} height={h - 20} fill={shade(stone, 0.12)} />
      <path d={`M ${cx - 52} ${-20 - h} L ${cx - 40} ${-20 - h - 16} L ${cx - 14} ${-20 - h - 2} L ${cx + 12} ${-20 - h - 18} L ${cx + 40} ${-20 - h - 2} L ${cx + 52} ${-20 - h} Z`} fill={stone} />
      <rect x={cx - 60} y={-20 - h - 8} width={120} height={8} rx={3} fill={shade(stone, 0.12)} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={440} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* partial round arch on the right, with a broken side */}
        <path d="M 60 -20 L 60 -330 Q 60 -460 190 -460 Q 320 -460 320 -330 L 320 -300 Q 320 -360 250 -370 Q 190 -380 170 -330 L 170 -20 Z" fill={stone} />
        <path d="M 60 -20 L 60 -330 L 100 -330 L 100 -20 Z" fill={shade(stone, 0.12)} />
        <path d="M 170 -20 L 170 -330 L 190 -330 L 190 -20 Z" fill={shade(stone, 0.12)} />
        {/* standing columns of differing height */}
        {column(-330, 420, "c1")}
        {column(-200, 300, "c2")}
        {column(-70, 150, "c3")}
        {/* moss stains */}
        <rect x={-300} y={-260} width={30} height={60} rx={12} fill={moss} opacity={0.35} />
        <rect x={-190} y={-160} width={24} height={40} rx={10} fill={moss} opacity={0.35} />
        {/* fallen blocks and rubble */}
        <rect x={-420} y={-70} width={140} height={60} rx={6} fill={shade(stone, 0.1)} transform="rotate(-6 -350 -40)" />
        <rect x={-300} y={-40} width={120} height={44} rx={6} fill={stone} transform="rotate(4 -240 -18)" />
        <rect x={-120} y={-50} width={110} height={40} rx={6} fill={shade(stone, 0.08)} transform="rotate(-10 -60 -30)" />
        <path d="M 230 -20 L 250 -60 L 280 -40 L 300 -20 Z" fill={stone} />
        <circle cx={-10} cy={-32} r={16} fill={stone} />
        <circle cx={380} cy={-18} r={12} fill={shade(stone, 0.1)} />
        <rect x={-460} y={-16} width={920} height={16} rx={6} fill={C.greyDark} opacity={0.4} />
        {/* dust motes */}
        {motes.map(([mx, my], i) => (
          <circle key={i} cx={mx} cy={my - rise * ((i % 3) + 1) / 3} r={6 + (i % 2) * 3} fill={C.white} opacity={anim === "lights" ? 0.6 : 0} />
        ))}
      </g>
    </g>
  );
}
