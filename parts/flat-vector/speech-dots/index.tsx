import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector speech dots: a rounded speech bubble with three white dots that bounce in turn. White die-cut edge,
// shadow and one darker shade. Motion only from p.f. Centre (x, y), about 480 px wide at s = 1.

const BUBBLE = "M -190 -120 L 190 -120 Q 225 -120 225 -85 L 225 75 Q 225 110 190 110 L -40 110 L -110 175 L -95 110 L -190 110 Q -225 110 -225 75 L -225 -85 Q -225 -120 -190 -120 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.blue;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "bounce";
  const flip = p.flip ? -1 : 1;
  let sc = 1;
  if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * sc * flip} ${s * k * sc})`}>
      <path d={BUBBLE} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={BUBBLE} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <path d={BUBBLE} transform="translate(0 14)" fill={shade(col, 0.18)} />
      <path d={BUBBLE} fill={col} />
      {[-110, 0, 110].map((dx, i) => {
        const hop = anim === "bounce" ? -Math.max(0, Math.sin(f * 0.25 - i * 1.0)) * 26 : 0;
        return <circle key={i} cx={dx} cy={hop} r={30} fill="#FFFFFF" />;
      })}
    </g>
  );
}
