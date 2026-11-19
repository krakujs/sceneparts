import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Restaurant front with a striped awning, big windows, a door, an outdoor table with chairs and a fork-and-knife icon sign.
// Origin = bottom centre on the ground. About 900 px wide and 780 px tall at s = 1.
// anim "lights": the window lamps glow on one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.orange;
  const awn = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const lamps = [-330, -220, -110];
  const stripes = [-400, -320, -240, -160, -80, 0, 80, 160, 240, 320];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={460} ry={22} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* walls and roof parapet */}
        <rect x={-440} y={-560} width={880} height={560} rx={16} fill={wall} />
        <rect x={-460} y={-600} width={920} height={50} rx={12} fill={shade(wall, 0.2)} />
        <rect x={-440} y={-30} width={880} height={18} fill={shade(wall, 0.15)} />
        {/* striped awning with scalloped edge */}
        <path d="M -420 -470 L 420 -470 L 440 -400 L -440 -400 Z" fill={awn} />
        {stripes.map((sx, i) => (i % 2 ? <rect key={sx} x={sx} y={-470} width={80} height={70} fill={C.white} /> : null))}
        {[-440, -360, -280, -200, -120, -40, 40, 120, 200, 280, 360, 440].map((cx, i) => (
          <circle key={cx} cx={cx} cy={-400} r={40} fill={i % 2 ? C.white : awn} />
        ))}
        {/* big front windows with lamps */}
        <rect x={-400} y={-330} width={360} height={240} rx={12} fill={C.greyDark} />
        <rect x={-388} y={-318} width={336} height={216} rx={8} fill={C.sky} />
        {lamps.map((lx, i) => {
          const on = anim === "lights" && Math.floor(f / 8) % 3 >= i;
          return <circle key={lx} cx={lx} cy={-150} r={20} fill={on ? C.yellow : C.white} opacity={on ? 1 : 0.7} />;
        })}
        <path d="M -370 -318 L -330 -318 L -370 -102 L -400 -102 Z" fill={C.white} opacity={0.35} />
        {/* door and small window */}
        <rect x={60} y={-330} width={150} height={300} rx={12} fill={C.brownDark} />
        <rect x={76} y={-314} width={118} height={130} rx={8} fill={C.sky} />
        <circle cx={190} cy={-80} r={9} fill={C.yellow} />
        <rect x={250} y={-330} width={160} height={300} rx={12} fill={C.white} />
        <rect x={266} y={-314} width={128} height={270} rx={8} fill={C.sky} />
        <rect x={266} y={-196} width={128} height={6} fill={C.white} opacity={0.8} />
        {/* outdoor table and chairs */}
        <ellipse cx={-300} cy={-60} rx={120} ry={20} fill={C.white} />
        <rect x={-306} y={-60} width={12} height={60} fill={C.greyDark} />
        <rect x={-300} y={-62} width={10} height={60} rx={4} fill={C.brown} />
        <rect x={-430} y={-100} width={60} height={12} rx={6} fill={C.brown} />
        <rect x={-430} y={-100} width={8} height={100} fill={C.brownDark} />
        <rect x={-180} y={-100} width={60} height={12} rx={6} fill={C.brown} />
        <rect x={-130} y={-100} width={8} height={100} fill={C.brownDark} />
        {/* fork-and-knife sign on a bracket by the door */}
        <rect x={-18} y={-520} width={10} height={180} fill={C.greyDark} />
        <circle cx={-12} cy={-520} r={62} fill={C.white} />
        <circle cx={-12} cy={-520} r={58} fill={awn} />
        <rect x={-34} y={-568} width={8} height={96} rx={4} fill={C.white} />
        <rect x={-42} y={-568} width={6} height={36} rx={3} fill={C.white} />
        <rect x={-26} y={-568} width={6} height={36} rx={3} fill={C.white} />
        <rect x={6} y={-568} width={10} height={96} rx={4} fill={C.white} />
        <path d="M 6 -568 Q 22 -540 16 -500 L 6 -500 Z" fill={C.white} />
        {/* base */}
        <rect x={-440} y={-12} width={880} height={12} fill={C.greyDark} />
      </g>
    </g>
  );
}
