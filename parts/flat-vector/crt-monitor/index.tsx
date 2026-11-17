import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// CRT monitor: deep beige box monitor on a small stand, screen showing green text-line shapes (no real text).
// Origin = bottom centre of the stand. anim "glow": the screen glows and the lines flicker.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.sand;
  const anim: string = p.anim ?? "none";
  const glow = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const flick = glow ? 0.85 + 0.15 * Math.sin(f * 2.3) : 1;
  const scr = "#3FD67A";
  const lines = [0, 1, 2, 3, 4, 5];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "glow" ? "none" : anim, f)}>
        {glow && <rect x={-250} y={-520} width={500} height={460} rx={60} fill={scr} opacity={0.08 + 0.1 * breathe} />}
        {/* stand */}
        <rect x={-90} y={-70} width={180} height={50} rx={14} fill={shade(body, 0.2)} />
        <rect x={-150} y={-30} width={300} height={30} rx={12} fill={shade(body, 0.3)} />
        {/* deep back box, tapering */}
        <path d="M -150 -260 L 150 -260 L 190 -90 L -190 -90 Z" fill={shade(body, 0.15)} />
        {/* front bezel */}
        <rect x={-220} y={-460} width={440} height={380} rx={40} fill={body} />
        <path d="M -180 -440 Q -40 -470 120 -440" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.3} />
        {/* screen housing with curved glass feel */}
        <rect x={-170} y={-410} width={340} height={290} rx={44} fill={shade(body, 0.35)} />
        <rect x={-150} y={-392} width={300} height={254} rx={30} fill={C.ink} />
        {/* green text-line shapes, no real text */}
        <g opacity={flick}>
          {lines.map((i) => (
            <rect key={i} x={-120} y={-360 + i * 38} width={[200, 150, 240, 110, 180, 60][i]} height={12} rx={6} fill={scr} opacity={0.85} />
          ))}
          <rect x={-120} y={-360 + 6 * 38 - 10} width={16} height={22} rx={3} fill={scr} />
        </g>
        {glow && <rect x={-150} y={-392} width={300} height={254} rx={30} fill={scr} opacity={0.05 + 0.08 * breathe} />}
        <path d="M -140 -380 L -100 -380 L -150 -260 Z" fill={C.white} opacity={0.08} />
        {/* power LED and knobs */}
        <circle cx={160} cy={-130} r={8} fill={C.red} />
        <circle cx={130} cy={-130} r={10} fill={shade(body, 0.4)} />
        <rect x={-170} y={-120} width={80} height={14} rx={6} fill={shade(body, 0.35)} />
      </g>
    </g>
  );
}
