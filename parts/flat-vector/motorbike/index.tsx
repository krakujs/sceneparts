import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Road motorcycle, side view, facing right: two spoked wheels, a frame, engine block, fuel tank, seat,
// front fork with headlight and handlebar, exhaust pipe and tail light. Room scale: about 620 px wide,
// 380 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.6} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.55} width={r * 0.14} height={r * 0.55} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.17} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 12 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const frame = C.greyDark;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* frame: swingarm, down tube, and fork */}
          <path d="M -230 -105 L -60 -150 L 110 -140" stroke={frame} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M -40 -170 L 150 -310" stroke={frame} strokeWidth={20} strokeLinecap="round" fill="none" />
          <path d="M 230 -105 L 160 -320" stroke={frame} strokeWidth={22} strokeLinecap="round" fill="none" />
          {/* exhaust pipe and silencer */}
          <path d="M -100 -140 L -190 -110" stroke={C.greyDark} strokeWidth={18} strokeLinecap="round" fill="none" />
          <rect x={-225} y={-130} width={60} height={28} rx={12} fill={C.greyDark} />
          {/* engine block */}
          <rect x={-90} y={-190} width={130} height={62} rx={16} fill={C.inkSoft} />
          {/* fuel tank and seat */}
          <path d="M -70 -290 L 80 -290 Q 110 -290 110 -260 L 110 -226 L -70 -226 Z" fill={body} />
          <rect x={-70} y={-282} width={180} height={10} rx={5} fill={shade(body, 0.2)} />
          <rect x={-200} y={-240} width={150} height={34} rx={14} fill={C.ink} />
          {/* tail light */}
          <rect x={-222} y={-258} width={18} height={26} rx={6} fill={C.red} />
          {/* front fender, headlight and handlebar */}
          <path d="M 150 -150 Q 230 -170 270 -120 L 230 -110 Q 190 -130 150 -120 Z" fill={body} />
          <circle cx={200} cy={-348} r={34} fill={C.yellow} />
          <path d="M 150 -330 L 124 -360 M 170 -330 L 196 -368" stroke={C.inkSoft} strokeWidth={12} strokeLinecap="round" fill="none" />
        </g>
        {wheel(-230, -105, 105, rim, spin)}
        {wheel(230, -105, 105, rim, spin)}
      </g>
    </g>
  );
}
