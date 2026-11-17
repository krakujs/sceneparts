import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Robot dog: an original four-legged robot with a boxy body and a sensor head, facing right.
// Origin = bottom centre (the feet rest on y). anim "walk" runs a trot: diagonal legs swing in pairs.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const HIP_Y = -266;

const Leg = ({ hx, a, k, col, foot }: { hx: number; a: number; k: number; col: string; foot: string }) => (
  <g transform={`translate(${f1(hx)} ${HIP_Y}) rotate(${f1(a)})`}>
    <rect x={-30} y={-10} width={60} height={140} rx={26} fill={col} />
    <g transform={`translate(0 130) rotate(${f1(k)})`}>
      <rect x={-24} y={-10} width={48} height={136} rx={22} fill={col} />
      <rect x={-34} y={112} width={68} height={24} rx={10} fill={foot} />
    </g>
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const eye = p.eye && p.eye !== "none" ? p.eye : C.yellow;
  const anim: string = p.anim ?? "none";
  const walking = anim === "walk";
  const th = (f * 2 * Math.PI) / 36;
  const far = shade(body, 0.3);
  const dark = C.greyDark;
  // gait: near front and far back move together; near back and far front move together
  const gait = (ph: number) => (walking ? { a: 16 * Math.sin(th + ph), k: 6 + 14 * Math.max(0, Math.cos(th + ph)) } : { a: 0, k: 0 });
  const nearFront = gait(0), nearBack = gait(Math.PI), farFront = gait(Math.PI), farBack = gait(0);
  const bounce = walking ? -Math.abs(Math.sin(th)) * 5 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={30} cy={0} rx={340} ry={14} fill={C.shadow} />
      <g transform={`${motion(anim, f)} translate(0 ${f1(bounce)})`}>
        {/* far legs sit behind the body */}
        <Leg hx={100} a={farFront.a} k={farFront.k} col={far} foot={dark} />
        <Leg hx={-150} a={farBack.a} k={farBack.k} col={far} foot={dark} />
        {/* tail stub */}
        <rect x={-322} y={-430} width={80} height={26} rx={13} fill={shade(body, 0.1)} />
        {/* neck and head */}
        <rect x={150} y={-500} width={80} height={90} fill={shade(body, 0.15)} />
        <rect x={220} y={-700} width={12} height={70} rx={6} fill={dark} />
        <circle cx={226} cy={-708} r={9} fill={eye} />
        {/* body */}
        <rect x={-250} y={-480} width={460} height={214} rx={36} fill={body} />
        <rect x={-200} y={-440} width={100} height={12} rx={6} fill={shade(body, 0.3)} />
        <rect x={-200} y={-412} width={100} height={12} rx={6} fill={shade(body, 0.3)} />
        <rect x={-60} y={-330} width={210} height={9} rx={4} fill={eye} opacity={0.8} />
        <rect x={200} y={-640} width={180} height={170} rx={40} fill={body} />
        <circle cx={300} cy={-640} r={30} fill={C.greyLight} />
        <circle cx={300} cy={-640} r={12} fill={eye} />
        {/* sensor visor */}
        <rect x={240} y={-600} width={132} height={82} rx={22} fill={C.ink} />
        <circle cx={276} cy={-560} r={12} fill={eye} />
        <circle cx={336} cy={-560} r={12} fill={eye} />
        <rect x={262} y={-530} width={90} height={6} rx={3} fill={eye} opacity={0.5} />
        <rect x={210} y={-620} width={36} height={12} rx={6} fill={C.white} opacity={0.25} />
        {/* near legs in front of the body */}
        <Leg hx={150} a={nearFront.a} k={nearFront.k} col={body} foot={dark} />
        <Leg hx={-190} a={nearBack.a} k={nearBack.k} col={body} foot={dark} />
      </g>
    </g>
  );
}
