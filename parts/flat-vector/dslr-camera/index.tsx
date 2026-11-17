import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// DSLR camera in side profile, facing right: a deep grip on the left, a pentaprism viewfinder hump on top
// and a big lens barrel pointing right. Origin = bottom of the grip, centred on x.
// anim "shutter" presses the shutter button and flashes a short white burst from the lens.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const pressing = anim === "shutter" && f % 60 < 6;
  const burst = anim === "shutter" && f % 60 < 4;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={60} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* grip */}
        <rect x={-210} y={-290} width={90} height={290} rx={44} fill={body} />
        <rect x={-196} y={-250} width={6} height={150} rx={3} fill={shade(body, 0.3)} />
        <rect x={-180} y={-250} width={6} height={150} rx={3} fill={shade(body, 0.3)} />
        {/* body */}
        <rect x={-150} y={-300} width={274} height={150} rx={26} fill={body} />
        {/* pentaprism viewfinder hump */}
        <rect x={-100} y={-372} width={140} height={80} rx={28} fill={shade(body, 0.1)} />
        <rect x={-132} y={-352} width={40} height={26} rx={8} fill={C.greyDark} />
        <circle cx={22} cy={-334} r={16} fill={C.greyDark} />
        <circle cx={22} cy={-334} r={6} fill={C.greyLight} />
        {/* shutter button on the grip */}
        <circle cx={-150} cy={-300 + (pressing ? 3 : 0)} r={14} fill={C.greyDark} />
        {/* lens mount and barrel */}
        <rect x={124} y={-262} width={22} height={124} fill={C.greyDark} />
        <rect x={140} y={-320} width={190} height={190} rx={14} fill={C.ink} />
        <rect x={190} y={-322} width={12} height={194} fill={C.greyDark} />
        <rect x={244} y={-322} width={12} height={194} fill={C.greyDark} />
        <rect x={300} y={-326} width={34} height={202} rx={12} fill={C.greyDark} />
        <ellipse cx={334} cy={-225} rx={16} ry={86} fill={C.navy} />
        <ellipse cx={330} cy={-262} rx={5} ry={22} fill={C.white} opacity={0.55} />
        {burst && <circle cx={340} cy={-225} r={60} fill={C.yellow} opacity={0.55} />}
      </g>
    </g>
  );
}
