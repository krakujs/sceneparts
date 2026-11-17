import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Portable electric heater: a tall body with a recessed grille of four heating bars and a dial on the lower
// front, on a low plinth. anim "glow" makes the bars pulse orange and yellow. Origin = bottom centre, real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.greyLight;
  const dk = shade(c, 0.2);
  const glowing = p.anim === "glow";
  const bars = [-402, -340, -278, -216];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "glow" ? "none" : (p.anim ?? "none"), f)}>
        {/* plinth and body */}
        <rect x={-170} y={-56} width={340} height={56} rx={18} fill={C.greyDark} />
        <rect x={-160} y={-470} width={320} height={420} rx={36} fill={c} />
        <rect x={130} y={-470} width={30} height={420} rx={18} fill={dk} />

        {/* recessed grille with glowing bars */}
        <rect x={-122} y={-430} width={244} height={230} rx={20} fill={dk} />
        {bars.map((by, i) => {
          const g = glowing ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50 - i * 0.7) : 0.6;
          return (
            <g key={by}>
              <rect x={-100} y={by} width={200} height={22} rx={11} fill={C.orange} opacity={0.5 + 0.3 * g} />
              <rect x={-100} y={by + 4} width={200} height={10} rx={5} fill={C.yellow} opacity={0.2 + 0.7 * g} />
            </g>
          );
        })}

        {/* dial and a small light on the lower front */}
        <circle cx={80} cy={-134} r={24} fill={C.white} />
        <rect x={79} y={-150} width={4} height={16} rx={2} fill={C.ink} />
        <circle cx={-80} cy={-134} r={9} fill={C.red} />
        {/* top handle */}
        <rect x={-50} y={-486} width={100} height={20} rx={10} fill={dk} />
      </g>
    </g>
  );
}
