import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Theatre facade with a blank marquee framed by a ring of lights and a drama-mask icon. No words. Origin = bottom centre. About 880 px wide and 960 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F6E9EE";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#7B5CD6";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={470} ry={22} fill={C.shadow} />
        <rect x={-440} y={-22} width={880} height={22} rx={6} fill={shade(wall, 0.2)} />
        {/* facade */}
        <rect x={-400} y={-860} width={800} height={840} rx={12} fill={wall} />
        <path d="M -440 -860 L 0 -960 L 440 -860 Z" fill={roof} />
        <rect x={-440} y={-870} width={880} height={22} rx={8} fill={shade(roof, 0.2)} />
        {/* marquee with blank panel and lights */}
        <rect x={-300} y={-640} width={600} height={120} rx={14} fill={C.navy} />
        <rect x={-270} y={-612} width={540} height={64} rx={8} fill={C.white} opacity={0.9} />
        {[-290, -230, -170, -110, -50, 10, 70, 130, 190, 250].map((lx, i) => (
          <circle key={lx} cx={lx + 20} cy={-520} r={10} fill={C.yellow} opacity={anim === "lights" ? lit(i) : 1} />
        ))}
        {[-290, -230, -170, -110, -50, 10, 70, 130, 190, 250].map((lx, i) => (
          <circle key={lx + 1} cx={lx + 20} cy={-650} r={8} fill={C.yellow} opacity={anim === "lights" ? lit(i + 5) : 1} />
        ))}
        {/* drama-mask icon above the marquee */}
        <circle cx={-160} cy={-760} r={58} fill={C.yellow} />
        <ellipse cx={-184} cy={-770} rx={10} ry={13} fill={C.ink} />
        <ellipse cx={-136} cy={-770} rx={10} ry={13} fill={C.ink} />
        <path d="M -190 -735 Q -160 -712 -130 -735 Q -160 -722 -190 -735 Z" fill={C.ink} />
        <circle cx={160} cy={-760} r={58} fill={C.purple} />
        <ellipse cx={136} cy={-770} rx={10} ry={13} fill={C.white} />
        <ellipse cx={184} cy={-770} rx={10} ry={13} fill={C.white} />
        <path d="M 124 -724 Q 160 -760 196 -724 Q 160 -740 124 -724 Z" fill={C.white} />
        {/* columns and doors */}
        {[-320, -220, 220, 320].map((cx) => (
          <rect key={cx} x={cx - 16} y={-420} width={32} height={380} fill={shade(wall, 0.12)} />
        ))}
        <rect x={-90} y={-340} width={180} height={320} rx={12} fill={C.brownDark} />
        <rect x={-76} y={-326} width={70} height={296} rx={8} fill={C.skyDeep} />
        <rect x={6} y={-326} width={70} height={296} rx={8} fill={C.skyDeep} />
        <rect x={-76} y={-326} width={12} height={296} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
