import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Farm tractor facing right: big rear wheels, small front wheels, bonnet, cab with window and exhaust stack.
// Room scale, about 690 px tall and 830 px wide at s = 1. Origin = floor centre under the chassis.
// anim "roll": the wheels turn and the tractor rocks slightly as it rolls along.
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
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? f * 2.5 : 0;
  const rock = anim === "roll" ? Math.sin((f * 2 * Math.PI) / 30) * 0.6 : 0;
  // a wheel: tyre, rim, six chunky spokes that turn with spin
  const wheel = (cx: number, cy: number, r: number) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.ink} />
      <circle cx={cx} cy={cy} r={r * 0.56} fill={rim} />
      <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={cx - r * 0.09} y={cy - r * 0.5} width={r * 0.18} height={r * 1.0} rx={6}
            fill={shade(rim, 0.15)} transform={`rotate(${k * 60} ${cx} ${cy})`} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r * 0.17} fill={C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={430} ry={16} fill={C.shadow} />
      <g transform={`${motion(anim, f)} rotate(${f1(rock)})`}>
        {/* drawbar, chassis and bonnet */}
        <rect x={-420} y={-250} width={100} height={30} rx={10} fill={rim} />
        <rect x={-330} y={-260} width={690} height={60} rx={14} fill={rim} />
        <rect x={60} y={-400} width={340} height={200} rx={40} fill={body} />
        <rect x={380} y={-360} width={34} height={130} rx={10} fill={shade(body, 0.2)} />
        <rect x={290} y={-640} width={34} height={250} rx={10} fill={rim} />
        <rect x={282} y={-660} width={50} height={26} rx={8} fill={C.ink} />
        {/* cab */}
        <rect x={-240} y={-660} width={270} height={400} rx={30} fill={body} />
        <rect x={-260} y={-700} width={310} height={50} rx={16} fill={shade(body, 0.2)} />
        <rect x={-210} y={-610} width={190} height={180} rx={16} fill={C.sky} />
        <rect x={-120} y={-610} width={10} height={180} fill={shade(body, 0.2)} />
        {/* wheels: rear big, front small */}
        {wheel(-200, -230, 230)}
        {wheel(250, -120, 120)}
      </g>
    </g>
  );
}
