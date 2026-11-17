import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Windowless data centre: a long ribbed block with a steel door, four cooling units with fans on the roof and a row
// of status lights. Origin = ground centre. About 880 px wide and 560 px tall at s = 1.
// anim "lights": status lights blink in turn and the roof fans turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const units = [-270, -90, 90, 270];
  const leds = Array.from({ length: 19 }, (_, i) => -380 + i * 40);
  const ledColours = [C.green, C.teal, C.yellow];
  const ledOn = (i: number, row: number) => anim !== "lights" || (Math.floor(f / 4) + i * 3 + row) % 5 === 0;
  const ledFill = (i: number, row: number) => {
    if (anim === "lights") return ledOn(i, row) ? ledColours[(i + row) % 3] : C.greyDark;
    return ledColours[(i + row) % 3];
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={460} ry={18} fill={C.shadow} />
        {/* windowless block with vertical ribs and two horizontal bands */}
        <rect x={-420} y={-460} width={840} height={460} rx={6} fill={wall} />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={`rib${i}`} x={-400 + i * 60} y={-440} width={8} height={420} fill={shade(wall, 0.12)} />
        ))}
        <rect x={-420} y={-300} width={840} height={8} fill={shade(wall, 0.25)} />
        <rect x={-420} y={-140} width={840} height={8} fill={shade(wall, 0.25)} />
        <rect x={-430} y={-472} width={860} height={14} rx={5} fill={accent} />
        {/* roof cooling units with fans */}
        {units.map((ux) => (
          <g key={`u${ux}`}>
            <rect x={ux - 65} y={-560} width={130} height={90} rx={6} fill={C.grey} />
            {[-544, -532, -520, -508, -496].map((gy) => (
              <rect key={`g${ux}${gy}`} x={ux - 52} y={gy} width={104} height={4} fill={shade(C.grey, 0.25)} />
            ))}
            <circle cx={ux} cy={-520} r={30} fill={accent} />
            <g transform={`translate(${ux} -520) rotate(${anim === "lights" ? f1((f * 14) % 360) : 0})`}>
              <rect x={-24} y={-4} width={48} height={8} rx={4} fill={C.sky} />
              <rect x={-4} y={-24} width={8} height={48} rx={4} fill={C.sky} />
            </g>
          </g>
        ))}
        {/* status light rows */}
        {leds.map((lx, i) => (
          <circle key={`l1${i}`} cx={lx} cy={-360} r={7} fill={ledFill(i, 0)} />
        ))}
        {leds.map((lx, i) => (
          <circle key={`l2${i}`} cx={lx} cy={-230} r={7} fill={ledFill(i, 1)} />
        ))}
        {/* steel door with keypad */}
        <rect x={-60} y={-150} width={120} height={150} fill={shade(wall, 0.4)} />
        <rect x={-50} y={-140} width={100} height={140} fill={C.greyDark} />
        <rect x={34} y={-92} width={16} height={22} rx={3} fill={accent} />
        <circle cx={42} cy={-82} r={3} fill={on(anim, f)} />
        <rect x={-420} y={-30} width={840} height={30} rx={6} fill={shade(wall, 0.3)} />
      </g>
    </g>
  );
}

const on = (anim: string, f: number) => (anim === "lights" && Math.floor(f / 6) % 2 === 0 ? C.green : C.greyDark);
