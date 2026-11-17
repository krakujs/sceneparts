import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden workbench with a thick top, a drawer apron, two drawer fronts and square legs.
// Optional pegboard behind it with a hammer and a wrench hanging on hooks. Room scale.
// Origin = floor centre under the bench. Size at s = 1: about 920 px wide; about 880 px tall with the pegboard.
// anim "swing": the hanging tools swing on their hooks.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const swing = (anim: string, f: number) => (anim === "swing" ? f1(Math.sin((f * 2 * Math.PI) / 50) * 8) : "0");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : "#B07A4F";
  const board = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const pegboard = p.pegboard !== false;
  const anim: string = p.anim ?? "none";
  const sw = swing(anim, f);
  const holes: React.ReactElement[] = [];
  for (let gx = -380; gx <= 380; gx += 60) for (let gy = -840; gy <= -520; gy += 60) {
    holes.push(<circle key={`${gx}-${gy}`} cx={gx} cy={gy} r={6} fill={shade(board, 0.45)} opacity={0.6} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={480} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {pegboard && (
          <g>
            <rect x={-420} y={-880} width={840} height={400} rx={10} fill={board} />
            {holes}
            <g transform={`rotate(${sw} -260 -800)`}>
              <rect x={-266} y={-790} width={12} height={110} rx={6} fill={C.brown} />
              <rect x={-290} y={-800} width={60} height={26} rx={6} fill={C.greyDark} />
              <rect x={-282} y={-806} width={44} height={8} rx={4} fill={C.greyLight} opacity={0.6} />
            </g>
            <g transform={`rotate(${f1(-Number(sw) * 0.6)} 60 -820)`}>
              <rect x={50} y={-820} width={20} height={150} rx={8} fill={C.greyDark} />
              <circle cx={60} cy={-822} r={24} fill={C.greyDark} />
              <circle cx={60} cy={-822} r={9} fill={board} />
            </g>
          </g>
        )}
        <rect x={-460} y={-480} width={920} height={44} rx={10} fill={wood} />
        <rect x={-450} y={-476} width={900} height={8} rx={4} fill={C.white} opacity={0.2} />
        <rect x={-420} y={-436} width={840} height={60} rx={6} fill={shade(wood, 0.12)} />
        <rect x={-400} y={-428} width={340} height={44} rx={6} fill={shade(wood, 0.3)} />
        <rect x={60} y={-428} width={340} height={44} rx={6} fill={shade(wood, 0.3)} />
        <circle cx={-230} cy={-406} r={9} fill={C.greyDark} />
        <circle cx={230} cy={-406} r={9} fill={C.greyDark} />
        <rect x={-430} y={-392} width={60} height={392} rx={8} fill={shade(wood, 0.2)} />
        <rect x={370} y={-392} width={60} height={392} rx={8} fill={shade(wood, 0.2)} />
        <rect x={-370} y={-170} width={740} height={22} rx={6} fill={shade(wood, 0.2)} />
      </g>
    </g>
  );
}
