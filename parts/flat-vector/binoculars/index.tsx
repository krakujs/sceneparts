import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of binoculars seen from the front, standing on its barrels, with a neck strap across the top.
// Origin = bottom centre. Hero size, about 340 px wide and 470 px tall at s = 1.
// anim "focus": the focus wheel on the bridge turns.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const Barrel = ({ cx, body }: { cx: number; body: string }) => (
  <g>
    <rect x={cx - 62} y={-330} width={124} height={320} rx={52} fill={body} />
    <rect x={cx - 50} y={-316} width={12} height={280} rx={6} fill={C.white} opacity={0.2} />
    <ellipse cx={cx} cy={-300} rx={40} ry={30} fill={shade(body, 0.3)} />
    <ellipse cx={cx} cy={-300} rx={28} ry={20} fill={C.ink} />
    <ellipse cx={cx} cy={-68} rx={46} ry={44} fill={shade(body, 0.3)} />
    <ellipse cx={cx} cy={-68} rx={34} ry={32} fill={C.skyDeep} />
    <ellipse cx={cx - 10} cy={-80} rx={10} ry={8} fill={C.white} opacity={0.6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const rot = anim === "focus" ? f * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -150 -260 Q 0 -470 150 -260" fill="none" stroke={C.inkSoft} strokeWidth={14} strokeLinecap="round" />
        <circle cx={-150} cy={-260} r={10} fill={C.inkSoft} />
        <circle cx={150} cy={-260} r={10} fill={C.inkSoft} />
        <Barrel cx={-88} body={body} />
        <Barrel cx={88} body={body} />
        <rect x={-50} y={-320} width={100} height={60} rx={12} fill={shade(body, 0.15)} />
        <g transform={`translate(0 -286) rotate(${f1(rot)})`}>
          <circle r={24} fill={accent} />
          {[0, 60, 120].map((a) => (
            <rect key={a} x={-3} y={-22} width={6} height={44} rx={3} fill={shade(accent, 0.3)} transform={`rotate(${a})`} />
          ))}
        </g>
      </g>
    </g>
  );
}
