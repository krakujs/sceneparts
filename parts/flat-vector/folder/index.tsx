import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// File folder: a manila folder with a tab and a few papers peeking out of the top.
// anim "open": the papers rise out of the folder over the first 40 frames. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : C.yellow;
  const back = shade(col, 0.2);
  const anim: string = p.anim ?? "none";
  const t = anim === "open" ? Math.min(1, f / 40) : 0;
  const e = 1 - (1 - t) ** 3;
  const rise = -e * 110;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={270} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* back panel and tab */}
        <rect x={-250} y={-400} width={500} height={400} rx={18} fill={back} />
        <rect x={-250} y={-462} width={200} height={80} rx={16} fill={back} />
        {/* papers peeking out */}
        <g transform={`translate(0 ${f1(rise)})`}>
          <rect x={-120} y={-450} width={280} height={190} rx={10} fill={C.paper} />
          <rect x={-190} y={-476} width={300} height={200} rx={10} fill={C.white} />
          <rect x={-160} y={-440} width={190} height={12} rx={6} fill={C.grey} />
          <rect x={-160} y={-414} width={140} height={12} rx={6} fill={C.grey} />
          <rect x={-90} y={-420} width={180} height={12} rx={6} fill={C.greyLight} />
        </g>
        {/* front panel with a blank label */}
        <rect x={-260} y={-300} width={520} height={300} rx={18} fill={col} />
        <rect x={-150} y={-230} width={300} height={80} rx={10} fill={C.white} opacity={0.9} />
      </g>
    </g>
  );
}
