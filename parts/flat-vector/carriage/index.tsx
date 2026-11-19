import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Old horse-drawn coach, side view, facing right: a closed body with a roof rail, windows, a door with a handle,
// front lanterns, four wheels (the far pair darker and behind the body) and shafts in front. No horse.
// Origin = floor centre; the wheels stand on y. About 800 px wide and 600 px tall at s = 1.
// anim "drive": the wheels turn and the coach rocks slightly.
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
  const body = p.color && p.color !== "none" ? p.color : C.redDark;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 8 : 0;
  const rock = driving ? Math.sin((f * 2 * Math.PI) / 30) * 0.5 : 0;
  const wheel = (cx: number, r: number, tyre: string, spoke: string) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={tyre} />
      <circle cx={cx} cy={-r} r={r * 0.8} fill={spoke} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={cx - r * 0.06} y={-r - r * 0.72} width={r * 0.12} height={r * 1.44} rx={3} fill={shade(spoke, 0.3)} transform={`rotate(${k * 60} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.14} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(rock)})`}>
          {/* far wheels, darker, behind the body */}
          {wheel(-190, 170, C.greyDark, shade(rim, 0.35))}
          {wheel(250, 140, C.greyDark, shade(rim, 0.35))}
          {/* shafts in front */}
          <rect x={280} y={-190} width={180} height={22} rx={11} fill={C.brownDark} />
          <rect x={280} y={-150} width={180} height={18} rx={9} fill={shade(C.brownDark, 0.2)} />
          {/* body: roof rail, sides, skirt */}
          <rect x={-350} y={-580} width={650} height={22} rx={11} fill={shade(body, 0.2)} />
          <path d="M -330 -230 L -330 -470 Q -330 -560 -240 -560 L 200 -560 Q 290 -560 290 -460 L 290 -230 Z" fill={body} />
          <rect x={-330} y={-262} width={620} height={34} rx={8} fill={shade(body, 0.25)} />
          {/* windows, door window, handle and lamps */}
          <rect x={-270} y={-510} width={130} height={110} rx={12} fill={C.sky} />
          <rect x={-40} y={-440} width={140} height={150} rx={14} fill={C.sky} />
          <circle cx={96} cy={-330} r={9} fill={C.yellow} />
          <rect x={288} y={-430} width={28} height={58} rx={6} fill={C.greyDark} />
          <circle cx={302} cy={-404} r={13} fill={C.yellow} />
          <rect x={-352} y={-430} width={24} height={58} rx={6} fill={C.greyDark} />
          <circle cx={-340} cy={-404} r={12} fill={C.yellow} />
          {/* near wheels in front of the body */}
          {wheel(-214, 170, C.ink, rim)}
          {wheel(214, 140, C.ink, rim)}
        </g>
      </g>
    </g>
  );
}
