import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Brass carriage clock: rounded brass case, glass side panels with little turning wheels, a carrying handle
// and a cream dial whose hands move. Stands on (x, y), bottom centre, about 440 px tall at s = 1.
export const CarriageClock: React.FC<{ x: number; y: number; s?: number; f?: number; flip?: boolean; metal?: string; speed?: number }> = ({ x, y, s = 1, f = 0, flip = false, metal = "#B98B52", speed = 1 }) => {
  const o = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const };
  const cy = -190;
  const minute = f * 2.4 * speed;
  const hour = f * 0.2 * speed;
  const gear = (gx: number) => (
    <g transform={`translate(${gx} -190) rotate(${f * 3 * speed})`}>
      <circle r={20} fill={metal} stroke={C.ink} strokeWidth={4} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 17} y2={Math.sin((a * Math.PI) / 180) * 17} stroke={C.ink} strokeWidth={4} />
      ))}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={16} fill="#000" opacity={0.2} />
      <path d="M -52 -330 Q 0 -440 52 -330" stroke={C.ink} strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M -52 -330 Q 0 -440 52 -330" stroke={metal} strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={-112} y={-40} width={34} height={42} rx={6} fill={metal} {...o} />
      <rect x={78} y={-40} width={34} height={42} rx={6} fill={metal} {...o} />
      <rect x={-125} y={-330} width={250} height={292} rx={26} fill={metal} {...o} />
      <rect x={-110} y={-310} width={26} height={250} rx={6} fill="#CFE3E0" opacity={0.8} stroke={C.ink} strokeWidth={4} />
      <rect x={84} y={-310} width={26} height={250} rx={6} fill="#CFE3E0" opacity={0.8} stroke={C.ink} strokeWidth={4} />
      {gear(-97)}
      {gear(97)}
      <path d="M -104 -296 L -104 -90" stroke="#FFFFFF" strokeWidth={6} opacity={0.6} strokeLinecap="round" />
      <rect x={-125} y={-330} width={250} height={18} rx={6} fill={metal} stroke={C.ink} strokeWidth={5} />
      {/* dial */}
      <circle cx={0} cy={cy} r={84} fill={C.cream} stroke={C.ink} strokeWidth={7} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={Math.sin(a) * 70} y1={cy - Math.cos(a) * 70} x2={Math.sin(a) * 79} y2={cy - Math.cos(a) * 79} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
      })}
      <g transform={`translate(0 ${cy}) rotate(${hour})`}>
        <line x1={0} y1={6} x2={0} y2={-40} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      </g>
      <g transform={`translate(0 ${cy}) rotate(${minute})`}>
        <line x1={0} y1={8} x2={0} y2={-62} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      </g>
      <circle cx={0} cy={cy} r={7} fill={C.brick} stroke={C.ink} strokeWidth={3} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <CarriageClock x={p.x} y={p.y} s={p.s} f={p.f} flip={p.flip} metal={p.metal} speed={p.speed} />;
}
