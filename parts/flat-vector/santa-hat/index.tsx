import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Santa hat: a floppy red cone that curls over to one side, with a white fur brim and a white pompom.
// Origin = bottom centre of the brim (the hat sits on y). About 470 px wide and 430 px tall at s = 1.
// anim "sway": the tip swings gently. anim "bob": the hat bobs up and down.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const fur = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 4 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  const bumps = [-196, -160, -124, -88, -52, -16, 20, 56, 92, 128, 164, 198];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        <g transform={`rotate(${f1(sway)} 0 -110)`}>
          {/* cone with a curled tip */}
          <path d="M -190 -110 C -200 -300 -90 -380 40 -420 C 140 -450 240 -420 250 -340 C 256 -290 230 -250 190 -230 C 120 -200 90 -170 110 -110 Z" fill={red} />
          <path d="M 40 -420 C 140 -450 240 -420 250 -340 C 220 -372 150 -398 40 -420 Z" fill={shade(red, 0.2)} opacity={0.7} />
          {/* pompom */}
          <circle cx={248} cy={-340} r={48} fill={fur} />
          <circle cx={254} cy={-352} r={20} fill={shade(fur, 0.06)} opacity={0.5} />
          {/* brim with fur bumps */}
          <rect x={-215} y={-120} width={430} height={112} rx={50} fill={fur} />
          <rect x={-215} y={-42} width={430} height={34} rx={17} fill={C.greyLight} />
          {bumps.map((bx) => <circle key={bx} cx={bx} cy={-120} r={22} fill={fur} />)}
        </g>
      </g>
    </g>
  );
}
