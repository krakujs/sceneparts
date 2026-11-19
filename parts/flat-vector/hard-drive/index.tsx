import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// External hard drive: rounded casing with a blank label and an activity LED, cable running out to a plug.
// Origin = bottom centre of the casing (the drive lies on y). anim "blink": the activity LED flickers.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const ledOn = anim !== "blink" || Math.floor(f / 6) % 3 !== 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={250} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M 190 -90 C 280 -90 260 -14 360 -14" fill="none" stroke={C.inkSoft} strokeWidth={14} strokeLinecap="round" />
        <rect x={350} y={-28} width={44} height={28} rx={6} fill={C.greyDark} />
        <rect x={-190} y={-150} width={380} height={150} rx={30} fill={body} />
        <rect x={-170} y={-150} width={340} height={16} rx={8} fill={C.white} opacity={0.25} />
        <rect x={-130} y={-110} width={200} height={40} rx={8} fill={C.white} opacity={0.6} />
        <rect x={-190} y={-40} width={380} height={6} fill={shade(body, 0.3)} opacity={0.6} />
        <circle cx={150} cy={-70} r={8} fill={ledOn ? C.green : shade(C.green, 0.6)} />
      </g>
    </g>
  );
}
