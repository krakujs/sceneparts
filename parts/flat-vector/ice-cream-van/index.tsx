import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pastel ice cream van, side view, facing right: box body with a striped serving hatch, a counter, and a giant
// ice cream cone with scoop standing on the roof. Room scale: about 710 px wide and 590 px tall at s = 1.
// Origin = floor centre; the tyres stand on y.
// anim "drive": the wheels spin and the body bounces a little; vx moves it along x (px per frame).
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
  const body = p.color && p.color !== "none" ? p.color : C.pink;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
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
  // serving hatch awning: alternating white and body-colour stripes
  const stripes = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* box body with a low cab at the front */}
          <path d="M -330 -55 L -330 -360 Q -330 -375 -315 -375 L 140 -375 L 140 -300 L 230 -300 L 330 -210 Q 350 -190 350 -150 L 350 -55 Q 350 -40 335 -40 L -315 -40 Q -330 -40 -330 -55 Z" fill={body} />
          <rect x={-330} y={-80} width={680} height={40} rx={10} fill={shade(body, 0.2)} />
          {/* serving hatch with counter */}
          <rect x={-250} y={-322} width={190} height={84} rx={6} fill={C.white} />
          <rect x={-240} y={-312} width={170} height={64} rx={4} fill={C.sky} />
          {stripes.map((k) => (
            <rect key={k} x={-256 + k * 28} y={-345} width={28} height={22} fill={k % 2 === 0 ? C.white : shade(body, 0.05)} />
          ))}
          <rect x={-256} y={-236} width={200} height={14} rx={5} fill={C.greyLight} />
          {/* cab glass */}
          <path d="M 150 -290 L 215 -290 L 296 -218 L 150 -218 Z" fill={C.sky} />
          {/* giant ice cream cone on the roof: wafer, scoop and cherry */}
          <path d="M -130 -470 L 10 -470 L -60 -372 Z" fill={C.sand} />
          <path d="M -100 -446 L -60 -446 L -80 -404 Z" fill={shade(C.sand, 0.2)} />
          <path d="M -40 -438 L -10 -438 L -30 -398 Z" fill={shade(C.sand, 0.2)} />
          <circle cx={-60} cy={-512} r={56} fill={C.white} />
          <circle cx={-100} cy={-498} r={34} fill={C.white} />
          <circle cx={-24} cy={-498} r={34} fill={shade(C.white, 0.06)} />
          <circle cx={-60} cy={-566} r={12} fill={C.red} />
          {/* lights and bumpers */}
          <path d="M 330 -150 Q 348 -146 350 -128 L 330 -128 Z" fill={C.yellow} />
          <rect x={340} y={-62} width={26} height={22} rx={6} fill={C.greyDark} />
          <rect x={-345} y={-62} width={26} height={22} rx={6} fill={C.greyDark} />
          {arch(-210, 78)}
          {arch(230, 78)}
        </g>
        {wheel(-210, 78)}
        {wheel(230, 78)}
      </g>
    </g>
  );
}
