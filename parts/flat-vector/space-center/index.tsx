import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Space centre: a launch pad with a lattice gantry tower, a rocket on the pad and a control building with a dish.
// Origin = ground centre of the pad. About 920 px wide and 1190 px tall at s = 1.
// anim "lights": the control room windows and the pad beacons blink on in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
// a thin diagonal strut as a filled quadrilateral
const bar = (x1: number, y1: number, x2: number, y2: number, w: number) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = (-dy / len) * (w / 2), ny = (dx / len) * (w / 2);
  return `M ${f1(x1 + nx)} ${f1(y1 + ny)} L ${f1(x2 + nx)} ${f1(y2 + ny)} L ${f1(x2 - nx)} ${f1(y2 - ny)} L ${f1(x1 - nx)} ${f1(y1 - ny)} Z`;
};
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={4} fill={glow ? C.yellow : C.sky} />
    <path d={`M ${f1(x0 + w * 0.15)} ${f1(y0 + h)} L ${f1(x0 + w * 0.42)} ${f1(y0)} L ${f1(x0 + w * 0.56)} ${f1(y0)} L ${f1(x0 + w * 0.29)} ${f1(y0 + h)} Z`} fill={C.white} opacity={0.5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyLight;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const on = (k: number) => anim === "lights" && Math.floor(f / 6) % 6 === k;
  const pad = shade(body, 0.25);
  const legs = [-360, -300];
  const levels = [-180, -300, -420, -540, -660, -780, -900, -1020];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={470} ry={20} fill={C.shadow} />
        {/* launch pad and flame trench */}
        <rect x={-420} y={-60} width={840} height={60} rx={8} fill={pad} />
        <rect x={-110} y={-18} width={220} height={18} fill={shade(body, 0.6)} />
        <circle cx={-404} cy={-70} r={8} fill={on(0) ? C.red : C.greyDark} />
        <circle cx={404} cy={-70} r={8} fill={on(3) ? C.red : C.greyDark} />
        {/* lattice gantry tower on the left */}
        <rect x={-380} y={-1110} width={100} height={20} fill={shade(body, 0.1)} />
        {legs.map((lx) => <rect key={lx} x={lx - 6} y={-1090} width={12} height={1030} fill={body} />)}
        {levels.map((ly) => <rect key={ly} x={-366} y={ly} width={66} height={8} fill={body} />)}
        {levels.slice(0, -1).map((ly, i) => {
          const y2 = levels[i + 1];
          return (
            <g key={`d${ly}`}>
              <path d={bar(-360, ly, -306, y2, 9)} fill={shade(body, 0.2)} />
              <path d={bar(-306, ly, -360, y2, 9)} fill={shade(body, 0.2)} />
            </g>
          );
        })}
        {/* service arm to the rocket */}
        <rect x={-306} y={-640} width={200} height={22} fill={body} />
        <rect x={-306} y={-660} width={200} height={6} fill={shade(body, 0.2)} />
        {/* rocket on the pad */}
        <rect x={-60} y={-1000} width={120} height={940} fill={body} />
        <path d="M -60 -1000 Q -60 -1120 0 -1180 Q 60 -1120 60 -1000 Z" fill={accent} />
        <rect x={-60} y={-640} width={120} height={40} fill={accent} />
        <rect x={-30} y={-1000} width={20} height={940} fill={C.white} opacity={0.35} />
        <circle cx={0} cy={-860} r={22} fill={C.sky} />
        <circle cx={0} cy={-760} r={22} fill={C.sky} />
        <circle cx={-6} cy={-768} r={6} fill={C.white} opacity={0.6} />
        <path d="M -60 -330 L -150 -120 L -60 -120 Z" fill={accent} />
        <path d="M 60 -330 L 150 -120 L 60 -120 Z" fill={accent} />
        <rect x={-42} y={-60} width={84} height={14} fill={shade(body, 0.4)} />
        {/* control building on the right */}
        <rect x={250} y={-270} width={220} height={270} rx={10} fill={body} />
        <rect x={240} y={-290} width={240} height={24} rx={6} fill={accent} />
        {win("c1", 270, -220, 46, 64, on(0))}
        {win("c2", 340, -220, 46, 64, on(1))}
        {win("c3", 410, -220, 46, 64, on(2))}
        {win("c4", 270, -130, 46, 64, on(3))}
        {win("c5", 410, -130, 46, 64, on(4))}
        <rect x={326} y={-120} width={48} height={120} rx={4} fill={C.greyDark} />
        <rect x={320} y={-380} width={6} height={92} fill={C.greyDark} />
        <path d="M 296 -372 A 38 38 0 0 1 372 -372 Z" fill={C.greyDark} />
      </g>
    </g>
  );
}
