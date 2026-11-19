import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Countertop microwave: a glass window with a turning plate, a side keypad of plain blocks (no text) and a display.
// anim "turn" spins the plate on its turntable. Origin = bottom centre, hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.greyLight;
  const dk = shade(c, 0.2);
  // the plate turns about its vertical axis: its visible width follows cos(angle)
  const a = (f * 2 * Math.PI) / 48;
  const plateX = p.anim === "turn" ? Math.max(0.12, Math.abs(Math.cos(a))) : 1;
  const keys: number[][] = [[96, -162], [120, -162], [144, -162], [96, -136], [120, -136], [144, -136], [96, -110], [120, -110], [144, -110], [96, -84], [120, -84], [144, -84]];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* body */}
        <rect x={-180} y={-250} width={360} height={240} rx={22} fill={c} />
        <rect x={160} y={-250} width={20} height={240} rx={10} fill={dk} />
        <rect x={-160} y={-10} width={44} height={10} rx={4} fill={C.greyDark} />
        <rect x={116} y={-10} width={44} height={10} rx={4} fill={C.greyDark} />

        {/* window with turning plate */}
        <rect x={-160} y={-226} width={244} height={200} rx={14} fill={C.inkSoft} />
        <g transform={`translate(-38 -126) scale(${f1(plateX)} 1)`}>
          <ellipse cx={0} cy={0} rx={96} ry={24} fill={C.greyLight} />
          <ellipse cx={0} cy={-3} rx={66} ry={15} fill={C.white} />
        </g>
        <rect x={-140} y={-210} width={50} height={150} rx={8} fill={C.white} opacity={0.14} />

        {/* keypad and display (plain blocks, no text) */}
        <rect x={84} y={-226} width={84} height={200} rx={12} fill={dk} />
        <rect x={94} y={-216} width={64} height={34} rx={6} fill={C.ink} />
        <rect x={100} y={-208} width={28} height={18} rx={4} fill={C.green} opacity={0.8} />
        {keys.map(([kx, ky], i) => (
          <rect key={i} x={kx} y={ky} width={18} height={18} rx={5} fill={C.greyLight} />
        ))}
      </g>
    </g>
  );
}
