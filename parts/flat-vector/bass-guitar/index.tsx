import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic solid-body bass guitar standing upright: ONE continuous offset double-cutaway body outline (the
// upper horn longer than the lower one), a noticeably longer neck, four strings, four tuners on the headstock,
// two pickups, knobs and a bridge. Its own shape, not a copy of any model.
// Origin = bottom centre (base on y). About 640 px tall at s = 1.
// anim "strum": the four strings swing in turn; "bob" and "wobble" move the whole bass.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};

// Body outline in one path. Neck joint at y -300. Upper horn (left) reaches y -386, lower horn (right) y -346.
const BODY =
  "M -26 -300 Q -46 -322 -104 -370 Q -112 -386 -86 -380 " +
  "C -92 -352 -130 -320 -128 -268 C -126 -220 -88 -200 -86 -170 " +
  "C -84 -130 -168 -100 -168 -50 C -168 -12 -120 0 -80 0 L 80 0 " +
  "C 120 0 168 -12 168 -50 C 168 -100 84 -130 86 -170 C 88 -200 126 -220 128 -268 " +
  "C 130 -320 104 -336 96 -344 Q 102 -352 88 -354 Q 50 -322 26 -300 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const dark = p.accent && p.accent !== "none" ? p.accent : C.ink;
  const anim: string = p.anim ?? "none";
  const strumAmp = (i: number) => {
    if (anim !== "strum") return 0;
    const cyc = ((f - i * 4) % 90 + 90) % 90;
    return 8 * Math.exp(-cyc / 14) * Math.sin(cyc * 0.9);
  };
  const xs = [-12, -4, 4, 12];
  const bridgeY = -62, nutY = -584;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* long neck and headstock, behind the body */}
        <rect x={-22} y={-600} width={44} height={320} rx={7} fill={dark} />
        <path d="M -22 -582 L -25 -620 Q -25 -642 -6 -644 L 6 -644 Q 25 -642 25 -620 L 22 -582 Z" fill={dark} />
        {/* four tuners: two per side */}
        {[-626, -602].map((ty, j) => [-1, 1].map((side) => (
          <g key={`${j}${side}`}>
            <rect x={side > 0 ? 12 : -30} y={ty - 3} width={18} height={6} rx={3} fill={C.greyLight} />
            <circle cx={side * 17} cy={ty} r={6} fill={C.greyLight} />
          </g>
        )))}
        {/* body: one continuous offset double-cutaway outline */}
        {/* body, widened a little across the bass's larger lower bout */}
        <g transform="scale(1.12 1)">
          <path d={BODY} fill={body} />
          {/* one shade for depth along the bottom */}
          <path d="M -160 -58 Q -110 -14 0 -8 Q 110 -14 160 -58 Q 110 -34 0 -38 Q -110 -34 -160 -58 Z" fill={shade(body, 0.18)} />
        </g>
        {/* fingerboard with frets */}
        <rect x={-16} y={-598} width={32} height={290} rx={3} fill={C.inkSoft} />
        {[-566, -526, -486, -446, -408, -370, -334].map((fy, i) => <rect key={i} x={-16} y={fy} width={32} height={3} rx={1.5} fill={C.greyLight} />)}
        {/* two pickups, knobs and bridge */}
        <rect x={-46} y={-236} width={92} height={22} rx={9} fill={dark} />
        <rect x={-46} y={-192} width={92} height={22} rx={9} fill={dark} />
        <rect x={-50} y={-238} width={100} height={5} rx={2.5} fill={C.greyLight} />
        <rect x={-50} y={-194} width={100} height={5} rx={2.5} fill={C.greyLight} />
        <circle cx={66} cy={-128} r={9} fill={C.greyDark} />
        <circle cx={88} cy={-128} r={9} fill={C.greyDark} />
        <rect x={-58} y={bridgeY - 8} width={116} height={14} rx={6} fill={C.greyLight} />
        {/* strings: bridge to nut, bowed sideways when strummed */}
        {xs.map((sx, i) => {
          const a = strumAmp(i);
          return <path key={i} d={`M ${f1(sx * 1.6)} ${bridgeY} Q ${f1(sx * 1.6 + a)} ${(bridgeY + nutY) / 2} ${f1(sx * 0.6)} ${nutY}`} fill="none" stroke={C.greyLight} strokeWidth={2} />;
        })}
      </g>
    </g>
  );
}
