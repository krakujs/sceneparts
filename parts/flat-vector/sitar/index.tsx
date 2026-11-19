import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sitar: a large round gourd resonator at the bottom with a carved, lighter top plate and a cream bridge, a very
// long wide neck with curved metal frets, a peg box at the top with side tuning pegs, and a smaller second gourd
// behind the neck. The whole instrument leans about 15 degrees to the right, standing on y.
// Local drawing space: origin = centre of the main gourd (radius 110); it is rotated 15 degrees about that
// centre so the gourd's lowest point sits exactly on y. About 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)} 0 0)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Curved metal frets across the neck, spaced up the neck (local y, neck runs from -70 up to -700).
const FRETS = Array.from({ length: 18 }, (_, i) => -100 - i * 34);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const R = 110;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* lean: rotate about the gourd centre, which sits at (0, -110) in world space */}
        <g transform="translate(0 -110) rotate(15)">
          {/* second, smaller gourd behind the neck */}
          <circle cx={0} cy={-470} r={60} fill={shade(wood, 0.12)} />
          <circle cx={-14} cy={-484} r={14} fill={C.white} opacity={0.14} />
          {/* long, wide neck: a darker hollow channel down the middle */}
          <rect x={-26} y={-700} width={52} height={640} rx={14} fill={wood} />
          <rect x={-12} y={-696} width={24} height={630} rx={10} fill={shade(wood, 0.22)} />
          {/* curved metal frets */}
          {FRETS.map((fy, i) => (
            <path key={i} d={`M -25 ${fy} Q 0 ${fy + 7} 25 ${fy}`} fill="none" stroke={C.greyLight} strokeWidth={3.5} strokeLinecap="round" />
          ))}
          {/* peg box with side tuning pegs */}
          <rect x={-38} y={-822} width={76} height={122} rx={18} fill={shade(wood, 0.15)} />
          {[-790, -760, -730].map((py, i) => [-1, 1].map((side) => (
            <g key={`${i}${side}`}>
              <rect x={side > 0 ? 34 : -58} y={py - 6} width={24} height={12} rx={6} fill={C.ink} />
              <circle cx={side * 60} cy={py} r={9} fill={C.ink} />
            </g>
          )))}
          {/* main gourd: round body with a darker lower-right side */}
          <circle cx={9} cy={9} r={R} fill={shade(wood, 0.12)} />
          <circle cx={0} cy={0} r={R} fill={wood} />
          <path d="M -80 -40 A 110 110 0 0 1 -30 -104" fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.18} />
          {/* carved top plate, lighter wood with a cream rim */}
          <ellipse cx={0} cy={-20} rx={84} ry={62} fill={C.sand} opacity={0.55} />
          <ellipse cx={0} cy={-20} rx={84} ry={62} fill="none" stroke={C.sand} strokeWidth={5} />
          {/* sound holes on the top plate */}
          <circle cx={-34} cy={-4} r={10} fill={shade(wood, 0.5)} />
          <circle cx={34} cy={-4} r={10} fill={shade(wood, 0.5)} />
          {/* cream bridge (jawari) across the top plate */}
          <rect x={-62} y={-80} width={124} height={9} rx={4.5} fill={C.white} />
          {/* strings: from the pegs down the neck to the bridge */}
          {[-6, -2, 2, 6].map((sx, i) => (
            <line key={i} x1={sx * 0.6} y1={-742} x2={sx * 1.4} y2={-76} stroke={C.greyLight} strokeWidth={2.2} opacity={0.95} />
          ))}
        </g>
      </g>
    </g>
  );
}
