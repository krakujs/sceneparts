import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Log cabin: nine stacked round logs with rounded ends, a stone chimney, a gable roof with shingles and a covered porch.
// Origin = ground centre. About 900 px wide and 820 px tall at s = 1.
// anim "lights": the cabin windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={4} fill={glow ? C.yellow : C.sky} />
    <rect x={x0 + w / 2 - 3} y={y0} width={6} height={h} fill={C.white} opacity={0.8} />
    <rect x={x0} y={y0 + h / 2 - 3} width={w} height={6} fill={C.white} opacity={0.8} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const log = p.color && p.color !== "none" ? p.color : C.brown;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 4 === k;
  const logs = Array.from({ length: 9 }, (_, i) => -580 + i * 60);
  const hw = (yy: number) => 400 * ((yy + 790) / 270);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={460} ry={18} fill={C.shadow} />
        {/* stone chimney behind the roof */}
        <rect x={200} y={-840} width={80} height={300} fill={C.grey} />
        {[-800, -760, -720, -680, -640, -600, -560].map((cy) => <rect key={`ch${cy}`} x={200} y={cy} width={80} height={4} fill={shade(C.grey, 0.2)} />)}
        <rect x={190} y={-852} width={100} height={18} rx={4} fill={shade(C.grey, 0.3)} />
        {/* stacked logs */}
        {logs.map((ly, i) => (
          <g key={`log${i}`}>
            <rect x={-330} y={ly} width={660} height={56} rx={26} fill={i % 2 ? shade(log, 0.08) : log} />
            <ellipse cx={-330} cy={ly + 28} rx={12} ry={20} fill={C.sand} />
            <ellipse cx={330} cy={ly + 28} rx={12} ry={20} fill={C.sand} />
          </g>
        ))}
        {/* gable roof with eaves and shingle lines */}
        <path d="M -400 -520 L 0 -790 L 400 -520 Z" fill={roof} />
        {[-700, -640, -580].map((ry) => (
          <rect key={`sh${ry}`} x={-hw(ry)} y={ry} width={hw(ry) * 2} height={8} fill={shade(roof, 0.25)} />
        ))}
        <rect x={-410} y={-530} width={820} height={24} rx={6} fill={shade(roof, 0.25)} />
        {/* windows */}
        {win("wl", -270, -470, 100, 96, lit(0))}
        {win("wr", 170, -470, 100, 96, lit(1))}
        {/* porch with posts and roof */}
        <rect x={-200} y={-48} width={400} height={20} fill={shade(log, 0.2)} />
        <rect x={-196} y={-300} width={14} height={256} fill={shade(log, 0.3)} />
        <rect x={182} y={-300} width={14} height={256} fill={shade(log, 0.3)} />
        <rect x={-236} y={-326} width={472} height={26} rx={6} fill={roof} />
        <rect x={-236} y={-304} width={472} height={6} fill={shade(roof, 0.3)} />
        {/* door */}
        <rect x={-50} y={-262} width={100} height={214} rx={8} fill={C.brownDark} />
        <rect x={-28} y={-220} width={56} height={60} rx={4} fill={lit(2) ? C.yellow : C.sky} />
        <circle cx={34} cy={-130} r={4} fill={C.yellow} />
        <rect x={-300} y={-40} width={600} height={40} fill={C.grey} />
      </g>
    </g>
  );
}
