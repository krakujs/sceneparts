import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Striped road barrier: two diagonally striped rails on two posts with a foot bar and a warning lamp on top.
// Room scale. Origin = floor centre under the foot bar. Size at s = 1: about 700 px wide and 660 px tall.
// anim "flash": the warning lamp blinks on and off.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const XL = -350, XR = 350;
const cl = (v: number) => Math.max(XL, Math.min(XR, v));
// Diagonal stripes across a rail from top y0 to bottom y0 + h, clipped to the rail width by clamping x.
const stripes = (y0: number, h: number, col: string) => {
  const out: React.ReactElement[] = [];
  for (let xs = XL - h - 60; xs < XR; xs += 110) {
    const pts = [[xs, y0], [xs + 55, y0], [xs + 55 - h, y0 + h], [xs - h, y0 + h]]
      .map(([px, py]) => `${f1(cl(px))},${f1(py)}`).join(" ");
    out.push(<polygon key={`${y0}-${xs}`} points={pts} fill={col} />);
  }
  return out;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stripe = p.color && p.color !== "none" ? p.color : C.red;
  const white = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const lampOn = anim === "flash" ? Math.floor(f / 15) % 2 === 0 : true;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-300 - 17} y={-620} width={34} height={620} fill={C.greyDark} />
        <rect x={300 - 17} y={-620} width={34} height={620} fill={C.greyDark} />
        <rect x={-360} y={-40} width={720} height={40} rx={12} fill={shade(C.greyDark, 0.2)} />
        <rect x={XL} y={-600} width={XR - XL} height={110} fill={white} />
        {stripes(-600, 110, stripe)}
        <rect x={XL} y={-420} width={XR - XL} height={100} fill={white} />
        {stripes(-420, 100, stripe)}
        <rect x={-22} y={-640} width={44} height={20} rx={4} fill={C.greyDark} />
        <circle cx={0} cy={-656} r={26} fill={lampOn ? C.yellow : C.yellowDark} />
        {lampOn && <circle cx={0} cy={-656} r={44} fill={C.yellow} opacity={0.25} />}
      </g>
    </g>
  );
}
