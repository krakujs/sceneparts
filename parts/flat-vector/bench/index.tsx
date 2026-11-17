import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Park bench, front view: four horizontal backrest slats attached above the seat slats, two iron side frames
// with armrests, and a footing bar. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const iron = C.greyDark;
  const SEAT_TOP = -260;
  const seatY = [SEAT_TOP, SEAT_TOP + 36, SEAT_TOP + 72, SEAT_TOP + 108];
  const backY = [-290, -330, -370, -410]; // backrest slats sit directly on the seat (bottom edge at seat top)
  const frameX = [-380, 380];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={480} ry={18} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* iron side frames: from the ground up to the top of the backrest */}
        {frameX.map((ex) => (
          <g key={ex}>
            <rect x={ex - 22} y={-420} width={44} height={420} rx={14} fill={iron} />
            <rect x={ex - 60} y={-24} width={120} height={24} rx={10} fill={iron} />
          </g>
        ))}
        {/* footing bar between the legs, under the seat */}
        <rect x={-380} y={-110} width={760} height={18} rx={8} fill={iron} />
        {/* backrest slats, attached directly above the seat */}
        {backY.map((by, i) => (
          <rect key={i} x={-420} y={by} width={840} height={30} rx={10} fill={i % 2 ? shade(c, 0.1) : c} />
        ))}
        {/* seat slats */}
        {seatY.map((sy, i) => (
          <rect key={i} x={-420} y={sy} width={840} height={30} rx={10} fill={i % 2 ? c : shade(c, 0.06)} />
        ))}
        {/* armrests on the side frames */}
        {frameX.map((ex) => (
          <rect key={`arm${ex}`} x={ex - 50} y={-340} width={100} height={26} rx={12} fill={dk} />
        ))}
      </g>
    </g>
  );
}
