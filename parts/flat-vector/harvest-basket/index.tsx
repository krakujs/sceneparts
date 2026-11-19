import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Harvest basket: a wicker basket with a woven pattern and a handle, heaped with pumpkins, apples,
// a corn cob and a cluster of grapes. Origin = bottom centre. Back items are drawn first.
const f1 = (v: number) => v.toFixed(1);

const Pumpkin = ({ x, y, r, c }: { x: number; y: number; r: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.8} fill={c} />
    {[-0.5, 0, 0.5].map((k, i) => <ellipse key={i} cx={f1(k * r)} cy={0} rx={r * 0.26} ry={r * 0.78} fill={shade(c, 0.15)} opacity={0.7} />)}
    <rect x={-r * 0.12} y={-r * 0.98} width={r * 0.24} height={r * 0.3} rx={5} fill={C.greenDark} />
  </g>
);
const Apple = ({ x, y, r, c }: { x: number; y: number; r: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    <circle cx={0} cy={0} r={r} fill={c} />
    <circle cx={-r * 0.35} cy={-r * 0.3} r={r * 0.22} fill={C.white} opacity={0.45} />
    <path d={`M 0 ${f1(-r * 0.9)} q ${f1(r * 0.5)} ${f1(-r * 0.5)} ${f1(r * 0.7)} ${f1(-r * 0.1)} q ${f1(-r * 0.4)} ${f1(r * 0.1)} ${f1(-r * 0.7)} ${f1(r * 0.1)}`} fill={C.green} />
  </g>
);
const Corn = ({ x, y, rot }: { x: number; y: number; rot: number }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${rot})`}>
    <ellipse cx={0} cy={0} rx={44} ry={124} fill={C.yellow} />
    {Array.from({ length: 4 }, (_, r) => Array.from({ length: 3 }, (_, c) => (
      <circle key={`${r}-${c}`} cx={f1(-20 + c * 20)} cy={f1(-88 + r * 56)} r={7} fill={C.yellowDark} opacity={0.6} />
    )))}
    <path d="M -44 40 Q -70 -40 -40 -130 L -10 -130 Q -30 -40 -4 40 Z" fill={C.green} />
    <path d="M 44 40 Q 70 -40 40 -130 L 10 -130 Q 30 -40 4 40 Z" fill={shade(C.green, 0.15)} />
  </g>
);
const Grapes = ({ x, y }: { x: number; y: number }) => {
  const pts = [[0, 0], [-24, 22], [24, 22], [-12, 48], [14, 50], [0, 74], [-30, 70], [30, 72]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)})`}>
      <path d="M 0 -30 L 0 -6" stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" />
      {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={20} fill={i % 2 ? C.purple : C.purpleDark} />)}
      {pts.map(([px, py], i) => <circle key={`h${i}`} cx={px - 6} cy={py - 7} r={5} fill={C.white} opacity={0.35} />)}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wick = p.color && p.color !== "none" ? p.color : "#C9915A";
  const anim: string = p.anim ?? "none";
  const rock = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 80) * 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rock)})`}>
      <ellipse cx={0} cy={0} rx={300} ry={24} fill={C.shadow} />
      {/* back items */}
      <Corn x={-230} y={-330} rot={-24} />
      <Pumpkin x={-130} y={-310} r={104} c={C.orange} />
      <Pumpkin x={130} y={-300} r={96} c={shade(C.orange, 0.08)} />
      <Apple x={-30} y={-370} r={52} c={C.red} />
      <Apple x={60} y={-420} r={46} c={C.red} />
      <Apple x={-100} y={-440} r={40} c={shade(C.yellow, 0.05)} />
      <Grapes x={230} y={-340} />
      {/* handle, in front of the items */}
      <path d="M -230 -250 Q 0 -600 230 -250" fill="none" stroke={shade(wick, 0.25)} strokeWidth={26} strokeLinecap="round" />
      {/* basket body with a woven pattern */}
      <clipPath id="harvest-basket-body"><path d="M -270 -220 L 270 -220 L 200 0 L -200 0 Z" /></clipPath>
      <path d="M -270 -220 L 270 -220 L 200 0 L -200 0 Z" fill={wick} />
      <g clipPath="url(#harvest-basket-body)">
        {[-190, -140, -90, -40].map((yy, i) => (
          <path key={i} d={`M -300 ${yy} L 300 ${yy - 40}`} stroke={shade(wick, 0.25)} strokeWidth={14} />
        ))}
        {[-190, -140, -90, -40].map((yy, i) => (
          <path key={`b${i}`} d={`M -300 ${yy - 40} L 300 ${yy}`} stroke={shade(wick, 0.1)} strokeWidth={6} />
        ))}
      </g>
      {/* rim */}
      <rect x={-290} y={-246} width={580} height={36} rx={16} fill={shade(wick, 0.2)} />
      <rect x={-290} y={-246} width={580} height={12} rx={6} fill={shade(wick, 0.05)} />
    </g>
  );
}
