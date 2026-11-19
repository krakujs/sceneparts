import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld outdoor GPS unit standing on its base: stubby antenna, map screen with generic shapes and a row of buttons.
// Origin = bottom centre (base on y). Hero size, about 300 px wide and 540 px tall at s = 1.
// anim "locate": the position dot pulses and the route dashes run along.
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const loc = anim === "locate";
  const ph = (f % 30) / 30;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-22} y={-540} width={44} height={90} rx={22} fill={shade(body, 0.3)} />
        <rect x={-150} y={-460} width={300} height={460} rx={46} fill={body} />
        <rect x={-132} y={-440} width={16} height={300} rx={8} fill={C.white} opacity={0.25} />
        <rect x={-120} y={-420} width={240} height={290} rx={14} fill={C.ink} />
        <rect x={-108} y={-408} width={216} height={266} rx={8} fill={C.paper} />
        {/* map: park, water, roads and route */}
        <path d="M -108 -340 L -40 -360 L 10 -300 L -30 -260 L -108 -270 Z" fill={C.lime} opacity={0.6} />
        <path d="M 40 -408 C 60 -360 30 -320 108 -300 L 108 -408 Z" fill={C.skyDeep} />
        <path d="M -108 -200 Q -20 -240 30 -170 T 108 -120" fill="none" stroke={C.white} strokeWidth={14} />
        <path d="M -60 -100 L -60 -150 L 20 -150 L 60 -200" fill="none" stroke={C.blue} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={loc ? "16 10" : undefined} strokeDashoffset={loc ? -f * 2 : undefined} />
        {loc && <circle cx={20} cy={-150} r={12 + ph * 16} fill="none" stroke={C.blue} strokeWidth={3} opacity={1 - ph} />}
        <circle cx={20} cy={-150} r={12} fill={C.blue} stroke={C.white} strokeWidth={4} />
        <circle cx={60} cy={-200} r={9} fill={C.red} />
        {/* buttons */}
        {[-90, -30, 30, 90].map((bx) => (
          <g key={bx}>
            <circle cx={bx} cy={-82} r={18} fill={shade(C.greyLight, 0.3)} />
            <circle cx={bx} cy={-86} r={18} fill={C.greyLight} />
          </g>
        ))}
      </g>
    </g>
  );
}
