import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cherry blossom: a dark twisting trunk under a rounded crown of pink blossom. anim sway moves the crown and drifts a few petals.
// Origin = centre of the trunk base on the ground. About 880 px wide and 1000 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

const CLUMPS = Array.from({ length: 44 }, (_, i) => {
  const a = i * 2.39996, r = Math.sqrt((i + 0.5) / 44);
  return { x: Math.cos(a) * r * 380, y: -660 + Math.sin(a) * r * 250, rad: 42 + 30 * hash(i) };
});
const PETALS = Array.from({ length: 9 }, (_, i) => ({ x0: -340 + 680 * hash(i + 70), y0: hash(i + 90) * 700, sp: 0.8 + hash(i + 11) * 0.8 }));
const BLOSSOM = "#FFC6DB";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const pink = p.color && p.color !== "none" ? p.color : C.pink;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  const limb = (d: string, w: number) => <path d={d} stroke={bark} strokeWidth={w} strokeLinecap="round" fill="none" />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {limb("M 0 0 C -40 -120 40 -220 -20 -340 S 40 -520 -50 -620", 80)}
        {limb("M -40 -360 C -120 -420 -150 -520 -220 -600", 36)}
        {limb("M -20 -460 C 60 -520 110 -600 160 -680", 30)}
        {limb("M -50 -620 C -90 -680 -120 -740 -140 -800", 22)}
        {limb("M -50 -620 C -10 -700 30 -760 40 -820", 22)}
        {limb("M 40 -560 C 80 -620 120 -640 210 -660", 18)}
        <g transform={`rotate(${f1(sway)} 0 -600)`}>
          {CLUMPS.map((c, i) => <circle key={`s${i}`} cx={c.x + 10} cy={c.y + 16} r={c.rad} fill={shade(pink, 0.2)} />)}
          {CLUMPS.map((c, i) => <circle key={`m${i}`} cx={c.x} cy={c.y} r={c.rad} fill={pink} />)}
          {CLUMPS.map((c, i) => <circle key={`h${i}`} cx={c.x - c.rad * 0.3} cy={c.y - c.rad * 0.3} r={c.rad * 0.4} fill={BLOSSOM} />)}
        </g>
        {anim === "sway" && PETALS.map((pt, i) => {
          const fall = (pt.y0 + f * pt.sp) % 900;
          const px = pt.x0 + 30 * Math.sin((f * 2 * Math.PI) / 120 + i);
          return <ellipse key={i} cx={f1(px)} cy={f1(-950 + fall)} rx={10} ry={6} fill={BLOSSOM} transform={`rotate(${f1(f * 3 + i * 40)} ${f1(px)} ${f1(-950 + fall)})`} />;
        })}
      </g>
    </g>
  );
}
