import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import Canvas from "../canvas/index";

// Wooden A-frame studio easel with a canvas resting on its tray. Origin = bottom centre between the front feet.
// Room scale: about 1000 px tall at s = 1 (1.8 m). The canvas is the flat-vector canvas part, drawn on the tray.
const f1 = (v: number) => v.toFixed(1);
const TOP = -990;  // apex of the A-frame
const TRAY = -450; // bottom edge of the canvas and the tray
const FOOT = 250;  // half-spread of the feet

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#A9793F";
  const art: string = p.art ?? "blank";
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* back legs (darker), then front legs */}
        <line x1={0} y1={TOP + 20} x2={-FOOT + 60} y2={-6} stroke={shade(wood, 0.25)} strokeWidth={30} strokeLinecap="round" />
        <line x1={0} y1={TOP + 20} x2={FOOT - 60} y2={-6} stroke={shade(wood, 0.25)} strokeWidth={30} strokeLinecap="round" />
        <line x1={0} y1={TOP + 20} x2={-FOOT} y2={0} stroke={wood} strokeWidth={36} strokeLinecap="round" />
        <line x1={0} y1={TOP + 20} x2={FOOT} y2={0} stroke={wood} strokeWidth={36} strokeLinecap="round" />
        {/* cross brace */}
        <line x1={-160} y1={-260} x2={160} y2={-260} stroke={shade(wood, 0.15)} strokeWidth={18} strokeLinecap="round" />
        {/* top bar and hinge */}
        <rect x={-150} y={TOP} width={300} height={36} rx={14} fill={wood} />
        <circle cx={0} cy={TOP + 18} r={14} fill={C.greyDark} />
        {/* canvas on the tray */}
        <rect x={-210} y={TRAY} width={420} height={22} rx={8} fill={shade(wood, 0.2)} />
        <Canvas x={0} y={TRAY} s={1} art={art} frame={wood} anim={anim} f={f} d={p.d} t={p.t} style={p.style} render={p.render} />
      </g>
    </g>
  );
}
