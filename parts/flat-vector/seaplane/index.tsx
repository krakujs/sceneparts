import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small seaplane, side view, facing right: propeller plane body with a long float under each side instead of wheels.
// Origin = bottom centre (the bottom of the floats); about 560 px wide and 360 px tall at s = 1.
// anim "fly": gentle hover and the propeller spins.
const f1 = (v: number) => v.toFixed(1);
const hover = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 90) + 1) * 7;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const wing = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const spin = anim === "fly" ? f * 26 : 0;
  const px = 238, py = -184;
  const float = (cx: number) => (
    <g transform={`translate(${cx} 0)`}>
      <path d="M -200 -48 Q -200 -70 -170 -70 L 150 -70 Q 205 -70 200 -36 Q 196 0 150 0 L -160 0 Q -200 0 -200 -48 Z" fill={shade(wing, 0.12)} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y + hover(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <path d="M -196 -232 L -262 -352 L -206 -352 L -150 -232 Z" fill={body} />
        <path d="M -230 -188 Q -236 -232 -190 -238 L 92 -240 Q 170 -238 196 -200 Q 206 -182 196 -162 Q 180 -128 130 -128 L -180 -128 Q -226 -128 -230 -188 Z" fill={body} />
        <rect x={-120} y={-222} width={70} height={58} rx={12} fill={C.sky} />
        <rect x={-40} y={-222} width={70} height={58} rx={12} fill={C.sky} />
        <rect x={-214} y={-176} width={300} height={12} rx={6} fill={shade(body, 0.25)} />
        <rect x={168} y={-236} width={58} height={108} rx={28} fill={C.greyDark} />
        <rect x={-26} y={-262} width={12} height={36} fill={C.greyDark} />
        <rect x={-110} y={-290} width={244} height={30} rx={13} fill={wing} />
        {spin !== 0 && <circle cx={px} cy={py} r={92} fill={C.white} opacity={0.22} />}
        <g transform={`rotate(${f1(spin)} ${px} ${py})`}>
          <rect x={px - 8} y={py - 90} width={16} height={180} rx={7} fill={C.ink} />
        </g>
        <circle cx={px} cy={py} r={15} fill={C.greyDark} />
        {/* struts and the two floats */}
        <rect x={-74} y={-134} width={14} height={68} fill={C.greyDark} />
        <rect x={60} y={-134} width={14} height={68} fill={C.greyDark} />
        {float(0)}
      </g>
    </g>
  );
}
