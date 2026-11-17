import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic wooden sailing ship, side view facing right. Origin = waterline centre. Room scale: about 760 px wide.
// Two masts with square sails, a stern cabin with lit windows and a plain dark flag with a skull circle.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 100) * 1.4)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 60} y={8} width={100} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 180} y={18} width={100} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const sail = p.color2 && p.color2 !== "none" ? p.color2 : C.paper;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* masts */}
        <rect x={-80} y={-640} width={16} height={490} fill={C.brownDark} />
        <rect x={150} y={-580} width={14} height={430} fill={C.brownDark} />
        {/* square sails on yards */}
        <rect x={-220} y={-560} width={300} height={12} rx={4} fill={shade(wood, 0.3)} />
        <path d="M -220 -548 L 80 -548 L 80 -320 Q -70 -290 -220 -320 Z" fill={sail} />
        <rect x={60} y={-500} width={190} height={10} rx={4} fill={shade(wood, 0.3)} />
        <path d="M 60 -490 L 250 -490 L 250 -330 Q 155 -310 60 -330 Z" fill={sail} />
        {/* skull flag: a plain dark flag with a white skull circle */}
        <path d="M -64 -640 L 8 -624 L -64 -606 Z" fill={C.ink} />
        <circle cx={-44} cy={-624} r={7} fill={C.white} />
        <circle cx={-47} cy={-625} r={1.8} fill={C.ink} />
        <circle cx={-41} cy={-625} r={1.8} fill={C.ink} />
        {/* jib and bowsprit */}
        <line x1={330} y1={-150} x2={420} y2={-212} stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
        <path d="M 160 -570 L 410 -214 L 160 -214 Z" fill={shade(sail, 0.1)} />
        {/* hull with gunwale stripe and railing */}
        <path d="M -340 -160 L 340 -160 Q 330 -40 230 10 L -250 10 Q -330 -60 -340 -160 Z" fill={wood} />
        <rect x={-336} y={-120} width={660} height={14} fill={shade(wood, 0.25)} />
        <rect x={-330} y={-170} width={660} height={14} fill={shade(wood, 0.3)} />
        {Array.from({ length: 17 }, (_, k) => (
          <rect key={k} x={-320 + k * 40} y={-210} width={8} height={42} fill={shade(wood, 0.2)} />
        ))}
        <rect x={-320} y={-212} width={630} height={8} fill={shade(wood, 0.2)} />
        {/* stern cabin with lit windows */}
        <rect x={-330} y={-274} width={150} height={16} rx={6} fill={shade(wood, 0.2)} />
        <rect x={-320} y={-262} width={130} height={92} rx={10} fill={wood} />
        <rect x={-296} y={-244} width={36} height={28} rx={4} fill={C.yellow} />
        <rect x={-248} y={-244} width={36} height={28} rx={4} fill={C.yellow} />
      </g>
      <Water w={760} />
    </g>
  );
}
