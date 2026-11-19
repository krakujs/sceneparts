import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of pink lungs with the trachea and bronchi. Organ, centred on (x, y), about 640 px wide at s = 1.
// anim "breathe": the whole pair swells in and out over 120 frames.
const f1 = (v: number) => v.toFixed(1);

const LUNG = "M -30 -170 C -150 -200 -300 -170 -318 -40 C -332 60 -310 190 -230 230 C -170 262 -90 240 -40 180 C -22 150 -20 60 -22 -20 C -24 -110 -26 -150 -30 -170 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const col = p.color && p.color !== "none" ? p.color : C.pink;
  const air = p.color2 && p.color2 !== "none" ? p.color2 : "#D9578A";
  const dk = shade(col, 0.22);
  const anim: string = p.anim ?? "none";
  const k = anim === "breathe" ? 1 + 0.05 * Math.sin((f * 2 * Math.PI) / 120) : 1;
  const airway = (d: string, w: number) => <path d={d} stroke={air} strokeWidth={w} strokeLinecap="round" fill="none" />;
  const Half = ({ mirror }: { mirror?: boolean }) => (
    <g transform={mirror ? "scale(-1 1)" : undefined}>
      {/* lung with two lobes shown by a fissure */}
      <path d={LUNG} fill={col} />
      <path d="M -300 40 Q -200 64 -120 40" stroke={dk} strokeWidth={12} strokeLinecap="round" fill="none" />
      <path d="M -270 -60 Q -180 -100 -110 -70" stroke={C.white} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.35} />
      {/* bronchus and its branches */}
      {airway("M -10 -150 Q -20 -190 -90 -220", 30)}
      {airway("M -60 -200 Q -110 -170 -150 -170", 18)}
      {airway("M -80 -215 Q -90 -250 -140 -270", 16)}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      <ellipse cx={0} cy={270} rx={240} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(k)})`}>
        <g transform="translate(0 -40)">
          <Half />
          <Half mirror />
          {/* trachea with rings */}
          <rect x={-30} y={-330} width={60} height={180} rx={26} fill={air} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-30} y={-318 + i * 28} width={60} height={8} rx={4} fill={shade(air, 0.2)} />
          ))}
        </g>
      </g>
    </g>
  );
}
