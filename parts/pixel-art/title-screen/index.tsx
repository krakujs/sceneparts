import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, font } from "../style/index";
import { PixSky, Far, GroundBand, PixText, asTime } from "../backdrop/index";

// Title screen: full-frame title splash (reference for title art). Stepped ink shadow and outline under two lines of
// big chunky text, a mountain landscape with no characters, and a PRESS START prompt that blinks from p.f.

const GY = 1600;
const OUTLINE: [number, number][] = [[-12, 0], [12, 0], [0, -12], [0, 12], [-12, -12], [12, 12], [12, -12], [-12, 12]];
const SHADOW: [number, number][] = [[24, 24], [24, 12], [12, 24]];

const Logo: React.FC<{ text: string; x: number; y: number; size: number; fill: string }> = ({ text, x, y, size, fill }) => {
  const base = { x, y, textAnchor: "middle" as const, fontFamily: font, fontWeight: 700, fontSize: size };
  return (
    <g>
      {SHADOW.map(([dx, dy], i) => <text key={"s" + i} {...base} x={x + dx} y={y + dy} fill={PAL.k}>{text}</text>)}
      {OUTLINE.map(([dx, dy], i) => <text key={"o" + i} {...base} x={x + dx} y={y + dy} fill={PAL.k}>{text}</text>)}
      <text {...base} fill={fill}>{text}</text>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const on = (p.anim ?? "blink") === "blink";
  const words: string[] = String(p.title ?? "PIXEL QUEST").split(" ").filter(Boolean);
  const size = words.length > 1 ? 150 : 170;
  const ys = words.length > 1 ? [600, 790] : [680];
  const blinkOn = !on || Math.floor(p.f / 30) % 2 === 0;
  return (
    <g>
      <PixSky time={time} to={GY} f={p.f} clouds={3} seed={14} drift={on} />
      <Far kind="mountains" base={GY} time={time} seed={15} maxH={600} />
      <Far kind="hills" base={GY} time={time} seed={16} maxH={240} />
      <GroundBand y={GY} top="grass" body="dirt" />
      {words.map((w, i) => (
        <Logo key={i} text={w} x={540} y={ys[i] ?? ys[0] + i * 190} size={size} fill={i % 2 ? PAL.o : PAL.y} />
      ))}
      {blinkOn && <PixText x={540} y={1340} text="PRESS START" size={56} fill={PAL.w} />}
    </g>
  );
}
