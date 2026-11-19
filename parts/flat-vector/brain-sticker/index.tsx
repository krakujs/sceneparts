import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pink cartoon brain sticker with folds and a little spark. Centre (x, y), about 480 px wide at s = 1.
// Motion comes only from p.f: pop-in, gentle pulse, spark twinkle.

const brainPath = "M 0 -150 C -60 -200 -180 -180 -200 -90 C -240 -60 -230 20 -190 40 C -200 110 -140 170 -70 150 C -40 185 40 185 70 150 C 140 170 200 110 190 40 C 230 20 240 -60 200 -90 C 180 -180 60 -200 0 -150 Z";
const sparkPath = "M 0 -44 Q 8 -8 44 0 Q 8 8 0 44 Q -8 8 -44 0 Q -8 -8 0 -44 Z";

const Brain = ({ c, e }: { c: string; e: number }) => (
  <path d={brainPath} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.pink;
  const anim: string = p.anim ?? "pulse";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let sc = 1, tw = 1;
  if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.03;
  else if (anim === "spark") tw = 0.7 + 0.3 * Math.abs(Math.sin(f * 0.3));
  const sp = anim === "spark" ? tw : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * 1.15 * (p.flip ? -1 : 1)} ${s * k * 1.15 * sc})`}>
      <g transform="translate(0 18)"><Brain c={C.shadow} e={0} /></g>
      {p.border !== false && <Brain c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Brain c={shade(col, 0.22)} e={0} /></g>
      <Brain c={col} e={0} />
      <g stroke={shade(col, 0.45)} strokeWidth={13} strokeLinecap="round" fill="none" opacity={0.85}>
        <path d="M 0 -150 Q 12 -40 -4 40 Q -8 90 0 150" />
        <path d="M -120 -20 Q -80 -62 -40 -18" />
        <path d="M 40 -6 Q 92 -58 132 2" />
        <path d="M -120 88 Q -80 46 -36 96" />
        <path d="M 60 96 Q 110 62 136 112" />
      </g>
      <g transform={`translate(218 -176) scale(${sp})`}>
        <path d={sparkPath} transform="translate(0 0) scale(1.35)" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={22} strokeLinejoin="round" />
        <path d={sparkPath} fill={C.yellow} />
      </g>
    </g>
  );
}
