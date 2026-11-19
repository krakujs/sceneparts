import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blacksmith's anvil in side view with the horn pointing left, a waist and a broad foot, a hardy hole and a pritchel hole.
// Room scale. Origin = floor centre under the foot. Size at s = 1: about 810 px wide and 300 px tall.
// anim "ring": the anvil shakes slightly on each strike and sparks fly up from the face.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const spark = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const shake = anim === "ring" && Math.floor(f / 10) % 2 === 0 ? 3 : anim === "ring" ? -3 : 0;
  const sparks = [0, 1, 2];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-60} cy={0} rx={420} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${shake} 0)`}>
          <rect x={-300} y={-70} width={600} height={70} rx={18} fill={shade(body, 0.25)} />
          <polygon points="-190,-70 190,-70 150,-170 -150,-170" fill={body} />
          <path d="M-330,-290 L-466,-236 Q-478,-226 -462,-220 L-330,-160 Z" fill={body} />
          <rect x={-330} y={-290} width={660} height={130} rx={34} fill={body} />
          <rect x={-300} y={-296} width={600} height={12} rx={6} fill={C.white} opacity={0.18} />
          <rect x={-330} y={-180} width={660} height={20} rx={10} fill={shade(body, 0.25)} opacity={0.5} />
          <circle cx={-250} cy={-266} r={12} fill={C.ink} />
          <rect x={150} y={-282} width={26} height={26} rx={4} fill={C.ink} />
          {anim === "ring" && sparks.map((i) => {
            const t = ((f + i * 14) % 42) / 42;
            return <circle key={i} cx={-60 + i * 70 + t * 40} cy={-300 - t * 130} r={7 * (1 - t) + 2} fill={spark} opacity={1 - t} />;
          })}
        </g>
      </g>
    </g>
  );
}
