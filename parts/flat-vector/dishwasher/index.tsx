import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Under-counter dishwasher: control strip with buttons and a display, a door with a handle. variant "open"
// drops the door forward and shows the racks with plates. anim "run" blinks the indicator lights.
// Origin = bottom centre, real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.greyLight;
  const dk = shade(c, 0.1);
  const open = p.variant === "open";
  const run = p.anim === "run";
  const led = (i: number) => (run ? 0.25 + 0.75 * ((Math.floor(f / 8) + i) % 3 === 0 ? 1 : 0) : 1);

  const interior = (
    <g>
      <rect x={-160} y={-384} width={320} height={346} rx={10} fill={C.greyDark} />
      {/* top rack with plates and a lower rack */}
      <rect x={-146} y={-300} width={292} height={12} rx={6} fill={C.greyLight} />
      <ellipse cx={-80} cy={-320} rx={56} ry={12} fill={C.white} />
      <ellipse cx={20} cy={-322} rx={56} ry={12} fill={C.white} />
      <rect x={-146} y={-180} width={292} height={12} rx={6} fill={C.greyLight} />
      <rect x={-120} y={-206} width={16} height={26} rx={6} fill={C.blue} />
      <rect x={-96} y={-206} width={16} height={26} rx={6} fill={C.red} />
      <rect x={-72} y={-206} width={16} height={26} rx={6} fill={C.green} />
      <rect x={-146} y={-70} width={292} height={12} rx={6} fill={C.greyLight} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim === "run" ? "none" : (p.anim ?? "none"), f)}>
        {/* cabinet */}
        <rect x={-180} y={-470} width={360} height={470} rx={18} fill={c} />
        <rect x={150} y={-470} width={30} height={470} rx={14} fill={dk} />
        <rect x={-180} y={-20} width={360} height={20} rx={8} fill={C.greyDark} />

        {/* control strip */}
        <rect x={-180} y={-470} width={360} height={70} rx={18} fill={dk} />
        <circle cx={-120} cy={-435} r={10} fill={C.greyLight} />
        <circle cx={-88} cy={-435} r={10} fill={C.greyLight} />
        <rect x={-50} y={-452} width={70} height={34} rx={7} fill={C.ink} />
        <rect x={-40} y={-444} width={50} height={18} rx={4} fill={C.skyDeep} opacity={0.6} />
        <circle cx={62} cy={-437} r={7} fill={C.green} opacity={led(0)} />
        <circle cx={90} cy={-437} r={7} fill={C.yellow} opacity={led(1)} />
        <circle cx={118} cy={-437} r={7} fill={C.blue} opacity={led(2)} />

        {open ? (
          <g>
            {interior}
            {/* door dropped forward: wider and lower, towards the viewer */}
            <polygon points="-170,-40 170,-40 190,40 -190,40" fill={c} />
            <rect x={-120} y={16} width={240} height={14} rx={7} fill={C.greyDark} />
            <rect x={-170} y={-40} width={340} height={6} fill={dk} />
          </g>
        ) : (
          <g>
            <rect x={-170} y={-390} width={340} height={350} rx={10} fill={dk} opacity={0.35} />
            <rect x={-170} y={-388} width={340} height={346} rx={10} fill={c} />
            <rect x={-130} y={-352} width={260} height={18} rx={9} fill={C.greyDark} />
          </g>
        )}
      </g>
    </g>
  );
}
