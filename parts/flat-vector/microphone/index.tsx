import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld stage microphone standing on its base: a wide mesh head on a collar, grip bands and a round foot.
// Origin = bottom of the handle, centred on x. anim "sound" sends sound arcs out from the head.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const HEAD_Y = -470;
const HEAD_R = 140;
const K = [-112, -84, -56, -28, 0, 28, 56, 84, 112];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const handle = p.color && p.color !== "none" ? p.color : C.ink;
  const head = p.head && p.head !== "none" ? p.head : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sound = anim === "sound";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={96} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "sound" ? "" : anim, f)}>
        {/* sound arcs */}
        {sound &&
          [0, 1, 2].map((i) => {
            const r = HEAD_R + 30 + i * 36;
            const op = 0.25 + 0.75 * (Math.sin((f * 2 * Math.PI) / 24 - i * 0.9) > 0 ? 1 : 0.2);
            const a = (42 * Math.PI) / 180;
            const pr = `M ${f1(r * Math.cos(-a))} ${f1(HEAD_Y + r * Math.sin(-a))} A ${r} ${r} 0 0 1 ${f1(r * Math.cos(a))} ${f1(HEAD_Y + r * Math.sin(a))}`;
            const pl = `M ${f1(-r * Math.cos(-a))} ${f1(HEAD_Y + r * Math.sin(-a))} A ${r} ${r} 0 0 0 ${f1(-r * Math.cos(a))} ${f1(HEAD_Y + r * Math.sin(a))}`;
            return (
              <g key={i} fill="none" stroke={C.ink} strokeWidth={12} strokeLinecap="round" opacity={op}>
                <path d={pr} />
                <path d={pl} />
              </g>
            );
          })}
        {/* handle */}
        <rect x={-50} y={-330} width={100} height={324} rx={34} fill={handle} />
        <rect x={-54} y={-250} width={108} height={14} rx={7} fill={shade(handle, 0.3)} />
        <rect x={-54} y={-196} width={108} height={14} rx={7} fill={shade(handle, 0.3)} />
        <rect x={-42} y={-310} width={10} height={260} rx={5} fill={C.white} opacity={0.12} />
        {/* foot */}
        <ellipse cx={0} cy={-4} rx={60} ry={10} fill={C.inkSoft} />
        {/* collar */}
        <rect x={-68} y={-356} width={136} height={30} rx={10} fill={C.greyLight} />
        {/* mesh head */}
        <circle cx={0} cy={HEAD_Y} r={HEAD_R} fill={head} />
        {K.map((k) => {
          const w = Math.sqrt(HEAD_R * HEAD_R - k * k);
          return <line key={`h${k}`} x1={-w} y1={HEAD_Y + k} x2={w} y2={HEAD_Y + k} stroke={C.grey} strokeWidth={3} opacity={0.7} />;
        })}
        {K.map((k) => {
          const h = Math.sqrt(HEAD_R * HEAD_R - k * k);
          return <line key={`v${k}`} x1={k} y1={HEAD_Y - h} x2={k} y2={HEAD_Y + h} stroke={C.grey} strokeWidth={3} opacity={0.7} />;
        })}
        <circle cx={0} cy={HEAD_Y} r={HEAD_R} fill="none" stroke={shade(head, 0.3)} strokeWidth={6} />
        <circle cx={-48} cy={HEAD_Y - 50} r={22} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}
