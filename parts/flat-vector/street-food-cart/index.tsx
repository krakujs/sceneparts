import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wheeled street-food cart, front view: striped canopy on two poles, serving hatch with jars, steel griddle with food
// and two steaming pots, push handle behind. Origin = bottom centre; the wheels stand on y.
// About 700 px wide and 850 px tall at s = 1.
// anim "lights": steam rises from the pots and griddle, one puff after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const lights = anim === "lights";
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy={-70} r={70} fill={C.ink} />
      <circle cx={cx} cy={-70} r={40} fill={C.greyLight} />
      <circle cx={cx} cy={-70} r={14} fill={C.greyDark} />
    </g>
  );
  const puff = (cx: number, base: number, k: number) => {
    const r = lights ? (f * 2 + k * 40) % 120 : 30 + k * 32;
    return (
      <circle key={`${cx}-${base}-${k}`} cx={f1(cx + (k % 2 ? 8 : -8) * (r / 120))} cy={f1(base - r)} r={f1(18 + r * 0.12)}
        fill={C.white} opacity={f1(lights ? 0.9 * (1 - r / 120) : 0.7)} />
    );
  };
  const jars = [C.yellow, C.red, C.lime, C.white, C.yellow];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* canopy poles and push handle */}
        <rect x={-300} y={-770} width={12} height={330} fill={C.greyDark} />
        <rect x={288} y={-770} width={12} height={330} fill={C.greyDark} />
        <rect x={296} y={-380} width={92} height={16} rx={8} fill={C.greyDark} />
        <rect x={376} y={-380} width={16} height={214} rx={8} fill={C.greyDark} />
        {/* wheels, chassis */}
        {wheel(-230)}
        {wheel(230)}
        <rect x={-320} y={-170} width={640} height={40} rx={10} fill={C.greyDark} />
        {/* cabinet */}
        <rect x={-290} y={-440} width={580} height={270} rx={16} fill={body} />
        <rect x={236} y={-440} width={54} height={226} rx={12} fill={shade(body, 0.15)} />
        <rect x={-290} y={-220} width={580} height={50} rx={8} fill={shade(body, 0.18)} />
        {/* serving hatch with jars on a shelf */}
        <rect x={-230} y={-410} width={460} height={120} rx={12} fill={C.inkSoft} />
        <rect x={-220} y={-340} width={440} height={10} rx={4} fill={shade(body, 0.25)} />
        {jars.map((c, i) => (
          <rect key={i} x={-200 + i * 80} y={-386} width={40} height={46} rx={6} fill={c} />
        ))}
        <rect x={-260} y={-300} width={520} height={20} rx={8} fill={C.greyLight} />
        {/* counter top and griddle */}
        <rect x={-310} y={-456} width={620} height={18} rx={8} fill={C.greyLight} />
        <rect x={-170} y={-500} width={340} height={46} rx={10} fill={C.greyDark} />
        <rect x={-160} y={-500} width={320} height={8} rx={4} fill={C.grey} />
        <ellipse cx={-110} cy={-506} rx={30} ry={12} fill={C.yellowDark} />
        <ellipse cx={-20} cy={-506} rx={30} ry={12} fill={C.orange} />
        <ellipse cx={70} cy={-506} rx={30} ry={12} fill={C.yellowDark} />
        <rect x={96} y={-514} width={58} height={16} rx={8} fill={C.redDark} />
        {/* pots and their lids */}
        {[-222, 222].map((cx) => (
          <g key={cx}>
            <rect x={cx - 40} y={-520} width={80} height={64} rx={12} fill={C.greyDark} />
            <rect x={cx - 46} y={-532} width={92} height={14} rx={7} fill={C.grey} />
            <circle cx={cx} cy={-540} r={8} fill={C.ink} />
          </g>
        ))}
        {/* steam */}
        {[0, 1, 2].map((k) => puff(-222, -546, k))}
        {[0, 1, 2].map((k) => puff(222, -546, k))}
        {[0, 1, 2].map((k) => puff(0, -520, k))}
        {/* striped canopy with scalloped edge */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x0 = -340 + i * 85, col = i % 2 ? stripe : body;
          return (
            <g key={i}>
              <rect x={x0} y={-840} width={85} height={80} fill={col} />
              <circle cx={x0 + 42.5} cy={-760} r={42.5} fill={col} />
            </g>
          );
        })}
        <rect x={-352} y={-852} width={704} height={22} rx={11} fill={C.greyDark} />
        {/* small string of bulbs under the canopy */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={-300 + i * 100} cy={-716} r={8}
            fill={lights && Math.floor(f / 10) % 7 === i ? C.yellow : C.greyLight} />
        ))}
      </g>
    </g>
  );
}
