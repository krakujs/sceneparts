import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Toll booth: a small booth with a roof, window and door, beside a striped barrier arm.
// anim "open": the barrier arm lifts from horizontal to about 72 degrees over 40 frames and stays up.
// Origin = floor centre under the booth. Room scale: about 700 px wide and 520 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const t = Math.min(1, Math.max(0, f / 40));
  const lift = anim === "open" ? -72 * (1 - (1 - t) ** 3) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* booth, shifted left of the barrier */}
        <g transform="translate(-120 0)">
          <rect x={-150} y={-460} width={300} height={420} rx={14} fill={body} />
          <rect x={-170} y={-500} width={340} height={54} rx={14} fill={roof} />
          <rect x={-150} y={-210} width={300} height={16} fill={C.orange} />
          <rect x={-110} y={-390} width={220} height={120} rx={14} fill={C.sky} />
          <rect x={-90} y={-370} width={26} height={80} rx={6} fill={C.white} opacity={0.6} />
          <rect x={-120} y={-262} width={240} height={12} rx={6} fill={shade(body, 0.2)} />
          <rect x={60} y={-230} width={62} height={190} rx={6} fill={shade(body, 0.15)} />
          <rect x={-170} y={-40} width={340} height={40} rx={8} fill={C.greyDark} />
        </g>
        {/* barrier pedestal and striped arm */}
        <rect x={100} y={-150} width={40} height={150} fill={C.greyDark} />
        <g transform={`translate(120 -150) rotate(${f1(lift)})`}>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <rect key={k} x={k * 50} y={-11} width={50} height={22} fill={k % 2 ? C.white : C.red} />
          ))}
        </g>
        <circle cx={120} cy={-150} r={24} fill={C.greyDark} />
      </g>
    </g>
  );
}
