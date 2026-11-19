import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mailbox: generic post-mounted letterbox with a rounded top, a letter slot and a side flag. Not any national postal design.
// anim "flag": the flag swings up over the first second and stays raised. Origin = bottom of the post; faces the viewer,
// honours flip, s and anim. Room scale.
const f1 = (v: number) => v.toFixed(1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const dk = shade(c, 0.2);
  const post = C.greyDark;
  // flag: hangs down at rest, raised to the top over the first 30 frames when anim is "flag"
  const raise = p.anim === "flag" ? easeOut(clamp01(f / 30)) : 0;
  const flagY = -90 * raise;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "flag" ? "none" : (p.anim ?? "none"), f)}>
        {/* post and foot */}
        <rect x={-16} y={-470} width={32} height={470} fill={post} />
        <rect x={-16} y={-470} width={8} height={470} fill={shade(post, 0.2)} opacity={0.6} />
        <rect x={-60} y={-22} width={120} height={22} rx={10} fill={shade(post, 0.2)} />
        {/* box with rounded top and a flat base plate */}
        <path d="M -150 -380 L -150 -470 Q -150 -560 -60 -560 L 60 -560 Q 150 -560 150 -470 L 150 -380 Z" fill={c} />
        <path d="M 96 -560 Q 150 -560 150 -470 L 150 -380 L 96 -380 Z" fill={dk} />
        <rect x={-170} y={-400} width={340} height={22} rx={10} fill={dk} />
        {/* letter slot and door line */}
        <rect x={-96} y={-470} width={150} height={18} rx={9} fill={C.ink} />
        <rect x={-110} y={-430} width={180} height={6} rx={3} fill={dk} />
        {/* side flag pivot and flag */}
        <rect x={164} y={-470} width={14} height={90} rx={6} fill={post} />
        <g transform={`translate(0 ${f1(flagY)})`}>
          <rect x={176} y={-470} width={42} height={70} rx={6} fill={C.red} />
          <rect x={176} y={-470} width={42} height={16} rx={6} fill={C.redDark} />
        </g>
      </g>
    </g>
  );
}
