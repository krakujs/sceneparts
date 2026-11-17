import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector burrito: a wrapped tortilla cylinder cut open at one end to show rice, beans and filling, with half a foil wrap.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Burrito(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const tortillaC = p.tortillaColor ?? "#F3D39B";
  const foil = p.foil ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // cylinder lies on its side: body from x -170..170, height 150, cut face at the right end
  const L = 170, H = 150, base = -20, top = base - H;
  const cutX = L, faceRx = 42, faceRy = 70;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* cut face: rice ring, beans, filling */}
        <ellipse cx={cutX} cy={(top + base) / 2} rx={faceRx + 6} ry={faceRy + 6} fill={shade(tortillaC, 0.2)} />
        <ellipse cx={cutX} cy={(top + base) / 2} rx={faceRx} ry={faceRy} fill="#FFFFFF" />
        <ellipse cx={cutX - 4} cy={(top + base) / 2 - 6} rx={faceRx * 0.6} ry={faceRy * 0.6} fill="#F4D7A0" />
        {[[-16, -40], [14, -24], [-6, 6], [18, 30], [-22, 26], [4, -52], [22, -6]].map(([dx, dy], i) => (
          <ellipse key={i} cx={cutX + dx} cy={(top + base) / 2 + dy} rx={11} ry={8} fill={i % 3 ? C.brownDark : "#7A3E22"} />
        ))}
        {/* tortilla body */}
        <rect x={-L} y={top} width={L * 2 - 20} height={H} rx={H / 2} fill={tortillaC} />
        <rect x={-L} y={top} width={L * 2 - 20} height={H * 0.4} rx={H / 2} fill="#FFFFFF" opacity={0.18} />
        {/* seam lines of the fold */}
        <path d={`M ${-L + 60} ${top + 8} Q ${-L + 70} ${top + H / 2} ${-L + 60} ${base - 8}`} stroke={shade(tortillaC, 0.15)} strokeWidth={6} fill="none" opacity={0.7} strokeLinecap="round" />
        <path d={`M ${-40} ${top + 6} L ${-30} ${base - 6}`} stroke={shade(tortillaC, 0.15)} strokeWidth={5} opacity={0.5} strokeLinecap="round" />
        {/* toasted spots */}
        {[[-120, -100], [-60, -60], [-100, -50], [-20, -110]].map(([sx, sy], i) => (
          <ellipse key={i} cx={sx} cy={sy} rx={8} ry={5} fill={shade(tortillaC, 0.3)} opacity={0.5} />
        ))}
        {/* foil half: covers the front bottom-left of the wrap */}
        {foil && (
          <g>
            <path d={`M ${-L - 10} ${base - 40} Q ${-L + 20} ${base - 4} ${-60} ${base + 8} L ${-L + 40} ${base + 14} Z`} fill={C.greyLight} />
            <path d={`M ${-L - 10} ${base - 40} Q ${-L + 20} ${base - 4} ${-60} ${base + 8} L ${-L + 40} ${base + 14} Z`} fill="none" stroke={C.grey} strokeWidth={4} />
            <path d={`M ${-L + 10} ${base - 30} Q ${-L + 40} ${base - 16} ${-L + 60} ${base - 6}`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
          </g>
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Burrito {...p} />;
}
