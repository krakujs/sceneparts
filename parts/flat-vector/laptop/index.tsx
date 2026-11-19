import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Laptop: lid with screen, base with keyboard deck, seen from the front and a little above.
// Origin = bottom centre (the base rests on y). anim "type": keys light up one after another.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const ROW_Y = [-86, -75, -64];
const KEYS = ROW_Y.flatMap((ky, r) => Array.from({ length: 12 }, (_, c) => ({ x: -114 + c * 19, y: ky, idx: r * 12 + c })));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.sky;
  const anim: string = p.anim ?? "none";
  const active = anim === "type" ? Math.floor(f / 6) % KEYS.length : -1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* lid */}
        <path d="M -212 -92 L -196 -410 L 196 -410 L 212 -92 Z" fill={body} />
        <path d="M -186 -100 L -172 -382 L 172 -382 L 186 -100 Z" fill={scr} />
        <circle cx={0} cy={-398} r={4} fill={shade(body, 0.4)} />
        <rect x={-170} y={-378} width={340} height={22} fill={C.white} opacity={0.7} />
        {[-156, -144, -132].map((cx) => (
          <circle key={cx} cx={cx} cy={-367} r={3.5} fill={C.greyDark} />
        ))}
        <rect x={-164} y={-352} width={70} height={220} fill={C.white} opacity={0.35} />
        <rect x={-88} y={-352} width={180} height={100} rx={10} fill={C.white} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-74 + i * 40} y={-260 - [30, 50, 38, 62][i]} width={24} height={[30, 50, 38, 62][i]} rx={4} fill={C.blue} />
        ))}
        <rect x={-88} y={-240} width={84} height={100} rx={10} fill={C.yellow} />
        <rect x={4} y={-240} width={84} height={100} rx={10} fill={C.teal} opacity={0.85} />
        <circle cx={46} cy={-190} r={20} fill={C.white} opacity={0.5} />
        {/* base: front face, then keyboard deck */}
        <rect x={-250} y={-34} width={500} height={34} rx={12} fill={shade(body, 0.25)} />
        <path d="M -250 -34 L -214 -92 L 214 -92 L 250 -34 Z" fill={body} />
        {KEYS.map((k) => (
          <rect key={k.idx} x={k.x} y={k.y} width={15} height={7} rx={2} fill={k.idx === active ? C.yellow : C.greyLight} />
        ))}
        <rect x={-90} y={-50} width={180} height={7} rx={3} fill={C.greyLight} />
      </g>
    </g>
  );
}
