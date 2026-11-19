import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stage spotlight on a tripod stand: a round lamp housing with a front lens, a yoke and a tall stand, and a
// soft light cone spreading up and to the right. Origin = bottom centre of the stand. Room scale: about 900 px tall at s = 1.
// anim "on": the light fades up over 30 frames and holds. anim "sweep": the head turns and the beam swings left and right.
const f1 = (v: number) => v.toFixed(1);
const HEAD_Y = -820; // centre of the lamp housing
const TILT = -20;    // resting tilt of the head (degrees)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const light = p.beam && p.beam !== "none" ? p.beam : "#FFF2B3";
  const anim: string = p.anim ?? "none";
  const intensity = anim === "on" ? Math.min(1, f / 30) : 1;
  const turn = anim === "sweep" ? 22 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  const aim = TILT + turn;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
        {/* light cone, from the lens outwards, fading with intensity */}
        <g transform={`translate(0 ${HEAD_Y}) rotate(${f1(aim)})`} opacity={intensity.toFixed(3)}>
          <path d="M 0 0 L 360 -170 Q 420 0 360 170 Z" fill="#FFFFFF" opacity={0.25} />
          <path d="M 0 0 L 320 -110 Q 350 0 320 110 Z" fill={light} opacity={0.5} />
          <path d="M 0 0 L 230 -50 Q 250 0 230 50 Z" fill={light} opacity={0.75} />
        </g>
        {/* tripod stand */}
        <path d="M -130 0 L -18 -760 L 18 -760 L 130 0 L 110 0 L 20 -730 L -20 -730 L -110 0 Z" fill={shade(body, 0.2)} />
        <rect x={-14} y={-800} width={28} height={70} rx={8} fill={body} />
        {/* yoke and housing, rotating with the aim */}
        <g transform={`translate(0 ${HEAD_Y}) rotate(${f1(aim)})`}>
          <path d="M -110 -20 L -110 40 M 110 -20 L 110 40" stroke={body} strokeWidth={16} strokeLinecap="round" />
          <rect x={-150} y={-120} width={300} height={170} rx={30} fill={body} />
          <rect x={-150} y={-120} width={300} height={22} rx={10} fill="#FFFFFF" opacity={0.12} />
          {/* front lens and fins */}
          <rect x={150} y={-100} width={24} height={130} rx={8} fill={C.greyDark} />
          <ellipse cx={176} cy={-35} rx={14} ry={70} fill={light} opacity={0.4 + 0.6 * intensity} />
          <rect x={-100} y={-135} width={200} height={10} rx={5} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}
