import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, Title, gridOf, outlined, PAL } from "../style/index";
import { PixSky, Far, GroundBand, PixText, Panel, asTime, snap } from "../backdrop/index";

// Menu screen: full-frame game main menu (reference for title and option screens). Scenery fills the frame, a title
// plate sits high, three options sit in panels and a blinking arrow marks the selected one.

const OPTIONS = ["START", "OPTIONS", "QUIT"];
const ARROW = ["y....", "yy...", "yyy..", "yy...", "y...."];
const GY = 1600;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const name: string = p.name ?? "PIXEL QUEST";
  const lines = name.length > 12 && name.includes(" ") ? name.split(" ") : [name];
  const sel = Math.max(0, OPTIONS.indexOf(p.selected ?? "START"));
  const on = (p.anim ?? "blink") === "blink";
  const showArrow = !on || Math.floor(p.f / 20) % 2 === 0;
  const ys = [1040, 1176, 1312];
  return (
    <g>
      <PixSky time={time} to={GY} f={p.f} clouds={3} seed={10} drift={on} />
      <Far kind="hills" base={GY} time={time} seed={11} maxH={340} />
      <GroundBand y={GY} top="grass" body="dirt" />
      <Title x={540} y={520} lines={lines} size={lines.length > 1 ? 96 : 84} />
      {OPTIONS.map((o, i) => (
        <g key={o}>
          <Panel x={300} y={ys[i] - 60} w={480} h={108} fill={PAL.n} />
          <PixText x={540} y={ys[i] + 18} text={o} size={48} fill={i === sel ? PAL.y : PAL.w} />
        </g>
      ))}
      {showArrow && <Pixels grid={outlined(gridOf(ARROW))} px={18} x={210} y={snap(ys[sel] - 54)} />}
    </g>
  );
}
