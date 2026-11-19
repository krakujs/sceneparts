import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tumble dryer: a lint filter panel with vent slots across the top, a round door with clothes tumbling in the drum,
// and a large dial on the right. Distinct from the washer by its lint panel and default colour.
// anim "spin" turns the drum. Origin = bottom centre, real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const DOOR_Y = -236;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const dk = shade(c, 0.2);
  const spin = (p.anim ?? "none") === "spin" ? (f * 4) % 360 : 0;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim === "spin" ? "none" : (p.anim ?? "none"), f)}>
        {/* cabinet */}
        <rect x={-180} y={-480} width={360} height={470} rx={22} fill={c} />
        <rect x={150} y={-480} width={30} height={470} rx={18} fill={dk} />
        <rect x={-170} y={-12} width={340} height={12} rx={6} fill={C.greyDark} />

        {/* lint filter panel with vent slots */}
        <rect x={-130} y={-462} width={260} height={62} rx={12} fill={dk} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={-112 + i * 40} y={-446} width={24} height={30} rx={6} fill={C.greyDark} />
        ))}

        {/* large dial on the right of the panel */}
        <circle cx={120} cy={-430} r={26} fill={C.greyLight} />
        <rect x={119} y={-446} width={4} height={18} rx={2} fill={C.ink} />

        {/* round door with a tumbling drum */}
        <circle cx={0} cy={DOOR_Y} r={128} fill={C.greyLight} />
        <circle cx={0} cy={DOOR_Y} r={104} fill={C.inkSoft} />
        <g transform={`rotate(${f1(spin)} 0 ${DOOR_Y})`}>
          <rect x={-56} y={DOOR_Y - 72} width={56} height={46} rx={12} fill={C.yellow} />
          <rect x={6} y={DOOR_Y - 26} width={52} height={52} rx={12} fill={C.orange} />
          <circle cx={-40} cy={DOOR_Y + 36} r={22} fill={C.lime} />
          <rect x={-86} y={DOOR_Y - 20} width={34} height={34} rx={10} fill={C.pink} />
        </g>
        <ellipse cx={-54} cy={DOOR_Y - 66} rx={20} ry={9} fill={C.white} opacity={0.3} transform={`rotate(-30 -54 ${DOOR_Y - 66})`} />

        {/* lower vent grille */}
        {[-170, -158, -146].map((vy) => (
          <rect key={vy} x={-110} y={vy} width={220} height={5} rx={2} fill={dk} />
        ))}
      </g>
    </g>
  );
}
