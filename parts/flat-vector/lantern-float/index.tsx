import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Floating water lantern: a square paper lantern with a glowing candle, on a small wooden raft that sits
// on the water. Origin = bottom centre of the raft at the water line (y is the water surface).
// About 340 px wide and 400 px tall at s = 1. anim "bob" rocks it gently up and down on the ripples.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.orange;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 80) * 8 : 0;
  const tilt = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 80 + 1) * 1.5 : 0;
  const glow = 0.3 + 0.12 * Math.sin((f * 2 * Math.PI) / 36);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* water and ripples, still on the surface */}
      <ellipse cx={0} cy={-4} rx={340} ry={42} fill={C.skyDeep} opacity={0.55} />
      <ellipse cx={0} cy={0} rx={330} ry={36} fill="none" stroke={C.white} strokeWidth={6} opacity={0.7} />
      <ellipse cx={0} cy={4} rx={250} ry={24} fill="none" stroke={C.white} strokeWidth={5} opacity={0.6} />
      <g transform={`translate(0 ${f1(-bob * 0.2)}) rotate(${f1(tilt)} 0 -40)`}>
        <g transform={`translate(0 ${f1(-bob)})`}>
          {/* wooden raft */}
          <rect x={-120} y={-64} width={240} height={46} rx={8} fill={wood} />
          <rect x={-120} y={-64} width={240} height={12} rx={6} fill={shade(wood, 0.15)} />
          <path d="M -40 -64 L -40 -18 M 40 -64 L 40 -18" stroke={shade(wood, 0.35)} strokeWidth={4} />
          {/* glow from the candle, on the water and paper */}
          <circle cx={0} cy={-160} r={130} fill={C.yellow} opacity={glow} />
          {/* lantern body */}
          <rect x={-88} y={-322} width={176} height={256} rx={6} fill={paper} />
          <rect x={-88} y={-322} width={176} height={256} rx={6} fill={C.yellow} opacity={glow} />
          <path d="M -88 -270 L 88 -270 M -88 -216 L 88 -216 M -88 -162 L 88 -162 M -88 -108 L 88 -108" stroke={shade(paper, 0.2)} strokeWidth={5} />
          {/* corner frames */}
          {[-88, 84].map((cx, i) => (
            <rect key={i} x={cx} y={-322} width={4} height={256} fill={wood} />
          ))}
          {/* roof cap and finial */}
          <path d="M -104 -322 L 0 -366 L 104 -322 Z" fill={wood} />
          <circle cx={0} cy={-372} r={8} fill={wood} />
          {/* candle and flame */}
          <rect x={-12} y={-150} width={24} height={82} rx={4} fill={C.paper} />
          <path d="M 0 -210 C 16 -190 16 -174 0 -166 C -16 -174 -16 -190 0 -210 Z" fill={C.yellow} />
          <path d="M 0 -198 C 7 -188 7 -180 0 -174 C -7 -180 -7 -188 0 -198 Z" fill={C.orange} />
        </g>
      </g>
    </g>
  );
}
