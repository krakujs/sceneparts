import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Upright piano seen from the front: a closed top, a tall cabinet with a music desk panel, a keyboard
// with white and black keys, and three brass pedals on a plinth. Origin = bottom centre (plinth on y).
// anim "play": keys dip in a wave from left to right and the pedals press.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};
const WHITE = 24;
const KW = 660 / WHITE;
const BLACK_AT = [0, 1, 3, 4, 5];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.brownDark;
  const brass = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const wave = (i: number) => (anim === "play" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 30 - i * 0.5)) * 8 : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* plinth and pedals */}
        <rect x={-340} y={-70} width={680} height={70} rx={14} fill={shade(body, 0.3)} />
        {[-80, 0, 80].map((px, i) => (
          <g key={i}>
            <rect x={px - 16} y={-70 + (anim === "play" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 30 - i)) * 6 : 0)} width={32} height={22} rx={6} fill={brass} />
          </g>
        ))}
        {/* cabinet: top cap, body, music desk panel */}
        <rect x={-360} y={-840} width={720} height={40} rx={14} fill={shade(body, 0.15)} />
        <rect x={-350} y={-810} width={700} height={740} rx={16} fill={body} />
        <rect x={-300} y={-740} width={600} height={300} rx={10} fill={shade(body, 0.12)} />
        <rect x={-300} y={-740} width={600} height={300} rx={10} fill="none" stroke={shade(body, 0.3)} strokeWidth={6} />
        {/* panel highlight */}
        <rect x={-334} y={-800} width={10} height={300} rx={5} fill={C.white} opacity={0.12} />
        {/* brass candle holders */}
        <circle cx={-300} cy={-430} r={16} fill={brass} />
        <circle cx={300} cy={-430} r={16} fill={brass} />
        {/* keyboard slip and keybed */}
        <rect x={-350} y={-420} width={700} height={24} rx={6} fill={shade(body, 0.3)} />
        <rect x={-330} y={-398} width={660} height={60} rx={4} fill={C.ink} />
        {Array.from({ length: WHITE }, (_, i) => (
          <g key={i} transform={`translate(0 ${f1(wave(i))})`}>
            <rect x={-330 + i * KW + 1} y={-398} width={KW - 2} height={58} rx={3} fill={C.white} />
            <rect x={-330 + i * KW + 1} y={-346} width={KW - 2} height={10} rx={3} fill={C.greyLight} />
          </g>
        ))}
        {Array.from({ length: WHITE - 1 }, (_, i) => i).filter((i) => BLACK_AT.includes(i % 7)).map((i) => (
          <rect key={i} x={-330 + (i + 1) * KW - 9} y={-398} width={18} height={34} rx={3} fill={C.ink} />
        ))}
      </g>
    </g>
  );
}
