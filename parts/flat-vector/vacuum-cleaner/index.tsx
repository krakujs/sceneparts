import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic canister vacuum on the floor: a low rounded body on two wheels, a ribbed flexible hose arcing up out of
// its front, a straight metal wand running diagonally down to a wide flat floor head on the ground to the right,
// and a small cord with a plug at the back. anim "roll" rocks the body gently and turns the wheels.
// Origin = bottom centre on the floor, real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const dk = shade(c, 0.2);
  const roll = p.anim === "roll";
  const rocX = roll ? Math.sin((f * 2 * Math.PI) / 60) * 8 : 0;
  const spin = roll ? (-f * 8) % 360 : 0;
  const wheel = (cx: number) => (
    <g key={cx} transform={`rotate(${f1(spin)} ${cx} -36)`}>
      <circle cx={cx} cy={-36} r={36} fill={C.inkSoft} />
      <circle cx={cx} cy={-36} r={12} fill={C.grey} />
      <rect x={cx - 3} y={-62} width={6} height={52} rx={3} fill={C.grey} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={40} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={`${motion(roll ? "none" : (p.anim ?? "none"), f)} translate(${f1(rocX)} 0)`}>
        <g transform="translate(-40 0)">
          {/* cord from the back of the body, with a plug on the floor */}
          <path d="M -150 -160 C -220 -170 -230 -60 -280 -40" fill="none" stroke={C.inkSoft} strokeWidth={10} strokeLinecap="round" />
          <rect x={-310} y={-50} width={44} height={22} rx={8} fill={C.inkSoft} />
          <rect x={-334} y={-44} width={26} height={7} rx={3} fill={C.greyLight} />
          <rect x={-334} y={-32} width={26} height={7} rx={3} fill={C.greyLight} />

          {/* flexible ribbed hose: arcs up out of the front of the body and down to the wand */}
          <path d="M 146 -150 C 230 -150 210 -300 272 -244" fill="none" stroke={C.inkSoft} strokeWidth={24} strokeLinecap="round" />
          <path d="M 146 -150 C 230 -150 210 -300 272 -244" fill="none" stroke={C.greyDark} strokeWidth={24} strokeLinecap="butt" strokeDasharray="6 12" opacity={0.35} />

          {/* straight metal wand running diagonally down to the floor head */}
          <line x1={272} y1={-240} x2={404} y2={-40} stroke={C.greyLight} strokeWidth={14} strokeLinecap="round" />
          <line x1={272} y1={-240} x2={404} y2={-40} stroke={shade(C.greyLight, 0.2)} strokeWidth={4} strokeLinecap="round" transform="translate(4 0)" />

          {/* wide flat floor head on the ground */}
          <rect x={356} y={-36} width={112} height={36} rx={14} fill={C.navy} />
          <rect x={362} y={-36} width={100} height={8} rx={4} fill={C.blue} />
          <rect x={372} y={-22} width={80} height={6} rx={3} fill={C.inkSoft} />

          {/* low rounded body */}
          <rect x={-150} y={-236} width={300} height={170} rx={70} fill={c} />
          <rect x={-150} y={-86} width={300} height={20} rx={10} fill={dk} />
          {/* dust window with dust inside */}
          <rect x={-96} y={-200} width={150} height={92} rx={26} fill={C.skyDeep} opacity={0.8} />
          <circle cx={-50} cy={-152} r={13} fill={C.brown} opacity={0.6} />
          <circle cx={-14} cy={-140} r={17} fill={C.brown} opacity={0.5} />
          <circle cx={0} cy={-166} r={10} fill={C.brown} opacity={0.6} />
          {/* power button */}
          <circle cx={-118} cy={-210} r={10} fill={C.yellow} />

          {wheel(-100)}
          {wheel(100)}
        </g>
      </g>
    </g>
  );
}
