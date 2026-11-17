import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Modern passenger train unit, side view, facing right: long body with a rounded streamlined nose,
// a row of windows, a cab window at the front and a light band. Four bogie wheels on the rail.
// Room scale: about 980 px wide and 390 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.58} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* body with streamlined nose at the front (right) */}
          <path d="M -480 -340 Q -480 -360 -460 -360 L 300 -360 Q 430 -350 490 -250 L 490 -170 Q 490 -150 470 -150 L -480 -150 Z" fill={body} />
          <path d="M -480 -150 L 470 -150 Q 490 -150 490 -170 L 490 -160 L -480 -160 Z" fill={shade(body, 0.25)} />
          {/* light band and roof edge */}
          <rect x={-480} y={-212} width={940} height={16} fill={C.white} opacity={0.9} />
          <rect x={-480} y={-360} width={940} height={18} rx={9} fill={shade(body, 0.15)} />
          {/* passenger windows */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={-420 + i * 110} y={-320} width={84} height={96} rx={10} fill={C.sky} />
          ))}
          {/* cab window at the front, sloped */}
          <path d="M 340 -320 Q 400 -310 430 -250 L 340 -250 Z" fill={C.sky} />
          {/* front lights and bogie skirts */}
          <rect x={440} y={-290} width={30} height={22} rx={8} fill={C.yellow} />
          <rect x={-470} y={-240} width={18} height={24} rx={6} fill={C.red} />
          <rect x={-480} y={-130} width={960} height={24} rx={8} fill={shade(body, 0.3)} opacity={0.6} />
        </g>
        {wheel(-340, -56, 56, rim, spin)}
        {wheel(-190, -56, 56, rim, spin)}
        {wheel(190, -56, 56, rim, spin)}
        {wheel(340, -56, 56, rim, spin)}
      </g>
    </g>
  );
}
