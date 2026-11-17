import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ornate haveli facade in the Rajasthani style: three floors of arched windows, a central jharokha balcony with a
// small roof, a lattice window, carved cornices, an arched double door and a parapet with domed corner kiosks.
// Origin = ground centre. About 940 px wide and 1080 px tall at s = 1.
// anim "lights": the arched windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const arch = (xc: number, yb: number, w: number, h: number) => {
  const r = w / 2, yt = yb - h + r;
  return `M ${f1(xc - r)} ${f1(yb)} V ${f1(yt)} A ${f1(r)} ${f1(r)} 0 0 1 ${f1(xc + r)} ${f1(yt)} V ${f1(yb)} Z`;
};
const archWin = (key: string, xc: number, yb: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <path d={arch(xc, yb, w, h)} fill={glow ? C.yellow : C.sky} />
    <rect x={xc - 3} y={yb - h + w / 2} width={6} height={h - w / 2} fill={C.white} opacity={0.5} />
    {[-w / 4, w / 4].map((dx) => <rect key={dx} x={xc + dx - 2} y={yb - h + w / 2} width={4} height={h - w / 2} fill={shade(C.sky, 0.3)} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#E9C58F";
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 6 === k;
  const dark = shade(wall, 0.55);
  const pilasters = [-360, -300, -180, 180, 300, 360];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={500} ry={20} fill={C.shadow} />
        {/* plinth and main facade */}
        <rect x={-450} y={-70} width={900} height={70} fill={shade(wall, 0.3)} />
        <rect x={-420} y={-930} width={840} height={860} fill={wall} />
        {pilasters.map((px) => <rect key={`pl${px}`} x={px - 8} y={-930} width={16} height={860} fill={shade(wall, 0.12)} />)}
        {/* cornices at each floor line */}
        {[-330, -560, -930].map((cy) => <rect key={`cn${cy}`} x={-440} y={cy - 8} width={880} height={18} rx={4} fill={trim} />)}
        {/* parapet with domed corner kiosks */}
        <rect x={-400} y={-985} width={800} height={58} fill={wall} />
        {[-380, 380].map((kx) => (
          <g key={`kio${kx}`}>
            <rect x={kx - 36} y={-1030} width={72} height={50} fill={wall} />
            <path d={`M ${kx - 36} -1030 A 36 36 0 0 1 ${kx + 36} -1030 Z`} fill={trim} />
          </g>
        ))}
        <rect x={-430} y={-990} width={860} height={10} rx={4} fill={trim} />
        {/* ground floor: arched double door and arched windows */}
        <path d={arch(0, -70, 200, 260)} fill={dark} />
        <path d={arch(-48, -70, 92, 230)} fill={C.brownDark} />
        <path d={arch(48, -70, 92, 230)} fill={C.brownDark} />
        <circle cx={-18} cy={-160} r={5} fill={C.yellow} />
        <circle cx={18} cy={-160} r={5} fill={C.yellow} />
        {archWin("gl", -300, -90, 92, 170, lit(0))}
        {archWin("gr", 300, -90, 92, 170, lit(1))}
        {/* second floor: arched windows and central jharokha */}
        {archWin("ml", -300, -350, 92, 170, lit(2))}
        {archWin("mr", 300, -350, 92, 170, lit(3))}
        <rect x={-120} y={-545} width={240} height={190} rx={6} fill={shade(wall, 0.06)} />
        <rect x={-136} y={-360} width={272} height={20} rx={5} fill={trim} />
        {archWin("jh", 0, -370, 120, 140, lit(4))}
        {[-96, -60, 60, 96].map((bx) => <rect key={`bx${bx}`} x={bx - 4} y={-545} width={8} height={170} fill={shade(wall, 0.25)} />)}
        <rect x={-130} y={-545} width={260} height={16} rx={4} fill={trim} />
        {/* jharokha roof */}
        <path d="M -150 -545 L 0 -630 L 150 -545 Z" fill={trim} />
        <circle cx={0} cy={-640} r={14} fill={C.yellow} />
        {/* third floor: arched windows and lattice window */}
        {archWin("tl", -300, -580, 92, 170, lit(5))}
        {archWin("tr", 300, -580, 92, 170, lit(0))}
        <rect x={-90} y={-740} width={180} height={150} rx={8} fill={shade(wall, 0.2)} />
        {[0, 1, 2, 3].map((cx) => [0, 1, 2].map((cy) => (
          <circle key={`jl${cx}${cy}`} cx={-60 + cx * 40} cy={-710 + cy * 40} r={9} fill={wall} />
        )))}
        {/* small corner windows at the top floor */}
        <rect x={-380} y={-870} width={60} height={120} rx={28} fill={dark} />
        <rect x={320} y={-870} width={60} height={120} rx={28} fill={dark} />
      </g>
    </g>
  );
}
