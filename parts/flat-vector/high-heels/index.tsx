import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// High heels: one classic stiletto pump in side view, toe pointing right. Pointed toe box, low-cut opening,
// arched sole and a thin tall heel at the back. Origin = bottom centre (toe tip and heel tip rest on y).
// About 560 px wide and 380 px tall at s = 1. anim "bob": lifts and settles; "spin": turns slowly in place.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const sole = p.color2 && p.color2 !== "none" ? p.color2 : C.ink;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 12 : 0;
  const sx = anim === "spin" ? Math.cos((f * 2 * Math.PI) / 90) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1((p.flip ? -s : s) * sx)} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={13} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* thin tall stiletto heel under the back, slightly tapered */}
        <path d="M -250 -232 L -206 -232 L -222 -4 L -238 -4 Z" fill={sole} />
        <rect x={-244} y={-10} width={28} height={10} rx={3} fill={shade(sole, -0.4)} />
        {/* arched sole: from the heel seat down the instep to the flat ball and toe */}
        <path d="M -262 -246 Q -150 -244 -40 -110 Q 0 -60 60 -40 L 270 -30 Q 288 -28 286 -14 Q 284 -2 266 0 L 60 0 Q -10 -14 -60 -80 Q -150 -200 -262 -222 Z" fill={sole} />
        {/* upper: heel counter, low-cut opening, vamp and pointed toe */}
        <path d="M -268 -244 Q -272 -340 -232 -352 Q -210 -356 -190 -330 Q -110 -230 -10 -176 Q 60 -146 150 -112 Q 240 -76 282 -28 L 270 -30 L 60 -40 Q 0 -60 -40 -110 Q -150 -244 -262 -246 Z" fill={c} />
        {/* inner lining visible in the opening */}
        <path d="M -232 -352 Q -210 -356 -190 -330 Q -110 -230 -10 -176 Q -80 -200 -140 -262 Q -190 -316 -232 -352 Z" fill={shade(c, 0.35)} />
        {/* shine along the vamp */}
        <path d="M 40 -150 Q 130 -118 210 -74" fill="none" stroke={C.white} strokeOpacity={0.45} strokeWidth={12} strokeLinecap="round" />
      </g>
    </g>
  );
}
