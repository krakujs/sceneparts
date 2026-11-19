import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cute cartoon skull sticker: round cranium, big dark eye sockets, little teeth. Friendly, not scary.
// Centre (x, y), about 400 px wide at s = 1. Motion comes only from p.f.

const Skull = ({ c, e }: { c: string; e: number }) => (
  <>
    <circle cx={0} cy={-40} r={150} fill={c} stroke={c} strokeWidth={e} />
    <rect x={-106} y={40} width={212} height={140} rx={56} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.paper;
  const anim: string = p.anim ?? "wobble";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let rot = 0, dy = 0;
  if (anim === "wobble") rot = Math.sin(f * 0.15) * 5;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  const blink = anim === "wobble" && f % 110 < 6;
  const ink = C.ink;
  return (
    <g transform={`translate(${x} ${y + dy * s}) rotate(${rot}) scale(${s * k * 1.35 * (p.flip ? -1 : 1)} ${s * k * 1.35})`}>
      <g transform="translate(0 18)"><Skull c={C.shadow} e={0} /></g>
      {p.border !== false && <Skull c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Skull c={shade(col, 0.18)} e={0} /></g>
      <Skull c={col} e={0} />
      <ellipse cx={-62} cy={-22} rx={blink ? 42 : 46} ry={blink ? 6 : 50} fill={ink} />
      <ellipse cx={62} cy={-22} rx={blink ? 42 : 46} ry={blink ? 6 : 50} fill={ink} />
      {!blink && <circle cx={-48} cy={-42} r={12} fill="#FFFFFF" opacity={0.85} />}
      {!blink && <circle cx={76} cy={-42} r={12} fill="#FFFFFF" opacity={0.85} />}
      <path d="M -16 58 L 16 58 L 0 84 Z" fill={ink} />
      <rect x={-72} y={100} width={144} height={62} rx={24} fill="#FFFFFF" />
      <path d="M -24 100 L -24 162 M 24 100 L 24 162" stroke={ink} strokeWidth={8} strokeLinecap="round" />
      <path d="M -72 131 L 72 131" stroke={ink} strokeWidth={6} />
      <circle cx={-96} cy={34} r={18} fill={C.pink} opacity={0.5} />
      <circle cx={96} cy={34} r={18} fill={C.pink} opacity={0.5} />
    </g>
  );
}
