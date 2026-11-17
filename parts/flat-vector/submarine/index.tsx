import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rounded submarine, side view facing right. Origin = the centre of the hull; it is underwater, so y is its middle.
// Room scale: about 740 px wide and 330 px tall at s = 1. anim "drive": it rocks, the propeller spins and bubbles rise.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 120) * 1.5)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 900;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.yellow;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive";
  const spin = driving ? f * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {driving && [0, 1, 2].map((i) => {
          const by = -262 - ((f * 2 + i * 60) % 180);
          return <circle key={i} cx={34 + i * 6} cy={by} r={8 + i * 2} fill={C.skyDeep} opacity={0.9} />;
        })}
        {/* tail fin and propeller at the back */}
        <path d="M -290 -76 L -360 -150 L -330 -76 Z" fill={dark} />
        <rect x={-352} y={-14} width={50} height={28} rx={10} fill={dark} />
        <g transform={`translate(-352 0) rotate(${f1(spin)})`}>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={-7} y={-46} width={14} height={92} rx={7} fill={C.inkSoft} transform={`rotate(${k * 120})`} />
          ))}
          <circle cx={0} cy={0} r={10} fill={dark} />
        </g>
        {/* hull: rounded capsule with a darker lower band */}
        <rect x={-330} y={-80} width={620} height={160} rx={80} fill={hull} />
        <rect x={-300} y={28} width={560} height={36} rx={18} fill={shade(hull, 0.2)} />
        {/* conning tower and periscope */}
        <rect x={-60} y={-180} width={150} height={120} rx={40} fill={dark} />
        <rect x={-10} y={-174} width={80} height={14} rx={6} fill={shade(dark, 0.3)} />
        <rect x={20} y={-250} width={14} height={74} fill={dark} />
        <rect x={14} y={-256} width={42} height={12} rx={6} fill={dark} />
        {/* portholes */}
        {[-230, -160, -90, 200].map((cx) => (
          <circle key={cx} cx={cx} cy={-4} r={18} fill={C.sky} />
        ))}
      </g>
    </g>
  );
}
