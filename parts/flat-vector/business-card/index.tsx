import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two business cards stacked at an angle. The front card shows a simple abstract mark (circle and square,
// not a logo) and grey lines; the back card is a plain colour. Origin = bottom centre of the stack.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const front = p.color && p.color !== "none" ? p.color : C.white;
  const back = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* back card, tilted the other way */}
        <g transform="translate(16 -170) rotate(-9)">
          <rect x={-210} y={-125} width={420} height={250} rx={14} fill={shade(back, 0.15)} />
          <rect x={-210} y={-125} width={420} height={250} rx={14} fill={back} transform="translate(-4 -4)" />
        </g>
        {/* front card */}
        <g transform="translate(-6 -150) rotate(5)">
          <rect x={-210} y={-125} width={420} height={250} rx={14} fill={shade(front, 0.1)} />
          <rect x={-210} y={-125} width={420} height={250} rx={14} fill={front} transform="translate(0 -4)" />
          {/* abstract mark: a circle and a square */}
          <circle cx={-120} cy={-40} r={40} fill={C.teal} />
          <rect x={-88} y={-22} width={64} height={64} rx={10} fill={C.yellow} />
          {/* grey lines */}
          <rect x={-10} y={-70} width={170} height={18} rx={9} fill={C.greyDark} />
          <rect x={-10} y={-36} width={120} height={10} rx={5} fill={C.grey} />
          <rect x={-150} y={62} width={300} height={8} rx={4} fill={C.greyLight} />
          <rect x={-150} y={84} width={200} height={8} rx={4} fill={C.greyLight} />
        </g>
      </g>
    </g>
  );
}
