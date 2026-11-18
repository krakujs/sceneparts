import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector gold trophy sticker: a cup with handles on a stem and base, with a shine sweep across the cup.
// Centre (x, y), about 420 px wide at s = 1. Motion comes only from p.f.

const cup = "M -160 -190 L 160 -190 L 160 -110 Q 160 40 0 60 Q -160 40 -160 -110 Z";
const handleL = "M -150 -140 Q -240 -140 -226 -70 Q -212 -4 -128 6";
const handleR = "M 150 -140 Q 240 -140 226 -70 Q 212 -4 128 6";

const Trophy = ({ c, e }: { c: string; e: number }) => (
  <>
    <path d={handleL} fill="none" stroke={c} strokeWidth={36 + e} strokeLinecap="round" />
    <path d={handleR} fill="none" stroke={c} strokeWidth={36 + e} strokeLinecap="round" />
    <path d={cup} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <rect x={-34} y={56} width={68} height={92} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <rect x={-120} y={140} width={240} height={60} rx={22} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const anim: string = p.anim ?? "shine";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dy = 0;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  const sweep = anim === "shine" ? ((f * 2.4) % 260) - 130 : 0;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * 1.15 * (p.flip ? -1 : 1)} ${s * k * 1.15})`}>
      <g transform="translate(0 18)"><Trophy c={C.shadow} e={0} /></g>
      {p.border !== false && <Trophy c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Trophy c={shade(col, 0.22)} e={0} /></g>
      <Trophy c={col} e={0} />
      <path d="M -150 -170 Q -110 -170 -90 -110 Q -70 -40 -110 -10" fill="none" stroke="#FFFFFF" strokeWidth={16} strokeLinecap="round" opacity={0.7} />
      <g transform={`translate(${sweep} 0)`} opacity={anim === "shine" ? 0.6 : 0}>
        <path d="M -16 -160 L 14 -160 L 44 -10 L 14 -10 Z" fill="#FFFFFF" />
      </g>
      <rect x={-120} y={178} width={240} height={14} rx={7} fill={shade(col, 0.3)} />
    </g>
  );
}
