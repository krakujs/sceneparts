import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pedestal fan: a round base, a pole, a motor housing and a wire cage around three blades. anim "spin" turns the
// blades; the cage stays put. Origin = bottom centre, real size (about 700 px tall).
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const HX = 0, HY = -460, R = 180;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const dk = shade(c, 0.2);
  const spin = (p.anim ?? "none") === "spin" ? (f * 8) % 360 : 0;
  const blade = (deg: number) => (
    <g key={deg} transform={`rotate(${f1(deg)} ${HX} ${HY})`}>
      <path d={`M ${HX} ${HY} Q 80 ${HY - 46} 166 ${HY - 10} Q 90 ${HY + 14} ${HX} ${HY} Z`} fill={c} />
      <path d={`M ${HX} ${HY} Q 80 ${HY - 46} 166 ${HY - 10} L 150 ${HY} Q 90 ${HY} ${HX} ${HY} Z`} fill={dk} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "spin" ? "none" : (p.anim ?? "none"), f)}>
        {/* base and pole */}
        <rect x={-172} y={-30} width={344} height={30} rx={15} fill={c} />
        <rect x={-172} y={-14} width={344} height={14} rx={7} fill={dk} />
        <rect x={-18} y={-560} width={36} height={540} rx={12} fill={C.greyDark} />
        {/* motor housing behind the blades */}
        <rect x={-54} y={-500} width={108} height={70} rx={24} fill={c} />
        <rect x={-54} y={-500} width={108} height={22} rx={11} fill={dk} />
        {/* back of the cage */}
        <circle cx={HX} cy={HY} r={R} fill={C.greyLight} opacity={0.55} />
        {/* blades */}
        <g transform={`rotate(${f1(spin)} ${HX} ${HY})`}>
          {[0, 120, 240].map((d) => blade(d))}
        </g>
        <circle cx={HX} cy={HY} r={32} fill={C.greyDark} />
        <circle cx={HX} cy={HY} r={12} fill={C.white} />
        {/* front cage wires */}
        <circle cx={HX} cy={HY} r={R} fill="none" stroke={C.greyDark} strokeWidth={7} />
        <circle cx={HX} cy={HY} r={R * 0.5} fill="none" stroke={C.greyDark} strokeWidth={5} opacity={0.7} />
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <line key={deg} x1={HX} y1={HY - R} x2={HX} y2={HY + R} stroke={C.greyDark} strokeWidth={5} opacity={0.7} transform={`rotate(${deg} ${HX} ${HY})`} />
        ))}
      </g>
    </g>
  );
}
