import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// White luxury motor yacht, side view facing right. Origin = waterline centre. Room scale: about 800 px wide.
// Two decks with tinted windows, a bridge on top and a small flag mast. anim "drive" rocks it on the waves.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 1.2)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 70} y={8} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 150} y={18} width={80} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const tint = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* flag mast */}
        <rect x={56} y={-404} width={8} height={92} fill={C.greyDark} />
        <path d="M 64 -404 L 104 -394 L 64 -384 Z" fill={C.red} />
        {/* hull with tinted stripe */}
        <path d="M -380 -112 L 360 -112 Q 410 -112 384 -52 L 300 12 L -340 12 Q -392 0 -380 -60 Z" fill={body} />
        <rect x={-372} y={-86} width={740} height={16} fill={tint} />
        <path d="M -380 -60 L 300 -60 L 300 12 L -340 12 Q -392 0 -380 -60 Z" fill={shade(body, 0.08)} />
        {/* main deck */}
        <rect x={-260} y={-200} width={440} height={88} rx={10} fill={body} />
        <rect x={-260} y={-206} width={440} height={8} fill={shade(body, 0.15)} />
        {[-236, -170, -104, -38, 28, 94].map((wx) => (
          <rect key={wx} x={wx} y={-186} width={46} height={34} rx={6} fill={tint} opacity={0.85} />
        ))}
        {/* upper deck and bridge */}
        <rect x={-110} y={-262} width={240} height={62} rx={10} fill={body} />
        <rect x={-110} y={-268} width={240} height={8} fill={shade(body, 0.15)} />
        {[-90, -30, 30, 90].map((wx) => (
          <rect key={wx} x={wx} y={-248} width={40} height={30} rx={6} fill={tint} opacity={0.85} />
        ))}
        <rect x={-40} y={-320} width={110} height={58} rx={10} fill={body} />
        <rect x={-26} y={-306} width={84} height={24} rx={6} fill={tint} opacity={0.85} />
      </g>
      <Water w={800} />
    </g>
  );
}
