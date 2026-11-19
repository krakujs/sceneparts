import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Payphone: room-scale street phone unit on a plinth, with a hook-mounted handset, keypad and coin slot.
// Origin = bottom centre (the plinth rests on y). anim "blink": the top lamp flashes.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const blink = anim === "blink";
  const lamp = blink ? (Math.sin((f * 2 * Math.PI) / 30) > 0 ? C.yellow : C.yellowDark) : C.yellow;
  const keys = [0, 1, 2, 3];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "blink" ? "none" : anim, f)}>
        {/* plinth */}
        <rect x={-190} y={-40} width={380} height={40} rx={12} fill={C.greyDark} />
        {/* handset hanging on the left, with its cord */}
        <path d="M -190 -660 C -250 -640 -250 -560 -210 -520 C -190 -500 -170 -480 -170 -440" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <rect x={-236} y={-740} width={46} height={150} rx={22} fill={C.inkSoft} />
        <circle cx={-213} cy={-740} r={22} fill={C.inkSoft} />
        <circle cx={-213} cy={-594} r={22} fill={C.inkSoft} />
        <rect x={-210} y={-720} width={6} height={110} rx={3} fill={C.white} opacity={0.2} />
        {/* hook bracket */}
        <rect x={-190} y={-690} width={20} height={22} rx={6} fill={C.greyDark} />
        {/* main unit */}
        <rect x={-170} y={-900} width={340} height={860} rx={34} fill={body} />
        <rect x={-170} y={-120} width={340} height={80} rx={30} fill={shade(body, 0.2)} />
        <path d="M -140 -860 L -140 -180" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.2} />
        {/* hood with lamp */}
        <rect x={-190} y={-940} width={380} height={56} rx={22} fill={shade(body, 0.3)} />
        <circle cx={0} cy={-930} r={18} fill={lamp} />
        <circle cx={-6} cy={-936} r={6} fill={C.white} opacity={0.6} />
        {/* card / info panel with simple bars */}
        <rect x={-110} y={-840} width={220} height={70} rx={10} fill={C.sky} />
        <rect x={-88} y={-820} width={120} height={12} rx={6} fill={C.skyDeep} />
        <rect x={-88} y={-798} width={70} height={12} rx={6} fill={C.skyDeep} />
        <circle cx={86} cy={-800} r={14} fill={C.green} />
        {/* keypad */}
        <rect x={-100} y={-740} width={200} height={260} rx={18} fill={C.greyDark} />
        {keys.map((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={-74 + c * 62} y={-716 + r * 58} width={38} height={36} rx={10} fill={C.greyLight} />
        )))}
        {/* coin slot and coin return */}
        <rect x={-60} y={-400} width={120} height={22} rx={8} fill={C.ink} />
        <rect x={-50} y={-390} width={100} height={4} rx={2} fill={C.greyDark} />
        <rect x={-80} y={-330} width={160} height={70} rx={14} fill={shade(body, 0.25)} />
        <rect x={-56} y={-310} width={112} height={26} rx={8} fill={C.ink} />
      </g>
    </g>
  );
}
