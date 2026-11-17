import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stone pyramid with visible block courses on a sandy base. A generic desert monument, front view.
// Origin = bottom centre on the sand. About 960 px wide and 640 px tall at s = 1.
// anim "lights": the sun-lit edge highlight shifts across the faces with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.sand;
  const sandC = p.color2 && p.color2 !== "none" ? p.color2 : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const hl = anim === "lights" ? -460 + ((f * 4) % 500) : -460;
  // courses: each row narrower than the last, so the sides keep a steady slope
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const rowH = 70;
  const halfW = (yy: number) => 480 * (1 - (-yy) / 560);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={520} ry={24} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* sandy base */}
        <rect x={-520} y={-40} width={1040} height={40} rx={14} fill={sandC} />
        <ellipse cx={-360} cy={-26} rx={60} ry={10} fill={shade(sandC, 0.12)} />
        <ellipse cx={380} cy={-22} rx={70} ry={10} fill={shade(sandC, 0.12)} />
        {/* pyramid body */}
        <path d="M -480 -40 L 0 -600 L 480 -40 Z" fill={stone} />
        <path d="M 0 -600 L 480 -40 L 0 -40 Z" fill={shade(stone, 0.18)} />
        {/* block courses */}
        {rows.map((r) => {
          const yTop = -40 - (r + 1) * rowH, yBot = -40 - r * rowH;
          const hw = halfW(yTop);
          const blocks = [-1, 0, 1].map((k) => k);
          return (
            <g key={r}>
              <line x1={-hw} y1={yBot} x2={hw} y2={yBot} stroke={shade(stone, 0.22)} strokeWidth={5} />
              {blocks.map((k) => {
                const off = r % 2 ? 60 : 0;
                const bx = off + k * 160;
                return bx > -hw && bx < hw ? <line key={k} x1={bx} y1={yBot} x2={bx} y2={yBot + rowH} stroke={shade(stone, 0.22)} strokeWidth={4} /> : null;
              })}
            </g>
          );
        })}
        {/* sun-lit edge */}
        <path d={`M ${f1(hl)} -40 L ${f1(hl + 60)} -40 L ${f1(hl + 60 + 240)} -600 L ${f1(hl + 240)} -600 Z`} fill={C.white} opacity={anim === "lights" ? 0.18 : 0} />
        {/* doorway at the base */}
        <path d="M -40 -40 L -40 -110 Q 0 -140 40 -110 L 40 -40 Z" fill={shade(stone, 0.35)} />
      </g>
    </g>
  );
}
