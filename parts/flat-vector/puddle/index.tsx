import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat oval rain puddle with a sky reflection and ripple rings, seen low and from the side.
// Origin = bottom centre (the puddle lies on y). About 780 px wide and 105 px tall at s = 1.
// anim "ripple" sends rings out from a drop point, looping.
const f1 = (v: number) => v.toFixed(1);
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const RING_X = 60, RING_Y = -62;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const water = pick(p.color, C.skyDeep);
  const sky = pick(p.color2, C.sky);
  const anim: string = p.anim ?? "none";
  const rings: React.ReactElement[] = [];
  if (anim === "ripple") {
    for (let k = 0; k < 3; k++) {
      const t = ((f + k * 30) % 90) / 90;
      const rx = 40 + 260 * t;
      rings.push(
        <ellipse key={k} cx={RING_X} cy={RING_Y} rx={f1(rx) as any} ry={f1(rx * 0.2) as any} fill="none" stroke={C.white} strokeWidth={5} opacity={f1(1 - t) as any} />
      );
    }
  } else {
    rings.push(<ellipse key="s" cx={RING_X} cy={RING_Y} rx={120} ry={30} fill="none" stroke={C.white} strokeWidth={4} opacity={0.5} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-104} rx={392} ry={104} fill={shade(water, 0.3)} />
      <ellipse cx={0} cy={-104} rx={370} ry={92} fill={water} />
      {/* sky reflection and a few cloud glints */}
      <ellipse cx={-40} cy={-122} rx={260} ry={34} fill={sky} opacity={0.9} />
      <ellipse cx={-170} cy={-96} rx={80} ry={9} fill={C.white} opacity={0.6} />
      <ellipse cx={150} cy={-140} rx={60} ry={7} fill={C.white} opacity={0.5} />
      {rings}
    </g>
  );
}
