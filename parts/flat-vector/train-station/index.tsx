import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Train station building: a clock tower-front with an arched entrance, a platform canopy over the platform edge.
// Origin = floor centre. About 980 px wide and 700 px tall at s = 1.
// anim "lights": the station lamps under the canopy glow in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const lampXs = [-380, -190, 0, 190, 380];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={22} fill={C.shadow} />
      {/* platform */}
      <rect x={-500} y={-40} width={1000} height={40} rx={6} fill={C.grey} />
      <rect x={-500} y={-48} width={1000} height={10} rx={4} fill={C.yellow} />
      {/* main building */}
      <rect x={-420} y={-520} width={840} height={480} rx={10} fill={wall} />
      <rect x={-420} y={-530} width={840} height={20} rx={6} fill={shade(wall, 0.15)} />
      {/* clock tower in the centre */}
      <rect x={-110} y={-700} width={220} height={190} rx={10} fill={wall} />
      <path d="M -130 -700 L 0 -800 L 130 -700 Z" fill={roof} />
      <circle cx={0} cy={-600} r={70} fill={C.white} />
      <circle cx={0} cy={-600} r={60} fill={C.greyLight} />
      <line x1={0} y1={-600} x2={0} y2={-640} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      <line x1={0} y1={-600} x2={36} y2={-590} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={0} cy={-600} r={7} fill={C.ink} />
      {[0, 3, 6, 9].map((h) => {
        const a = (h / 12) * Math.PI * 2 - Math.PI / 2;
        return <circle key={h} cx={f1(Math.cos(a) * 48)} cy={f1(-600 + Math.sin(a) * 48)} r={5} fill={C.ink} />;
      })}
      {/* arched entrance with doors */}
      <path d="M -110 -40 L -110 -250 Q -110 -330 0 -330 Q 110 -330 110 -250 L 110 -40 Z" fill={C.brownDark} />
      <path d="M -90 -40 L -90 -250 Q -90 -310 0 -310 Q 90 -310 90 -250 L 90 -40 Z" fill={C.skyDeep} />
      <path d="M -70 -90 L -70 -200 Q -70 -250 -2 -250" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.5} />
      <rect x={-2} y={-290} width={4} height={250} fill={C.brownDark} />
      {/* side windows with arched heads */}
      {[-340, -240, 240, 340].map((wx) => (
        <g key={wx}>
          <path d={`M ${wx - 36} -150 L ${wx - 36} -230 Q ${wx - 36} -260 ${wx} -260 Q ${wx + 36} -260 ${wx + 36} -230 L ${wx + 36} -150 Z`} fill={C.skyDeep} />
          <rect x={wx - 26} y={-220} width={12} height={60} fill={C.white} opacity={0.5} />
        </g>
      ))}
      {/* platform canopy with its posts */}
      <rect x={-500} y={-420} width={1000} height={22} rx={8} fill={roof} />
      <rect x={-500} y={-400} width={1000} height={10} rx={4} fill={shade(roof, 0.25)} />
      {[-480, -120, 240, 480].map((px) => (
        <rect key={px} x={px - 10} y={-400} width={20} height={360} fill={C.greyDark} />
      ))}
      {/* hanging lamps under the canopy */}
      {lampXs.map((lx, i) => (
        <g key={lx}>
          <line x1={lx} y1={-398} x2={lx} y2={-360} stroke={C.ink} strokeWidth={3} />
          <circle cx={lx} cy={-352} r={12} fill={C.yellow} opacity={anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 0.95} />
        </g>
      ))}
      {/* bench on the platform */}
      <rect x={300} y={-80} width={150} height={12} rx={4} fill={C.brown} />
      <rect x={310} y={-68} width={10} height={28} fill={C.greyDark} />
      <rect x={430} y={-68} width={10} height={28} fill={C.greyDark} />
    </g>
  );
}
