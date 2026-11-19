import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ground-mounted solar panel tilted towards the sun on a post: a framed grid of cells with a sun in the corner.
// Origin = bottom centre (the post foot rests on y). anim "glint": a bright glint sweeps across the cells.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const COLS = 6, ROWS = 3, GAP = 8;
const FX = -380, FY = -640, FW = 760, FH = 400;
const IX = FX + 16, IY = FY + 16, IW = FW - 32, IH = FH - 32;
const CW = (IW - GAP * (COLS - 1)) / COLS;
const CH = (IH - GAP * (ROWS - 1)) / ROWS;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const cell = p.color && p.color !== "none" ? p.color : C.blueDark;
  const anim: string = p.anim ?? "none";
  const dx = anim === "glint" ? -60 + 180 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 120)) : -60;
  const glintOp = anim === "glint" ? 0.22 + 0.2 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 120)) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={420} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <circle cx={-440} cy={-700} r={64} fill={C.yellow} opacity={0.9} />
        <rect x={-14} y={-240} width={28} height={220} rx={4} fill={C.greyDark} />
        <rect x={-90} y={-20} width={180} height={20} rx={8} fill={C.greyDark} />
        <g transform="rotate(-12 0 -440)">
          <rect x={FX} y={FY} width={FW} height={FH} rx={10} fill={C.greyLight} />
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const r = Math.floor(i / COLS), c = i % COLS;
            const cx = IX + c * (CW + GAP), cy = IY + r * (CH + GAP);
            return (
              <g key={i}>
                <rect x={cx} y={cy} width={CW} height={CH} rx={3} fill={cell} />
                <rect x={cx + 4} y={cy + 4} width={CW - 8} height={4} rx={2} fill={C.white} opacity={0.15} />
              </g>
            );
          })}
          <g transform={`translate(${f1(dx)} 0)`}>
            <polygon points="-300,-620 -250,-620 -170,-260 -220,-260" fill={C.white} opacity={f1(glintOp)} />
          </g>
        </g>
      </g>
    </g>
  );
}
