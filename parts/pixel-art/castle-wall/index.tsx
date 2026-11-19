import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, TileRect, TP, snap } from "../backdrop/index";

// Castle wall: pixel-art outside of a castle. Stone curtain wall with battlements, two corner towers, a central
// gatehouse with a portcullis and hanging banners in plain colours. Stone courtyard ground. Centre stage stays open.

const merlons = (key: string, y: number, x0: number, x1: number, step: number, w: number, h: number) => {
  const out: React.ReactNode[] = [];
  for (let x = x0; x + w <= x1; x += step) out.push(<TileRect key={key + x} tile="stone" x={x} y={y - h} w={w} h={h} />);
  return out;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 12;
  const flutter = (p.anim ?? "banners") !== "none";
  const f = flutter ? p.f ?? 0 : 0;
  const wallTop = gy - 640;
  const banner = (key: string, x: number, colour: string) => {
    const dx = flutter ? Math.round(Math.sin((f + x) / 10)) * 12 : 0;
    return (
      <g key={key}>
        <rect x={x} y={gy - 600} width={72} height={170} fill={colour} />
        <rect x={x + 60 + dx} y={gy - 430} width={24} height={24} fill={colour} />
        <rect x={x - 6} y={gy - 600} width={84} height={12} fill={TP.k} />
        <rect x={x + 30} y={gy - 630} width={12} height={36} fill={TP.k} />
      </g>
    );
  };
  return (
    <g>
      <PixSky time="day" to={gy} f={f} clouds={2} seed={seed} drift={flutter} />
      <Far kind="mountains" base={gy - 160} time="day" seed={seed} maxH={520} />
      <TileRect tile="stone" x={0} y={wallTop} w={1080} h={gy - wallTop} />
      {merlons("m", wallTop, 0, 1080, 96, 48, 72)}
      {/* corner towers */}
      <TileRect tile="stone" x={40} y={gy - 1000} w={160} h={1000 - 640} />
      <TileRect tile="stone" x={880} y={gy - 980} w={160} h={980 - 640} />
      {merlons("tl", gy - 1000, 40, 200, 48, 36, 72)}
      {merlons("tr", gy - 980, 880, 1040, 48, 36, 72)}
      <rect x={110} y={gy - 880} width={12} height={60} fill={TP.k} />
      <rect x={950} y={gy - 860} width={12} height={60} fill={TP.k} />
      {/* central gatehouse */}
      <TileRect tile="stone" x={420} y={gy - 760} w={240} h={760 - 640 + 120} />
      {merlons("gh", gy - 760, 420, 660, 48, 36, 60)}
      <rect x={470} y={gy - 340} width={140} height={340} fill={TP.k} />
      <rect x={470} y={gy - 380} width={140} height={40} fill={TP.k} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={"pc" + i} x={476 + i * 24} y={gy - 340} width={8} height={340} fill={TP.d} />
      ))}
      <rect x={470} y={gy - 240} width={140} height={10} fill={TP.d} />
      <rect x={470} y={gy - 140} width={140} height={10} fill={TP.d} />
      {banner("b1", 300, "#d2403f")}
      {banner("b2", 708, "#2f5fb8")}
      <TileRect tile="stone" x={0} y={gy} w={1080} h={1920 - gy} pal={{ U: "#a8a090", S: "#8a8070", T: "#5a5448" }} />
    </g>
  );
}
