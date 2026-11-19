import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Tuna (preset of flat-vector/fish): sleek torpedo, navy back, silver belly, small yellow finlets, fork tail.
const LOOK = {"len": 320, "bodyH": 125, "shape": "torpedo", "head": "normal", "color": "#B5BFCC", "belly": "#E4E9F0", "back": "#1F3B6E", "finColor": "#22406F", "tail": "fork", "tailSize": 170, "dorsal": "small", "pattern": "none", "eyeSize": 0.8, "eyeType": "dot", "mouth": "closed", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s: number = q.s ?? 1, f: number = q.f ?? 0, pose: string = q.pose ?? "swim", len: number = q.len, H: number = q.bodyH, H2 = H / 2, hx = len / 2;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1000;
  const bob = pose === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  // replicate the generator's body wave so the finlets stay on the body edge
  const ph = pose === "dart" ? f * 0.5 : pose === "swim" ? f * 0.2 : f * 0.05;
  const waveA = pose === "dart" ? len * 0.07 : pose === "swim" ? len * 0.035 : pose === "idle" ? len * 0.012 : 0;
  const wave = (t: number) => waveA * Math.pow(t, 1.6) * Math.sin(ph - t * 2.4);
  const tor = (t: number) => (t < 0.3 ? Math.sqrt(Math.max(0, 1 - Math.pow((0.3 - t) / 0.3, 2))) : Math.max(0.1, 1 - 0.9 * Math.pow((t - 0.3) / 0.7, 1.7)));
  const X = (t: number) => hx - t * len;
  const edge = (t: number, side: number) => tor(t) * H2 * side + wave(t);
  const finlet = (t0: number, side: number) => {
    const a = [X(t0), edge(t0, side)], b = [X(t0 + 0.07), edge(t0 + 0.07, side)];
    const tip = [X(t0 + 0.035) - len * 0.03, edge(t0 + 0.035, side) + side * H * 0.17];
    return `M ${a[0]} ${a[1]} L ${tip[0]} ${tip[1]} L ${b[0]} ${b[1]} Z`;
  };
  const finlets = [0.8, 0.88].flatMap((t0) => [-1, 1].map((side) => <path key={`${t0}${side}`} d={finlet(t0, side)} fill="#FFC83D" />));
  return (
    <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
      <Fish {...q} x={0} y={0} s={1} flip={false} vx={0} />
      <g transform={`translate(0 ${bob})`}>{finlets}</g>
    </g>
  );
}
