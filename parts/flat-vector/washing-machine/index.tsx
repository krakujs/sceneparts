import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Front-loading washing machine: control panel with a display and a dial, round door showing clothes in the drum.
// anim "spin" turns the drum. Origin = bottom centre, real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const DOOR_Y = -250;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.12);
  const spin = (p.anim ?? "none") === "spin" ? (f * 6) % 360 : 0;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim === "spin" ? "none" : (p.anim ?? "none"), f)}>
        {/* cabinet */}
        <rect x={-180} y={-480} width={360} height={470} rx={22} fill={c} />
        <rect x={150} y={-480} width={30} height={470} rx={18} fill={dk} />
        <rect x={-170} y={-12} width={340} height={12} rx={6} fill={C.greyDark} />

        {/* control panel: display, buttons and a big dial */}
        <rect x={-180} y={-480} width={360} height={80} rx={22} fill={dk} />
        <rect x={-150} y={-452} width={96} height={34} rx={7} fill={C.ink} />
        <rect x={-140} y={-444} width={50} height={18} rx={4} fill={C.skyDeep} opacity={0.7} />
        <circle cx={-30} cy={-436} r={8} fill={C.greyLight} />
        <circle cx={-6} cy={-436} r={8} fill={C.greyLight} />
        <circle cx={110} cy={-440} r={26} fill={C.greyDark} />
        <rect x={109} y={-458} width={4} height={16} rx={2} fill={C.white} />

        {/* door: rim, glass with the drum and clothes */}
        <circle cx={0} cy={DOOR_Y} r={142} fill={C.greyLight} />
        <circle cx={0} cy={DOOR_Y} r={116} fill={C.skyDeep} />
        <g transform={`rotate(${f1(spin)} 0 ${DOOR_Y})`}>
          <rect x={-62} y={DOOR_Y - 84} width={60} height={50} rx={12} fill={C.red} />
          <rect x={-18} y={DOOR_Y - 40} width={56} height={56} rx={12} fill={C.blue} />
          <circle cx={-44} cy={DOOR_Y + 36} r={24} fill={C.yellow} />
          <rect x={30} y={DOOR_Y - 92} width={38} height={40} rx={10} fill={C.white} />
          <rect x={-86} y={DOOR_Y - 6} width={34} height={30} rx={8} fill={C.purple} />
        </g>
        <ellipse cx={-56} cy={DOOR_Y - 70} rx={22} ry={10} fill={C.white} opacity={0.5} transform={`rotate(-30 -56 ${DOOR_Y - 70})`} />
      </g>
    </g>
  );
}
