import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic gamepad: rounded body with a d-pad, four plain coloured face dots, two sticks and bumpers.
// No real controller layout or symbols. Origin = bottom centre. anim "rumble": small shake with motion lines.
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
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const rumble = anim === "rumble";
  const sx = rumble ? 4 * Math.sin((f * 2 * Math.PI) / 6) : 0;
  const lineOp = (i: number) => (rumble ? (Math.sin((f * 2 * Math.PI) / 6 + i) > 0 ? 0.8 : 0.1) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={`translate(${f1(sx)} 0) ${motion(rumble ? "none" : anim, f)}`}>
        {/* grips hanging below the body */}
        <path d="M -170 -200 Q -230 -120 -190 -20 Q -160 10 -120 -40 L -90 -200 Z" fill={shade(body, 0.2)} />
        <path d="M 170 -200 Q 230 -120 190 -20 Q 160 10 120 -40 L 90 -200 Z" fill={shade(body, 0.2)} />
        {/* main body */}
        <path d="M -200 -300 Q 0 -350 200 -300 Q 250 -290 240 -200 Q 220 -110 150 -120 Q 80 -150 0 -160 Q -80 -150 -150 -120 Q -220 -110 -240 -200 Q -250 -290 -200 -300 Z" fill={body} />
        {/* bumpers */}
        <rect x={-180} y={-340} width={130} height={30} rx={14} fill={shade(body, 0.3)} />
        <rect x={50} y={-340} width={130} height={30} rx={14} fill={shade(body, 0.3)} />
        {/* d-pad (plain cross shape) */}
        <rect x={-195} y={-250} width={110} height={34} rx={10} fill={C.ink} />
        <rect x={-155} y={-290} width={34} height={110} rx={10} fill={C.ink} />
        {/* face dots, plain colours */}
        <circle cx={150} cy={-270} r={17} fill={C.white} opacity={0.85} />
        <circle cx={185} cy={-240} r={17} fill={C.white} opacity={0.85} />
        <circle cx={115} cy={-240} r={17} fill={C.white} opacity={0.85} />
        <circle cx={150} cy={-210} r={17} fill={C.white} opacity={0.85} />
        {/* sticks */}
        <circle cx={-70} cy={-200} r={44} fill={shade(body, 0.3)} />
        <circle cx={-70} cy={-200} r={30} fill={C.inkSoft} />
        <circle cx={60} cy={-160} r={40} fill={shade(body, 0.3)} />
        <circle cx={60} cy={-160} r={26} fill={C.inkSoft} />
        <path d="M -200 -300 Q 0 -330 200 -300" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.2} />
        {rumble && [0, 1].map((i) => (
          <g key={i} stroke={C.ink} strokeWidth={9} strokeLinecap="round" opacity={lineOp(i)}>
            <line x1={-270 - i * 16} y1={-260 + i * 30} x2={-296 - i * 16} y2={-260 + i * 30} />
            <line x1={270 + i * 16} y1={-260 + i * 30} x2={296 + i * 16} y2={-260 + i * 30} />
          </g>
        ))}
      </g>
    </g>
  );
}
