import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, rnd, snap } from "../backdrop/index";

// Arena: pixel-art fighting arena seen from the floor. Tiered stands packed with a cheering crowd, a stone
// arena wall with dark gate arches and hanging banners, and a sand floor from groundY down.

const HEADS = ["#ffe0c4", "#f1c39b", "#d99a6c", "#b97a4c", "#8a5532", "#5c3820"];
const SHIRTS = ["#d2403f", "#2f5fb8", "#f7d154", "#4caf50", "#7a4bb5", "#f08a3c", "#f5f1e8", "#ef8fb4"];
const ARCH = ["..KKKK..", ".KkkkkK.", "KkkkkkkK", "KkkkkkkK", "KkkkkkkK", "KkkkkkkK", "KkkkkkkK"];
const BANNER = ["aaaaa", "aaaaa", "ayyya", "aayaa", "aaaaa", "aa.aa", "a...a"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const cheer = (p.anim ?? "cheer") === "cheer";
  const seed = p.seed ?? 7;
  const wallTop = gy - 420;
  const standTop = 300;
  const rows = Math.floor((wallTop - standTop) / 84);
  const crowd: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y = standTop + r * 84;
    crowd.push(<rect key={"t" + r} x={0} y={y + 48} width={1080} height={36} fill={r % 2 ? "#5a6170" : "#646a78"} />);
    crowd.push(<rect key={"e" + r} x={0} y={y + 48} width={1080} height={12} fill="#8d93a0" />);
    for (let i = 0; i < 30; i++) {
      const x = i * 36 + (r % 2) * 18;
      const up = cheer && (Math.floor((p.f + i * 5 + r * 3) / 10) % 3 === 0) ? -12 : 0;
      const sh = SHIRTS[Math.floor(rnd(seed, r * 40 + i) * SHIRTS.length)];
      const hd = HEADS[Math.floor(rnd(seed + 1, r * 40 + i) * HEADS.length)];
      crowd.push(
        <g key={`c${r}-${i}`}>
          <rect x={x + 6} y={y + 24 + up} width={24} height={24} fill={sh} />
          <rect x={x + 9} y={y + 3 + up} width={18} height={21} fill={hd} />
          {up < 0 && <rect x={x} y={y + up} width={6} height={18} fill={hd} />}
        </g>,
      );
    }
  }
  const wave = cheer ? Math.floor(p.f / 12) % 2 : 0;
  return (
    <g>
      <PixSky time={time} to={standTop} f={p.f} clouds={2} seed={seed} drift={cheer} body={false} />
      <rect x={0} y={standTop - 24} width={1080} height={wallTop - standTop + 24} fill="#3d4250" />
      <g shapeRendering="crispEdges">{crowd}</g>
      <rect x={0} y={wallTop - 24} width={1080} height={24} fill={TP.T} />
      <TileRect tile="wall" x={0} y={wallTop} w={1080} h={gy - wallTop} cell={12} pal={{ S: "#b9a27e", T: "#8a7656" }} />
      <rect x={0} y={wallTop} width={1080} height={12} fill="#d8c8a0" />
      <Pixels grid={gridOf(ARCH)} px={24} pal={TP} x={24} y={gy - ARCH.length * 24} />
      <Pixels grid={gridOf(ARCH)} px={24} pal={TP} x={864} y={gy - ARCH.length * 24} />
      {[180, 420, 600, 840].map((bx, i) => (
        <Pixels key={bx} grid={outlined(gridOf(BANNER))} px={18} pal={{ ...TP, a: i % 2 ? "#2f5fb8" : "#d2403f" }} x={bx + (wave && i % 2 ? 6 : 0)} y={wallTop + 12} />
      ))}
      <TileRect tile="sand" x={0} y={gy} w={1080} h={1920 - gy} cell={12} />
      <rect x={0} y={gy} width={1080} height={12} fill={TP.O} />
      <Tint time={time === "space" ? "night" : time} y={0} />
    </g>
  );
}
