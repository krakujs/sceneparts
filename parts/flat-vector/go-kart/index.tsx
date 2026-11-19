import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Go-kart, side view, facing right: low flat chassis, fat rear and front tyres, nose fairing and side pod,
// bucket seat, engine with exhaust behind the seat, steering column with a wheel. No driver.
// About 780 px wide and 330 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": the wheels spin and the kart judders; vx moves it along x (px per frame).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const seat = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 12 : 0;
  const judder = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 8)) * -3 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.52} fill={C.greyLight} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.08} y={-r - r * 0.48} width={r * 0.16} height={r * 0.48} rx={3}
            fill={C.grey} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.15} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(judder)})`}>
          {/* engine and exhaust behind the seat */}
          <rect x={-330} y={-200} width={110} height={100} rx={16} fill={C.greyDark} />
          {[0, 1, 2].map((k) => (<rect key={k} x={-322} y={-188 + k * 26} width={94} height={12} rx={6} fill={C.grey} />))}
          <path d="M -330 -130 L -380 -130 L -380 -170" stroke={C.inkSoft} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* steering column (drawn behind the seat and body) */}
          <path d="M 70 -90 L 150 -250" stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" />
          {/* steering wheel seen edge-on */}
          <g transform="rotate(-28 158 -262)">
            <rect x={140} y={-322} width={36} height={120} rx={18} fill={C.ink} />
            <rect x={150} y={-306} width={16} height={88} rx={8} fill={C.inkSoft} />
          </g>
          {/* chassis plank */}
          <rect x={-360} y={-100} width={720} height={44} rx={16} fill={C.greyDark} />
          {/* side pod between the wheels */}
          <path d="M -150 -150 L 110 -150 Q 150 -150 150 -112 L 150 -80 L -150 -80 Z" fill={body} />
          <rect x={-130} y={-138} width={230} height={16} rx={8} fill={C.white} opacity={0.5} />
          {/* nose fairing */}
          <path d="M 150 -150 L 300 -150 Q 395 -140 400 -80 L 400 -60 L 150 -60 Z" fill={body} />
          <path d="M 150 -84 L 400 -84 L 400 -60 L 150 -60 Z" fill={shade(body, 0.2)} />
          <circle cx={280} cy={-110} r={26} fill={C.white} />
          {/* rear bumper */}
          <rect x={-410} y={-96} width={70} height={30} rx={12} fill={C.inkSoft} />
          {/* bucket seat */}
          <path d="M -210 -300 Q -230 -300 -228 -275 L -205 -150 Q -200 -120 -170 -120 L -20 -120 Q 10 -120 10 -150 L 10 -170 Q 10 -190 -10 -190 L -150 -190 L -165 -285 Q -170 -305 -190 -305 Z" fill={seat} />
          <path d="M -190 -280 L -170 -200" stroke={shade(seat, -0.6)} strokeWidth={10} strokeLinecap="round" opacity={0.35} />
          {/* pedal box hint */}
          <rect x={200} y={-176} width={60} height={26} rx={10} fill={shade(body, 0.2)} />
        </g>
        {wheel(-250, 92)}
        {wheel(260, 72)}
      </g>
    </g>
  );
}
