import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// ---------- roof antenna (Yagi) – `angle` turns it, `tilt` knocks it crooked ----------
export const Yagi: React.FC<{ x: number; baseY: number; height?: number; angle: number; tilt?: number; scale?: number }> = ({ x, baseY, height = 620, angle, tilt = 0, scale = 1 }) => {
  // drawn around its base so `scale` grows it upwards; the top of the pole is at baseY - height*scale
  const a = (angle * Math.PI) / 180;
  const L = 420;
  const proj = (u: number, v: number) => [u * Math.cos(a) - v * Math.sin(a), (u * Math.sin(a) + v * Math.cos(a)) * 0.3];
  const els = [-180, -110, -40, 30, 100, 170].map((u, i) => ({ u, e: 230 - i * 22 }));
  const topY = -height;
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      <line x1={0} y1={0} x2={0} y2={topY} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      <line x1={0} y1={0} x2={0} y2={topY} stroke="#9AA3A8" strokeWidth={12} strokeLinecap="round" />
      <line x1={-60} y1={0} x2={60} y2={0} stroke={INK} strokeWidth={16} strokeLinecap="round" />
      <path d={`M 0 ${topY + 40} C 60 ${topY + 200} -40 ${topY + 380} 30 0`} stroke={INK} strokeWidth={6} fill="none" />
      <g transform={`translate(0 ${topY}) rotate(${tilt})`}>
        {(() => {
          const [bx1, by1] = proj(-L / 2, 0);
          const [bx2, by2] = proj(L / 2, 0);
          return <line x1={bx1} y1={by1} x2={bx2} y2={by2} stroke={INK} strokeWidth={14} strokeLinecap="round" />;
        })()}
        {els.map(({ u, e }, i) => {
          const [x1, y1] = proj(u, -e / 2);
          const [x2, y2] = proj(u, e / 2);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9D0D4" strokeWidth={4} strokeLinecap="round" />
            </g>
          );
        })}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Yagi {...(rest as any)} frame={f} />;
}
