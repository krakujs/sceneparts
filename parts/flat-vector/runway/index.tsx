import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Runway strip: grey tarmac across the full frame width with white edge lines, a white dashed centre line,
// and yellow edge lights along both sides. anim "blink": the edge lights take turns to blink.
// Origin = centre of the strip (y is its centre line). Room scale: 1080 px wide and 200 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const tarmac = p.color && p.color !== "none" ? p.color : C.greyDark;
  const light = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "blink";
  const lamps = Array.from({ length: 15 }, (_, i) => -504 + i * 72);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-540} y={-100} width={1080} height={200} fill={tarmac} />
        <rect x={-540} y={-96} width={1080} height={8} fill={shade(tarmac, 0.25)} />
        <rect x={-540} y={88} width={1080} height={8} fill={shade(tarmac, 0.25)} />
        {/* white dashed centre line */}
        {Array.from({ length: 6 }, (_, i) => -540 + i * 180).map((dx) => (
          <rect key={dx} x={dx + 45} y={-6} width={90} height={12} rx={4} fill={C.white} />
        ))}
        {/* edge lights along both sides, blinking in turn */}
        {lamps.map((lx, i) => {
          const on = anim !== "blink" || Math.floor((f + i * 9) / 15) % 2 === 0;
          return (
            <g key={lx}>
              <circle cx={lx} cy={-76} r={8} fill={on ? light : shade(light, 0.5)} />
              <circle cx={lx} cy={76} r={8} fill={on ? light : shade(light, 0.5)} />
              {on ? <circle cx={lx} cy={-76} r={16} fill={light} opacity={0.3} /> : null}
              {on ? <circle cx={lx} cy={76} r={16} fill={light} opacity={0.3} /> : null}
            </g>
          );
        })}
      </g>
    </g>
  );
}
