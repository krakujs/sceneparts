import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Instant camera: a boxy camera with a photo slot on top. A blank photo slides up out of the slot.
// Origin = bottom centre. anim "eject" plays the photo sliding out once from inside the camera.
const f1 = (v: number) => v.toFixed(1);
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const CARD_H = 250; // photo height, including the thicker bottom margin
const EJECT = 250; // how far the photo rises out of the slot

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const e = anim === "eject" ? EJECT * easeOutCubic(Math.min(1, f / 60)) : EJECT;
  const top = -332 - e; // top edge of the photo; it rises out of the slot at y = -332
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* photo: drawn first so the body hides the part still inside the camera */}
        <rect x={-100} y={top} width={200} height={CARD_H} rx={6} fill={C.white} />
        <rect x={-86} y={top + 14} width={172} height={CARD_H - 74} rx={3} fill={C.paper} />
        <rect x={-86} y={top + 14} width={172} height={CARD_H - 74} rx={3} fill={C.sky} opacity={0.35} />
        {/* body */}
        <rect x={-220} y={-320} width={440} height={320} rx={28} fill={body} />
        <rect x={-220} y={-120} width={440} height={120} rx={28} fill={shade(body, 0.12)} />
        <rect x={-220} y={-128} width={440} height={10} fill={shade(body, 0.12)} />
        {/* photo slot */}
        <rect x={-150} y={-334} width={300} height={16} rx={8} fill={C.ink} />
        {/* lens */}
        <circle cx={0} cy={-190} r={80} fill={C.ink} />
        <circle cx={0} cy={-190} r={66} fill={C.inkSoft} />
        <circle cx={0} cy={-190} r={50} fill={C.navy} />
        <circle cx={-16} cy={-206} r={12} fill={C.white} opacity={0.5} />
        {/* flash and viewfinder */}
        <rect x={-170} y={-300} width={70} height={40} rx={8} fill={C.white} />
        <rect x={-160} y={-292} width={50} height={8} rx={4} fill={C.greyLight} />
        <rect x={90} y={-296} width={72} height={36} rx={8} fill={C.ink} />
        <rect x={100} y={-288} width={22} height={10} rx={5} fill={C.skyDeep} />
        {/* shutter button */}
        <circle cx={120} cy={-60} r={24} fill={C.red} />
        <circle cx={114} cy={-66} r={7} fill={C.white} opacity={0.5} />
        <rect x={-160} y={-62} width={180} height={10} rx={5} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
