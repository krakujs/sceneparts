import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector wallaby: a smaller grey-brown kangaroo relative with darker paws and shorter ears.
// Origin = feet (bottom centre), faces right, honours flip. About 450 px tall at s = 1.
// pose stand: upright, ears and tail twitch from p.f. pose hop: bounds into the air from p.f.

type P = [number, number];
const FUR = "#8E7A6A", DARK = shade(FUR, 0.22), BELLY = "#CDBBA8", PAW = "#2E2622", EAR_IN = "#D9BFB0", EYE = "#1F2433", NOSE = "#2A1C18";
const K = 0.68; // overall size of the drawing against the kangaroo proportions

const limb = (a: P, b: P, w0: number, w1: number, col: string) =>
  taper(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

function Leg({ dx, col }: { dx: number; col: string }) {
  return (
    <g transform={`translate(${dx} 0)`}>
      {limb([-10, -330], [40, -190], 100, 70, col)}
      {limb([40, -190], [0, -50], 66, 44, col)}
      <ellipse cx={34} cy={-20} rx={104} ry={22} fill={PAW} />
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, hop = p.pose === "hop";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const ph = f * 0.12;
  const air = hop ? Math.max(0, Math.sin(ph)) : 0;
  const lift = -air * 150;
  const tilt = hop ? -Math.sin(ph) * 5 : Math.sin(f / 20) * 1.5;
  const earTw = Math.sin(f / 9) * 6, tailTw = Math.sin(f / 12) * 6;

  return (
    <g transform={`translate(${x} ${y + lift}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${K})`}>
        <g transform={`rotate(${tilt} 0 -330)`}>
          {taper([-70, -330], [-230, -260], [-180 + tailTw, -18], 74, 24, FUR, undefined, true)}
          <Leg dx={-34} col={DARK} />
          {taper([60, -470], [80, -440], [108, -418], 24, 16, DARK, undefined, true)}
          <ellipse cx={112} cy={-416} rx={14} ry={12} fill={PAW} />
          <ellipse cx={10} cy={-420} rx={80} ry={118} fill={FUR} transform="rotate(-14 10 -420)" />
          <ellipse cx={44} cy={-400} rx={40} ry={82} fill={BELLY} />
          {taper([50, -500], [78, -530], [100, -560], 72, 58, FUR, undefined, true)}
          <g transform={`rotate(${earTw} 110 -630)`}>
            {taper([110, -600], [118, -640], [124, -660], 28, 9, DARK, undefined, true)}
            {taper([112, -598], [118, -630], [122, -646], 12, 4, EAR_IN)}
          </g>
          <Leg dx={0} col={FUR} />
          {taper([50, -480], [78, -450], [110, -428], 26, 18, FUR, undefined, true)}
          <ellipse cx={114} cy={-424} rx={16} ry={13} fill={PAW} />
          <circle cx={110} cy={-592} r={48} fill={FUR} />
          <ellipse cx={152} cy={-574} rx={42} ry={30} fill={BELLY} />
          <ellipse cx={184} cy={-576} rx={11} ry={8} fill={NOSE} />
          <circle cx={116} cy={-604} r={7} fill={EYE} />
          <circle cx={118} cy={-606} r={2.5} fill="#FFFFFF" />
          <path d="M 142 -554 Q 156 -546 170 -552" fill="none" stroke={NOSE} strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
