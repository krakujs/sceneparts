import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden tree house in a big leafy tree: a plank house with a gable roof on a platform, side railings and a rope
// ladder down to the ground. Origin = ground at the foot of the trunk. About 1000 px wide and 1110 px tall at s = 1.
// anim "lights": the house windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const bar = (x1: number, y1: number, x2: number, y2: number, w: number) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = (-dy / len) * (w / 2), ny = (dx / len) * (w / 2);
  return `M ${f1(x1 + nx)} ${f1(y1 + ny)} L ${f1(x2 + nx)} ${f1(y2 + ny)} L ${f1(x2 - nx)} ${f1(y2 - ny)} L ${f1(x1 - nx)} ${f1(y1 - ny)} Z`;
};
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
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 4 === k;
  const leaf = C.green, leafDark = C.greenDark;
  const crowns: [number, number, number][] = [[-320, -760, 140], [-120, -900, 170], [120, -900, 170], [320, -760, 140], [0, -1000, 160], [-230, -620, 120], [230, -620, 120], [0, -780, 150]];
  const rungs = Array.from({ length: 14 }, (_, i) => i);
  const ladderPoint = (t: number): [number, number] => [230 + 70 * t, -556 + 556 * t];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={360} ry={20} fill={C.shadow} />
        {/* canopy behind everything */}
        {crowns.map(([cx, cy, r], i) => <circle key={`s${i}`} cx={cx + 18} cy={cy + 24} r={r} fill={leafDark} />)}
        {crowns.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} fill={leaf} />)}
        {/* trunk and branches */}
        <path d="M -70 0 C -80 -200 -60 -380 -90 -520 L 90 -520 C 60 -380 80 -200 70 0 Z" fill={C.brownDark} />
        <ellipse cx={-80} cy={-4} rx={34} ry={14} fill={C.brownDark} />
        <ellipse cx={80} cy={-4} rx={34} ry={14} fill={C.brownDark} />
        <path d="M -60 -500 L -170 -640 L -150 -660 L -40 -540 Z" fill={C.brownDark} />
        <path d="M 60 -480 L 170 -620 L 150 -640 L 40 -500 Z" fill={C.brownDark} />
        {/* platform */}
        <rect x={-260} y={-580} width={520} height={24} rx={4} fill={wood} />
        {[-220, -160, -100, -40, 20, 80, 140, 200].map((px) => <rect key={`p${px}`} x={px} y={-580} width={3} height={24} fill={shade(wood, 0.3)} />)}
        <rect x={-220} y={-560} width={16} height={60} fill={shade(wood, 0.2)} />
        <rect x={204} y={-560} width={16} height={60} fill={shade(wood, 0.2)} />
        {/* house walls with plank lines */}
        <rect x={-190} y={-760} width={380} height={180} fill={wood} />
        {[-730, -700, -670, -640, -610].map((ly) => <rect key={`h${ly}`} x={-190} y={ly} width={380} height={3} fill={shade(wood, 0.18)} />)}
        <path d="M -226 -760 L 0 -900 L 226 -760 Z" fill={roof} />
        <rect x={-226} y={-770} width={452} height={14} rx={4} fill={shade(roof, 0.25)} />
        {/* door and windows */}
        <path d="M -40 -580 V -680 A 40 40 0 0 1 40 -680 V -580 Z" fill={C.brownDark} />
        <circle cx={26} cy={-620} r={4} fill={C.yellow} />
        {win("w1", -140, -700, 70, 64, lit(0))}
        {win("w2", 70, -700, 70, 64, lit(1))}
        {/* railings on the sides of the platform */}
        {[-260, -210].map((rx) => <rect key={`rl${rx}`} x={rx} y={-640} width={8} height={84} fill={shade(wood, 0.1)} />)}
        {[210, 252].map((rx) => <rect key={`rr${rx}`} x={rx} y={-640} width={8} height={84} fill={shade(wood, 0.1)} />)}
        <rect x={-260} y={-640} width={60} height={8} fill={shade(wood, 0.1)} />
        <rect x={200} y={-640} width={60} height={8} fill={shade(wood, 0.1)} />
        {/* rope ladder down to the ground */}
        {[0, 1].map((side) => (
          <path key={`rope${side}`} d={bar(230 + (side ? 12 : -12), -556, 300 + (side ? 12 : -12), 0, 6)} fill={C.brownDark} />
        ))}
        {rungs.map((i) => {
          const [px, py] = ladderPoint((i + 1) / 15);
          return <rect key={`ru${i}`} x={px - 26} y={py - 4} width={52} height={7} rx={3} fill={C.brownDark} />;
        })}
      </g>
    </g>
  );
}
