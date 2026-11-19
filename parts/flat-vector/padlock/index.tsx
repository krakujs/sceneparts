import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Padlock, hero scale: about 300 px wide and 400 px tall at s = 1. Origin = bottom centre (rests on y).
// anim "open": the shackle lifts out of the body and swings back in, cycling every 90 frames.
// anim "close": the reverse, the shackle drops closed (with a small clunk bounce).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Shackle lift in px: 0 = closed, 90 = fully open (lifted).
const lift = (anim: string, f: number) => {
  const ph = (f % 90) / 90;
  const up = ph < 0.5 ? ph * 2 : 2 - ph * 2;
  const eased = up * up * (3 - 2 * up);
  if (anim === "open") return 90 * eased;
  if (anim === "close") return 90 * (1 - eased);
  return 0;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const L = lift(anim, f);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={10} fill={C.shadow} />
      <g transform={motion(anim === "open" || anim === "close" ? "none" : anim, f)}>
        {/* shackle: a thick arch, lifted by L */}
        <path d={`M-92 ${-200 - L} V-270 A92 92 0 0 1 92 -270 V${-200 - L}`} fill="none" stroke={metal} strokeWidth={34} strokeLinecap="butt" />
        <path d={`M-92 ${-200 - L} V-270 A92 92 0 0 1 92 -270 V${-200 - L}`} fill="none" stroke={shade(metal, 0.22)} strokeWidth={8} opacity={0.6} transform="translate(-10 0)" />
        {/* body */}
        <rect x={-150} y={-200} width={300} height={200} rx={34} fill={body} />
        <rect x={-150} y={-40} width={300} height={40} rx={20} fill={shade(body, 0.2)} />
        {/* keyhole */}
        <circle cx={0} cy={-120} r={26} fill={C.ink} />
        <rect x={-13} y={-110} width={26} height={60} rx={10} fill={C.ink} />
        <rect x={-100} y={-180} width={200} height={10} rx={5} fill={C.white} opacity={0.22} />
      </g>
    </g>
  );
}
