import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL } from "../style/index";
import { PixSky, Far, GroundBand, Icon, PixText, Panel } from "../backdrop/index";

// Level complete screen: bright full-frame results screen (reference for win screens). A banner, three stars that
// pop in one after another with a small overshoot, and a score that tallies up from p.f.

const STARS = [
  { x: 240, start: 30 },
  { x: 470, start: 50 },
  { x: 700, start: 70 },
];
const CELL = 14;
const STAR_W = 10 * CELL;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const pop = (p.anim ?? "pop") === "pop";
  const target: number = p.score ?? 12450;
  const shown = pop ? Math.min(target, Math.max(0, Math.floor(((p.f - 30) * target) / 90))) : target;
  const digits = String(Math.max(0, shown)).padStart(6, "0");
  return (
    <g>
      <PixSky time="day" to={1600} f={p.f} clouds={3} seed={12} drift={pop} />
      <Far kind="hills" base={1600} time="day" seed={13} maxH={300} />
      <GroundBand y={1600} top="grass" body="dirt" />
      <Panel x={90} y={300} w={900} h={240} />
      <PixText x={540} y={470} text={p.title ?? "LEVEL COMPLETE!"} size={64} fill={PAL.y} />
      {STARS.map((s, i) => {
        const k = pop ? Math.min(1, Math.max(0, (p.f - s.start) / 8)) : 1;
        const sc = pop ? (p.f < s.start ? 0 : 0.5 + 0.5 * k) : 1;
        const cx = s.x + STAR_W / 2, cy = 880 + STAR_W / 2;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})`}>
            {sc > 0 && <Icon name="star" x={s.x} y={880} cell={CELL} />}
          </g>
        );
      })}
      <PixText x={540} y={1180} text="SCORE" size={44} fill={PAL.w} />
      <PixText x={540} y={1300} text={digits} size={92} fill={PAL.y} />
    </g>
  );
}
