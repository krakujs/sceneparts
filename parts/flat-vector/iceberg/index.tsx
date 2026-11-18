import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// White-blue iceberg above a sea line, with the bigger lighter-blue part showing under the water. Origin = centre of the waterline. About 700 px wide and 540 px tall above the water at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const UNDER = "#9ADCF2";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const ice = col(p.color, "#F4FBFF");
  const sea = col(p.color2, "#2F86C6");
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? Math.sin(f / 30) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* sea: the waterline sits 240 px above y, so the sea band ends on the ground line */}
        <g transform="translate(0 -240)">
        <rect x={-500} y={0} width={1000} height={240} fill={sea} />
        <path d="M -500 0 Q -400 -8 -300 0 T -100 0 T 100 0 T 300 0 T 500 0" stroke={C.white} strokeWidth={5} fill="none" opacity={0.6} />
        <g transform={`translate(0 ${f1(bob)})`}>
          {/* underwater part, lighter blue */}
          <path d="M -360 0 L 340 0 L 300 120 L 180 210 L 0 240 L -180 200 L -320 110 Z" fill={UNDER} />
          <path d="M -200 0 L 120 0 L 90 90 L -120 120 Z" fill={C.white} opacity={0.25} />
          {/* peak above the water */}
          <path d="M -340 0 L -220 -200 L -150 -270 L -60 -460 L 10 -540 L 60 -500 L 140 -400 L 230 -220 L 340 0 Z" fill={ice} />
          <path d="M 10 -540 L 60 -500 L 140 -400 L 230 -220 L 340 0 L 120 0 L 90 -220 Z" fill="#C9E6F4" />
          <path d="M -60 -460 L -150 -270 L -220 -200 L -180 -130 L -40 -330 Z" fill={C.white} />
        </g>
        </g>
      </g>
    </g>
  );
}
