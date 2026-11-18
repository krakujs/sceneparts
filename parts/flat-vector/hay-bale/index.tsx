import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hay bales: a round rolled bale seen end-on with its spiral, beside a small square bale with twine.
// Origin = centre of the ground line. About 730 px wide and 430 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const RX = -110, RY = -200, RR = 200;

/** Archimedean spiral path from the centre of the round bale outward. */
const spiral = (turns: number, R: number) => {
  let d = "";
  const N = 140;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * turns * 2 * Math.PI;
    const r = R * (i / N);
    d += `${i ? "L" : "M"} ${f1(RX + r * Math.cos(t))} ${f1(RY + r * Math.sin(t))} `;
  }
  return d;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const straw = pick(p.color, "#E8C36A");
  const twine = pick(p.color2, "#A97A45");
  const anim: string = p.anim ?? "none";
  const strawDk = shade(straw, 0.25);
  const straws: React.ReactElement[] = [];
  for (let i = 0; i < 18; i++) {
    const a = i * 1.37;
    const r = 60 + ((i * 53) % 120);
    const x1 = RX + r * Math.cos(a), y1 = RY + r * Math.sin(a);
    straws.push(
      <line key={i} x1={f1(x1)} y1={f1(y1)} x2={f1(x1 + 22 * Math.cos(a + 1.2))} y2={f1(y1 + 22 * Math.sin(a + 1.2))} stroke={strawDk} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={380} ry={20} fill={C.shadow} />
        {/* round bale on end: darker rim behind, straw face, spiral and straw marks */}
        <circle cx={RX + 20} cy={RY - 10} r={RR + 10} fill={strawDk} />
        <circle cx={RX} cy={RY} r={RR} fill={straw} />
        {straws}
        <path d={spiral(3.2, 165)} stroke={twine} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.85} />
        {/* square bale: top face, front with twine strings, side */}
        <path d="M 150 -170 L 180 -200 L 410 -200 L 380 -170 Z" fill={shade(straw, -0.12)} />
        <rect x={150} y={-170} width={230} height={170} rx={6} fill={straw} />
        <path d="M 380 -170 L 410 -200 L 410 -30 L 380 0 Z" fill={strawDk} />
        {[190, 250, 310].map((tx) => (
          <line key={tx} x1={tx} y1={-170} x2={tx} y2={0} stroke={twine} strokeWidth={6} opacity={0.7} />
        ))}
        {[-130, -90, -50].map((hy) => (
          <line key={hy} x1={162} y1={hy} x2={368} y2={hy} stroke={shade(straw, 0.2)} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
        ))}
      </g>
    </g>
  );
}
