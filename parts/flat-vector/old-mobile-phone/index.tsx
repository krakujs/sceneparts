import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Old candybar mobile: chunky body, stubby antenna, small LCD, 4x3 keypad. Origin = bottom centre (stands on y).
// anim "ring": the phone shakes and motion lines pulse beside it.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const KEYS = Array.from({ length: 12 }, (_, i) => ({ cx: [-62, 0, 62][i % 3], cy: -236 + Math.floor(i / 3) * 52 }));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const lcd = p.screen && p.screen !== "none" ? p.screen : "#B5C7A4";
  const anim: string = p.anim ?? "none";
  const ring = anim === "ring";
  const shakeRot = ring ? 3 * Math.sin((f * 2 * Math.PI) / 8) : 0;
  const shakeX = ring ? 5 * Math.sin((f * 2 * Math.PI) / 8) : 0;
  const lineOp = (i: number, side: number) => (ring ? 0.25 + 0.75 * (Math.sin((f * 2 * Math.PI) / 8 + i * 1.2 + side) > 0 ? 1 : 0.2) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${f1(shakeX)} 0) rotate(${f1(shakeRot)} 0 -20)`}>
          <rect x={-16} y={-530} width={32} height={70} rx={16} fill={C.ink} />
          <rect x={-125} y={-470} width={250} height={470} rx={50} fill={body} />
          <rect x={-48} y={-448} width={96} height={12} rx={6} fill={shade(body, 0.4)} />
          <rect x={-100} y={-418} width={200} height={136} rx={12} fill={shade(body, 0.45)} />
          <rect x={-90} y={-408} width={180} height={116} rx={8} fill={lcd} />
          <rect x={-78} y={-396} width={8} height={8} fill={shade(lcd, 0.5)} />
          <rect x={-66} y={-402} width={8} height={14} fill={shade(lcd, 0.5)} />
          <rect x={-54} y={-408} width={8} height={20} fill={shade(lcd, 0.5)} />
          <rect x={50} y={-396} width={30} height={14} rx={3} fill={shade(lcd, 0.5)} />
          <rect x={80} y={-392} width={4} height={6} fill={shade(lcd, 0.5)} />
          {[[-360, 156], [-340, 120], [-320, 140], [-300, 90]].map(([yy, w], i) => (
            <rect key={i} x={-78} y={yy} width={w} height={10} rx={5} fill={shade(lcd, 0.45)} opacity={0.7} />
          ))}
          {KEYS.map((k, i) => (
            <g key={i}>
              <rect x={k.cx - 28} y={k.cy - 14} width={56} height={40} rx={10} fill={shade(C.greyLight, 0.25)} />
              <rect x={k.cx - 28} y={k.cy - 18} width={56} height={40} rx={10} fill={C.greyLight} />
              <circle cx={k.cx} cy={k.cy + 2} r={4} fill={shade(C.greyLight, 0.45)} />
            </g>
          ))}
          <circle cx={0} cy={-30} r={6} fill={shade(body, 0.4)} />
        </g>
        {ring &&
          [0, 1, 2].map((i) => (
            <g key={i} stroke={C.ink} strokeWidth={10} strokeLinecap="round" fill="none">
              <line x1={-170 - i * 6} y1={-360 + i * 34} x2={-196 - i * 6} y2={-360 + i * 34} opacity={lineOp(i, 0)} />
              <line x1={170 + i * 6} y1={-360 + i * 34} x2={196 + i * 6} y2={-360 + i * 34} opacity={lineOp(i, 2)} />
            </g>
          ))}
      </g>
    </g>
  );
}
