import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector rocket sticker: a small rocket blasting diagonally up and to the right, with flame and puffs.
// Centre (x, y), about 420 px across at s = 1. Motion comes only from p.f.

const body = "M 0 -230 C 70 -170 84 -60 84 20 L 84 96 L -84 96 L -84 20 C -84 -60 -70 -170 0 -230 Z";
const finL = "M -84 40 L -140 130 L -84 116 Z";
const finR = "M 84 40 L 140 130 L 84 116 Z";
const nozzle = "M -38 96 L 38 96 L 46 126 L -46 126 Z";

const Rocket = ({ c, e }: { c: string; e: number }) => (
  <>
    <path d={finL} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <path d={finR} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <path d={body} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const anim: string = p.anim ?? "flame";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dx = 0, dy = 0;
  if (anim === "bob") { dx = Math.sin(f * 0.12) * 8; dy = Math.cos(f * 0.12) * 8; }
  const flameLen = 90 + (anim === "flame" ? Math.abs(Math.sin(f * 0.5)) * 36 : 0);
  const flame = `M -36 124 Q 0 ${124 + flameLen} 36 124 Q 0 110 -36 124 Z`;
  const puffs = [0, 1, 2];
  return (
    <g transform={`translate(${x + dx * s} ${y + dy * s}) scale(${s * k * 1.35 * (p.flip ? -1 : 1)} ${s * k * 1.35}) rotate(45)`}>
      <g transform="translate(0 0)">
        <g transform="translate(0 18)"><Rocket c={C.shadow} e={0} /></g>
        {p.border !== false && <Rocket c="#FFFFFF" e={34} />}
        <g transform="translate(0 12)"><Rocket c={shade(col, 0.22)} e={0} /></g>
        <Rocket c={col} e={0} />
        <path d={flame} fill={C.orange} />
        <path d={`M -18 124 Q 0 ${124 + flameLen * 0.6} 18 124 Q 0 112 -18 124 Z`} fill={C.yellow} />
        <path d={nozzle} fill={shade(col, 0.35)} />
        <circle cx={0} cy={-40} r={44} fill="#FFFFFF" />
        <circle cx={0} cy={-40} r={32} fill={C.skyDeep} />
        <path d="M -16 -52 Q -8 -60 4 -58" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
        <path d={finL} fill={shade(col, 0.22)} transform="translate(-8 0)" opacity={0.35} />
        {anim === "flame" && puffs.map((i) => {
          const t = ((f + i * 14) % 42) / 42;
          return <circle key={i} cx={-30 - i * 22 - t * 30} cy={170 + t * 50} r={14 + t * 14} fill="#FFFFFF" opacity={0.9 * (1 - t)} />;
        })}
      </g>
    </g>
  );
}
