import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ballpoint pen at a diagonal. The nib tip sits on (x, y) and the barrel leans up and to the left.
// anim "click": the top button presses down every 60 frames. anim "write": the pen wobbles as if writing.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const cyc = (f % 60) / 60;
  const press = anim === "click" && cyc < 0.2 ? Math.sin((cyc / 0.2) * Math.PI) * 10 : 0;
  const tilt = -30 + (anim === "write" ? Math.sin((f * 2 * Math.PI) / 30) * 5 : 0);
  const nudge = anim === "write" ? Math.sin((f * 2 * Math.PI) / 30) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={10} fill={C.shadow} />
      <g transform={`translate(${f1(nudge)} 0) rotate(${f1(tilt)})`}>
        {/* clip on the back edge */}
        <rect x={30} y={-412} width={10} height={200} rx={5} fill={C.greyDark} />
        {/* button, presses down */}
        <g transform={`translate(0 ${f1(press)})`}>
          <rect x={-22} y={-470} width={44} height={40} rx={12} fill={shade(col, 0.35)} />
        </g>
        {/* barrel */}
        <rect x={-36} y={-440} width={72} height={300} rx={16} fill={col} />
        <rect x={-26} y={-430} width={10} height={280} rx={5} fill={C.white} opacity={0.3} />
        {/* grip */}
        <rect x={-40} y={-210} width={80} height={120} rx={14} fill={shade(col, 0.2)} />
        {/* metal collar */}
        <rect x={-38} y={-112} width={76} height={22} rx={6} fill={C.greyLight} />
        {/* cone and tip */}
        <path d="M -26 -92 L -8 -20 L 8 -20 L 26 -92 Z" fill={C.greyLight} />
        <path d="M -8 -20 L 0 0 L 8 -20 Z" fill={C.grey} />
        <circle cx={0} cy={-4} r={4} fill={C.ink} />
      </g>
    </g>
  );
}
