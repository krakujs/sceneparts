import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Curved street lamp post, front view: flared base, tall post, a curved arm reaching right and a dome lamp head.
// Origin = bottom centre at the foot of the post; the post stands on y. About 330 px wide and 1080 px tall at s = 1.
// anim "lights": the bulb glows on (the light cone and the pool on the pavement fade in over the first frames).
// "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const post = p.color && p.color !== "none" ? p.color : C.greyDark;
  const head = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const on = anim === "lights" ? Math.min(1, f / 24) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={80} cy={0} rx={130} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {on > 0 && <ellipse cx={150} cy={-4} rx={240} ry={32} fill={C.yellow} opacity={f1(0.35 * on)} />}
        {on > 0 && <path d="M 110 -990 L 30 -180 L 270 -180 L 190 -990 Z" fill={C.yellow} opacity={f1(0.2 * on)} />}
        {/* flared base and post */}
        <path d="M -70 0 Q -40 -18 -40 -60 L 40 -60 Q 40 -18 70 0 Z" fill={post} />
        <rect x={-20} y={-900} width={40} height={840} rx={8} fill={post} />
        <rect x={-26} y={-912} width={52} height={18} rx={8} fill={shade(post, 0.2)} />
        {/* curved arm */}
        <path d="M 0 -880 Q 0 -1000 150 -1000" fill="none" stroke={post} strokeWidth={30} strokeLinecap="round" />
        {/* lamp head */}
        {on > 0 && <circle cx={150} cy={-996} r={110} fill={C.yellow} opacity={f1(0.35 * on)} />}
        <rect x={96} y={-1010} width={108} height={22} rx={11} fill={head} />
        <path d="M 92 -1010 Q 150 -1074 208 -1010 Z" fill={head} />
        <rect x={100} y={-1000} width={100} height={8} rx={4} fill={shade(head, 0.2)} />
        <ellipse cx={150} cy={-994} rx={34} ry={10} fill={on > 0 ? C.yellow : C.greyLight} />
        <rect x={134} y={-1076} width={32} height={10} rx={5} fill={shade(head, 0.25)} />
      </g>
    </g>
  );
}
