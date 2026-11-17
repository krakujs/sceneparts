import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Original handheld game device: a wide body with a screen, a d-pad, two round buttons and two grips.
// Generic shapes only. Hero scale, origin = bottom centre. anim "play": the screen shows moving simple blocks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const play = anim === "play";
  const bx = play ? 14 + ((f * 2) % 150) : 40;
  const by = play ? -190 + 18 * Math.sin(f / 9) : -150;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={10} fill={C.shadow} />
      <g transform={motion(anim === "play" ? "none" : anim, f)}>
        {/* body with rounded grips */}
        <rect x={-230} y={-300} width={460} height={290} rx={90} fill={body} />
        <rect x={-230} y={-40} width={460} height={30} rx={14} fill={shade(body, 0.3)} />
        <path d="M -190 -270 Q -60 -292 80 -274" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.25} />
        {/* screen */}
        <rect x={-120} y={-250} width={240} height={160} rx={14} fill={C.ink} />
        <rect x={-106} y={-236} width={212} height={132} rx={8} fill={C.sky} />
        {play ? (
          <g>
            <rect x={-96} y={-220} width={60} height={60} rx={6} fill={C.teal} transform={`translate(${f1(bx - 40)} 0)`} />
            <rect x={-40} y={-120} width={180} height={18} rx={6} fill={C.blue} />
            <rect x={70 - ((f * 1.5) % 90)} y={-180} width={24} height={24} rx={6} fill={C.yellow} />
            <circle cx={-20} cy={-130} r={10} fill={C.red} />
            <rect x={bx - 110} y={by - 20} width={30} height={30} rx={6} fill={C.orange} />
          </g>
        ) : (
          <g>
            <rect x={-80} y={-200} width={44} height={44} rx={6} fill={C.teal} />
            <rect x={-10} y={-160} width={60} height={14} rx={6} fill={C.blue} />
            <circle cx={60} cy={-180} r={16} fill={C.yellow} />
          </g>
        )}
        {/* d-pad (plain cross) */}
        <rect x={-190} y={-150} width={70} height={22} rx={8} fill={C.ink} />
        <rect x={-164} y={-176} width={22} height={70} rx={8} fill={C.ink} />
        {/* two round buttons */}
        <circle cx={150} cy={-160} r={20} fill={C.red} />
        <circle cx={190} cy={-130} r={20} fill={C.green} />
        {/* speaker grilles */}
        {[0, 1, 2].map((i) => <rect key={i} x={-60 + i * 30} y={-80} width={16} height={8} rx={4} fill={shade(body, 0.3)} />)}
      </g>
    </g>
  );
}
