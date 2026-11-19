import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flip phone shown open: upper lid with screen, lower half with keypad, hinge band between.
// Origin = bottom centre (the lower half stands on y). anim "hinge": the lid swings a little.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const KEYS = Array.from({ length: 9 }, (_, i) => ({ cx: [-58, 0, 58][i % 3], cy: -238 + Math.floor(i / 3) * 50 }));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const lcd = p.screen && p.screen !== "none" ? p.screen : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const lidAngle = anim === "hinge" ? -6 - 8 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 80)) : -6;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* upper lid, pivots on the hinge */}
        <g transform={`rotate(${f1(lidAngle)} 0 -296)`}>
          <rect x={-116} y={-600} width={232} height={304} rx={36} fill={body} />
          <rect x={-28} y={-584} width={56} height={8} rx={4} fill={shade(body, 0.4)} />
          <rect x={-92} y={-560} width={184} height={220} rx={12} fill={lcd} />
          <rect x={-92} y={-560} width={184} height={26} rx={12} fill={shade(lcd, 0.15)} />
          <circle cx={0} cy={-440} r={46} fill={C.white} opacity={0.6} />
          <rect x={-60} y={-372} width={120} height={10} rx={5} fill={C.white} opacity={0.7} />
          <rect x={-44} y={-352} width={88} height={10} rx={5} fill={C.white} opacity={0.5} />
          {[-40, 0, 40].map((cx) => (
            <circle key={cx} cx={cx} cy={-320} r={8} fill={C.white} opacity={0.6} />
          ))}
        </g>
        {/* lower half with keypad */}
        <rect x={-120} y={-296} width={240} height={296} rx={34} fill={body} />
        <rect x={-40} y={-272} width={80} height={8} rx={4} fill={shade(body, 0.4)} />
        {KEYS.map((k, i) => (
          <g key={i}>
            <rect x={k.cx - 25} y={k.cy - 16} width={50} height={34} rx={10} fill={shade(C.white, 0.2)} />
            <rect x={k.cx - 25} y={k.cy - 19} width={50} height={34} rx={10} fill={C.white} />
          </g>
        ))}
        <rect x={-84} y={-58} width={60} height={36} rx={12} fill={C.green} />
        <rect x={24} y={-58} width={60} height={36} rx={12} fill={C.red} />
        <circle cx={0} cy={-10} r={5} fill={shade(body, 0.4)} />
        {/* hinge band */}
        <rect x={-124} y={-310} width={248} height={26} rx={13} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
