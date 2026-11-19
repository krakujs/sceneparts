import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tower crane facing right: lattice mast on a concrete footing, cab, long jib with counter-jib and a trolley
// with a hanging hook. Room scale, about 960 px tall at s = 1. Origin = floor centre under the footing.
// anim "sway": the hook and cable swing gently from the trolley.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

// mast half-width at height y: 84 at the floor tapering to 36 at the top (y = -900)
const halfW = (y: number) => 84 - 48 * (-y / 900);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 5 : 0;
  const bands = Array.from({ length: 9 }, (_, i) => -(i + 1) * 100);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* concrete footing */}
        <rect x={-100} y={-48} width={200} height={48} rx={8} fill={C.grey} />
        <rect x={-74} y={-62} width={148} height={16} rx={6} fill={C.greyLight} />
        {/* lattice mast: tapered body, bands and diagonal bracing */}
        <polygon points="-84,0 84,0 36,-900 -36,-900" fill={frame} />
        {bands.map((by) => (
          <line key={`b${by}`} x1={-halfW(by)} y1={by} x2={halfW(by)} y2={by} stroke={shade(frame, 0.25)} strokeWidth={9} />
        ))}
        {bands.slice(0, -1).map((by, i) => {
          const ny = bands[i + 1];
          return (
            <g key={`d${by}`}>
              <line x1={-halfW(by)} y1={by} x2={halfW(ny)} y2={ny} stroke={C.white} strokeWidth={6} opacity={0.5} />
              <line x1={halfW(by)} y1={by} x2={-halfW(ny)} y2={ny} stroke={C.white} strokeWidth={6} opacity={0.5} />
            </g>
          );
        })}
        {/* operator cab, on the back of the tower */}
        <rect x={-132} y={-850} width={92} height={72} rx={12} fill={body} />
        <rect x={-120} y={-836} width={68} height={34} rx={6} fill={C.sky} />
        {/* jib (main boom) and counter-jib */}
        <rect x={-380} y={-944} width={740} height={40} rx={8} fill={body} />
        <rect x={-380} y={-912} width={740} height={12} rx={4} fill={frame} />
        {[-340, -270, -200, -130, -60, 10, 80, 150, 220, 290].map((jx, i) => (
          <line key={jx} x1={jx} y1={i % 2 ? -944 : -904} x2={jx + 60} y2={i % 2 ? -904 : -944} stroke={frame} strokeWidth={8} />
        ))}
        {/* counterweights */}
        <rect x={-360} y={-900} width={64} height={60} rx={6} fill={frame} />
        <rect x={-290} y={-900} width={64} height={60} rx={6} fill={shade(frame, 0.2)} />
        {/* trolley, cable and hook (the hook swings from the trolley) */}
        <rect x={190} y={-916} width={52} height={26} rx={6} fill={frame} />
        <g transform={`rotate(${f1(sway)} 216 -890)`}>
          <line x1={216} y1={-890} x2={216} y2={-640} stroke={frame} strokeWidth={7} />
          <rect x={192} y={-660} width={48} height={34} rx={6} fill={C.greyDark} />
          <path d="M216,-626 Q216,-600 190,-600 Q168,-600 168,-622" fill="none" stroke={frame} strokeWidth={10} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
