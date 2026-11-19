import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Concrete mixer truck facing right: cab, chassis and a striped drum that turns. Room scale.
// About 680 px tall and 760 px wide at s = 1. Origin = floor centre under the chassis.
// anim "spin": the drum stripes rotate round the drum axis.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const K = 1.2; // overall size of the drawing
const DRUM = { cx: -100, cy: -335 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? f * 2 : 0;
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={-70} r={70} fill={C.ink} />
      <circle cx={cx} cy={-70} r={30} fill={C.greyLight} />
      <circle cx={cx} cy={-70} r={12} fill={frame} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`scale(${K})`}>
          {/* chassis */}
          <rect x={-330} y={-200} width={630} height={40} rx={10} fill={frame} />
          {/* drum: a clipped group of diagonal stripes that turn together */}
          <clipPath id="cement-mixer-drum">
            <rect x={-300} y={-480} width={400} height={290} rx={130} />
          </clipPath>
          <rect x={-300} y={-480} width={400} height={290} rx={130} fill={body} />
          <g clipPath="url(#cement-mixer-drum)">
            <g transform={`rotate(${f1(spin)} ${DRUM.cx} ${DRUM.cy})`}>
              {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={i}
                  x1={DRUM.cx + i * 70 - 90} y1={-540}
                  x2={DRUM.cx + i * 70 + 90} y2={-130}
                  stroke={shade(body, 0.22)} strokeWidth={28}
                />
              ))}
            </g>
          </g>
          <ellipse cx={100} cy={-335} rx={22} ry={145} fill={shade(body, 0.25)} />
          <rect x={-240} y={-214} width={300} height={28} rx={8} fill={frame} />
          {/* cab */}
          <rect x={110} y={-400} width={190} height={240} rx={34} fill={body} />
          <rect x={190} y={-370} width={90} height={120} rx={14} fill={C.sky} />
          <rect x={120} y={-190} width={170} height={24} rx={8} fill={shade(body, 0.2)} />
          {wheel(-230)}
          {wheel(-10)}
          {wheel(230)}
        </g>
      </g>
    </g>
  );
}
