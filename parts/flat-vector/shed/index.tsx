import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small wooden garden shed, front view: plank lines, a pitched roof, a door with a handle and a small window.
// Origin = centre of the floor line. About 440 px wide and 460 px tall at s = 1 (about 1.5 people high at s = 1).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const pane = anim === "lights" && Math.floor(f / 12) % 2 ? C.yellow : C.sky;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={240} ry={16} fill={C.shadow} />
        {/* plank walls */}
        <rect x={-210} y={-300} width={420} height={300} rx={6} fill={wood} />
        {[-150, -90, -30, 30, 90, 150].map((px) => (
          <rect key={px} x={px} y={-300} width={4} height={300} fill={shade(wood, 0.2)} />
        ))}
        <rect x={-210} y={-30} width={420} height={30} rx={4} fill={shade(wood, 0.25)} />
        {/* pitched roof with overhang */}
        <path d="M -240 -290 L 0 -440 L 240 -290 Z" fill={roof} />
        <path d="M -240 -290 L 0 -440 L 0 -420 L -220 -285 Z" fill={shade(roof, 0.2)} />
        {/* window */}
        <rect x={-150} y={-230} width={70} height={60} rx={6} fill={C.white} />
        <rect x={-142} y={-222} width={54} height={44} rx={4} fill={pane} />
        <rect x={-116} y={-222} width={6} height={44} fill={C.white} />
        {/* door with a handle */}
        <rect x={20} y={-230} width={110} height={200} rx={6} fill={shade(wood, 0.12)} />
        <rect x={20} y={-230} width={110} height={8} fill={shade(wood, 0.3)} />
        <circle cx={112} cy={-130} r={6} fill={C.greyDark} />
        {/* step */}
        <rect x={0} y={-10} width={130} height={12} rx={4} fill={C.greyLight} />
      </g>
    </g>
  );
}
