import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Piñata donkey: a paper donkey with crepe-paper colour bands, fringed edges, ears, snout and legs,
// hanging from a rope. Origin = the top of the rope. Swing rotates the whole piece about that point.
const f1 = (v: number) => v.toFixed(1);
const BANDS = [C.yellow, C.teal, C.purple, C.orange, C.blue, C.green];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 220;
  const head = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  const rot = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 90) * 8 : 0;
  const CX = 0, CY = 520, RX = 175, RY = 125;
  // fringe: short crepe strokes hanging from the lower body edge
  const fringe = Array.from({ length: 18 }, (_, i) => {
    const a = Math.PI * (0.05 + (i / 17) * 0.9);
    const px = CX + Math.cos(a) * RX, py = CY + Math.sin(a) * RY;
    return <line key={i} x1={f1(px)} y1={f1(py)} x2={f1(px + Math.cos(a) * 6)} y2={f1(py + 30)} stroke={BANDS[i % BANDS.length]} strokeWidth={9} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      {/* rope */}
      <line x1={0} y1={0} x2={0} y2={395} stroke={C.brownDark} strokeWidth={9} strokeLinecap="round" />
      <path d="M 0 395 L -20 405" stroke={C.brownDark} strokeWidth={6} fill="none" />
      <g>
        {/* legs */}
        {[-110, -40, 50, 120].map((lx, i) => (
          <rect key={i} x={lx - 22} y={CY + 60} width={44} height={110} rx={20} fill={shade(BANDS[i % 2 ? 1 : 3], 0.15)} />
        ))}
        {/* tail */}
        <path d={`M ${-RX + 6} ${CY - 10} Q ${-RX - 70} ${CY + 40} ${-RX - 40} ${CY + 130}`} fill="none" stroke={C.purpleDark} strokeWidth={22} strokeLinecap="round" />
        {fringe}
        {/* body: clipped colour bands */}
        <clipPath id="pinata-donkey-body"><ellipse cx={CX} cy={CY} rx={RX} ry={RY} /></clipPath>
        <g clipPath="url(#pinata-donkey-body)">
          {BANDS.map((c, i) => (
            <rect key={i} x={CX - RX + i * (2 * RX / BANDS.length)} y={CY - RY} width={2 * RX / BANDS.length + 2} height={2 * RY} fill={c} />
          ))}
          <rect x={CX - RX} y={CY + 30} width={2 * RX} height={RY} fill={shade(C.purple, 0.1)} opacity={0.3} />
        </g>
        {/* neck and head, in the head colour with bands */}
        <path d={`M 60 ${CY - 60} L 140 ${CY - 250} L 210 ${CY - 210} L 150 ${CY - 10} Z`} fill={head} />
        <ellipse cx={170} cy={CY - 170} rx={88} ry={76} fill={head} />
        {/* ears */}
        <path d={`M 122 ${CY - 230} L 110 ${CY - 320} L 166 ${CY - 250} Z`} fill={head} />
        <path d={`M 186 ${CY - 240} L 200 ${CY - 320} L 226 ${CY - 230} Z`} fill={head} />
        {/* snout */}
        <ellipse cx={240} cy={CY - 120} rx={44} ry={34} fill={C.yellow} />
        <circle cx={226} cy={CY - 122} r={6} fill={C.ink} opacity={0.6} />
        <circle cx={252} cy={CY - 122} r={6} fill={C.ink} opacity={0.6} />
        {/* eye */}
        <circle cx={180} cy={CY - 192} r={13} fill={C.ink} />
        <circle cx={184} cy={CY - 197} r={4} fill={C.white} />
      </g>
    </g>
  );
}
