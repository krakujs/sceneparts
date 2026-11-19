import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall hotel, front view: stacked floors with balconies, a canopy entrance and a blank star-shaped sign on the roof.
// Origin = bottom centre on the ground. About 640 px wide and 1380 px tall at s = 1.
// anim "lights": the room windows light up floor by floor with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const star = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
    pts.push(`${f1(cx + rr * Math.cos(a))} ${f1(cy + rr * Math.sin(a))}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const floors = [0, 1, 2, 3, 4, 5, 6];
  const floorY = (i: number) => -150 - i * 180; // top of each window row
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={360} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tower */}
        <rect x={-300} y={-1280} width={600} height={1280} rx={16} fill={wall} />
        <rect x={-320} y={-1300} width={640} height={40} rx={10} fill={roof} />
        <rect x={-300} y={-1260} width={600} height={12} fill={shade(roof, 0.2)} />
        {/* roof crown with a blank star sign */}
        <rect x={-120} y={-1340} width={240} height={44} rx={8} fill={shade(roof, 0.1)} />
        <rect x={-6} y={-1420} width={12} height={84} fill={C.greyDark} />
        <path d={star(0, -1400, 46)} fill={C.yellow} />
        {/* floors: windows and balconies */}
        {floors.map((i) => {
          const ty = floorY(i);
          return (
            <g key={i}>
              {[-200, -70, 70, 200].map((cx, j) => {
                const on = anim === "lights" && Math.floor(f / 10) % floors.length >= i;
                return (
                  <g key={cx}>
                    <rect x={cx - 42} y={ty - 110} width={84} height={100} rx={8} fill={on && j % 2 === 0 ? C.yellow : C.sky} />
                    <rect x={cx - 34} y={ty - 102} width={16} height={84} rx={4} fill={C.white} opacity={0.5} />
                  </g>
                );
              })}
              {/* balcony slab with railing */}
              <rect x={-290} y={ty - 8} width={580} height={12} rx={4} fill={C.white} />
              <rect x={-290} y={ty - 24} width={580} height={6} rx={3} fill={C.white} opacity={0.8} />
            </g>
          );
        })}
        {/* entrance canopy and glass doors */}
        <rect x={-190} y={-420} width={380} height={300} rx={14} fill={C.greyDark} />
        <rect x={-170} y={-400} width={340} height={280} rx={10} fill={C.sky} />
        <path d="M -140 -400 L -100 -400 L -150 -130 L -178 -130 Z" fill={C.white} opacity={0.35} />
        <rect x={-6} y={-400} width={12} height={280} fill={C.greyDark} />
        <path d="M -250 -440 L 250 -440 L 220 -410 L -220 -410 Z" fill={roof} />
        <rect x={-250} y={-440} width={500} height={18} rx={6} fill={shade(roof, 0.2)} />
        <rect x={-260} y={-424} width={520} height={10} fill={shade(roof, 0.25)} />
        <rect x={-230} y={-130} width={460} height={18} rx={6} fill={C.grey} />
        <rect x={-300} y={-12} width={600} height={12} fill={C.greyDark} />
      </g>
    </g>
  );
}
