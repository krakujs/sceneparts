import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open-wheel single-seater race car, side view, facing right: long low monocoque, exposed wheels, front wing and rear wing,
// a round number disc on the flank (no digits). Room scale: about 800 px wide and 250 px tall at s = 1.
// Origin = floor centre; the tyres stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 10 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={rim} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={shade(rim, 0.35)} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={410} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* rear wing on two posts */}
          <rect x={-330} y={-200} width={12} height={130} rx={4} fill={C.greyDark} />
          <rect x={-372} y={-222} width={130} height={22} rx={8} fill={body} />
          <rect x={-372} y={-242} width={12} height={44} rx={4} fill={shade(body, 0.3)} />
          {/* monocoque and nose */}
          <path d="M -280 -62 L -280 -110 Q -280 -134 -250 -136 L -130 -142 L -40 -186 L 40 -186 L 180 -140 L 300 -108 Q 340 -96 340 -72 L 340 -62 Z" fill={body} />
          {/* cockpit opening */}
          <rect x={-40} y={-180} width={90} height={30} rx={12} fill={C.ink} />
          {/* sidepod stripe */}
          <rect x={-270} y={-92} width={580} height={10} rx={5} fill={shade(body, 0.3)} />
          {/* round number disc (blank) */}
          <circle cx={-150} cy={-112} r={40} fill={C.white} />
          <circle cx={-150} cy={-112} r={26} fill={C.ink} />
          {/* front wing */}
          <rect x={300} y={-50} width={120} height={14} rx={6} fill={C.greyDark} />
          <rect x={398} y={-84} width={12} height={48} rx={4} fill={C.greyDark} />
          {arch(-200, 68)}
          {arch(215, 70)}
        </g>
        {wheel(-200, 68)}
        {wheel(215, 70)}
      </g>
    </g>
  );
}
