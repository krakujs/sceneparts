import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Aerosol spray paint can standing on the floor, nozzle pointing right. Plain body with a label band, no text.
// Origin = floor centre under the can. Hero size: about 440 px tall at s = 1.
// anim "spray": puffs of mist drift out of the nozzle.
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
  const cap = p.color2 && p.color2 !== "none" ? p.color2 : C.ink;
  const anim: string = p.anim ?? "none";
  const puffs = [0, 1, 2, 3, 4];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {anim === "spray" && puffs.map((i) => {
          const t = ((f + i * 12) % 60) / 60;
          return (
            <circle key={i} cx={60 + t * 200} cy={-434 - t * 46} r={12 + t * 36} fill={C.white} opacity={(1 - t) * 0.75} />
          );
        })}
        <rect x={-80} y={-350} width={160} height={350} rx={30} fill={body} />
        <rect x={-82} y={-44} width={164} height={44} rx={14} fill={shade(body, 0.25)} />
        <rect x={-80} y={-250} width={160} height={26} fill={C.white} opacity={0.55} />
        <rect x={-62} y={-330} width={14} height={290} rx={7} fill={C.white} opacity={0.25} />
        <rect x={-46} y={-386} width={92} height={40} rx={10} fill={C.greyLight} />
        <rect x={-40} y={-412} width={80} height={36} rx={12} fill={cap} />
        <rect x={-4} y={-424} width={18} height={18} rx={4} fill={cap} />
        <rect x={-14} y={-444} width={64} height={22} rx={9} fill={cap} />
        <rect x={38} y={-444} width={14} height={10} rx={4} fill={shade(cap, 0.3)} />
      </g>
    </g>
  );
}
