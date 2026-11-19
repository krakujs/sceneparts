import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fanned stack of generic green banknotes: plain oval and circle patterns, no portraits and no real
// currency design. Origin = bottom centre of the fan (it rests on y). About 480 px wide at s = 1.
// anim "count": the top note flicks up and back, as when someone counts notes.
const f1 = (v: number) => v.toFixed(1);

// One note, drawn with its bottom edge centred on (0, -30) and rotated about that point.
const Note = ({ a, c, lift = 0 }: { a: number; c: string; lift?: number }) => (
  <g transform={`translate(0 ${f1(-lift - 30)}) rotate(${f1(a)} 0 -30)`}>
    <rect x={-230} y={-260} width={460} height={230} rx={18} fill={c} />
    <rect x={-206} y={-236} width={412} height={186} rx={12} fill={C.lime} opacity={0.45} />
    <ellipse cx={0} cy={-150} rx={86} ry={66} fill={shade(c, 0.25)} />
    <ellipse cx={0} cy={-150} rx={52} ry={38} fill={C.lime} />
    <circle cx={-168} cy={-128} r={24} fill={shade(c, 0.25)} />
    <circle cx={168} cy={-172} r={24} fill={shade(c, 0.25)} />
    <circle cx={-150} cy={-62} r={12} fill={C.white} opacity={0.7} />
    <circle cx={150} cy={-62} r={12} fill={C.white} opacity={0.7} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  // The top note flicks: a quick flip of about 14 degrees every 60 frames, rest in between.
  const ph = (f % 60) / 60;
  const flick = anim === "count" && ph < 0.2 ? Math.sin((Math.PI * ph) / 0.2) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <Note a={-14} c={shade(green, 0.12)} />
      <Note a={-7} c={shade(green, 0.06)} />
      <Note a={0} c={green} />
      <Note a={7} c={shade(green, 0.1)} />
      <Note a={14 + 14 * flick} c={green} lift={40 * flick} />
    </g>
  );
}
