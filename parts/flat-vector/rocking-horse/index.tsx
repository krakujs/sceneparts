import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rocking horse: wooden side-view rocking horse facing right. Oval cream body, neck up to a clear horse head with ears
// and a mane, simple tail, red saddle, four straight legs whose feet sit on two thick curved wooden rockers.
// Origin = bottom centre (lowest point of the rockers); honours flip, s and anim. Room scale (about 550 px tall).
// anim "rock" swings the horse on its rockers.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "rock") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 70) * 9)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

// Rocker: a thick curved wooden runner from (-270, -40) through (0, 40) to (270, -40); lowest point is y = 0.
const ROCKER = "M -270 -40 Q 0 40 270 -40";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.sand;
  const saddle = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const dk = shade(body, 0.2);
  const wood = C.brown;
  const woodDk = shade(C.brown, 0.2);
  const mane = C.brownDark;
  // a leg: straight rounded bar from the body (top at y -200) down to the rocker, splayed by angle a
  const Leg = ({ lx, a, c }: { lx: number; a: number; c: string }) => (
    <rect x={lx - 20} y={-200} width={40} height={190} rx={18} fill={c} transform={`rotate(${a} ${lx} -200)`} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-4} rx={330} ry={18} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* far rocker (darker), behind everything */}
        <path d={ROCKER} transform="translate(0 -26)" fill="none" stroke={woodDk} strokeWidth={24} strokeLinecap="round" />
        {/* tail */}
        <path d="M -190 -330 Q -270 -300 -262 -226 Q -236 -282 -182 -280 Z" fill={mane} />
        {/* far legs (darker), splayed back and forward */}
        <Leg lx={-120} a={-8} c={dk} />
        <Leg lx={120} a={8} c={dk} />
        {/* body */}
        <ellipse cx={0} cy={-300} rx={190} ry={104} fill={body} />
        <path d="M 40 -398 A 190 104 0 0 1 90 -210 A 190 104 0 0 0 40 -398 Z" fill={dk} opacity={0.6} />
        {/* saddle on the back */}
        <path d="M -104 -386 Q 0 -420 108 -384 L 100 -352 Q 0 -372 -98 -350 Z" fill={saddle} />
        <path d="M -98 -350 Q 0 -372 100 -352 L 96 -340 Q 0 -360 -94 -338 Z" fill={shade(saddle, 0.2)} />
        {/* near legs, splayed, feet on the near rocker */}
        <Leg lx={-150} a={6} c={body} />
        <Leg lx={150} a={-6} c={body} />
        {/* neck */}
        <path d="M 60 -380 Q 130 -420 160 -520 L 250 -500 Q 226 -396 160 -326 Z" fill={body} />
        {/* mane along the crest of the neck */}
        <path d="M 150 -530 Q 160 -600 214 -604 L 222 -574 Q 186 -572 172 -508 Z" fill={mane} />
        {/* head: horse profile with a long muzzle */}
        <path d="M 200 -572 Q 252 -606 290 -556 L 330 -522 Q 338 -494 310 -486 L 284 -480 Q 244 -466 214 -468 Z" fill={body} />
        <path d="M 296 -516 Q 320 -512 332 -520 Q 330 -500 312 -494 Z" fill={dk} />
        {/* ears */}
        <polygon points="206,-574 218,-616 240,-584" fill={body} />
        <polygon points="214,-578 220,-604 233,-586" fill={dk} />
        {/* eye */}
        <circle cx={256} cy={-540} r={9} fill={C.ink} />
        <circle cx={259} cy={-543} r={3} fill={C.white} />
        {/* bridle hint */}
        <path d="M 230 -520 Q 262 -556 300 -530" fill="none" stroke={saddle} strokeWidth={8} strokeLinecap="round" />
        {/* near rocker (drawn last so the feet sit on it) */}
        <path d={ROCKER} fill="none" stroke={wood} strokeWidth={24} strokeLinecap="round" />
      </g>
    </g>
  );
}
