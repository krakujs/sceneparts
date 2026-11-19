import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Twin-bell alarm clock on two short legs. Origin = centre of the feet on the floor.
// anim "ring": the clock shakes and motion lines pulse beside the bells; "tick": the second hand jumps once a second.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const silver = C.greyLight;
  const anim: string = p.anim ?? "none";
  const ring = anim === "ring";
  const tick = anim === "tick" || ring;
  const shakeRot = ring ? 3 * Math.sin((f * 2 * Math.PI) / 8) : 0;
  const shakeX = ring ? 5 * Math.sin((f * 2 * Math.PI) / 8) : 0;
  const hourA = 300 + (tick ? f * 0.008 : 0);
  const minA = 60 + (tick ? f * 0.1 : 0);
  const secA = tick ? Math.floor(f / 30) * 6 : 0;
  const lines = [0, 1, 2];
  const lineOp = (i: number, side: number) => (ring ? 0.25 + 0.75 * (Math.sin((f * 2 * Math.PI) / 8 + i * 1.2 + side) > 0 ? 1 : 0.2) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${f1(shakeX)} 0) rotate(${f1(shakeRot)} 0 -20)`}>
          {[-90, 90].map((lx) => (
            <rect key={lx} x={lx - 15} y={-70} width={30} height={72} rx={12} fill={shade(body, 0.3)} transform={`rotate(${lx < 0 ? -12 : 12} ${lx} -40)`} />
          ))}
          <rect x={-7} y={-412} width={14} height={44} rx={6} fill={C.inkSoft} />
          <circle cx={-125} cy={-335} r={62} fill={silver} />
          <circle cx={125} cy={-335} r={62} fill={silver} />
          <circle cx={-140} cy={-356} r={12} fill={C.white} opacity={0.5} />
          <circle cx={110} cy={-356} r={12} fill={C.white} opacity={0.5} />
          <circle cx={0} cy={-210} r={160} fill={shade(body, 0.2)} />
          <circle cx={-7} cy={-217} r={153} fill={body} />
          <circle cx={0} cy={-217} r={118} fill={C.white} />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`translate(0 -217) rotate(${i * 30})`}>
              <rect x={-4} y={-108} width={8} height={i % 3 === 0 ? 16 : 9} rx={2} fill={C.ink} />
            </g>
          ))}
          <g transform={`translate(0 -217) rotate(${f1(hourA)})`}>
            <line x1={0} y1={8} x2={0} y2={-56} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
          </g>
          <g transform={`translate(0 -217) rotate(${f1(minA)})`}>
            <line x1={0} y1={8} x2={0} y2={-84} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          </g>
          <g transform={`translate(0 -217) rotate(${f1(secA)})`}>
            <line x1={0} y1={12} x2={0} y2={-92} stroke={C.red} strokeWidth={3} strokeLinecap="round" />
          </g>
          <circle cx={0} cy={-217} r={9} fill={C.ink} />
        </g>
        {ring &&
          lines.map((i) => (
            <g key={i} stroke={C.ink} strokeWidth={10} strokeLinecap="round" fill="none">
              <line x1={-210 - i * 6} y1={-380 + i * 34} x2={-236 - i * 6} y2={-380 + i * 34} opacity={lineOp(i, 0)} />
              <line x1={210 + i * 6} y1={-380 + i * 34} x2={236 + i * 6} y2={-380 + i * 34} opacity={lineOp(i, 2)} />
            </g>
          ))}
      </g>
    </g>
  );
}
