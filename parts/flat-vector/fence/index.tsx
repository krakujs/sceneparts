import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden rail fence segment, front view: two rails running through four posts with rounded caps. The segment is
// 1000 px wide, so segments tile side by side across the frame. Origin = bottom centre; the posts stand on y.
// About 1000 px wide and 400 px tall at s = 1.
// anim "lights": a string of fairy lights along the top rail, one bulb lit after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const rail = p.color && p.color !== "none" ? p.color : C.brown;
  const post = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const bulbs = Array.from({ length: 26 }, (_, i) => -500 + i * 40);
  const litIndex = Math.floor(f / 4) % bulbs.length;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={520} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-500} y={-300} width={1000} height={34} rx={8} fill={rail} />
        <rect x={-500} y={-160} width={1000} height={34} rx={8} fill={rail} />
        <rect x={-500} y={-266} width={1000} height={8} fill={shade(rail, 0.2)} />
        {[-500, -167, 167, 500].map((px) => (
          <g key={px}>
            <rect x={px - 20} y={-400} width={40} height={400} rx={10} fill={post} />
            <rect x={px - 26} y={-414} width={52} height={16} rx={7} fill={shade(post, 0.2)} />
          </g>
        ))}
        {/* fairy lights along the top rail */}
        <rect x={-500} y={-318} width={1000} height={3} fill={C.greyDark} />
        {bulbs.map((bx, i) => (
          <circle key={bx} cx={bx} cy={-322} r={7}
            fill={anim === "lights" && i === litIndex ? C.yellow : C.greyLight} />
        ))}
      </g>
    </g>
  );
}
