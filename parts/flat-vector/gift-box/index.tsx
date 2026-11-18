import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wrapped present with a lid, a ribbon across it and a bow on top. Origin = bottom centre (the box sits
// on y). About 450 px wide and 390 px tall at s = 1.
// anim "open": the lid lifts and tilts up once, with sparkles popping out (frame 0 is closed).
// anim "shake": the box rattles from side to side.
const f1 = (v: number) => v.toFixed(1);

const Bow = ({ c }: { c: string }) => (
  <g>
    <ellipse cx={-46} cy={-392} rx={50} ry={30} transform="rotate(-28 -46 -392)" fill={c} />
    <ellipse cx={46} cy={-392} rx={50} ry={30} transform="rotate(28 46 -392)" fill={c} />
    <ellipse cx={-46} cy={-392} rx={26} ry={16} transform="rotate(-28 -46 -392)" fill={shade(c, 0.15)} />
    <ellipse cx={46} cy={-392} rx={26} ry={16} transform="rotate(28 46 -392)" fill={shade(c, 0.15)} />
    <circle cx={0} cy={-378} r={20} fill={shade(c, 0.2)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const box = p.color && p.color !== "none" ? p.color : C.red;
  const ribbon = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  // open: 0 closed .. 1 open, reached over 40 frames and held.
  const u = anim === "open" ? Math.min(1, f / 40) : 0;
  const ue = 1 - (1 - u) * (1 - u) * (1 - u);
  const lidY = -90 * ue, lidRot = -14 * ue;
  const sk = anim === "shake" ? Math.sin((f * 2 * Math.PI) / 12) : 0;
  const shakeX = sk * 8, shakeR = sk * 2.5;
  const sp = Math.max(0, (u - 0.35) / 0.65);
  const sparkles: [number, number][] = [[-210, -430], [210, -440], [-120, -520], [130, -530], [0, -580]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={16} fill={C.shadow} />
      <g transform={`translate(${f1(shakeX)} 0) rotate(${f1(shakeR)} 0 0)`}>
        {/* sparkles popping out of the open box */}
        {anim === "open" && sparkles.map(([sx, sy], i) => (
          <g key={i} transform={`translate(${sx} ${sy}) scale(${f1(sp)})`} opacity={f1(sp)}>
            <path d="M 0 -26 L 6 -6 L 26 0 L 6 6 L 0 26 L -6 6 L -26 0 L -6 -6 Z" fill={C.yellow} />
          </g>
        ))}
        {/* body, with a shaded right side and the ribbon down its middle */}
        <rect x={-200} y={-300} width={400} height={300} rx={12} fill={box} />
        <rect x={140} y={-300} width={60} height={300} rx={8} fill={shade(box, 0.15)} />
        <rect x={-30} y={-300} width={60} height={300} fill={ribbon} />
        <rect x={-30} y={-300} width={60} height={300} fill={shade(ribbon, 0.1)} opacity={0.25} />
        {/* lid with its own ribbon and bow, lifting on its back edge */}
        <g transform={`translate(0 ${f1(lidY)}) rotate(${f1(lidRot)} -200 -300)`}>
          <rect x={-224} y={-362} width={448} height={62} rx={12} fill={shade(box, 0.1)} />
          <rect x={-224} y={-362} width={448} height={12} rx={6} fill={shade(box, 0.22)} />
          <rect x={-30} y={-362} width={60} height={62} fill={ribbon} />
          <Bow c={ribbon} />
        </g>
      </g>
    </g>
  );
}
