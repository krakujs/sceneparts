import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sleek speedboat with windscreen and outboard motor, side view facing right. Origin = waterline centre.
// Room scale: about 760 px wide and 330 px tall at s = 1. anim "drive": it rocks and a white wake trails behind.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 1.4)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={w / 2 - 210} y={8} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.orange;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {driving && [0, 1, 2, 3].map((i) => {
          const cx = -390 - ((i * 90 + f * 4) % 360);
          return <ellipse key={i} cx={cx} cy={i % 2 ? 12 : -6} rx={50 - i * 7} ry={7} fill={C.white} opacity={1 - i * 0.18} />;
        })}
        {/* outboard motor on the transom */}
        <rect x={-342} y={-100} width={42} height={104} rx={10} fill={C.greyDark} />
        <rect x={-352} y={-222} width={62} height={126} rx={22} fill={C.greyDark} />
        <rect x={-362} y={-232} width={80} height={30} rx={14} fill={C.inkSoft} />
        {/* hull: sleek pointed bow, darker lower shade */}
        <path d="M -330 -112 L 200 -112 Q 300 -108 380 -40 L 340 12 L -330 12 Z" fill={hull} />
        <path d="M -330 -62 L 340 -62 L 340 12 L -330 12 Z" fill={shade(hull, 0.2)} />
        <rect x={-330} y={-94} width={660} height={12} rx={6} fill={trim} />
        {/* seats and windscreen */}
        <rect x={-200} y={-152} width={210} height={40} rx={16} fill={trim} />
        <path d="M 60 -112 L 110 -200 L 180 -200 L 230 -112 Z" fill={C.sky} />
      </g>
      <Water w={740} />
    </g>
  );
}
