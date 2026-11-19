import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cartoon eye sticker: a big white almond eye with a coloured iris that looks around and blinks.
// Centre (x, y), about 480 px wide at s = 1. Motion comes only from p.f.

const almond = "M -220 0 Q 0 -285 220 0 Q 0 285 -220 0 Z";
const Almond = ({ c, e }: { c: string; e: number }) => (
  <path d={almond} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.blue;
  const anim: string = p.anim ?? "look";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  // look: the iris wanders in a slow loop; blink: a quick close every 96 frames.
  const ix = anim === "look" ? Math.sin(f * 0.05) * 34 : 0;
  const iy = anim === "look" ? Math.sin(f * 0.031 + 1) * 12 : 0;
  const ph = f % 96;
  const open = (anim === "look" || anim === "blink") && ph < 8 ? Math.max(0.08, Math.abs(ph - 4) / 4) : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * 1.15 * (p.flip ? -1 : 1)} ${s * k * 1.15})`}>
      <g transform={`scale(1 ${open})`}>
        <g transform="translate(0 18)"><Almond c={C.shadow} e={0} /></g>
        {p.border !== false && <Almond c="#FFFFFF" e={34} />}
        <g transform="translate(0 12)"><Almond c={shade("#FFFFFF", 0.14)} e={0} /></g>
        <Almond c="#FFFFFF" e={0} />
        <circle cx={ix} cy={iy} r={100} fill={col} />
        <circle cx={ix} cy={iy + 10} r={100} fill={shade(col, 0.22)} opacity={0.5} />
        <circle cx={ix} cy={iy} r={48} fill={C.ink} />
        <circle cx={ix - 26} cy={iy - 28} r={17} fill="#FFFFFF" />
        <circle cx={ix + 18} cy={iy + 22} r={7} fill="#FFFFFF" opacity={0.7} />
        <path d="M -232 6 Q 0 -318 232 6" fill="none" stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
      </g>
    </g>
  );
}
