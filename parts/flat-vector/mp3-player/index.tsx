import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small digital music player: a rounded slab with a small colour screen and a round click pad, earphone lead at the top.
// Generic UI only (bars, dots, a cover square). Origin = bottom centre. anim "play": equaliser bars dance.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const anim: string = p.anim ?? "none";
  const play = anim === "play";
  const bars = Array.from({ length: 6 }, (_, i) => {
    const h = play ? 8 + 14 * (0.5 + 0.5 * Math.sin(f * 0.25 + i * 1.3)) : [14, 22, 10, 18, 12, 20][i];
    return <rect key={i} x={-80 + i * 26} y={f1(-192 - h)} width={14} height={f1(h)} rx={4} fill={C.teal} />;
  });
  const pad = shade(body, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M 40 -340 C 60 -420 140 -440 180 -400" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        <circle cx={180} cy={-400} r={18} fill={C.inkSoft} />
        <circle cx={180} cy={-400} r={8} fill={C.greyLight} />
        <rect x={-120} y={-340} width={240} height={340} rx={36} fill={body} />
        <rect x={-104} y={-324} width={12} height={300} rx={6} fill={C.white} opacity={0.25} />
        <rect x={-96} y={-312} width={192} height={132} rx={12} fill={C.ink} />
        <rect x={-80} y={-296} width={56} height={56} rx={8} fill={C.teal} />
        <circle cx={-52} cy={-268} r={14} fill={C.white} opacity={0.5} />
        <rect x={-12} y={-288} width={80} height={9} rx={4} fill={C.greyLight} />
        <rect x={-12} y={-270} width={56} height={9} rx={4} fill={C.grey} />
        {bars}
        <rect x={-80} y={-226} width={160} height={6} rx={3} fill={C.greyDark} />
        <rect x={-80} y={-226} width={96} height={6} rx={3} fill={C.green} />
        <circle cx={0} cy={-110} r={66} fill={pad} />
        <circle cx={0} cy={-110} r={26} fill={C.greyLight} />
        {[[0, -150], [0, -70], [-40, -110], [40, -110]].map(([cx, cy]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={6} fill={C.greyLight} />
        ))}
      </g>
    </g>
  );
}
