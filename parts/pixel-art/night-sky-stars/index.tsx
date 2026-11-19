import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, asTime, snap } from "../backdrop/index";
import { Pixels, gridOf, PAL } from "../style/index";

// Night sky stars: a full-frame starry night (or deep space) with a pixel moon, twinkling stars and a shooting
// star. No ground. anim "shoot" twinkles the stars and fires a shooting star every few seconds from p.f.

const MOON = gridOf([
  "..wwww..",
  ".wwwwgw.",
  "wwgwwwww",
  "wwwwwwgw",
  "wwwwwwww",
  "wgwwwwww",
  ".wwwgww.",
  "..wwww..",
]);
const MOON_PAL = { ...PAL, w: "#fff3c4", g: "#d9cb8f" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time ?? "night");
  const shoot = (p.anim ?? "shoot") === "shoot";
  const f = shoot ? p.f : 0;
  const cycle = 240;
  const phase = f % cycle;
  const streak = shoot && phase < 36;
  const hx = snap(180 + phase * 18);
  const hy = snap(220 + phase * 9);
  return (
    <g>
      <PixSky time={time === "space" ? "space" : "night"} to={1920} f={f} clouds={0} seed={p.seed ?? 10} drift={false} body={false} />
      <circle cx={790} cy={230} r={190} fill="#fff3c4" opacity={0.08} />
      <Pixels grid={MOON} px={24} pal={MOON_PAL} x={740} y={150} />
      {streak &&
        [0, 1, 2, 3, 4, 5].map((k) => (
          <rect
            key={k}
            x={snap(hx - k * 24)}
            y={snap(hy - k * 12)}
            width={12}
            height={12}
            fill="#fff3c4"
            opacity={1 - k * 0.15}
          />
        ))}
    </g>
  );
}
