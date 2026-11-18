import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic solid-body electric guitar standing upright: ONE continuous double-cutaway body outline (rounded
// lower bout, waist, two short horns joined to the body around the neck; the upper horn a little longer),
// a cream pickguard, two pickups, knobs, a bridge, then the neck with frets and a headstock with tuners.
// Its own shape, not a copy of any model. Origin = bottom centre (base on y). About 560 px tall at s = 1.
// anim "strum": the strings swing in turn; "bob" and "wobble" move the whole guitar.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};

// Body outline in one path. Neck joint at y -292. Left horn (upper) reaches y -392, right horn y -366.
const BODY =
  "M -30 -292 Q -50 -320 -108 -392 Q -118 -400 -98 -386 " +
  "C -100 -360 -130 -330 -130 -270 C -130 -220 -84 -200 -84 -160 " +
  "C -84 -120 -150 -90 -150 -50 C -150 -12 -110 0 -70 0 L 70 0 " +
  "C 110 0 150 -12 150 -50 C 150 -90 84 -120 84 -160 C 84 -200 130 -220 130 -270 " +
  "C 130 -330 114 -350 106 -366 Q 62 -322 30 -292 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const dark = p.accent && p.accent !== "none" ? p.accent : C.ink;
  const anim: string = p.anim ?? "none";
  const strumAmp = (i: number) => {
    if (anim !== "strum") return 0;
    const cyc = ((f - i * 4) % 90 + 90) % 90;
    return 8 * Math.exp(-cyc / 14) * Math.sin(cyc * 0.9);
  };
  const xs = [-16, -9.6, -3.2, 3.2, 9.6, 16];
  const bridgeY = -66, nutY = -490;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* neck and headstock, behind the body so the joint is hidden */}
        <rect x={-26} y={-500} width={52} height={230} rx={8} fill={dark} />
        <path d="M -26 -490 L -29 -528 Q -30 -556 -8 -560 L 8 -560 Q 30 -556 29 -528 L 26 -490 Z" fill={dark} />
        {/* tuners: three per side, pegs pointing outwards */}
        {[-548, -526, -504].map((ty, j) => [-1, 1].map((side) => (
          <g key={`${j}${side}`}>
            <rect x={side > 0 ? 14 : -32} y={ty - 3} width={18} height={6} rx={3} fill={C.greyLight} />
            <circle cx={side * 19} cy={ty} r={6} fill={C.greyLight} />
          </g>
        )))}
        {/* body: one continuous solid outline */}
        <path d={BODY} fill={body} />
        {/* one shade for depth along the bottom of the lower bout */}
        <path d="M -140 -62 Q -100 -12 0 -6 Q 100 -12 140 -62 Q 100 -30 0 -34 Q -100 -30 -140 -62 Z" fill={shade(body, 0.18)} />
        {/* fingerboard on the neck, with frets */}
        <rect x={-18} y={-488} width={36} height={190} rx={4} fill={C.inkSoft} />
        {[-440, -402, -366, -332].map((fy, i) => <rect key={i} x={-18} y={fy} width={36} height={3} rx={1.5} fill={C.greyLight} />)}
        {/* pickguard (cream), pickups, knobs and switch */}
        <path d="M 14 -246 Q 70 -250 92 -210 Q 100 -150 70 -102 Q 40 -92 14 -110 Q 4 -170 14 -246 Z" fill={C.white} opacity={0.9} />
        <rect x={-42} y={-228} width={84} height={22} rx={9} fill={dark} />
        <rect x={-42} y={-184} width={84} height={22} rx={9} fill={dark} />
        <rect x={-46} y={-230} width={92} height={5} rx={2.5} fill={C.greyLight} />
        <rect x={-46} y={-186} width={92} height={5} rx={2.5} fill={C.greyLight} />
        <circle cx={62} cy={-124} r={9} fill={C.greyDark} />
        <circle cx={80} cy={-124} r={9} fill={C.greyDark} />
        <rect x={-74} y={-132} width={9} height={20} rx={3} fill={C.greyLight} />
        {/* bridge and tailpiece */}
        <rect x={-46} y={bridgeY - 8} width={92} height={14} rx={6} fill={C.greyLight} />
        <rect x={-30} y={-54} width={60} height={12} rx={5} fill={C.greyDark} />
        {/* strings: bridge to nut, bowed sideways when strummed */}
        {xs.map((sx, i) => {
          const a = strumAmp(i);
          return <path key={i} d={`M ${f1(sx * 1.6)} ${bridgeY} Q ${f1(sx * 1.6 + a)} ${(bridgeY + nutY) / 2} ${f1(sx * 0.9)} ${nutY}`} fill="none" stroke={C.greyLight} strokeWidth={2} />;
        })}
      </g>
    </g>
  );
}
