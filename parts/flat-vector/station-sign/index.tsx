import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hanging station sign: a blank board on two hangers from a ceiling bar, with a simple train pictogram
// on a white panel and a round clock beside it. No words. anim "sway" swings the sign gently.
// Origin = floor centre under the sign. Room scale: about 720 px wide and 830 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const board = p.color && p.color !== "none" ? p.color : C.navy;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 120) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(sway)} 0 -830)`}>
          {/* ceiling bar and hangers */}
          <rect x={-360} y={-830} width={720} height={20} rx={8} fill={frame} />
          <rect x={-240} y={-812} width={12} height={112} fill={frame} />
          <rect x={54} y={-812} width={12} height={112} fill={frame} />
          <rect x={234} y={-812} width={12} height={112} fill={frame} />
          {/* board with a white panel and a train pictogram */}
          <rect x={-320} y={-700} width={440} height={180} rx={18} fill={board} />
          <rect x={-296} y={-676} width={392} height={132} rx={12} fill={C.white} />
          <rect x={-180} y={-660} width={160} height={70} rx={22} fill={C.blue} />
          <rect x={-166} y={-648} width={58} height={30} rx={8} fill={C.sky} />
          <rect x={-96} y={-648} width={58} height={30} rx={8} fill={C.sky} />
          <circle cx={-150} cy={-580} r={14} fill={C.ink} />
          <circle cx={-50} cy={-580} r={14} fill={C.ink} />
          <rect x={-200} y={-558} width={200} height={8} rx={4} fill={shade(frame, 0.1)} />
          {/* clock beside the board */}
          <circle cx={240} cy={-610} r={90} fill={frame} />
          <circle cx={240} cy={-610} r={76} fill={C.white} />
          <line x1={240} y1={-610} x2={240} y2={-656} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
          <line x1={240} y1={-610} x2={278} y2={-610} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <circle cx={240} cy={-610} r={8} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
