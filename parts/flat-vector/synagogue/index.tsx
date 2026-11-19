import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic synagogue, front view: arched windows, a round rose window and a small star of David on the gable.
// Origin = base on the ground. About 780 px wide and 1000 px tall at s = 1.
// anim "lights": the arched windows glow on one after another.
const f1 = (v: number) => v.toFixed(1);
const glow = (anim: string, f: number, i: number) => (anim === "lights" ? 0.4 + 0.6 * (Math.sin((f - i * 10) / 7) * 0.5 + 0.5) : 0.95);
// Two overlapping equilateral triangles: one pointing up, one pointing down.
const triangle = (cx: number, cy: number, r: number, start: number) =>
  [0, 1, 2]
    .map((k) => {
      const a = start + (k * 2 * Math.PI) / 3;
      return `${f1(cx + r * Math.cos(a))} ${f1(cy + r * Math.sin(a))}`;
    })
    .join(" L ");
const star = (cx: number, cy: number, r: number) =>
  `M ${triangle(cx, cy, r, -Math.PI / 2)} Z M ${triangle(cx, cy, r, Math.PI / 2)} Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const archXs = [-300, -150, 150, 300];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={24} fill={C.shadow} />
      {/* steps */}
      <rect x={-240} y={-30} width={480} height={30} rx={6} fill={C.greyLight} />
      <rect x={-200} y={-52} width={400} height={24} rx={6} fill={C.greyLight} />
      {/* main hall */}
      <rect x={-360} y={-640} width={720} height={612} rx={10} fill={wall} />
      <rect x={300} y={-640} width={60} height={612} rx={10} fill={shade(wall, 0.1)} />
      {/* gable with pitched roof */}
      <path d="M -380 -640 L 0 -900 L 380 -640 Z" fill={roof} />
      <path d="M -330 -650 L 0 -880 L 330 -650 L 310 -650 L 0 -858 L -310 -650 Z" fill={shade(roof, 0.2)} />
      {/* star of David on the gable */}
      <path d={star(0, -740, 46)} fill={C.white} />
      {/* rose window */}
      <circle cx={0} cy={-520} r={70} fill={C.white} />
      <circle cx={0} cy={-520} r={58} fill={C.skyDeep} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = (k * Math.PI) / 3;
        return <line key={k} x1={0} y1={-520} x2={f1(Math.cos(a) * 58)} y2={f1(-520 + Math.sin(a) * 58)} stroke={C.white} strokeWidth={6} />;
      })}
      <circle cx={0} cy={-520} r={12} fill={C.white} />
      {/* arched windows with sills */}
      {archXs.map((ax, i) => (
        <g key={ax}>
          <path d={`M ${ax - 42} -230 L ${ax - 42} -340 Q ${ax - 42} -382 ${ax} -382 Q ${ax + 42} -382 ${ax + 42} -340 L ${ax + 42} -230 Z`} fill={C.ink} opacity={0.8} />
          <path d={`M ${ax - 32} -240 L ${ax - 32} -336 Q ${ax - 32} -370 ${ax} -370 Q ${ax + 32} -370 ${ax + 32} -336 L ${ax + 32} -240 Z`} fill={C.yellow} opacity={glow(anim, f, i)} />
          <rect x={ax - 6} y={-370} width={12} height={140} fill={C.ink} opacity={0.35} />
          <rect x={ax - 56} y={-222} width={112} height={12} rx={4} fill={C.greyLight} />
        </g>
      ))}
      {/* entrance arch with double doors */}
      <path d="M -90 -30 L -90 -190 Q -90 -250 0 -250 Q 90 -250 90 -190 L 90 -30 Z" fill={C.brownDark} />
      <rect x={-4} y={-240} width={8} height={210} fill={shade(C.brownDark, 0.3)} />
      <path d="M -70 -40 L -70 -180 Q -70 -226 -4 -226 L -4 -40 Z" fill={C.brown} opacity={0.6} />
      <path d="M 70 -40 L 70 -180 Q 70 -226 4 -226 L 4 -40 Z" fill={C.brown} opacity={0.6} />
      {/* side pillars */}
      <rect x={-380} y={-640} width={20} height={612} fill={shade(wall, 0.15)} />
      <rect x={360} y={-640} width={20} height={612} fill={shade(wall, 0.15)} />
    </g>
  );
}
