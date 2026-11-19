import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Retro two-tone camper van, side view, facing right: rounded bubble body, coloured lower half, white upper half,
// a roof rack, and curtains in the windows. Generic shape, not a copy of any known van.
// Room scale: about 710 px wide and 380 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": the wheels spin and the body bounces a little; vx moves it along x (px per frame).
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
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
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
  // one window with a curtain hanging from the top on each side
  const pane = (px: number, py: number, w: number, h: number) => (
    <g key={`${px}-${py}`}>
      <rect x={px} y={py} width={w} height={h} rx={16} fill={C.sky} />
      <rect x={px + 6} y={py + 4} width={30} height={46} rx={6} fill={C.yellow} />
      <rect x={px + w - 36} y={py + 4} width={30} height={46} rx={6} fill={C.yellow} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* rounded bubble body: white upper half, coloured lower half */}
          <path d="M -330 -60 L -330 -260 Q -330 -340 -250 -350 L 150 -350 Q 300 -350 330 -230 Q 345 -180 345 -120 L 345 -60 Q 345 -40 325 -40 L -310 -40 Q -330 -40 -330 -60 Z" fill={C.white} />
          <path d="M -330 -60 L -330 -190 L 345 -190 L 345 -60 Q 345 -40 325 -40 L -310 -40 Q -330 -40 -330 -60 Z" fill={body} />
          <rect x={-330} y={-66} width={675} height={26} rx={10} fill={shade(body, 0.25)} />
          {/* roof rack */}
          <rect x={-250} y={-362} width={400} height={10} rx={5} fill={C.greyDark} />
          <rect x={-230} y={-352} width={8} height={14} fill={C.greyDark} />
          <rect x={130} y={-352} width={8} height={14} fill={C.greyDark} />
          {/* windows with curtains */}
          {pane(-270, -320, 120, 90)}
          {pane(-130, -320, 120, 90)}
          {pane(20, -320, 90, 90)}
          <path d="M 150 -322 Q 228 -318 300 -226 L 150 -226 Z" fill={C.sky} />
          {/* side door seam and lights */}
          <rect x={6} y={-190} width={6} height={150} fill={shade(body, 0.22)} />
          <circle cx={336} cy={-150} r={14} fill={C.yellow} />
          <rect x={-336} y={-170} width={10} height={36} rx={4} fill={C.red} />
          <rect x={316} y={-62} width={40} height={22} rx={10} fill={C.greyDark} />
          <rect x={-352} y={-62} width={30} height={22} rx={10} fill={C.greyDark} />
          {arch(-200, 72)}
          {arch(210, 72)}
        </g>
        {wheel(-200, 72)}
        {wheel(210, 72)}
      </g>
    </g>
  );
}
