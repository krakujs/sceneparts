import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Floor lamp: tall standing lamp with a straight pole or an arched pole, and a drum shade.
// variant "straight" = upright pole; "arc" = pole that bends over to the side. Origin = base centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const on = anim === "on";
  const arc = p.variant === "arc";
  const k = on ? 0.92 + 0.08 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const inner = on ? "#FFF3C4" : shade(c, 0.35);
  // Shade hangs from its top point (ax, ay); the pole ends inside it.
  const ax = arc ? 240 : 0, ay = arc ? -820 : -800;
  const gx = ax, gy = ay + 75;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {on && (
          <g>
            <ellipse cx={0} cy={-2} rx={260} ry={26} fill={C.yellow} opacity={0.25 * k} />
            <circle cx={gx} cy={gy} r={380} fill={C.yellow} opacity={0.07 * k} />
            <circle cx={gx} cy={gy} r={290} fill={C.yellow} opacity={0.11 * k} />
            <circle cx={gx} cy={gy} r={220} fill={C.yellow} opacity={0.16 * k} />
          </g>
        )}
        {arc ? (
          <path d={`M 0 -40 L 0 -420 C 0 -600 120 -700 ${ax} -730`} fill="none" stroke={c2} strokeWidth={20} strokeLinecap="round" />
        ) : (
          <rect x={-11} y={-730} width={22} height={690} rx={6} fill={c2} />
        )}
        <ellipse cx={0} cy={-22} rx={130} ry={22} fill={c2} />
        <path d="M -130 -22 A 130 22 0 0 0 130 -22 Z" fill={shade(c2, 0.2)} />
        <g transform={`translate(${ax} ${ay})`}>
          <path d="M -130 0 L -175 150 A 175 28 0 0 0 175 150 L 130 0 Z" fill={c} />
          <path d="M 90 4 L 130 0 L 175 150 L 130 150 Z" fill={shade(c, 0.15)} />
          <ellipse cx={0} cy={0} rx={130} ry={22} fill={inner} />
        </g>
      </g>
    </g>
  );
}
