import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Space station module: a cylindrical habitat seen from the side with a docking port at one end and two
// solar panel wings (one above, one below) on a central truss. Origin = centre of the cylinder; about 600 px wide and 650 px tall.
// anim "spin": the wings turn slowly, as if the station rotates; "drift": the station rocks gently and floats up and down.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 800;
  const body = p.color && p.color !== "none" ? p.color : C.paper;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 2 * Math.PI) / 240 : 0;
  const wingW = Math.max(0.25, Math.abs(Math.cos(turn)));
  const dy = anim === "drift" ? Math.sin((f * 2 * Math.PI) / 150) * 16 : 0;
  const rot = anim === "drift" ? 3 * Math.sin((f * 2 * Math.PI) / 150) : 0;
  const wing = (cy: number, key: string) => (
    <g key={key}>
      <rect x={-8} y={cy < 0 ? -260 : 60} width={16} height={cy < 0 ? 150 : 60} fill={C.greyDark} />
      <g transform={`translate(0 ${cy}) scale(${f1(wingW)} 1)`}>
        <rect x={-110} y={-70} width={220} height={150} rx={6} fill="#2A50AE" />
        {[-66, -22, 22, 66].map((gx) => (
          <line key={gx} x1={gx} y1={-70} x2={gx} y2={80} stroke="#3D6FE0" strokeWidth={4} />
        ))}
        <line x1={-110} y1={5} x2={110} y2={5} stroke="#3D6FE0" strokeWidth={4} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y + dy)}) rotate(${f1(rot)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* solar wings: top at -410, bottom at +210 */}
      {wing(-330, "top")}
      {wing(170, "bottom")}
      {/* docking port */}
      <path d="M 210 -58 L 292 -34 L 292 34 L 210 58 Z" fill={C.grey} />
      <rect x={290} y={-46} width={14} height={92} rx={4} fill={C.navy} />
      {/* cylinder */}
      <rect x={-210} y={-120} width={420} height={240} rx={0} fill={body} />
      <ellipse cx={-210} cy={0} rx={40} ry={120} fill={shade(body, 0.12)} />
      <ellipse cx={210} cy={0} rx={40} ry={120} fill={shade(body, 0.12)} />
      <rect x={-210} y={80} width={420} height={40} fill={shade(body, 0.12)} />
      {/* bands and stripe */}
      <rect x={-150} y={-120} width={14} height={240} fill={shade(body, 0.2)} />
      <rect x={60} y={-120} width={14} height={240} fill={shade(body, 0.2)} />
      <rect x={-210} y={-16} width={420} height={16} fill={accent} />
      {/* windows */}
      {[-120, -50, 20, 90].map((wx) => (
        <rect key={wx} x={wx} y={-70} width={34} height={36} rx={6} fill={C.skyDeep} />
      ))}
    </g>
  );
}
