import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ambulance, side view, facing right: white box body with a short cab, a red stripe, a plain red cross and a roof beacon.
// anim "siren": the roof beacon flashes (the wheels still roll only when vx is not 0).
// Room scale: about 690 px wide and 420 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const lit = anim !== "siren" || Math.floor(f / 8) % 2 === 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={rim} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={shade(rim, 0.35)} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={375} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* tall box body with a sloped cab front */}
          <path d="M -330 -60 L -330 -320 Q -330 -340 -310 -340 L 170 -340 Q 180 -340 190 -330 L 300 -230 Q 340 -190 342 -150 L 342 -60 Q 342 -40 322 -40 L -310 -40 Q -330 -40 -330 -60 Z" fill={body} />
          <rect x={-330} y={-70} width={672} height={30} rx={10} fill={shade(body, 0.12)} />
          {/* red stripe */}
          <rect x={-330} y={-150} width={672} height={26} fill={C.red} />
          {/* cab windscreen */}
          <path d="M 200 -322 L 236 -322 L 286 -240 L 200 -240 Z" fill={C.sky} />
          {/* plain red cross */}
          <rect x={-86} y={-300} width={52} height={120} rx={8} fill={C.red} />
          <rect x={-120} y={-266} width={120} height={52} rx={8} fill={C.red} />
          {/* door seam at the back */}
          <rect x={-300} y={-300} width={8} height={230} rx={3} fill={shade(body, 0.2)} />
          {/* roof beacon */}
          <rect x={-40} y={-362} width={60} height={24} rx={6} fill={C.greyDark} />
          {lit && <circle cx={-10} cy={-380} r={44} fill={C.red} opacity={0.3} />}
          <rect x={-30} y={-384} width={40} height={24} rx={12} fill={lit ? C.red : C.redDark} />
          {/* lights and bumpers */}
          <rect x={326} y={-130} width={16} height={26} rx={6} fill={C.yellow} />
          <rect x={320} y={-62} width={32} height={22} rx={8} fill={C.greyDark} />
          <rect x={-350} y={-62} width={30} height={22} rx={8} fill={C.greyDark} />
          {arch(-220, 78)}
          {arch(230, 78)}
        </g>
        {wheel(-220, 78)}
        {wheel(230, 78)}
      </g>
    </g>
  );
}
