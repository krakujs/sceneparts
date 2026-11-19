import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector ice cream cone: waffle cone with a criss-cross pattern and one to three scoops of ice cream.
// Origin = the cone tip (bottom centre sits on y), honours flip and s. Hero size ~380 px tall at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function IceCreamCone(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const n = Math.max(1, Math.min(3, Math.round(p.scoops ?? 2)));
  const first = p.color ?? "#F7B6CF";
  const flavours = [first, "#7A4A2E", "#9ADFC0", "#FFF1C9"];
  const cone = "#E0A05A";
  const TOP = -200, HW = 118; // cone top height and half width

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // scoops from the bottom up: each a ball with a wavy skirt over the one below
  const scoopR = [128, 118, 106];
  const scoopY = [TOP - 40, TOP - 130, TOP - 214];
  const scoopX = [0, -18, 14];
  const scoops = Array.from({ length: n }, (_, i) => i).reverse().map((i) => {
    const r = scoopR[i], cx = scoopX[i], cy = scoopY[i], col = flavours[i];
    const skirt = `M ${f1(cx - r * 0.92)} ${f1(cy + 6)} Q ${f1(cx - r * 0.6)} ${f1(cy + 46)} ${f1(cx - r * 0.3)} ${f1(cy + 20)} Q ${f1(cx)} ${f1(cy + 56)} ${f1(cx + r * 0.3)} ${f1(cy + 20)} Q ${f1(cx + r * 0.6)} ${f1(cy + 46)} ${f1(cx + r * 0.92)} ${f1(cy + 6)} Z`;
    return (
      <g key={i}>
        <circle cx={cx} cy={cy} r={r} fill={shade(col, 0.14)} />
        <path d={skirt} fill={shade(col, 0.14)} />
        <circle cx={cx} cy={cy - 6} r={r - 6} fill={col} />
        <path d={`M ${f1(cx - r * 0.6)} ${f1(cy - r * 0.2)} Q ${f1(cx - r * 0.5)} ${f1(cy - r * 0.6)} ${f1(cx - r * 0.1)} ${f1(cy - r * 0.7)}`} stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.45} />
      </g>
    );
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={96} ry={14} fill={C.shadow} />
      <g transform={tr}>
        <defs>
          <clipPath id="cone-clip"><path d={`M ${-HW} ${TOP} L 0 0 L ${HW} ${TOP} Z`} /></clipPath>
        </defs>
        {/* cone */}
        <path d={`M ${-HW} ${TOP} L 0 0 L ${HW} ${TOP} Z`} fill={cone} />
        <g clipPath="url(#cone-clip)">
          {[-1, 0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <line x1={-HW + k * 44} y1={TOP} x2={-HW + k * 44 + 240} y2={TOP - 240} stroke={shade(cone, 0.3)} strokeWidth={8} />
              <line x1={HW - k * 44} y1={TOP} x2={HW - k * 44 - 240} y2={TOP - 240} stroke={shade(cone, 0.3)} strokeWidth={8} />
            </g>
          ))}
          <path d={`M ${-HW} ${TOP} L 0 0 L ${-HW * 0.35} ${TOP} Z`} fill={shade(cone, 0.16)} />
        </g>
        <rect x={-HW - 6} y={TOP - 4} width={2 * HW + 12} height={14} rx={7} fill={shade(cone, 0.2)} />
        {scoops}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <IceCreamCone {...p} />;
}
