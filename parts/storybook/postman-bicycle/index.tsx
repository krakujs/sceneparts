import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Postman with bicycle: peaked cap and uniform, walking beside his upright bicycle (drawn behind him)
// with a wicker basket of letters on the handlebars. Preset of storybook/townsfolk.
const INK = C.ink;
const FRAME = "#7E2E22";
const WICKER = "#A9744F";

const Tube: React.FC<{ d: string }> = ({ d }) => (
  <g>
    <path d={d} fill="none" stroke={INK} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={FRAME} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Wheel: React.FC<{ cx: number; f: number }> = ({ cx, f }) => {
  const a = -f * 9;
  return (
    <g>
      <circle cx={cx} cy={-105} r={105} fill="none" stroke={INK} strokeWidth={14} />
      <circle cx={cx} cy={-105} r={96} fill="none" stroke="#8A8F96" strokeWidth={3} />
      <g transform={`rotate(${a} ${cx} -105)`}>
        {[0, 60, 120].map((d) => (
          <line key={d} x1={cx - 92} y1={-105} x2={cx + 92} y2={-105} stroke="#8A8F96" strokeWidth={3} transform={`rotate(${d} ${cx} -105)`} />
        ))}
      </g>
      <circle cx={cx} cy={-105} r={12} fill={INK} />
    </g>
  );
};

const Bicycle: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Wheel cx={-170} f={f} />
    <Wheel cx={110} f={f} />
    <Tube d="M -60 -120 L -110 -262 L 80 -262 L -60 -120" />
    <Tube d="M 80 -262 L 110 -105" />
    <Tube d="M -60 -120 L -170 -105" />
    <Tube d="M -110 -262 L -170 -105" />
    <Tube d="M 80 -262 L 92 -300 L 118 -312" />
    <circle cx={-60} cy={-120} r={24} fill="none" stroke={INK} strokeWidth={8} />
    <rect x={-138} y={-276} width={52} height={14} rx={6} fill={INK} />
    <path d="M 62 -330 L 150 -330 L 140 -268 L 70 -268 Z" fill={WICKER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 66 -310 L 146 -310 M 68 -290 L 142 -290" stroke={INK} strokeWidth={3} opacity={0.5} />
    <rect x={76} y={-356} width={46} height={28} fill={C.cream} stroke={INK} strokeWidth={4} transform="rotate(-10 99 -342)" />
    <rect x={106} y={-366} width={46} height={28} fill="#FFFFFF" stroke={INK} strokeWidth={4} transform="rotate(8 129 -352)" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="peaked" hatColour={p.uniform ?? "#1E2A47"} hair="short" hairColour={p.hairColour}
      top="uniform" coat={p.uniform ?? "#1E2A47"} shirt={C.cream} lower="trousers" legs={p.uniform ?? "#1E2A47"} boots="#1B1712"
      belt skin={p.skin} pose="carry" backPose="down" action={p.walk !== false ? "walk" : "idle"}
      behind={<Bicycle f={f} />}
      body={
        <g>
          <path d="M -60 -440 L 56 -268" stroke="#4A2E1E" strokeWidth={12} fill="none" strokeLinecap="round" />
          <rect x={34} y={-300} width={84} height={70} rx={10} fill="#4A2E1E" stroke={INK} strokeWidth={5} />
          <rect x={44} y={-306} width={60} height={12} rx={4} fill="#6B4B2E" stroke={INK} strokeWidth={3} />
        </g>
      }
    />
  );
}
