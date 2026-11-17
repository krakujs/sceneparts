import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Interior door in a frame with a panelled leaf and a round knob on the right. The leaf is hinged on the left;
// opening it swings the leaf toward the viewer (it narrows) and reveals a dark room behind. anim open runs the
// swing over 30 frames and then holds. Origin = floor centre of the frame.
const f1 = (v: number) => v.toFixed(1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 4)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const FW = 560, FH = 1150; // frame outer size
  const OW = 420, OH = 1060; // opening size (inside frame)
  // openness 0 = closed, 1 = open. Open state is driven by the variant or by the anim open swing.
  let openness = p.variant === "open" ? 1 : 0;
  if (p.anim === "open") openness = easeInOut(clamp01(f / 30));
  // the leaf's visible width shrinks as it swings toward the viewer around the left hinge
  const leafW = OW * (1 - 0.72 * openness);
  const leafX = -OW / 2; // hinge line
  const interiorShow = openness > 0.02;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={FW / 2 + 20} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim === "open" ? "none" : p.anim ?? "none", f)}>
        {/* frame (architrave) */}
        <rect x={-FW / 2} y={-FH} width={FW} height={FH} rx={14} fill={shade(C.white, 0.08)} />
        {/* opening: dark room visible through the gap */}
        <rect x={-OW / 2} y={-OH - 40} width={OW} height={OH} rx={6} fill={interiorShow ? "#2C2A3A" : dk} />
        {interiorShow && (
          <g>
            <rect x={-OW / 2 + 40} y={-OH + 40} width={OW - 80} height={60} rx={6} fill="#3E3B52" opacity={0.7} />
            <rect x={-OW / 2} y={-OH - 40} width={OW * openness * 0.3} height={OH} fill="#1B1A26" opacity={0.6} />
          </g>
        )}
        {/* door leaf: hinged on the left, narrows as it swings */}
        {!(openness > 0.98) && (
          <g transform={`translate(${f1(leafX)} 0)`}>
            <rect x={0} y={-OH - 40} width={leafW} height={OH} rx={10} fill={c} />
            {/* panels */}
            <rect x={leafW * 0.14} y={-OH + 60} width={leafW * 0.72} height={OH * 0.36} rx={8} fill={shade(c, 0.1)} opacity={openness > 0.5 ? 0 : 1} />
            <rect x={leafW * 0.14} y={-OH * 0.5} width={leafW * 0.72} height={OH * 0.36} rx={8} fill={shade(c, 0.1)} opacity={openness > 0.5 ? 0 : 1} />
            <rect x={leafW * 0.14} y={-OH * 0.5} width={leafW * 0.72} height={OH * 0.36} rx={8} fill={shade(c, 0.08)} opacity={openness > 0.5 ? 0.9 : 0} />
            {/* knob on the right edge */}
            <circle cx={leafW - 46} cy={-OH * 0.46} r={20} fill={C.yellowDark} opacity={openness > 0.5 ? 0 : 1} />
          </g>
        )}
        {/* threshold */}
        <rect x={-FW / 2} y={-18} width={FW} height={18} rx={6} fill={dk} />
      </g>
    </g>
  );
}
