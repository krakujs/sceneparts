import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

export const Rooftops: React.FC<{ floorY?: number; tint?: number ; frame?: number }> = ({ frame = 0, floorY = 1120, tint = 0 }) => {
  const f = frame;
  const blds = [
    { x: -40, w: 230, top: 930 }, { x: 170, w: 190, top: 1010 }, { x: 340, w: 250, top: 960 },
    { x: 570, w: 180, top: 1040 }, { x: 730, w: 220, top: 900 }, { x: 930, w: 200, top: 990 },
  ];
  return (
    <g>
      {blds.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.top} width={b.w} height={1920 - b.top} fill={BACK[i % BACK.length]} stroke={INK} strokeWidth={5} />
          <rect x={b.x - 8} y={b.top - 16} width={b.w + 16} height={20} fill={P.concreteDark} stroke={INK} strokeWidth={4} />
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) =>
              c * 70 + 40 < b.w - 30 ? (
                <rect key={`${r}${c}`} x={b.x + 30 + c * 70} y={b.top + 50 + r * 110} width={40} height={60} rx={4}
                  fill={random(`w${i}${r}${c}`) > 0.6 ? "#FFE6A6" : "#6B4A3A"} stroke={INK} strokeWidth={3} />
              ) : null,
            ),
          )}
          {i % 2 === 0 ? (
            <g transform={`translate(${b.x + b.w - 80} ${b.top - 16})`}>
              <rect x={0} y={-70} width={56} height={70} fill={P.tank} stroke={INK} strokeWidth={4} />
              <ellipse cx={28} cy={-70} rx={28} ry={9} fill="#4A4644" stroke={INK} strokeWidth={4} />
            </g>
          ) : (
            <g transform={`translate(${b.x + 50} ${b.top - 16})`} stroke={INK} strokeWidth={4} fill="none">
              <line x1={0} y1={0} x2={0} y2={-150} />
              <line x1={-45} y1={-150} x2={45} y2={-140} />
              {[-30, -10, 10, 30].map((d) => <line key={d} x1={d} y1={-158 + d / 8} x2={d} y2={-130 + d / 8} />)}
            </g>
          )}
        </g>
      ))}
      {/* clothes line on the middle roof */}
      <g>
        <path d={`M 360 ${955} Q 470 ${985} 580 ${950}`} stroke={INK} strokeWidth={3} fill="none" />
        {[[390, P.pink], [430, P.teal], [475, P.mustard], [520, "#FFFFFF"]].map(([x, c], k) => (
          <rect key={k} x={Number(x)} y={962 + Math.sin(f / 9 + k) * 2} width={30} height={46} rx={4} fill={String(c)} stroke={INK} strokeWidth={3}
            transform={`rotate(${Math.sin(f / 11 + k) * 4} ${Number(x) + 15} 962)`} />
        ))}
      </g>
      {/* our roof */}
      <rect x={-10} y={floorY - 40} width={1100} height={46} fill="#B5654A" stroke={INK} strokeWidth={6} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <line key={k} x1={k * 130 - 10} y1={floorY - 40} x2={k * 130 - 10} y2={floorY + 6} stroke={INK} strokeWidth={3} opacity={0.5} />)}
      <rect x={-10} y={floorY + 6} width={1100} height={1920 - floorY} fill={P.concrete} stroke={INK} strokeWidth={6} />
      {[0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={floorY + 120 + k * 150} x2={1080} y2={floorY + 120 + k * 150} stroke={P.concreteDark} strokeWidth={4} />)}
      {tint ? <rect width={1080} height={1920} fill="#2B160C" opacity={tint} /> : null}
    </g>
  );
};

// Stair room ("mumty") with a door someone shouts out of

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Rooftops {...(rest as any)} frame={f} />;
}
