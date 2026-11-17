import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector chicken leg: a roasted golden-brown drumstick with the bone end.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 340 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ChickenLeg(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const skinC = p.skinColor ?? "#D9863A";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const boneC = "#F7F1E3";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* bone end, lower left, with a knob */}
        <path d="M -40 -150 L -118 -40" stroke={shade(boneC, 0.18)} strokeWidth={34} strokeLinecap="round" />
        <path d="M -40 -150 L -118 -40" stroke={boneC} strokeWidth={26} strokeLinecap="round" />
        <circle cx={-132} cy={-30} r={20} fill={boneC} />
        <circle cx={-110} cy={-14} r={18} fill={boneC} />
        <circle cx={-136} cy={-16} r={5} fill={shade(boneC, 0.2)} />
        <circle cx={-112} cy={-4} r={5} fill={shade(boneC, 0.2)} />
        {/* meat: a rounded drumstick body, rotated */}
        <g transform="rotate(-32 60 -190)">
          <ellipse cx={60} cy={-190} rx={118} ry={130} fill={shade(skinC, 0.18)} />
          <ellipse cx={56} cy={-196} rx={112} ry={124} fill={skinC} />
          <ellipse cx={20} cy={-260} rx={52} ry={34} fill="#FFFFFF" opacity={0.22} />
          <path d="M -30 -170 Q -10 -150 20 -150" stroke={shade(skinC, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />
          <path d="M 90 -200 Q 110 -180 100 -150" stroke={shade(skinC, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4} />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <ChickenLeg {...p} />;
}
