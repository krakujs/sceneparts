import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Arcade machine: room-scale upright cabinet with a screen showing generic blocks, a joystick and buttons.
// Original art, no real game. Origin = bottom centre (~1000 px tall at s = 1).
// anim "attract": the screen's blocks move and the marquee lights pulse.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.purpleDark;
  const anim: string = p.anim ?? "none";
  const attract = anim === "attract";
  const bx = attract ? 60 + 60 * Math.sin((f * 2 * Math.PI) / 120) : 80;
  const marquee = attract ? (Math.sin((f * 2 * Math.PI) / 30) > 0 ? C.yellow : C.orange) : C.yellow;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      <g transform={motion(anim === "attract" ? "none" : anim, f)}>
        {/* cabinet */}
        <path d="M -230 -980 L 230 -980 L 250 -40 L -250 -40 Z" fill={body} />
        <path d="M 150 -980 L 230 -980 L 250 -40 L 170 -40 Z" fill={shade(body, 0.15)} />
        <rect x={-270} y={-60} width={540} height={60} rx={18} fill={shade(body, 0.3)} />
        {/* marquee */}
        <rect x={-200} y={-960} width={400} height={110} rx={16} fill={marquee} />
        {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-160 + i * 80} cy={-905} r={12} fill={C.white} opacity={attract ? 0.4 + 0.5 * ((f + i * 8) % 30) / 30 : 0.6} />)}
        {/* screen bezel and screen */}
        <rect x={-180} y={-810} width={360} height={320} rx={24} fill={C.ink} />
        <rect x={-160} y={-790} width={320} height={280} rx={12} fill={C.navy} />
        {/* generic blocks on the screen */}
        <rect x={-130 + bx} y={-640} width={50} height={50} rx={6} fill={C.teal} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-120 + i * 70} y={-730} width={36} height={36} rx={6} fill={i % 2 ? C.pink : C.lime} />)}
        <rect x={-150} y={-560} width={300} height={16} rx={8} fill={C.skyDeep} />
        <rect x={-20 + (attract ? 40 * Math.sin((f * 2 * Math.PI) / 90) : 0)} y={-520} width={40} height={18} rx={6} fill={C.yellow} />
        {/* glare */}
        <path d="M -150 -780 L -90 -780 L -150 -700 Z" fill={C.white} opacity={0.12} />
        {/* control panel */}
        <rect x={-250} y={-500} width={500} height={60} rx={14} fill={shade(body, 0.2)} />
        <rect x={-250} y={-450} width={500} height={160} rx={18} fill={shade(body, 0.1)} />
        {/* joystick */}
        <rect x={-120} y={-440} width={240} height={14} rx={7} fill={shade(body, 0.35)} />
        <rect x={-30} y={-420} width={24} height={60} rx={10} fill={C.greyDark} />
        <circle cx={-18} cy={-436} r={34} fill={C.red} />
        <ellipse cx={-30} cy={-446} rx={10} ry={6} fill={C.white} opacity={0.35} />
        {/* buttons */}
        {[C.blue, C.green, C.yellow, C.orange].map((c, i) => (
          <circle key={i} cx={80 + (i % 2) * 60} cy={-420 + Math.floor(i / 2) * 60} r={22} fill={c} />
        ))}
        {/* coin door */}
        <rect x={-100} y={-300} width={200} height={130} rx={14} fill={shade(body, 0.25)} />
        <rect x={-70} y={-270} width={60} height={60} rx={10} fill={C.greyDark} />
        <circle cx={60} cy={-240} r={14} fill={C.greyLight} />
        <rect x={-190} y={-220} width={16} height={100} rx={6} fill={shade(body, 0.4)} opacity={0.5} />
      </g>
    </g>
  );
}
