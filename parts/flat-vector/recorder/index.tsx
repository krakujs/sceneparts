import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Recorder standing upright: a fipple mouthpiece on top, a straight body with eight finger holes and a flared bell.
// Origin = bottom centre. About 620 px tall at s = 1.
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
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const anim: string = p.anim ?? "none";
  const holes = [-440, -370, -300, -230, -160, -95, -35];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={8} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bell */}
        <path d="M -34 -60 L -50 0 L 50 0 L 34 -60 Z" fill={shade(wood, 0.12)} />
        {/* body */}
        <rect x={-34} y={-520} width={68} height={470} rx={18} fill={wood} />
        <rect x={14} y={-520} width={20} height={470} rx={10} fill={shade(wood, 0.15)} opacity={0.7} />
        {/* finger holes */}
        {holes.map((hy, i) => (
          <circle key={i} cx={-4} cy={hy} r={11} fill={C.brownDark} />
        ))}
        {/* thumb hole on the back, seen as a dark notch at the edge */}
        <circle cx={26} cy={-250} r={8} fill={C.brownDark} />
        {/* windway and mouthpiece */}
        <rect x={-46} y={-580} width={92} height={70} rx={16} fill={shade(wood, 0.08)} />
        <rect x={-46} y={-552} width={92} height={10} rx={4} fill={C.brownDark} opacity={0.5} />
        <rect x={-24} y={-520} width={48} height={12} rx={4} fill={C.ink} opacity={0.5} />
        {/* ferrule */}
        <rect x={-36} y={-530} width={72} height={14} rx={5} fill={C.greyLight} />
        {/* highlight */}
        <rect x={-22} y={-500} width={8} height={400} rx={4} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
