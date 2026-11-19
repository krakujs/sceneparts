import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rural mud house: a plastered mud wall with a painted dot border, a tiled roof with scalloped eaves, a wooden door,
// a barred window and a woven cot (charpai) outside. Origin = ground centre. About 900 px wide and 620 px tall at s = 1.
// anim "lights": the window lamp glows.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const mud = p.color && p.color !== "none" ? p.color : "#D2A679";
  const tile = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  const lampOn = anim === "lights" && Math.floor(f / 10) % 2 === 0;
  const dots = Array.from({ length: 17 }, (_, i) => -320 + i * 40);
  const tileRows = [-470, -500, -530, -560];
  const halfW = (yy: number) => 370 - (-420 - yy) * (120 / 170);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={440} ry={18} fill={C.shadow} />
        {/* mud walls */}
        <rect x={-320} y={-430} width={640} height={430} rx={10} fill={mud} />
        <rect x={-320} y={-40} width={640} height={40} rx={6} fill={shade(mud, 0.2)} />
        {/* painted dot borders */}
        <rect x={-330} y={-430} width={660} height={40} rx={6} fill={tile} />
        {dots.map((dx) => <circle key={`dt${dx}`} cx={dx} cy={-410} r={8} fill={C.white} />)}
        <rect x={-320} y={-92} width={640} height={16} fill={tile} />
        {dots.map((dx) => <circle key={`db${dx}`} cx={dx} cy={-84} r={5} fill={C.yellow} />)}
        {/* tiled roof with scalloped eaves */}
        <path d="M -370 -420 L -250 -590 Q 0 -640 250 -590 L 370 -420 Z" fill={tile} />
        {tileRows.map((ry) => <rect key={`tr${ry}`} x={-halfW(ry)} y={ry} width={halfW(ry) * 2} height={6} fill={shade(tile, 0.25)} />)}
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={`sc${i}`} cx={-345 + i * 46} cy={-420} r={18} fill={tile} />
        ))}
        {/* door */}
        <rect x={-82} y={-312} width={164} height={14} fill={shade(mud, 0.3)} />
        <rect x={-70} y={-300} width={140} height={300} rx={8} fill={C.brownDark} />
        <rect x={-30} y={-290} width={3} height={280} fill={shade(C.brownDark, 0.3)} />
        <rect x={27} y={-290} width={3} height={280} fill={shade(C.brownDark, 0.3)} />
        <circle cx={44} cy={-160} r={5} fill={C.yellow} />
        {/* barred window */}
        <rect x={-250} y={-340} width={100} height={84} rx={4} fill={lampOn ? C.yellow : C.sky} />
        <rect x={-202} y={-340} width={4} height={84} fill={C.greyDark} />
        <rect x={-250} y={-300} width={100} height={4} fill={C.greyDark} />
        <rect x={-256} y={-346} width={112} height={6} fill={shade(mud, 0.3)} />
        {/* cot outside on the right */}
        <rect x={262} y={-150} width={10} height={150} fill={shade(C.brown, 0.1)} />
        <rect x={470} y={-130} width={10} height={130} fill={shade(C.brown, 0.1)} />
        <rect x={236} y={-120} width={250} height={14} rx={4} fill={C.brown} />
        <rect x={240} y={-106} width={230} height={22} fill={C.sand} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={`wv${i}`} x={246 + i * 19} y={-106} width={3} height={22} fill={shade(C.sand, 0.25)} />
        ))}
        <rect x={236} y={-170} width={14} height={60} fill={C.brown} />
      </g>
    </g>
  );
}
