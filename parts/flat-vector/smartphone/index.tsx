import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Smartphone: modern slab phone, thin bezel, generic app grid. Origin = bottom centre (the phone stands on y).
// anim "glow": the screen brightens and flickers, with a soft halo around the body.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const ICONS = [C.blue, C.teal, C.orange, C.pink, C.yellow, C.purple, C.green, C.red, C.lime, C.blue, C.teal, C.pink, C.orange, C.purple, C.green, C.yellow];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const wall = p.screen && p.screen !== "none" ? p.screen : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const glowing = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const flick = 0.5 + 0.5 * Math.sin(f * 1.7) * Math.sin(f * 0.53 + 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {glowing && <rect x={-176} y={-646} width={352} height={666} rx={76} fill={wall} opacity={0.12 + 0.18 * breathe} />}
        <rect x={-150} y={-620} width={300} height={620} rx={48} fill={body} />
        <rect x={-134} y={-604} width={268} height={548} rx={30} fill={wall} />
        <circle cx={62} cy={-400} r={110} fill={C.white} opacity={0.14} />
        <circle cx={0} cy={-584} r={7} fill={C.ink} />
        {ICONS.map((col, i) => {
          const cx = -84 + (i % 4) * 56, cy = -526 + Math.floor(i / 4) * 70;
          const k = i % 3;
          return (
            <g key={i}>
              <rect x={cx - 26} y={cy} width={52} height={52} rx={14} fill={col} />
              {k === 0 && <circle cx={cx} cy={cy + 26} r={11} fill={C.white} opacity={0.85} />}
              {k === 1 && <rect x={cx - 14} y={cy + 22} width={28} height={8} rx={4} fill={C.white} opacity={0.85} />}
              {k === 2 && <rect x={cx - 11} y={cy + 15} width={22} height={22} rx={5} fill={C.white} opacity={0.85} />}
            </g>
          );
        })}
        <rect x={-120} y={-134} width={240} height={60} rx={26} fill={C.white} opacity={0.45} />
        {[-84, -28, 28, 84].map((cx, i) => (
          <rect key={i} x={cx - 20} y={-124} width={40} height={40} rx={11} fill={ICONS[i * 3 + 2]} />
        ))}
        <rect x={-36} y={-64} width={72} height={6} rx={3} fill={C.ink} opacity={0.45} />
        {glowing && <rect x={-134} y={-604} width={268} height={548} rx={30} fill={C.white} opacity={0.03 + 0.09 * flick * (0.6 + 0.4 * breathe)} />}
      </g>
    </g>
  );
}
