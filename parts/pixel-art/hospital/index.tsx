import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Hospital ward: beds with blankets, a curtain, a drip stand, a heart monitor that blinks and a clean tile floor.

const Bed = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={252} height={24} fill="#c9d2dc" />
    <rect x={x - 12} y={y - 120} width={12} height={156} fill="#8d93a0" />
    <rect x={x + 252} y={y - 60} width={12} height={84} fill="#8d93a0" />
    <rect x={x + 12} y={y - 84} width={60} height={36} fill="#f5f1e8" />
    <rect x={x + 60} y={y - 72} width={192} height={96} fill="#5ab4f0" />
    <rect x={x + 60} y={y - 72} width={192} height={18} fill="#2f5fb8" />
    <rect x={x + 60} y={y + 12} width={192} height={12} fill="#f5f1e8" />
    <rect x={x} y={y + 24} width={12} height={72} fill="#8d93a0" />
    <rect x={x + 240} y={y + 24} width={12} height={72} fill="#8d93a0" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "blink") === "blink";
  const beat = on ? Math.floor(p.f / 10) % 4 : 0;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={fy} fill="#cfe9e4" />
      <TileRect tile="tiles" x={0} y={0} w={1080} h={fy} cell={12} pal={{ w: "#dff3ee", g: "#a8cfc7" }} />
      <rect x={0} y={fy - 700} width={1080} height={12} fill="#5fa89a" />
      {/* ward wall window */}
      <rect x={420} y={fy - 900} width={240} height={288} fill="#f5f1e8" />
      <rect x={432} y={fy - 888} width={216} height={264} fill="#b8e4fa" />
      {/* beds at the back-left and back-right */}
      <g transform={`translate(24 ${fy - 367}) scale(1.7)`}><Bed x={0} y={120} /></g>
      <g transform={`translate(1056 ${fy - 367}) scale(-1.7 1.7)`}><Bed x={0} y={120} /></g>
      {/* curtain on a rail */}
      <rect x={60} y={fy - 780} width={12} height={360} fill="#8d93a0" />
      <rect x={60} y={fy - 780} width={336} height={12} fill="#8d93a0" />
      <rect x={72} y={fy - 768} width={300} height={300} fill="#8fd0f8" opacity={0.55} />
      {/* drip stand */}
      <rect x={480} y={fy - 780} width={12} height={780} fill="#8d93a0" />
      <rect x={456} y={fy - 780} width={60} height={12} fill="#8d93a0" />
      <rect x={456} y={fy - 768} width={36} height={60} fill="#e8f6ff" />
      <rect x={464} y={fy - 708} width={20} height={12} fill="#5fa8e0" />
      {/* heart monitor on a cabinet */}
      <rect x={876} y={fy - 760} width={168} height={120} fill="#5a6170" />
      <rect x={912} y={fy - 748} width={120} height={84} fill="#1b1b2e" />
      <rect x={924} y={fy - 736} width={96} height={12} fill="#4caf50" />
      <rect x={924} y={fy - 724} width={12} height={12} fill="#4caf50" />
      <rect x={936} y={fy - 724} width={12} height={12} fill="#4caf50" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={924 + i * 12} y={fy - 700} width={12} height={12} fill={i === beat * 2 ? "#4caf50" : "#2e6b45"} />
      ))}
      {/* clean tile floor */}
      <TileRect tile="tiles" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ w: "#eef6f4", g: "#9cc3bb" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#5fa89a" />
    </g>
  );
}
