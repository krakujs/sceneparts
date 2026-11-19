import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Watering can standing on its base, long spout to the right with a rose, arched handle on the back. Origin = floor under the base.
// Hero scale: about 440 px wide and 400 px tall at s = 1; use about 0.3 next to a person.
// anim "pour": the can tilts toward the spout and water drops fall from the rose.
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
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.greenDark;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "pour" ? -(0.5 - 0.5 * Math.cos((f * 2 * Math.PI) / 90)) * 16 : 0;
  const drops = [0, 1, 2].map((i) => {
    const u = anim === "pour" ? ((f / 30 + i / 3) % 1) : 0.3 + i * 0.25;
    return { x: 300 + u * 30, y: -300 + u * u * 300, o: anim === "pour" ? 1 - u * 0.6 : 0.8 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={anim === "pour" ? `rotate(${f1(tilt)} 100 0)` : undefined}>
          <path d="M -110 -248 C -150 -390 60 -390 40 -248" fill="none" stroke={trim} strokeWidth={22} strokeLinecap="round" />
          <line x1={96} y1={-164} x2={262} y2={-300} stroke={trim} strokeWidth={28} strokeLinecap="round" />
          <rect x={-130} y={-250} width={230} height={236} rx={44} fill={body} />
          <rect x={-120} y={-14} width={210} height={14} rx={7} fill={shade(body, 0.25)} />
          <rect x={-132} y={-168} width={234} height={14} rx={6} fill={shade(body, 0.15)} />
          <rect x={-40} y={-266} width={40} height={18} rx={6} fill={trim} />
          <rect x={-100} y={-230} width={22} height={170} rx={11} fill={C.white} opacity={0.22} />
          <ellipse cx={282} cy={-318} rx={20} ry={36} transform="rotate(-38 282 -318)" fill={trim} />
          <ellipse cx={282} cy={-318} rx={10} ry={22} transform="rotate(-38 282 -318)" fill={shade(trim, 0.3)} />
        </g>
        {drops.map((d, i) => (
          <circle key={i} cx={Number(f1(d.x))} cy={Number(f1(d.y))} r={9} fill={C.skyDeep} opacity={d.o} />
        ))}
      </g>
    </g>
  );
}
