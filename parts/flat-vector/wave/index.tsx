import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big curling ocean wave with a white foam crest, standing on a band of sea. Origin = centre of the sea line. About 850 px wide and 500 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const sea = col(p.color, "#2E8BC6");
  const foam = col(p.color2, C.white);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <path d="M -480 0 C -460 -300 -180 -500 60 -480 C 250 -470 370 -380 370 -250 C 370 -190 330 -170 310 -200 C 300 -230 320 -300 270 -330 C 180 -390 60 -360 -40 -300 C -150 -240 -230 -120 -240 0 Z" fill={sea} />
        {/* darker back of the curl */}
        <path d="M -240 0 C -230 -120 -150 -240 -40 -300 L -10 -250 C -110 -190 -170 -120 -180 0 Z" fill={shade(sea, 0.22)} />
        {/* foam crest, dashed when flowing */}
        <path d="M -150 -446 C -40 -496 150 -492 250 -440 C 320 -404 352 -350 360 -292"
          stroke={foam} strokeWidth={26} strokeLinecap="round" fill="none"
          strokeDasharray={anim === "flow" ? "34 22" : undefined}
          strokeDashoffset={anim === "flow" ? -f * 2 : 0} />
        <circle cx={360} cy={-150} r={12} fill={foam} />
        <circle cx={300} cy={-96} r={9} fill={foam} />
        <circle cx={410} cy={-210} r={8} fill={foam} />
        {/* sea surface the wave stands on */}
        <path d="M -500 0 L -500 -36 Q -260 -60 0 -40 Q 260 -20 500 -44 L 500 0 Z" fill={shade(sea, 0.15)} />
      </g>
    </g>
  );
}
