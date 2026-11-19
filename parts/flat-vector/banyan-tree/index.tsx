import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Banyan: a very wide, dense crown with many aerial roots hanging down, some of which reach the ground and thicken into extra trunks.
// Origin = centre of the main trunk base. About 900 px wide and 1080 px tall at s = 1. anim sway moves the canopy.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

const CANOPY = { cx: 0, cy: -760, rx: 430, ry: 170 };
const LUMPS = Array.from({ length: 46 }, (_, i) => {
  const a = i * 2.39996, r = Math.sqrt((i + 0.5) / 46);
  return { x: CANOPY.cx + Math.cos(a) * r * CANOPY.rx, y: CANOPY.cy + Math.sin(a) * r * CANOPY.ry, rad: 70 + 40 * hash(i) };
});
// Aerial roots: start under the canopy; the thick ones reach the ground as extra trunks.
const ROOTS = Array.from({ length: 14 }, (_, i) => {
  const x = -400 + (800 * (i + 0.5)) / 14 + (hash(i + 40) - 0.5) * 20;
  const top = CANOPY.cy + CANOPY.ry * Math.sqrt(Math.max(0, 1 - (x / CANOPY.rx) ** 2)) - 20;
  const thick = i === 2 || i === 5 || i === 9 || i === 12;
  const bottom = thick || i % 3 !== 1 ? 0 : -220 - 180 * hash(i + 60);
  return { x, top, bottom, thick, bend: (hash(i + 80) - 0.5) * 40 };
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1.2 * Math.sin((f * 2 * Math.PI) / 100) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={22} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {ROOTS.map((r, i) => {
          const end = r.bottom;
          const d = `M ${f1(r.x)} ${f1(r.top)} Q ${f1(r.x + r.bend)} ${f1((r.top + end) / 2)} ${f1(r.x + r.bend * 0.3)} ${f1(end)}`;
          return (
            <g key={i}>
              <path d={d} stroke={r.thick ? bark : shade(bark, 0.15)} strokeWidth={r.thick ? 30 : 9} strokeLinecap="round" fill="none" />
              {r.thick && <ellipse cx={f1(r.x + r.bend * 0.3)} cy={0} rx={38} ry={11} fill={shade(bark, 0.2)} />}
            </g>
          );
        })}
        <path d="M -55 0 C -60 -200 -40 -400 -70 -600 L 70 -600 C 40 -400 60 -200 55 0 Z" fill={bark} />
        <path d="M 0 0 L 55 0 C 60 -200 40 -400 70 -600 L 0 -600 Z" fill={shade(bark, 0.2)} />
        <g transform={`rotate(${f1(sway)} 0 -600)`}>
          {LUMPS.map((c, i) => <circle key={`s${i}`} cx={f1(c.x + 12)} cy={f1(c.y + 20)} r={c.rad} fill={shade(leaf, 0.2)} />)}
          {LUMPS.map((c, i) => <circle key={`m${i}`} cx={f1(c.x)} cy={f1(c.y)} r={c.rad} fill={leaf} />)}
        </g>
      </g>
    </g>
  );
}
