import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cupcake: ribbed paper case, swirled frosting peak, sprinkles and a cherry on top.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~340 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Cupcake(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const frost = p.frosting ?? C.pink;
  const paper = C.pink === frost ? C.purple : C.blue;
  const CASE_H = 190, CASE_BOT = 130, CASE_TOP = 170;
  const caseTop = -CASE_H;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Ribs on the paper case: a fan of lines converging on the base
  const ribs = Array.from({ length: 9 }, (_, i) => {
    const t = (i + 1) / 10;
    const xb = -CASE_BOT + 2 * CASE_BOT * t, xt = -CASE_TOP + 2 * CASE_TOP * t;
    return <line key={i} x1={f1(xb)} y1={-4} x2={f1(xt)} y2={f1(caseTop + 22)} stroke={shade(paper, 0.28)} strokeWidth={7} strokeLinecap="round" />;
  });

  // Frosting: three stacked swirl rings rising to a peak
  const swirl = (
    <g>
      <path d={`M ${-CASE_TOP - 16} ${caseTop + 6} C ${-CASE_TOP - 40} ${caseTop - 40} ${-CASE_TOP - 30} ${caseTop - 70} ${-100} ${caseTop - 86} C ${-70} ${caseTop - 150} ${-40} ${caseTop - 190} ${0} ${caseTop - 200} C ${40} ${caseTop - 190} ${70} ${caseTop - 150} ${100} ${caseTop - 86} C ${CASE_TOP + 30} ${caseTop - 70} ${CASE_TOP + 40} ${caseTop - 40} ${CASE_TOP + 16} ${caseTop + 6} Z`} fill={shade(frost, 0.18)} />
      <path d={`M ${-CASE_TOP - 10} ${caseTop + 4} C ${-CASE_TOP - 30} ${caseTop - 36} ${-CASE_TOP - 24} ${caseTop - 66} ${-96} ${caseTop - 80} C ${-64} ${caseTop - 140} ${-36} ${caseTop - 182} ${0} ${caseTop - 192} C ${36} ${caseTop - 182} ${64} ${caseTop - 140} ${96} ${caseTop - 80} C ${CASE_TOP + 24} ${caseTop - 66} ${CASE_TOP + 30} ${caseTop - 36} ${CASE_TOP + 10} ${caseTop + 4} Z`} fill={frost} />
      <path d={`M ${-100} ${caseTop - 40} Q ${-60} ${caseTop - 70} ${-20} ${caseTop - 80} Q 0 ${caseTop - 60} ${30} ${caseTop - 80} Q 70 ${caseTop - 60} ${100} ${caseTop - 40}`} stroke={shade(frost, 0.14)} strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.7} />
      <path d={`M ${-70} ${caseTop - 120} Q ${-50} ${caseTop - 150} ${-30} ${caseTop - 156}`} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.5} />
    </g>
  );

  const sprinkles = ["#FFC83D", "#3D6FE0", "#4BB46A", "#FFFFFF", "#8E5CD6", "#FFC83D", "#FFFFFF"];
  const sprinkleEls = sprinkles.map((col, i) => {
    const a = (i / sprinkles.length) * Math.PI * 2;
    const cx = Math.cos(a) * 60 + (i % 2 ? 20 : -10), cy = caseTop - 120 + Math.sin(a) * 26 - (i % 3) * 8;
    return <rect key={i} x={f1(cx - 9)} y={f1(cy - 3)} width={18} height={6} rx={3} fill={col} transform={`rotate(${f1(i * 47)} ${f1(cx)} ${f1(cy)})`} />;
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={CASE_BOT + 36} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <path d={`M ${-CASE_BOT} 0 L ${-CASE_TOP} ${caseTop} L ${CASE_TOP} ${caseTop} L ${CASE_BOT} 0 Z`} fill={paper} />
        {ribs}
        <rect x={-CASE_TOP - 4} y={caseTop - 2} width={2 * CASE_TOP + 8} height={14} rx={7} fill={shade(paper, 0.2)} />
        {swirl}
        {sprinkleEls}
        {/* cherry */}
        <path d={`M 0 ${caseTop - 196} Q 14 ${caseTop - 240} 44 ${caseTop - 262}`} stroke="#3F7D3A" strokeWidth={7} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={caseTop - 214} rx={30} ry={30} fill={C.red} />
        <ellipse cx={-10} cy={caseTop - 224} rx={8} ry={6} fill="#FFFFFF" opacity={0.6} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Cupcake {...p} />;
}
