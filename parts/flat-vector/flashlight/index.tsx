import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld torch in side view, lying on the floor with its lens pointing right. Origin = floor centre under the torch.
// beam = true adds a light beam from the lens; anim "pulse" makes the beam breathe.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const head = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const beam = p.beam === true;
  const pulse = anim === "pulse" ? 0.75 + 0.25 * Math.sin((f * 2 * Math.PI) / 45) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {beam && (
          <g opacity={pulse}>
            <polygon points="162,-112 500,-230 500,-20 162,-50" fill={C.yellow} opacity={0.32} />
            <polygon points="162,-98 480,-170 480,-40 162,-64" fill={C.white} opacity={0.4} />
          </g>
        )}
        <rect x={-270} y={-118} width={24} height={100} rx={10} fill={shade(body, 0.25)} />
        <rect x={-250} y={-122} width={300} height={108} rx={36} fill={body} />
        <rect x={-250} y={-40} width={300} height={26} rx={13} fill={shade(body, 0.2)} />
        {[-210, -180, -150, -120].map((gx) => (
          <rect key={gx} x={gx} y={-104} width={10} height={76} rx={4} fill={shade(body, 0.2)} />
        ))}
        <rect x={-110} y={-144} width={64} height={24} rx={8} fill={head} />
        <rect x={40} y={-150} width={96} height={150} rx={18} fill={head} />
        <rect x={118} y={-160} width={30} height={160} rx={10} fill={C.grey} />
        <ellipse cx={148} cy={-80} rx={14} ry={60} fill={beam ? "#FFFBE0" : C.greyLight} />
        <ellipse cx={142} cy={-100} rx={5} ry={18} fill={C.white} opacity={0.7} />
      </g>
    </g>
  );
}
