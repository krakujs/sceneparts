import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Snowboard standing upright on its tail: a long narrow board with a rounded nose at the top, two
// bindings and a stripe down the centre. Origin = bottom tail centre. About 760 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const board = p.color && p.color !== "none" ? p.color : C.blue;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={110} ry={8} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* board: long shape, rounded nose up top, squared tail at the base */}
        <path d="M -40 -40 Q -86 -330 -40 -640 Q 0 -700 40 -640 Q 86 -330 40 -40 Q 0 -20 -40 -40 Z" fill={board} />
        {/* side shade on the right half for depth */}
        <path d="M 10 -40 Q 56 -330 10 -640 Q 30 -680 40 -640 Q 86 -330 40 -40 Q 25 -30 10 -40 Z" fill={shade(board, 0.2)} />
        {/* centre stripe */}
        <path d="M -6 -60 Q -22 -330 -6 -610 L 8 -610 Q -8 -330 8 -60 Z" fill={stripe} />
        {/* bindings */}
        <rect x={-70} y={-420} width={140} height={34} rx={12} fill={C.ink} />
        <rect x={-70} y={-420} width={140} height={10} rx={5} fill={C.inkSoft} />
        <rect x={-62} y={-270} width={124} height={30} rx={11} fill={C.ink} />
        <rect x={-62} y={-270} width={124} height={9} rx={4} fill={C.inkSoft} />
        {/* fixing screws */}
        {[-404, -272].map((cy) => <React.Fragment key={cy}>
          <circle cx={-44} cy={cy} r={4} fill={C.grey} />
          <circle cx={44} cy={cy} r={4} fill={C.grey} />
        </React.Fragment>)}
      </g>
    </g>
  );
}
