import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Staved wooden barrel with metal hoops, upright, side view. About 400 px wide and 480 px tall at s = 1 (hero scale).
// Origin = bottom centre (stands on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Barrel body: bulging sides from top (y -480) to bottom (y 0), widest at the middle.
const BODY = "M-150 -470 Q-215 -240 -150 -10 L150 -10 Q215 -240 150 -470 Z";
const HOOPS = [-440, -300, -160, -50];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const hoop = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d={BODY} fill={wood} />
        {/* shaded side for depth */}
        <path d="M60 -470 Q130 -240 60 -10 L150 -10 Q215 -240 150 -470 Z" fill={shade(wood, 0.25)} />
        {/* stave lines */}
        {[-80, 0, 80].map((sx) => (
          <path key={sx} d={`M${sx} -465 Q${sx * 1.35} -240 ${sx} -15`} fill="none" stroke={shade(wood, 0.3)} strokeWidth={8} strokeLinecap="round" />
        ))}
        {/* metal hoops */}
        {HOOPS.map((hy, i) => {
          const w = 150 + Math.sin(((hy + 470) / 460) * Math.PI) * 66;
          return <rect key={i} x={-w} y={hy} width={w * 2} height={26} rx={13} fill={hoop} />;
        })}
        {/* bung on the front */}
        <ellipse cx={-40} cy={-330} rx={14} ry={10} fill={shade(wood, 0.45)} />
      </g>
    </g>
  );
}
