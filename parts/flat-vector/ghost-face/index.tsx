import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cute ghost sticker: a white sheet ghost with a wavy hem, dot eyes and an O mouth, floating.
// Centre (x, y), about 380 px wide at s = 1. Motion comes only from p.f.

const ghost = "M -150 -60 A 150 150 0 0 1 150 -60 L 150 150 Q 112 200 75 150 Q 37 100 0 150 Q -37 200 -75 150 Q -112 100 -150 150 Z";

const Body = ({ c, e }: { c: string; e: number }) => (
  <path d={ghost} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.white;
  const anim: string = p.anim ?? "float";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dy = 0, rot = 0;
  if (anim === "float") dy = Math.sin(f * 0.1) * 14;
  else if (anim === "wobble") rot = Math.sin(f * 0.15) * 5;
  const blink = anim !== "none" && f % 120 < 5;
  return (
    <g transform={`translate(${x} ${y + dy * s}) rotate(${rot}) scale(${s * k * 1.4 * (p.flip ? -1 : 1)} ${s * k * 1.4})`}>
      <g transform="translate(0 18)"><Body c={C.shadow} e={0} /></g>
      {p.border !== false && <Body c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Body c={shade(col, 0.12)} e={0} /></g>
      <Body c={col} e={0} />
      {blink
        ? <g stroke={C.ink} strokeWidth={10} strokeLinecap="round"><path d="M -66 -30 L -34 -30" /><path d="M 34 -30 L 66 -30" /></g>
        : <g><circle cx={-50} cy={-30} r={17} fill={C.ink} /><circle cx={50} cy={-30} r={17} fill={C.ink} />
            <circle cx={-44} cy={-36} r={5} fill="#FFFFFF" /><circle cx={56} cy={-36} r={5} fill="#FFFFFF" /></g>}
      <ellipse cx={0} cy={36} rx={20} ry={26} fill={C.ink} />
      <circle cx={-96} cy={14} r={20} fill={C.pink} opacity={0.5} />
      <circle cx={96} cy={14} r={20} fill={C.pink} opacity={0.5} />
    </g>
  );
}
