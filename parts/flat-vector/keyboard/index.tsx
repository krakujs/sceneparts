import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Keyboard seen from a slight top angle: a flat top face with key rows and a visible front edge.
// Origin = bottom centre (the keyboard lies on y). anim "type": keys light up one after another.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const ROWS = [
  { n: 12, y: -134, off: 0 },
  { n: 12, y: -110, off: 0 },
  { n: 11, y: -86, off: 20 },
  { n: 11, y: -62, off: -20 },
];
const KEYS = [
  ...ROWS.flatMap((r, ri) => Array.from({ length: r.n }, (_, c) => ({ x: (c - (r.n - 1) / 2) * 40 + r.off - 17, y: r.y - 8, w: 34, key: `${ri}-${c}` }))),
  { x: -120, y: -38, w: 240, key: "space" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const kc = p.keycap && p.keycap !== "none" ? p.keycap : C.greyLight;
  const anim: string = p.anim ?? "none";
  const active = anim === "type" ? Math.floor(f / 5) % KEYS.length : -1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-300} y={-22} width={600} height={22} rx={10} fill={shade(body, 0.3)} />
        <path d="M -270 -150 L 270 -150 L 300 -22 L -300 -22 Z" fill={body} />
        {KEYS.map((k, i) => (
          <g key={k.key}>
            <rect x={k.x} y={k.y + 3} width={k.w} height={16} rx={4} fill={shade(kc, 0.25)} />
            <rect x={k.x} y={k.y} width={k.w} height={16} rx={4} fill={i === active ? C.yellow : kc} />
          </g>
        ))}
      </g>
    </g>
  );
}
