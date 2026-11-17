import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Police car, side view, facing right: white saloon with a blue flank stripe and a roof light bar.
// anim "siren": the light bar flashes red and blue (the wheels still roll only when vx is not 0).
// Room scale: about 760 px wide and 340 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  // light bar: red and blue lenses swap every 8 frames when siren is on
  const phase = Math.floor(f / 8) % 2 === 0;
  const redOn = anim !== "siren" || phase;
  const blueOn = anim !== "siren" || !phase;
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
      <ellipse cx={0} cy={0} rx={390} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* saloon body */}
          <path d="M -370 -70 Q -376 -150 -352 -172 L -240 -176 L -190 -290 L 75 -290 L 150 -180 L 330 -172 Q 372 -165 378 -120 L 378 -70 Q 378 -40 350 -40 L -345 -40 Q -370 -40 -370 -70 Z" fill={body} />
          <rect x={-370} y={-64} width={748} height={24} rx={10} fill={shade(body, 0.18)} />
          {/* blue flank stripe */}
          <rect x={-372} y={-116} width={748} height={22} fill={C.blue} />
          <rect x={-372} y={-94} width={748} height={6} fill={C.blueDark} />
          {/* glass */}
          <path d="M -228 -186 L -184 -278 L -110 -278 L -110 -186 Z" fill={C.sky} />
          <path d="M -96 -186 L -96 -278 L 64 -278 L 128 -186 Z" fill={C.sky} />
          <rect x={-14} y={-180} width={8} height={60} rx={3} fill={shade(body, 0.22)} />
          {/* roof light bar */}
          <rect x={-80} y={-318} width={150} height={30} rx={10} fill={C.ink} />
          <rect x={-74} y={-312} width={68} height={18} rx={6} fill={redOn ? C.red : C.redDark} />
          <rect x={6} y={-312} width={68} height={18} rx={6} fill={blueOn ? C.blue : C.blueDark} />
          {/* lights and bumpers */}
          <path d="M 350 -150 Q 372 -145 376 -120 L 350 -120 Z" fill={C.yellow} />
          <rect x={-372} y={-150} width={22} height={34} rx={6} fill={C.red} />
          <rect x={350} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          <rect x={-385} y={-62} width={40} height={20} rx={8} fill={C.greyDark} />
          {arch(-235, 78)}
          {arch(235, 78)}
        </g>
        {wheel(-235, 78)}
        {wheel(235, 78)}
      </g>
    </g>
  );
}
