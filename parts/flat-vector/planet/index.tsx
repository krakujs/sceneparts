import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Ringed planet: banded body with a tilted ring that passes behind and in front of the planet.
// Origin = centre of the planet. anim "spin": the bands slide sideways; "float": gentle bob.
const BANDS: [number, number, number][] = [[-150, 26, 0], [-110, 18, 1], [-70, 34, 0], [-22, 22, 1], [22, 40, 0], [76, 24, 1], [122, 30, 0], [165, 14, 1]];
const RING_TILT = -18;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const body = p.color && p.color !== "none" ? p.color : "#E8A25E";
  const ring = p.color2 && p.color2 !== "none" ? p.color2 : "#D9BE8A";
  const anim: string = p.anim ?? "none";
  const dy = anim === "float" ? 14 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const shift = anim === "spin" ? 60 * Math.sin((f * 2 * Math.PI) / 150) : 0;
  const light = shade(body, -0.14), dark = shade(body, 0.14);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${dy.toFixed(1)})`}>
        <ellipse rx={340} ry={96} transform={`rotate(${RING_TILT})`} fill="none" stroke={ring} strokeWidth={34} />
        <defs>
          <clipPath id="sp-planet-clip">
            <circle r={190} />
          </clipPath>
        </defs>
        <circle r={190} fill={body} />
        <g clipPath="url(#sp-planet-clip)">
          <g transform={`translate(${shift.toFixed(1)} 0)`}>
            {BANDS.map(([by, h, alt], i) => <rect key={i} x={-260} y={by} width={520} height={h} fill={alt ? dark : light} opacity={0.75} />)}
          </g>
        </g>
        <path d="M -340 0 A 340 96 0 0 0 340 0" transform={`rotate(${RING_TILT})`} fill="none" stroke={ring} strokeWidth={34} />
      </g>
    </g>
  );
}
