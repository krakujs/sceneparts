import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Drum kit seen from the front: a large bass drum with its feet, two toms mounted above it, a snare on a
// stand, a hi-hat on the left and a crash cymbal on a tall stand on the right. Origin = bottom centre.
// anim "play": the pieces take turns to be struck, each bouncing and the cymbals rocking.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};
// strike pulse for piece k (0..4): sharp rise on its beat, then decay
const beat = (f: number, k: number) => {
  const t = (((f - k * 12) % 60) + 60) % 60;
  return Math.max(0, 1 - t / 6);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const shell = p.color && p.color !== "none" ? p.color : C.blue;
  const cym = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const play = anim === "play";
  const bounce = (k: number) => (play ? -beat(f, k) * 10 : 0);
  const tilt = (k: number) => (play ? beat(f, k) * 6 : 0);
  // a drum: a head seen face-on with a shell rim and a darker bottom
  const head = (cx: number, cy: number, r: number, k: number) => (
    <g transform={`translate(${f1(cx)} ${f1(cy + bounce(k))})`}>
      <circle cx={0} cy={0} r={r + 14} fill={shade(shell, 0.25)} />
      <circle cx={0} cy={0} r={r} fill={shell} />
      <circle cx={0} cy={0} r={r * 0.7} fill={C.white} opacity={0.92} />
      <circle cx={0} cy={0} r={r * 0.7} fill="none" stroke={C.greyLight} strokeWidth={6} />
      <path d={`M ${f1(-r * 0.7)} ${f1(-r * 0.2)} A ${f1(r * 0.7)} ${f1(r * 0.7)} 0 0 1 ${f1(-r * 0.2)} ${f1(-r * 0.7)}`} fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.6} />
      <circle cx={0} cy={0} r={r * 0.12} fill={C.greyLight} />
    </g>
  );
  const stand = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.greyDark} strokeWidth={12} strokeLinecap="round" />
  );
  const cymbal = (cx: number, cy: number, rx: number, k: number) => (
    <g transform={`translate(${f1(cx)} ${f1(cy)}) rotate(${f1(tilt(k))})`}>
      <ellipse cx={0} cy={0} rx={rx} ry={rx * 0.24} fill={shade(cym, 0.2)} />
      <ellipse cx={0} cy={-4} rx={rx * 0.9} ry={rx * 0.2} fill={cym} />
      <ellipse cx={0} cy={-8} rx={rx * 0.3} ry={rx * 0.07} fill={C.white} opacity={0.5} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* hi-hat stand and cymbals (left) */}
        {stand(-430, 0, -430, -640)}
        {stand(-430, -560, -400, -640)}
        <rect x={-450} y={-6} width={60} height={12} rx={6} fill={C.inkSoft} />
        {cymbal(-430, -610, 110, 2)}
        {cymbal(-430, -640, 110, 2)}
        {/* bass drum (centre), feet beneath */}
        <rect x={-190} y={-70} width={36} height={70} rx={10} fill={C.inkSoft} />
        <rect x={154} y={-70} width={36} height={70} rx={10} fill={C.inkSoft} />
        <g transform={`translate(0 ${f1(bounce(0))})`}>
          <circle cx={0} cy={-300} r={236} fill={shade(shell, 0.25)} />
          <circle cx={0} cy={-300} r={216} fill={C.white} />
          <circle cx={0} cy={-300} r={196} fill={shell} />
          <circle cx={0} cy={-300} r={70} fill={C.inkSoft} opacity={0.5} />
          <path d="M -150 -380 A 190 190 0 0 1 -60 -480" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.25} />
        </g>
        {/* toms mounted above the bass drum */}
        {stand(-150, -540, -110, -600)}
        {stand(150, -540, 110, -600)}
        {head(-170, -640, 110, 3)}
        {head(170, -650, 120, 4)}
        {/* snare on a stand (left-centre) */}
        {stand(-290, -4, -340, -210)}
        {stand(-290, -4, -240, -210)}
        {stand(-290, -4, -290, -240)}
        <g transform={`translate(${f1(-290)} ${f1(bounce(1))})`}>
          <rect x={-120} y={-300} width={240} height={90} fill={shade(shell, 0.1)} />
          <ellipse cx={0} cy={-210} rx={120} ry={30} fill={shade(shell, 0.25)} />
          <ellipse cx={0} cy={-300} rx={124} ry={30} fill={C.greyLight} />
          <ellipse cx={0} cy={-300} rx={108} ry={22} fill={C.white} />
          <rect x={-120} y={-270} width={240} height={10} fill={C.white} opacity={0.2} />
        </g>
        {/* crash cymbal on a tall stand (right) */}
        {stand(410, 0, 410, -720)}
        {stand(410, -620, 350, -700)}
        <rect x={392} y={-6} width={36} height={12} rx={6} fill={C.inkSoft} />
        {cymbal(410, -740, 150, 1)}
      </g>
    </g>
  );
}
