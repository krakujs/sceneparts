import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hand sanitizer: a clear pump bottle of gel with a blank label. Origin = bottom centre (stands on y).
// anim "pump": the pump head presses down, then a drop falls from the nozzle, every 60 frames.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pump = p.color && p.color !== "none" ? p.color : C.teal;
  const gel = p.color2 && p.color2 !== "none" ? p.color2 : "#8BE0CB";
  const anim: string = p.anim ?? "none";
  const cyc = (f % 60) / 60;
  const press = anim === "pump" && cyc < 0.25 ? Math.sin((cyc / 0.25) * Math.PI) * 18 : 0;
  const dropT = anim === "pump" && cyc >= 0.25 ? (cyc - 0.25) / 0.7 : -1;
  const dropY = dropT >= 0 ? -430 + Math.min(1, dropT) * 360 : -430;
  const dropOp = dropT < 0 || dropT > 1 ? 0 : dropT < 0.8 ? 1 : (1 - dropT) / 0.2;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      {/* bottle body: clear gel */}
      <path d="M -140 -20 L -140 -290 Q -140 -340 -90 -350 L 90 -350 Q 140 -340 140 -290 L 140 -20 Q 140 0 120 0 L -120 0 Q -140 0 -140 -20 Z" fill={gel} opacity={0.88} />
      <path d="M -140 -60 L 140 -60 L 140 -20 Q 140 0 120 0 L -120 0 Q -140 0 -140 -20 Z" fill={shade(gel, 0.14)} opacity={0.6} />
      {/* glass shine */}
      <rect x={-112} y={-322} width={22} height={260} rx={11} fill={C.white} opacity={0.4} />
      {/* blank label */}
      <rect x={-100} y={-222} width={200} height={112} rx={14} fill={C.white} />
      {/* neck and collar */}
      <rect x={-46} y={-374} width={92} height={30} fill={shade(gel, 0.1)} />
      <rect x={-62} y={-394} width={124} height={24} rx={8} fill={pump} />
      {/* pump head, presses down */}
      <g transform={`translate(0 ${f1(press)})`}>
        <rect x={-16} y={-432} width={32} height={40} fill={shade(pump, 0.15)} />
        <rect x={-58} y={-458} width={116} height={30} rx={14} fill={pump} />
        <rect x={40} y={-452} width={130} height={18} rx={9} fill={shade(pump, 0.15)} />
      </g>
      {/* falling drop */}
      <path d="M 0 -22 C 10 -8 16 0 16 8 C 16 16 8 22 0 22 C -8 22 -16 16 -16 8 C -16 0 -10 -8 0 -22 Z"
        transform={`translate(170 ${f1(dropY)})`} fill={shade(gel, 0.3)} opacity={dropOp.toFixed(3)} />
    </g>
  );
}
