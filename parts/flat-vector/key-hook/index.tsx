import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Key hook: small wall board with four hooks, three of them with a key bunch (ring with two keys) hanging from it.
// Wall item: centred on (x, y), no ground shadow. Faces the viewer, honours flip, s and anim. Hero size.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** A key bunch hanging from a hook point (hx, hy): a ring and two keys. */
const KeyBunch = ({ hx, hy, c }: { hx: number; hy: number; c: string }) => {
  const ringY = hy + 46;
  return (
    <g>
      <circle cx={hx} cy={ringY} r={24} fill="none" stroke={C.greyDark} strokeWidth={9} />
      {/* first key */}
      <rect x={hx - 40} y={ringY + 18} width={12} height={92} rx={6} fill={c} />
      <circle cx={hx - 34} cy={ringY + 122} r={20} fill={c} />
      <circle cx={hx - 34} cy={ringY + 122} r={8} fill={C.white} opacity={0.6} />
      <rect x={hx - 40} y={ringY + 76} width={20} height={10} fill={shade(c, 0.2)} />
      {/* second key */}
      <rect x={hx + 22} y={ringY + 18} width={12} height={72} rx={6} fill={C.greyDark} />
      <rect x={hx + 22} y={ringY + 70} width={24} height={10} fill={C.greyDark} />
      <rect x={hx + 22} y={ringY + 56} width={18} height={10} fill={C.greyDark} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const board = p.color && p.color !== "none" ? p.color : C.teal;
  const keyC = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const hooks = [-120, -40, 40, 120];
  const hookY = -40;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wall board */}
        <rect x={-190} y={-130} width={380} height={230} rx={44} fill={board} />
        <rect x={-190} y={60} width={380} height={40} rx={20} fill={shade(board, 0.2)} />
        {/* hooks and key bunches */}
        {hooks.map((hx, i) => (
          <g key={i}>
            <circle cx={hx} cy={hookY} r={16} fill={C.greyLight} />
            <rect x={hx - 7} y={hookY - 2} width={14} height={34} rx={7} fill={C.greyLight} />
            <circle cx={hx} cy={hookY + 2} r={4} fill={C.greyDark} />
          </g>
        ))}
        {[-120, 40, 120].map((hx, i) => (
          <KeyBunch key={i} hx={hx} hy={hookY + 18} c={i === 1 ? C.blue : keyC} />
        ))}
      </g>
    </g>
  );
}
