import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal supermarket trolley with four wheels, a handle and a few colourful items. Floor item:
// 1 m ~ 560 px, so the trolley is about 1 m tall. Origin = floor centre (the wheels touch y).
// anim "roll": the wheels spin and the load bobs slightly, as if the trolley is being pushed.
const f1 = (v: number) => v.toFixed(1);

const Wheel = ({ x, y, r, spin }: { x: number; y: number; r: number; spin: number }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    <circle cx={0} cy={0} r={r} fill={C.inkSoft} />
    <g transform={`rotate(${f1(spin)})`}>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={-3} y={-r + 6} width={6} height={r - 8} rx={3} fill={C.grey} transform={`rotate(${i * 120})`} />
      ))}
    </g>
    <circle cx={0} cy={0} r={r * 0.3} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.greyLight;
  const anim: string = p.anim ?? "none";
  const roll = anim === "roll";
  const bob = roll ? Math.sin((f * 2 * Math.PI) / 50) * 3 : 0;
  const spin = roll ? f * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      {/* rear wheels (behind), then front wheels */}
      <Wheel x={-120} y={-26} r={26} spin={spin} />
      <Wheel x={120} y={-26} r={26} spin={spin} />
      {/* lower rack and frame posts, fixed to the wheel mounts */}
      <rect x={-180} y={-120} width={360} height={14} rx={7} fill={C.greyDark} />
      <rect x={-170} y={-210} width={12} height={100} rx={5} fill={C.greyDark} />
      <rect x={158} y={-210} width={12} height={100} rx={5} fill={C.greyDark} />
      <Wheel x={-150} y={-34} r={34} spin={spin} />
      <Wheel x={150} y={-34} r={34} spin={spin} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* handle: a bar at the top-left and a grip */}
        <rect x={-284} y={-676} width={130} height={26} rx={13} fill={C.greyDark} />
        <rect x={-212} y={-676} width={16} height={44} rx={6} fill={C.greyDark} />
        <rect x={-224} y={-640} width={16} height={28} rx={6} fill={C.greyDark} />
        {/* items peeking over the rim: bread, apples, a carton */}
        <ellipse cx={-70} cy={-650} rx={92} ry={46} fill={C.sand} />
        <ellipse cx={-70} cy={-660} rx={72} ry={24} fill={shade(C.sand, 0.12)} />
        <circle cx={70} cy={-668} r={34} fill={C.red} />
        <circle cx={130} cy={-676} r={34} fill={C.red} />
        <circle cx={108} cy={-640} r={28} fill={C.redDark} opacity={0.4} />
        <rect x={150} y={-690} width={34} height={60} rx={6} fill={C.orange} />
        {/* the basket: a tapered tub, with a dark rim */}
        <path d="M -210 -640 L 210 -640 L 166 -210 L -166 -210 Z" fill={metal} />
        <path d="M 210 -640 L 166 -210 L 146 -210 L 188 -640 Z" fill={shade(metal, 0.12)} />
        {/* items inside the basket */}
        <rect x={-150} y={-560} width={60} height={160} rx={16} fill={C.green} />
        <rect x={-150} y={-560} width={60} height={20} rx={8} fill={C.greenDark} />
        <rect x={-74} y={-520} width={70} height={120} rx={10} fill={C.yellow} />
        <rect x={-74} y={-520} width={70} height={18} rx={8} fill={C.yellowDark} />
        <rect x={6} y={-550} width={52} height={150} rx={18} fill={C.blue} />
        <rect x={6} y={-550} width={52} height={22} rx={10} fill={C.blueDark} />
        <circle cx={100} cy={-456} r={30} fill={C.purple} />
        {/* wire grid across the basket */}
        {[-600, -530, -460, -390, -320, -250].map((wy) => (
          <rect key={wy} x={-200} y={wy} width={400} height={7} rx={3} fill={C.grey} transform={`translate(0 0)`} opacity={0.6} />
        ))}
        {/* rim */}
        <rect x={-218} y={-652} width={436} height={24} rx={12} fill={C.greyDark} />
      </g>
    </g>
  );
}
