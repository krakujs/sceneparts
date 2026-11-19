import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Circuit board: a green PCB stood upright on two posts, with copper traces, chips and capacitors.
// anim "pulse" sends bright pulses of light along the traces. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const TRACES = [
  "M -200 -320 H -90 V -250 H -10",
  "M -200 -260 H -140 V -160 H 40 V -120",
  "M -60 -360 V -300 H 60 V -230 H 150",
  "M 100 -360 V -280 H 200",
  "M -40 -200 H 20 V -320 H 120 V -360",
  "M 110 -190 H 200 V -110 H 120",
  "M -200 -140 H -150 V -100 H -90",
  "M 60 -150 H 90 V -80 H 150",
];
const CHIPS = [
  { x: -150, y: -330, w: 90, h: 44, pins: 5 },
  { x: 30, y: -300, w: 110, h: 56, pins: 6 },
  { x: -150, y: -190, w: 70, h: 40, pins: 4 },
  { x: 60, y: -160, w: 60, h: 60, pins: 4 },
];
const CAPS: [number, number][] = [[-200, -230], [190, -330], [-90, -120], [170, -230], [-20, -240]];
const PADS: [number, number][] = [[-200, -320], [-200, -260], [-60, -360], [100, -360], [-40, -200], [110, -190], [-200, -140], [60, -150], [150, -230], [200, -280], [150, -80], [-90, -100]];
const PULSE = 326; // dash period: 26 lit + 300 dark

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const board = p.color && p.color !== "none" ? p.color : C.greenDark;
  const copper = p.trace && p.trace !== "none" ? p.trace : C.yellow;
  const anim: string = p.anim ?? "none";
  const pulsing = anim === "pulse";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-206} y={-64} width={20} height={64} rx={6} fill={C.greyDark} />
        <rect x={186} y={-64} width={20} height={64} rx={6} fill={C.greyDark} />
        <rect x={-260} y={-372} width={520} height={322} rx={14} fill={shade(board, 0.3)} />
        <rect x={-260} y={-380} width={520} height={322} rx={14} fill={board} />
        {TRACES.map((d, i) => (
          <path key={`t${i}`} d={d} fill="none" stroke={copper} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {pulsing &&
          TRACES.map((d, i) => (
            <path key={`p${i}`} d={d} fill="none" stroke={C.lime} strokeWidth={6} strokeLinecap="round"
              strokeDasharray="26 300" strokeDashoffset={f1(-((f * 3 + i * 47) % PULSE))} />
          ))}
        {PADS.map(([px, py], i) => (
          <g key={`d${i}`}>
            <circle cx={px} cy={py} r={7} fill={C.greyLight} />
            <circle cx={px} cy={py} r={3} fill={C.greyDark} />
          </g>
        ))}
        {CHIPS.map((c, i) => (
          <g key={`c${i}`}>
            {Array.from({ length: c.pins }, (_, k) => {
              const px = c.x + ((k + 0.5) * c.w) / c.pins - 3;
              return (
                <g key={k}>
                  <rect x={px} y={c.y - 8} width={6} height={8} fill={C.greyLight} />
                  <rect x={px} y={c.y + c.h} width={6} height={8} fill={C.greyLight} />
                </g>
              );
            })}
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={4} fill={C.ink} />
            <circle cx={c.x + 10} cy={c.y + 10} r={4} fill={C.inkSoft} />
            <rect x={c.x + 14} y={c.y + c.h / 2 - 2} width={c.w - 28} height={4} rx={2} fill={C.greyDark} opacity={0.6} />
          </g>
        ))}
        {CAPS.map(([cx, cy], i) => (
          <g key={`k${i}`}>
            <circle cx={cx} cy={cy} r={13} fill={C.sand} />
            <circle cx={cx} cy={cy} r={6} fill={C.brown} />
            <circle cx={cx - 4} cy={cy - 4} r={2.5} fill={C.white} opacity={0.7} />
          </g>
        ))}
        {[[-240, -360], [240, -360], [-240, -80], [240, -80]].map(([hx, hy]) => (
          <circle key={`h${hx}${hy}`} cx={hx} cy={hy} r={9} fill={C.greyDark} />
        ))}
        <path d="M -250 -300 L -150 -372 L -110 -372 L -250 -262 Z" fill={C.white} opacity={0.12} />
      </g>
    </g>
  );
}
