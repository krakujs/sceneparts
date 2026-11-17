import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long spirit level lying on the floor: chunky body with three glass vials, each with a green bubble.
// Origin = floor centre. Hero size: about 480 px long at s = 1.
// anim "tilt": the level rocks and the bubbles run to the high end; "bubble": the bubbles drift in place.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const bubble = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const ang = anim === "tilt" ? 3 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const clamp = (v: number) => Math.max(-22, Math.min(22, v));
  const dx = anim === "tilt" ? clamp(-ang * 7) : anim === "bubble" ? 22 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const VIALS = [-150, 0, 150];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(ang)} 0 -30)`}>
        <g transform={motion(anim === "pop" ? "pop" : "none", f)}>
          <rect x={-240} y={-60} width={480} height={60} rx={14} fill={body} />
          <rect x={-240} y={-60} width={34} height={60} rx={14} fill={shade(body, 0.2)} />
          <rect x={206} y={-60} width={34} height={60} rx={14} fill={shade(body, 0.2)} />
          <rect x={-200} y={-56} width={400} height={8} rx={4} fill={C.white} opacity={0.3} />
          {VIALS.map((vx) => (
            <g key={vx}>
              <rect x={vx - 40} y={-46} width={80} height={32} rx={16} fill={C.white} opacity={0.9} />
              <rect x={vx - 18 + dx} y={-39} width={36} height={18} rx={9} fill={bubble} />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
