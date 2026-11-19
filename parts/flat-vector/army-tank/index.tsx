import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic cartoon military tank, side view, facing right: track belt with roadwheels, sloped hull, turret with a
// hatch and periscope, long gun barrel. No insignia, no flags, no words. Origin = floor centre; the tracks stand on y.
// About 900 px wide and 300 px tall at s = 1. anim "drive": the roadwheels turn and the tank rocks a little.
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
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const track = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -2 : 0;
  const roller = (cx: number, cy: number, r: number, hub: string) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.ink} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill={hub} />
      <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
        {[0, 1, 2].map((k) => (
          <rect key={k} x={cx - r * 0.1} y={cy - r * 0.6} width={r * 0.2} height={r * 1.2} rx={4} fill={shade(hub, 0.25)} transform={`rotate(${k * 60} ${cx} ${cy})`} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r * 0.14} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={430} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* track belt and roadwheels */}
          <rect x={-390} y={-100} width={780} height={100} rx={50} fill={track} />
          {[-300, -200, -100, 0, 100, 200, 300].map((cx) => <g key={cx}>{roller(cx, -50, 38, C.greyLight)}</g>)}
          {roller(-352, -50, 46, C.greyLight)}
          {roller(352, -50, 46, C.greyLight)}
          {/* hull */}
          <path d="M -380 -100 L -350 -168 L 350 -168 L 400 -100 Z" fill={body} />
          <rect x={-370} y={-124} width={740} height={22} fill={shade(body, 0.22)} />
          <rect x={-380} y={-158} width={150} height={20} rx={8} fill={shade(body, 0.18)} />
          {/* turret ring, turret, hatch, periscope */}
          <rect x={-200} y={-184} width={400} height={18} rx={9} fill={shade(body, 0.2)} />
          <path d="M -190 -168 L -170 -262 Q -160 -300 -110 -300 L 110 -300 Q 160 -300 170 -262 L 190 -168 Z" fill={body} />
          <circle cx={-40} cy={-300} r={22} fill={shade(body, 0.18)} />
          <rect x={120} y={-290} width={34} height={18} rx={5} fill={C.sky} />
          {/* gun barrel and muzzle */}
          <rect x={150} y={-248} width={330} height={30} rx={10} fill={C.greyDark} />
          <rect x={468} y={-256} width={30} height={46} rx={6} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
