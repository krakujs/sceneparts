import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Oval multi-tier stone arena, front view: three tiers of arches, cornices, rounded ends and a broken top edge
// with fallen blocks. Generic, not a copy of any real landmark. Origin = ground under the centre.
// About 960 px wide and 510 px tall at s = 1. anim "lights": the torches in the lower arches light up in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const arch = (xc: number, yb: number, w: number, h: number) => {
  const r = w / 2, yt = yb - h + r;
  return `M ${f1(xc - r)} ${f1(yb)} V ${f1(yt)} A ${f1(r)} ${f1(r)} 0 0 1 ${f1(xc + r)} ${f1(yt)} V ${f1(yb)} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.sand;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const hole = shade(stone, 0.55);
  const torchOn = (k: number) => anim === "lights" && Math.floor(f / 6) % 9 === k;
  const upper = shade(stone, 0.08);
  const top = shade(stone, 0.12);
  const tier1 = [-384, -288, -192, -96, 0, 96, 192, 288, 384];
  const tier2 = [-320, -240, -160, -80, 0, 80, 160, 240, 320];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={520} ry={20} fill={C.shadow} />
        {/* tier 1: wide ground ring with 9 round arches and torches */}
        <ellipse cx={-450} cy={-90} rx={30} ry={90} fill={stone} />
        <ellipse cx={450} cy={-90} rx={30} ry={90} fill={stone} />
        <rect x={-450} y={-180} width={900} height={150} rx={18} fill={stone} />
        <rect x={-460} y={-196} width={920} height={16} rx={6} fill={trim} />
        {tier1.map((xc, i) => (
          <path key={`a1${i}`} d={arch(xc, -36, 52, 112)} fill={torchOn(i) ? C.yellow : hole} />
        ))}
        {tier1.map((xc, i) => (
          <rect key={`t1${i}`} x={xc - 4} y={-176} width={8} height={10} fill={shade(stone, 0.2)} />
        ))}
        <rect x={-450} y={-30} width={900} height={30} rx={6} fill={shade(stone, 0.3)} />
        {/* tier 2: smaller arches */}
        <ellipse cx={-410} cy={-278} rx={26} ry={82} fill={upper} />
        <ellipse cx={410} cy={-278} rx={26} ry={82} fill={upper} />
        <rect x={-410} y={-360} width={820} height={164} fill={upper} />
        <rect x={-420} y={-376} width={840} height={16} rx={6} fill={trim} />
        {tier2.map((xc, i) => (
          <path key={`a2${i}`} d={arch(xc, -210, 44, 90)} fill={hole} />
        ))}
        {/* tier 3: broken top edge */}
        <path d="M -370 -360 L -370 -470 L -320 -470 L -320 -498 L -170 -498 L -170 -452 L -70 -452 L -70 -482 L 70 -482 L 70 -445 L 210 -445 L 210 -508 L 370 -508 L 370 -360 Z" fill={top} />
        <ellipse cx={-370} cy={-430} rx={24} ry={70} fill={top} />
        <ellipse cx={370} cy={-430} rx={24} ry={70} fill={top} />
        {[-270, -180, 0, 180, 270].map((xc, i) => (
          <path key={`a3${i}`} d={arch(xc, -392, 40, 50)} fill={hole} />
        ))}
        {/* fallen blocks at the foot and on the broken top */}
        <rect x={-310} y={-72} width={76} height={42} rx={6} fill={shade(stone, 0.25)} />
        <rect x={250} y={-62} width={92} height={32} rx={6} fill={shade(stone, 0.25)} />
        <rect x={-40} y={-50} width={64} height={22} rx={5} fill={shade(stone, 0.35)} />
        <rect x={120} y={-470} width={52} height={24} rx={5} fill={shade(stone, 0.2)} />
      </g>
    </g>
  );
}
