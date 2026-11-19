import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cartoon microbe: a blobby body with a bumpy outline, little feelers and a cheeky face
// (dot eyes, one raised brow, a small grin). Original design. Effect, centred on (x, y), about 380 px across.
// anim "wobble": the body rocks and squashes gently.
const f1 = (v: number) => v.toFixed(1);
const N = 96;
const FEELERS = [-150, -120, -90, -60, -30];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const body = p.color && p.color !== "none" ? p.color : C.lime;
  const feel = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const dk = shade(body, 0.2);
  const anim: string = p.anim ?? "none";
  const rot = anim === "wobble" ? 6 * Math.sin((f * 2 * Math.PI) / 40) : 0;
  const squash = anim === "wobble" ? 1 + 0.03 * Math.sin((f * 2 * Math.PI) / 40 + 1.5) : 1;
  // bumpy outline: radius wobbles with a ripple of 8 bumps
  const pts: string[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i * 2 * Math.PI) / N;
    const r = 140 + 13 * Math.cos(8 * a);
    pts.push(`${i === 0 ? "M" : "L"} ${f1(Math.cos(a) * r)} ${f1(Math.sin(a) * r)}`);
  }
  const outline = pts.join(" ") + " Z";
  const deg = (d: number) => (d * Math.PI) / 180;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      <ellipse cx={0} cy={150} rx={130} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(rot)}) scale(1 ${f1(squash)})`}>
        {/* feelers on top, each ending in a little ball */}
        {FEELERS.map((d) => {
          const a = deg(d);
          const x0 = Math.cos(a) * 130, y0 = Math.sin(a) * 130;
          const x1 = Math.cos(a) * 200, y1 = Math.sin(a) * 200;
          return (
            <g key={d}>
              <line x1={f1(x0)} y1={f1(y0)} x2={f1(x1)} y2={f1(y1)} stroke={feel} strokeWidth={14} strokeLinecap="round" />
              <circle cx={f1(x1)} cy={f1(y1)} r={17} fill={feel} />
            </g>
          );
        })}
        {/* body: shade offset, then the bumpy body */}
        <path d={outline} fill={dk} transform="translate(8 10)" />
        <path d={outline} fill={body} />
        {/* cheeks */}
        <circle cx={-72} cy={26} r={18} fill={C.pink} opacity={0.5} />
        <circle cx={72} cy={26} r={18} fill={C.pink} opacity={0.5} />
        {/* cheeky face */}
        <circle cx={-38} cy={-16} r={17} fill={C.ink} />
        <circle cx={-33} cy={-21} r={5} fill={C.white} />
        <circle cx={38} cy={-16} r={17} fill={C.ink} />
        <circle cx={43} cy={-21} r={5} fill={C.white} />
        <path d="M 20 -56 Q 38 -70 56 -56" stroke={C.ink} strokeWidth={8} strokeLinecap="round" fill="none" />
        <path d="M -40 30 Q 0 62 40 30" stroke={C.ink} strokeWidth={9} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
