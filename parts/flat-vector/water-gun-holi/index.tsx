import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pump-action plastic water gun (pichkari style), facing right. Origin = bottom of the grip.
// Tank on top at the back, barrel along the front, pump slide under the barrel, coloured stream out of the nozzle.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 300, y = p.y ?? 1100;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const tank = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const streamCols = [C.pink, C.yellow, C.green, C.lime];
  // Stream: thick wavy jets from the nozzle tip (470, -190); spray shifts the dash pattern so the colour pours out
  
  const dash = anim === "spray" ? -f * 7 : 0;
  const jet = "M 470 -190 Q 530 -225 580 -160 T 690 -120";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      {/* stream and droplets, behind the gun */}
      <path d={jet} fill="none" stroke={C.pink} strokeWidth={30} strokeLinecap="round" strokeDasharray="60 26" strokeDashoffset={f1(dash)} />
      <path d={jet} fill="none" stroke={C.yellow} strokeWidth={18} strokeLinecap="round" strokeDasharray="44 40" strokeDashoffset={f1(dash * 0.7 + 30)} transform="translate(0 40)" />
      <path d={jet} fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeDasharray="30 50" strokeDashoffset={f1(dash * 1.3 + 10)} transform="translate(0 -30)" />
      {/* grip, under the tank at the back */}
      <path d="M -90 -150 L -20 -150 L 10 -10 Q 10 0 0 0 L -70 0 Q -80 0 -82 -10 Z" fill={shade(body, 0.15)} />
      {/* tank: translucent-looking with a water band */}
      <rect x={-210} y={-320} width={230} height={170} rx={34} fill={C.white} opacity={0.35} />
      <rect x={-210} y={-200} width={230} height={50} rx={22} fill={tank} />
      <rect x={-210} y={-320} width={230} height={170} rx={34} fill="none" stroke={shade(tank, 0.2)} strokeWidth={0} />
      {/* barrel */}
      <rect x={-20} y={-220} width={460} height={70} rx={24} fill={body} />
      <rect x={-20} y={-160} width={460} height={18} rx={9} fill={shade(body, 0.2)} />
      {/* pump slide under the barrel, with its handle */}
      <rect x={190} y={-150} width={60} height={120} rx={18} fill={shade(body, 0.1)} />
      <rect x={150} y={-40} width={140} height={36} rx={18} fill={shade(body, 0.25)} />
      {/* nozzle tip */}
      <rect x={440} y={-240} width={60} height={94} rx={16} fill={shade(body, 0.2)} />
      {/* trigger */}
      <path d="M 60 -150 Q 80 -110 60 -90" fill="none" stroke={shade(body, 0.3)} strokeWidth={14} strokeLinecap="round" />
      {/* tank cap */}
      <rect x={-150} y={-344} width={110} height={30} rx={12} fill={shade(tank, 0.2)} />
    </g>
  );
}
