import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Podcast microphone: big round foam head, shock-mount ring and a desk boom arm on a weighted base.
// Origin = bottom centre (the desk line). Room scale: at s = 1 about 480 px wide and 800 px tall. Use s about 0.4–0.5 for a desk scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const DOTS: [number, number][] = [-50, 0, 50].flatMap((dx) => [-50, 0, 50].map((dy): [number, number] => [dx, dy])).filter(([dx, dy]) => !(dx === 0 && dy === 0));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const led = anim === "pulse" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-150} y={-60} width={300} height={60} rx={30} fill={frame} />
        <rect x={-22} y={-420} width={44} height={365} rx={8} fill={frame} />
        <path d="M0,-420 L220,-540" fill="none" stroke={frame} strokeWidth={30} strokeLinecap="round" />
        <circle cx={0} cy={-420} r={34} fill={shade(frame, 0.2)} />
        {/* mic body, shock-mount ring, then the round foam head */}
        <rect x={165} y={-620} width={110} height={150} rx={24} fill={shade(body, 0.2)} />
        <ellipse cx={220} cy={-540} rx={118} ry={30} fill="none" stroke={frame} strokeWidth={18} />
        <circle cx={220} cy={-690} r={110} fill={body} />
        <circle cx={220} cy={-690} r={80} fill="none" stroke={shade(body, 0.25)} strokeWidth={10} />
        {DOTS.map(([dx, dy]) => (
          <circle key={`${dx}-${dy}`} cx={220 + dx} cy={-690 + dy} r={9} fill={C.white} opacity={0.3} />
        ))}
        <circle cx={220} cy={-498} r={10} fill={C.red} opacity={led} />
      </g>
    </g>
  );
}
