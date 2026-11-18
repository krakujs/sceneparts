import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Friendly field scarecrow on a pole: straw hat, patched shirt, straw hands, sack-cloth head with a stitched smile.
// Origin = foot of the pole (rests on y). About 710 px wide and 1130 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const WOOD = "#8A5A3C";
const BURLAP = "#E9D3A9";
const STRAW = "#E7C873";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const shirt = pick(p.color, C.blue);
  const trousers = pick(p.color2, C.navy);
  const anim: string = p.anim ?? "none";
  const top = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const hand = (hx: number) => (
    <g>
      <circle cx={hx} cy={-766} r={34} fill={STRAW} />
      {[-40, 0, 40].map((a) => (
        <line key={a} x1={hx} y1={-766} x2={hx + (hx < 0 ? -1 : 1) * 46} y2={-766 + a * 0.6} stroke={shade(STRAW, 0.25)} strokeWidth={8} strokeLinecap="round" />
      ))}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={240} ry={22} fill={C.shadow} />
        {/* pole, crossbar */}
        <rect x={-11} y={-1000} width={22} height={1000} rx={6} fill={WOOD} />
        <rect x={-330} y={-770} width={660} height={22} rx={10} fill={WOOD} />
        {/* trousers and boots, both touching the ground */}
        <rect x={-140} y={-440} width={124} height={412} rx={22} fill={trousers} />
        <rect x={16} y={-440} width={124} height={412} rx={22} fill={trousers} />
        <rect x={-120} y={-300} width={60} height={46} rx={8} fill={C.yellow} />
        <rect x={-150} y={-40} width={140} height={40} rx={14} fill={C.brownDark} />
        <rect x={10} y={-40} width={140} height={40} rx={14} fill={C.brownDark} />
        {/* shirt with patches, stitched in dashes */}
        <rect x={-150} y={-800} width={300} height={400} rx={46} fill={shirt} />
        <rect x={-120} y={-700} width={70} height={58} rx={8} fill={C.yellow} />
        <rect x={-120} y={-700} width={70} height={58} rx={8} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="6 6" opacity={0.5} />
        <rect x={30} y={-560} width={90} height={70} rx={10} fill={C.greenDark} />
        <rect x={30} y={-560} width={90} height={70} rx={10} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="6 6" opacity={0.5} />
        <rect x={-150} y={-470} width={300} height={22} fill={shade(shirt, 0.25)} opacity={0.5} />
        {/* sleeves and straw hands */}
        <rect x={-300} y={-800} width={164} height={74} rx={30} fill={shade(shirt, 0.1)} />
        <rect x={136} y={-800} width={164} height={74} rx={30} fill={shade(shirt, 0.1)} />
        {hand(-320)}
        {hand(320)}
        <g transform={`rotate(${f1(top)} 0 -830)`}>
          {/* neck and sack-cloth head */}
          <rect x={-26} y={-846} width={52} height={40} fill={shade(BURLAP, 0.1)} />
          <ellipse cx={8} cy={-926} rx={88} ry={98} fill={shade(BURLAP, 0.15)} />
          <ellipse cx={0} cy={-930} rx={86} ry={96} fill={BURLAP} />
          <path d="M 0 -1024 Q -4 -930 0 -836" stroke={shade(BURLAP, 0.4)} strokeWidth={4} strokeDasharray="6 7" fill="none" opacity={0.7} />
          <circle cx={-34} cy={-950} r={12} fill={C.ink} />
          <circle cx={34} cy={-950} r={12} fill={C.ink} />
          <circle cx={-30} cy={-954} r={4} fill={C.white} />
          <circle cx={38} cy={-954} r={4} fill={C.white} />
          <circle cx={-54} cy={-918} r={11} fill={C.pink} opacity={0.5} />
          <circle cx={54} cy={-918} r={11} fill={C.pink} opacity={0.5} />
          <path d="M -6 -930 L 6 -918 M 6 -930 L -6 -918" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <path d="M -36 -896 Q 0 -868 36 -896" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeDasharray="9 7" fill="none" />
          {/* straw hat: brim, crown, band */}
          <ellipse cx={0} cy={-1030} rx={180} ry={36} fill={STRAW} />
          <path d="M -92 -1030 C -96 -1110 -60 -1126 0 -1126 C 60 -1126 96 -1110 92 -1030 Z" fill={STRAW} />
          <rect x={-92} y={-1062} width={184} height={20} rx={6} fill={C.brownDark} />
        </g>
      </g>
    </g>
  );
}
