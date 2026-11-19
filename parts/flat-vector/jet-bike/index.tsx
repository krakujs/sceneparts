import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Jet bike: a sleek hovering motorbike with no wheels and no legs. Long streamlined body, seat, handlebars, a front
// fairing with a headlight and two rear jet engines with blue thrust flames. It hovers above a glow and a shadow on
// the ground. Faces right; origin = ground point under the bike; about 720 px long and 420 px tall at s = 1.
// anim hover: the bike bobs up and down, the glow pulses and the flames flicker.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const ENGINE = C.greyDark, INK = C.inkSoft, FLAME = "#3D9CFF", CORE = "#E6F6FF";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1400, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : C.blue;
  const glow: string = p.glow && p.glow !== "none" ? p.glow : "#6FE7FF";
  const hover = p.anim === "hover";
  const t = (f * 2 * Math.PI) / 40;
  const bob = hover ? -(Math.sin(t / 2) + 1) * 10 : 0;
  const pulse = hover ? 0.5 + 0.5 * Math.sin(t) : 0.5;
  const flick = hover ? Math.sin(t * 3) : 0;
  const len = 96 + 14 * flick;
  const flame = (cy: number, l: number) =>
    <g key={cy}>
      <path d={`M -418 ${f1(cy - 18)} L ${f1(-418 - l)} ${f1(cy)} L -418 ${f1(cy + 18)} Z`} fill={FLAME} opacity={0.9} />
      <path d={`M -418 ${f1(cy - 9)} L ${f1(-418 - l * 0.55)} ${f1(cy)} L -418 ${f1(cy + 9)} Z`} fill={CORE} />
    </g>;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      {/* ground shadow and the hover glow falling from the bike */}
      <ellipse cx={0} cy={0} rx={250} ry={20} fill={C.shadow} opacity={0.7} />
      <path d="M -170 -190 L 170 -190 L 250 -4 L -250 -4 Z" fill={glow} opacity={0.1 + 0.08 * pulse} />
      <g transform={`translate(0 ${f1(bob)})`}>
        <ellipse cx={0} cy={-190} rx={270} ry={24} fill={glow} opacity={0.28 + 0.18 * pulse} />
        <ellipse cx={0} cy={-190} rx={200} ry={12} fill={C.white} opacity={0.45} />
        {/* twin rear jet engines, drawn behind the body */}
        <rect x={-424} y={-322} width={150} height={52} rx={26} fill={ENGINE} />
        <rect x={-424} y={-246} width={150} height={52} rx={26} fill={ENGINE} />
        <ellipse cx={-424} cy={-296} rx={10} ry={24} fill={C.ink} />
        <ellipse cx={-424} cy={-220} rx={10} ry={24} fill={C.ink} />
        <path d="M -380 -320 L -380 -272 M -350 -320 L -350 -272 M -380 -246 L -380 -198 M -350 -246 L -350 -198" stroke={shade(ENGINE, 0.3)} strokeWidth={5} />
        {/* blue thrust flames */}
        {flame(-296, len)}
        {flame(-220, len * 0.92)}

        {/* seat */}
        <path d="M -206 -322 Q -150 -354 -70 -336 L -40 -308 L -214 -300 Z" fill={shade(body, 0.4)} />
        {/* main body: long streamlined shell */}
        <path d="M -290 -262 Q -300 -300 -250 -306 L 100 -318 Q 170 -320 230 -282 Q 300 -250 316 -232 Q 318 -214 296 -210 L -200 -206 Q -284 -206 -290 -262 Z" fill={body} />
        <path d="M -284 -226 L 300 -226 Q 318 -214 296 -210 L -200 -206 Q -284 -206 -290 -226 Z" fill={shade(body, 0.25)} />
        {/* glowing side strip */}
        <path d="M -270 -262 L 250 -262" stroke={glow} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
        {/* windscreen */}
        <path d="M 120 -318 L 176 -364 Q 196 -350 200 -300 L 160 -296 Z" fill={C.skyDeep} opacity={0.85} />
        {/* handlebars on a stem */}
        <path d="M 130 -300 L 150 -380" stroke={INK} strokeWidth={12} strokeLinecap="round" />
        <path d="M 120 -386 L 188 -398" stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <circle cx={120} cy={-386} r={10} fill={C.ink} />
        <circle cx={188} cy={-398} r={10} fill={C.ink} />
        {/* front fairing headlight */}
        <ellipse cx={304} cy={-240} rx={14} ry={9} fill={C.yellow} />
        <ellipse cx={304} cy={-240} rx={6} ry={4} fill={C.white} />
      </g>
    </g>
  );
}
