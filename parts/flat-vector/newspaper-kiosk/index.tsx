import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Street newspaper kiosk, front view: boxy kiosk with a scalloped awning, a serving window with lamps, a counter with
// stacked papers, a service door and a magazine rack with blank covers. Origin = bottom centre; it stands on y.
// About 760 px wide and 610 px tall at s = 1.
// anim "lights": the lamps inside the window switch on one after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const mags = [C.red, C.blue, C.yellow, C.pink, C.purple, C.green];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={360} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <g transform="translate(-80 0)">
          {/* magazine rack with blank covers */}
          <rect x={290} y={-330} width={170} height={294} rx={8} fill={C.greyDark} />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => (
              <g key={`${r}-${c}`}>
                <rect x={302 + c * 52} y={-318 + r * 68} width={42} height={56} rx={4} fill={mags[(r * 3 + c) % mags.length]} />
                <rect x={302 + c * 52} y={-318 + r * 68} width={42} height={8} rx={3} fill={C.white} opacity={0.5} />
              </g>
            )),
          )}
          <rect x={280} y={-40} width={190} height={10} rx={4} fill={C.greyDark} />
          {/* kiosk body */}
          <rect x={-300} y={-36} width={600} height={36} rx={8} fill={C.greyDark} />
          <rect x={-260} y={-470} width={520} height={434} rx={12} fill={body} />
          <rect x={-130} y={-470} width={8} height={434} fill={shade(body, 0.2)} />
          <rect x={122} y={-470} width={8} height={434} fill={shade(body, 0.2)} />
          {/* serving window with lamps */}
          <rect x={-220} y={-430} width={440} height={210} rx={14} fill={shade(body, 0.25)} />
          <rect x={-206} y={-416} width={412} height={182} rx={10} fill={C.sky} />
          {[-120, 0, 120].map((lx, i) => {
            const on = anim !== "lights" || Math.floor(f / 12) % 3 === i;
            return <circle key={lx} cx={lx} cy={-392} r={12} fill={on ? C.yellow : C.greyLight} />;
          })}
          <rect x={-180} y={-380} width={34} height={150} rx={10} fill={C.white} opacity={0.5} />
          <rect x={-130} y={-380} width={14} height={150} fill={C.white} opacity={0.35} />
          {/* counter ledge with stacked papers */}
          <rect x={-240} y={-226} width={480} height={22} rx={6} fill={trim} />
          <rect x={-220} y={-252} width={120} height={26} rx={4} fill={C.white} />
          <rect x={-220} y={-244} width={120} height={6} fill={C.greyLight} />
          <rect x={-80} y={-252} width={110} height={26} rx={4} fill={C.sand} />
          <rect x={-80} y={-244} width={110} height={6} fill={C.brown} opacity={0.5} />
          {/* service door */}
          <rect x={-60} y={-170} width={120} height={120} rx={8} fill={shade(body, 0.15)} />
          <rect x={36} y={-120} width={8} height={40} rx={4} fill={C.greyLight} />
          {/* awning with scalloped valance */}
          <rect x={-300} y={-512} width={600} height={40} rx={8} fill={trim} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <circle key={i} cx={-270 + i * 60} cy={-476} r={24} fill={trim} />
          ))}
          <rect x={-290} y={-540} width={580} height={30} rx={10} fill={shade(body, 0.15)} />
          {/* blank sign on the roof */}
          <rect x={-120} y={-610} width={240} height={62} rx={12} fill={C.white} />
          <rect x={-100} y={-596} width={200} height={14} rx={7} fill={body} />
          <rect x={-100} y={-574} width={200} height={8} rx={4} fill={C.greyLight} />
        </g>
      </g>
    </g>
  );
}
