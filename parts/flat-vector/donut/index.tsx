import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector donut: golden ring with glazed icing, drips over the edge and sprinkles. Hole in the middle.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~360 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Donut(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const icing = p.icing ?? "#F27BA6";
  const anim = p.anim ?? "none";
  const dough = "#E0A05A";
  const RX = 170, RY = 118, HX = 56, HY = 38, CY = -150;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Icing covers the top of the ring; drips hang down over the front edge
  const drips = [-120, -62, -10, 46, 105];
  const dripLen = [30, 55, 22, 62, 36];
  const sprinkles = ["#FFFFFF", "#FFC83D", "#3D6FE0", "#4BB46A", "#FFFFFF", "#8E5CD6", "#FFC83D", "#FFFFFF", "#3D6FE0", "#4BB46A", "#8E5CD6", "#FFC83D"];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={RX + 14} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {/* dough ring with a darker underside */}
        <ellipse cx={0} cy={CY + 20} rx={RX} ry={RY} fill={shade(dough, 0.3)} />
        <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={dough} />
        {/* icing: glaze over the upper ring, with a wavy lower edge */}
        <path d={`M ${f1(-RX + 4)} ${f1(CY)} A ${RX - 4} ${RY - 6} 0 0 1 ${f1(RX - 4)} ${f1(CY)} Q ${f1(RX - 40)} ${f1(CY + 40)} ${f1(RX - 90)} ${f1(CY + 36)} Q ${f1(40)} ${f1(CY + 62)} ${f1(-40)} ${f1(CY + 40)} Q ${f1(-RX + 60)} ${f1(CY + 66)} ${f1(-RX + 4)} ${f1(CY)} Z`} fill={icing} />
        {drips.map((dx, i) => (
          <g key={i}>
            <rect x={dx - 17} y={CY + 30} width={34} height={dripLen[i]} rx={17} fill={icing} />
            <ellipse cx={dx} cy={CY + 30 + dripLen[i]} rx={17} ry={14} fill={icing} />
          </g>
        ))}
        {/* highlight on the glaze */}
        <path d={`M ${f1(-RX * 0.7)} ${f1(CY - 30)} Q ${f1(-RX * 0.55)} ${f1(CY - RY * 0.7)} ${f1(-RX * 0.1)} ${f1(CY - RY * 0.72)}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.45} />
        {/* sprinkles on the glaze */}
        {sprinkles.map((col, i) => {
          const a = (i / sprinkles.length) * Math.PI * 2 + 0.3;
          const rx = RX * 0.7, ry = RY * 0.55;
          const cx = Math.cos(a) * rx * (0.55 + hash(i) * 0.4), cy = CY - 10 + Math.sin(a) * ry * (0.55 + hash(i + 4) * 0.4);
          if (cy > CY + 10) return null;
          return <rect key={i} x={f1(cx - 9)} y={f1(cy - 3)} width={18} height={6} rx={3} fill={col} transform={`rotate(${f1(hash(i + 9) * 160)} ${f1(cx)} ${f1(cy)})`} />;
        })}
        {/* hole */}
        <ellipse cx={0} cy={CY + 14} rx={HX + 3} ry={HY + 2} fill={shade(dough, 0.2)} />
        <ellipse cx={0} cy={CY + 8} rx={HX} ry={HY} fill="#F4F1EA" />
        <ellipse cx={0} cy={CY + 10} rx={HX} ry={HY} fill="#FFFFFF" opacity={0} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Donut {...p} />;
}
