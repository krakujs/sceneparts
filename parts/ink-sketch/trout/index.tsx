import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";
import { ink } from "../style/index";

// Trout (preset of ink-sketch/fish): olive-green back, pink side stripe, black speckles, fork tail.
const LOOK = {"len": 215, "bodyH": 85, "shape": "torpedo", "head": "normal", "color": "#8F9E55", "belly": "#EEE8CF", "back": "#5C6B2F", "finColor": "#7F8F45", "tail": "fork", "tailSize": 150, "dorsal": "small", "pattern": "speckles", "patternColor": "#232323", "eyeSize": 1.1, "eyeType": "eye", "mouth": "closed", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s: number = q.s ?? 1, f: number = q.f ?? 0, pose: string = q.pose ?? "swim", len: number = q.len, H: number = q.bodyH, H2 = H / 2, hx = len / 2;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1000;
  const bob = pose === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  const ph = pose === "dart" ? f * 0.5 : pose === "swim" ? f * 0.2 : f * 0.05;
  const waveA = pose === "dart" ? len * 0.07 : pose === "swim" ? len * 0.035 : pose === "idle" ? len * 0.012 : 0;
  const wave = (t: number) => waveA * Math.pow(t, 1.6) * Math.sin(ph - t * 2.4);
  const tor = (t: number) => (t < 0.3 ? Math.sqrt(Math.max(0, 1 - Math.pow((0.3 - t) / 0.3, 2))) : Math.max(0.1, 1 - 0.9 * Math.pow((t - 0.3) / 0.7, 1.7)));
  const X = (t: number) => hx - t * len;
  // pink lateral stripe along the lower half of the body
  const yAt = (t: number, k: number) => wave(t) + k * tor(t) * H2;
  const ts = Array.from({ length: 17 }, (_, i) => 0.14 + (0.76 * i) / 16);
  const up = ts.map((t) => `${X(t).toFixed(1)} ${yAt(t, 0.05).toFixed(1)}`);
  const lo = [...ts].reverse().map((t) => `${X(t).toFixed(1)} ${yAt(t, 0.28).toFixed(1)}`);
  const stripe = `M ${up.join(" L ")} L ${lo.join(" L ")} Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
      <Fish {...q} x={0} y={0} s={1} flip={false} vx={0} />
      {ink(
        <g data-split>
      <g transform={`translate(0 ${bob})`}><path d={stripe} fill="#E8608F" /></g>
        </g>,
        4,
      )}
    </g>
  );
}
