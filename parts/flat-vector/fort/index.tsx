import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hill fort: a fortified keep and curtain wall with crenellations, two round-cornered bastions and a big
// wooden gate, all on a grassy hill. Origin = ground centre. About 1000 px wide and 1000 px tall at s = 1 (roof included).
// anim "lights": the arrow-slit windows in the towers glow one after another.
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
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 6 === k;
  const green = C.green, greenDark = C.greenDark;
  const slit = (key: string, sx: number, sy: number, glow: boolean) => (
    <rect key={key} x={sx} y={sy} width={14} height={40} rx={7} fill={glow ? C.yellow : C.sky} />
  );
  const merlons = (key: string, x0: number, yTop: number, count: number, gap: number) =>
    Array.from({ length: count }, (_, i) => (
      <rect key={`${key}${i}`} x={x0 + i * gap} y={yTop} width={gap * 0.55} height={50} fill={stone} />
    ));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={520} ry={22} fill={C.shadow} />
        {/* grassy hill */}
        <path d="M -520 0 C -460 -200 -360 -380 -240 -380 L 240 -380 C 360 -380 460 -200 520 0 Z" fill={green} />
        <path d="M -520 0 C -460 -200 -360 -380 -240 -380 L -120 -380 C -220 -330 -330 -200 -360 0 Z" fill={greenDark} />
        {/* keep behind the wall */}
        <rect x={-110} y={-820} width={220} height={480} fill={shade(stone, 0.08)} />
        <path d="M -130 -820 L 0 -960 L 130 -820 Z" fill={wood} />
        <rect x={-110} y={-830} width={220} height={12} fill={shade(stone, 0.2)} />
        {slit("k1", -58, -740, lit(0))}
        {slit("k2", 44, -740, lit(1))}
        {/* curtain wall with crenellations */}
        <rect x={-340} y={-600} width={680} height={300} fill={stone} />
        <rect x={-340} y={-612} width={680} height={14} rx={4} fill={shade(stone, 0.12)} />
        {merlons("w", -328, -650, 13, 52)}
        {[-540, -480, -420, -360].map((ly) => (
          <rect key={ly} x={-340} y={ly} width={680} height={5} fill={shade(stone, 0.12)} />
        ))}
        {/* bastions */}
        <rect x={-420} y={-600} width={100} height={480} rx={14} fill={stone} />
        <rect x={320} y={-600} width={100} height={480} rx={14} fill={stone} />
        <rect x={-432} y={-616} width={124} height={22} rx={6} fill={shade(stone, 0.12)} />
        <rect x={308} y={-616} width={124} height={22} rx={6} fill={shade(stone, 0.12)} />
        {merlons("bl", -420, -660, 2, 50)}
        {merlons("br", 320, -660, 2, 50)}
        {slit("b1", -368, -520, lit(2))}
        {slit("b2", 354, -520, lit(3))}
        {slit("b3", -368, -420, lit(4))}
        {slit("b4", 354, -420, lit(5))}
        {/* big wooden gate */}
        <path d={arch(0, -300, 172, 230)} fill={shade(stone, 0.55)} />
        <path d={arch(-42, -300, 80, 200)} fill={wood} />
        <path d={arch(42, -300, 80, 200)} fill={wood} />
        {[-60, -40, -20].map((px) => <rect key={`pl${px}`} x={px} y={-480} width={3} height={180} fill={shade(wood, 0.3)} />)}
        {[24, 44, 64].map((px) => <rect key={`pr${px}`} x={px} y={-480} width={3} height={180} fill={shade(wood, 0.3)} />)}
        <rect x={-82} y={-380} width={80} height={10} fill={C.greyDark} />
        <rect x={2} y={-380} width={80} height={10} fill={C.greyDark} />
        <rect x={-82} y={-440} width={80} height={10} fill={C.greyDark} />
        <rect x={2} y={-440} width={80} height={10} fill={C.greyDark} />
        {/* stone ramp from the gate down the hill */}
        <path d="M -90 -300 L 90 -300 L 200 -40 L -200 -40 Z" fill={C.sand} opacity={0.85} />
      </g>
    </g>
  );
}
