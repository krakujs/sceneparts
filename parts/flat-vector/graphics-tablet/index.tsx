import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Graphics tablet (drawing pad) seen from the front-top, with a stylus lying across the active area.
// Origin = bottom centre (the pad rests on y). About 520 px wide at s = 1.
// anim "draw": the doodle on the active area is drawn stroke by stroke.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const ink = p.ink && p.ink !== "none" ? p.ink : C.blue;
  const anim: string = p.anim ?? "none";
  const drawing = anim === "draw";
  const dash = drawing ? { strokeDasharray: 100, strokeDashoffset: 100 - ((f * 2) % 100) } : {};
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-260} y={-226} width={520} height={236} rx={28} fill={shade(body, 0.3)} />
        <rect x={-260} y={-262} width={520} height={236} rx={28} fill={body} />
        <rect x={-226} y={-232} width={360} height={200} rx={12} fill={C.paper} />
        <path pathLength={100} d="M -190 -110 C -130 -200 -60 -60 0 -120 S 90 -180 110 -80" fill="none" stroke={ink} strokeWidth={9} strokeLinecap="round" {...dash} />
        <circle cx={-60} cy={-70} r={26} fill="none" stroke={ink} strokeWidth={8} />
        {[-210, -170, -130, -90].map((ky) => (
          <circle key={ky} cx={180} cy={ky} r={12} fill={C.greyLight} />
        ))}
        {/* stylus lying across the pad */}
        <g transform="translate(-10 -60) rotate(-14)">
          <rect x={-120} y={-10} width={220} height={20} rx={10} fill={C.white} />
          <rect x={-120} y={-10} width={30} height={20} rx={10} fill={C.inkSoft} />
          <rect x={-10} y={-10} width={40} height={20} fill={C.blue} />
          <path d="M 100 -10 L 140 0 L 100 10 Z" fill={C.inkSoft} />
        </g>
      </g>
    </g>
  );
}
