import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { PixSky, Far, TileRect, PixTree, TP, snap, rnd } from "../backdrop/index";

// Graveyard: pixel-art night cemetery. Moonlit sky, dark hills and tree line, dead grass, rounded and cross
// gravestones at the edges, an iron fence across the back and bands of blocky fog that drift from p.f.

const TOMB = gridOf([".gggg.", "gggggd", "gggggd", "gggggd", "gggggd", "dddddd"]);
const CROSS = gridOf(["..g..", "..g..", "ggggg", "..g..", "..g..", "..d.."]);

const fogBand = (key: string, y: number, seed: number, shift: number, op: number) => (
  <g key={key}>
    {Array.from({ length: 48 }).map((_, i) => (
      <rect key={i} x={i * 24 - 24 + shift} y={y + snap(rnd(seed, i) * 48)} width={24} height={72 + snap(rnd(seed, i + 9) * 36)} fill="#8b95c2" opacity={op * 1.6} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 8;
  const drift = (p.anim ?? "fog") !== "none";
  const f = drift ? p.f ?? 0 : 0;
  const hz = gy - 220;
  const grave = (key: string, x: number, base: number, px: number, cross = false) => {
    const g = cross ? CROSS : TOMB;
    return <Pixels key={key} grid={outlined(g)} px={px} pal={TP} x={x - px} y={base - g.length * px - px} />;
  };
  const fence = (base: number) => {
    const els: React.ReactNode[] = [];
    for (let x = 0; x < 1080; x += 24) {
      els.push(<rect key={"p" + x} x={x} y={base - 150} width={8} height={150} fill="#4a5068" />);
      els.push(<rect key={"t" + x} x={x - 2} y={base - 162} width={12} height={12} fill="#4a5068" />);
    }
    els.push(<rect key="r1" x={0} y={base - 112} width={1080} height={12} fill="#4a5068" />);
    els.push(<rect key="r2" x={0} y={base - 48} width={1080} height={12} fill="#4a5068" />);
    return els;
  };
  return (
    <g>
      <PixSky time="night" to={hz} f={f} clouds={0} seed={seed} drift={false} />
      <Far kind="hills" base={hz + 40} time="night" seed={seed} maxH={260} />
      <Far kind="trees" base={hz + 60} time="night" seed={seed + 1} maxH={180} />
      <TileRect tile="grass" x={0} y={hz + 40} w={1080} h={1920 - hz - 40} pal={{ G: "#3b4a4a", e: "#2b3d3a", f: "#1d2c2c", D: "#262a3c", E: "#1d2030" }} />
      <PixTree x={1010} y={gy - 180} cell={24} kind="dead" />
      <PixTree x={70} y={gy - 150} cell={22} kind="dead" />
      {fence(gy - 180)}
      {grave("g1", 150, gy - 20, 18)}
      {grave("g2", 60, gy - 20, 24, true)}
      {grave("g3", 960, gy - 20, 18, true)}
      {grave("g4", 890, gy - 20, 24)}
      {grave("g5", 430, gy - 150, 12)}
      {grave("g6", 640, gy - 120, 12, true)}
      {fogBand("f1", gy - 380, seed, -(f * 0.8) % 1080, 0.22)}
      {fogBand("f2", gy - 200, seed + 5, -(f * 0.5) % 1080, 0.18)}
      {fogBand("f3", gy - 30, seed + 9, -(f * 1.1) % 1080, 0.14)}
    </g>
  );
}
