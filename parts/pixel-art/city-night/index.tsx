import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, TileRect, asTime, snap, rnd } from "../backdrop/index";

// City night: pixel-art night skyline. Far city silhouette with lit windows, four tall towers framing the edges
// with windows that blink, street lamps and a road and pavement below. The centre sky stays open.

const TOWERS: [number, number, number][] = [
  [0, 168, 300],
  [168, 96, 820],
  [864, 120, 760],
  [984, 96, 280],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 4;
  const blink = (p.anim ?? "blink") !== "none";
  const f = blink ? p.f ?? 0 : 0;
  const litAt = (wx: number, wy: number) => {
    const h = rnd(seed, wx * 31 + wy * 7);
    if (h < 0.4) return false;
    if (!blink) return true;
    return Math.floor((f + h * 300) / 40) % 4 !== 0;
  };
  const lamp = (key: string, x: number) => (
    <g key={key}>
      <circle cx={x + 12} cy={gy - 420} r={150} fill="#f7d154" opacity={blink ? 0.14 + 0.06 * (Math.floor(f / 10) % 2) : 0.18} />
      <rect x={x} y={gy - 440} width={24} height={440} fill="#2a2f4a" />
      <rect x={x - 12} y={gy - 452} width={48} height={18} fill="#f7d154" />
    </g>
  );
  return (
    <g>
      <PixSky time="night" to={gy} f={f} clouds={0} seed={seed} drift={false} />
      <Far kind="city" base={gy} time="night" seed={seed} maxH={620} />
      {TOWERS.map(([x, w, top], ti) => {
        const wins = [];
        for (let wy = top + 36; wy < gy - 60; wy += 48)
          for (let wx = x + 18; wx < x + w - 24; wx += 36)
            if (litAt(wx, wy)) wins.push(<rect key={`${ti}-${wx}-${wy}`} x={wx} y={wy} width={18} height={24} fill="#f7d154" />);
        return (
          <g key={"t" + ti}>
            <rect x={x} y={top} width={w} height={gy - top} fill={ti % 2 ? "#1d2448" : "#171d3e"} />
            <rect x={x} y={top} width={w} height={12} fill="#2c3b6e" />
            {wins}
          </g>
        );
      })}
      <TileRect tile="stone" x={0} y={gy} w={1080} h={96} f={f} pal={{ U: "#4a4f66", S: "#3a3f55", T: "#2a2f44", g: "#5a6078" }} />
      <TileRect tile="road" x={0} y={gy + 96} w={1080} h={1920 - gy - 96} f={f} />
      {lamp("l1", 236)}
      {lamp("l2", 830)}
    </g>
  );
}
