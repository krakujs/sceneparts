import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long stone city wall: a crenellated curtain wall, two square towers and a central gatehouse with a wooden arched gate.
// Origin = ground centre. About 1000 px wide and 520 px tall at s = 1 (one wall segment).
// anim "lights": the arrow-slit windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const arch = (xc: number, yb: number, w: number, h: number) => {
  const r = w / 2, yt = yb - h + r;
  return `M ${f1(xc - r)} ${f1(yb)} V ${f1(yt)} A ${f1(r)} ${f1(r)} 0 0 1 ${f1(xc + r)} ${f1(yt)} V ${f1(yb)} Z`;
};
const slit = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <rect key={key} x={x0} y={y0} width={w} height={h} rx={w / 2} fill={glow ? C.yellow : C.sky} />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 6 === k;
  const cap = shade(stone, 0.12);
  const merlon = (key: string, mx: number, my: number, w: number, h: number) => (
    <rect key={key} x={mx} y={my} width={w} height={h} fill={stone} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={520} ry={18} fill={C.shadow} />
        {/* curtain wall with courses */}
        <rect x={-500} y={-300} width={1000} height={300} fill={stone} />
        <rect x={-500} y={-20} width={1000} height={20} fill={shade(stone, 0.25)} />
        {[-240, -180, -120, -60].map((ly) => (
          <rect key={ly} x={-500} y={ly} width={1000} height={6} fill={shade(stone, 0.12)} />
        ))}
        <rect x={-500} y={-312} width={1000} height={14} rx={4} fill={cap} />
        {Array.from({ length: 10 }, (_, i) => merlon(`m${i}`, -480 + i * 100, -370, 60, 60))}
        {/* square towers at each end of the view */}
        <rect x={-420} y={-430} width={80} height={430} fill={stone} />
        <rect x={340} y={-430} width={80} height={430} fill={stone} />
        <rect x={-428} y={-446} width={96} height={18} rx={4} fill={cap} />
        <rect x={332} y={-446} width={96} height={18} rx={4} fill={cap} />
        {[0, 1, 2].map((k) => merlon(`tl${k}`, -416 + k * 26, -490, 22, 44))}
        {[0, 1, 2].map((k) => merlon(`tr${k}`, 344 + k * 26, -490, 22, 44))}
        {slit("s1", -388, -380, 14, 56, lit(0))}
        {slit("s2", -388, -270, 14, 56, lit(1))}
        {slit("s3", 374, -380, 14, 56, lit(2))}
        {slit("s4", 374, -270, 14, 56, lit(3))}
        {/* gatehouse above the wall */}
        <rect x={-180} y={-440} width={360} height={150} fill={shade(stone, 0.04)} />
        {[-160, -90, -20, 50, 120].map((mx, i) => merlon(`g${i}`, mx, -500, 40, 60))}
        <rect x={-190} y={-446} width={380} height={14} rx={4} fill={cap} />
        {slit("g1", -120, -400, 16, 60, lit(4))}
        {slit("g2", 104, -400, 16, 60, lit(5))}
        {/* arched gateway with wooden doors */}
        <path d={arch(0, -20, 190, 230)} fill={shade(stone, 0.55)} />
        <path d={arch(-47, -20, 90, 196)} fill={wood} />
        <path d={arch(47, -20, 90, 196)} fill={wood} />
        {[-72, -52, -32, -12].map((px) => (
          <rect key={`pl${px}`} x={px} y={-200} width={3} height={178} fill={shade(wood, 0.3)} />
        ))}
        {[-72, -52, -32, -12].map((px) => (
          <rect key={`pr${px}`} x={px + 22} y={-200} width={3} height={178} fill={shade(wood, 0.3)} />
        ))}
        <rect x={-90} y={-120} width={86} height={10} fill={C.greyDark} />
        <rect x={4} y={-120} width={86} height={10} fill={C.greyDark} />
        <rect x={-90} y={-60} width={86} height={10} fill={C.greyDark} />
        <rect x={4} y={-60} width={86} height={10} fill={C.greyDark} />
        {/* steps up to the gate */}
        <rect x={-110} y={-24} width={220} height={8} fill={shade(stone, 0.15)} />
      </g>
    </g>
  );
}
