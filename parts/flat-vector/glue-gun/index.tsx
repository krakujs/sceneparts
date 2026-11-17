import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hot glue gun standing on its grip, glue stick entering the back, drip at the nozzle. Origin = floor under the grip.
// Hero size: about 480 px long and 330 px tall at s = 1. anim "pulse": the glue drip swells and shrinks.
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
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const drop = 9 + (anim === "pulse" ? 3 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 30)) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "pulse" ? "none" : anim, f)}>
        <rect x={-270} y={-292} width={120} height={52} rx={14} fill={C.sand} />
        <rect x={-150} y={-240} width={110} height={240} rx={38} fill={body} />
        <rect x={-150} y={-70} width={110} height={70} rx={34} fill={shade(body, 0.2)} />
        <rect x={-160} y={-304} width={300} height={72} rx={30} fill={body} />
        <rect x={-130} y={-294} width={230} height={12} rx={6} fill={C.white} opacity={0.3} />
        <rect x={-40} y={-226} width={24} height={50} rx={10} fill={trim} />
        <rect x={140} y={-276} width={60} height={26} rx={8} fill={trim} />
        <circle cx={200} cy={-263} r={12} fill={trim} />
        <circle cx={200} cy={-244} r={drop} fill={C.yellow} />
      </g>
    </g>
  );
}
