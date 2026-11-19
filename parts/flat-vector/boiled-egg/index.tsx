import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector boiled egg: a whole white egg standing beside a halved one showing the yellow yolk.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 380 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
// egg outline: pointed-ish top, round bottom, base at y 0, height 220, half width 80
const EGG = "M 0 -224 C 56 -224 84 -150 84 -96 C 84 -40 56 0 0 0 C -56 0 -84 -40 -84 -96 C -84 -150 -56 -224 0 -224 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BoiledEgg(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const whiteC = p.whiteColor ?? "#FFFFFF";
  const yolkC = p.yolkColor ?? "#FFB530";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* whole egg, standing on the left */}
        <g transform="translate(-100 0)">
          <path d={EGG} fill={whiteC} />
          <path d="M 0 -224 C 56 -224 84 -150 84 -96 C 84 -40 56 0 0 0 C 30 -20 40 -80 36 -140 C 32 -190 16 -212 0 -224 Z" fill={shade(whiteC, 0.1)} />
          <path d="M -52 -150 Q -58 -110 -50 -80" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.4} />
          <path d="M 20 -60 q 6 -14 -4 -22" stroke={shade(whiteC, 0.14)} strokeWidth={4} fill="none" opacity={0} />
        </g>
        {/* halved egg, on the right, cut face up */}
        <g transform="translate(110 0)">
          <path d="M -84 -16 C -84 -90 -50 -118 0 -118 C 50 -118 84 -90 84 -16 Q 84 0 0 0 Q -84 0 -84 -16 Z" fill={shade(whiteC, 0.08)} />
          <ellipse cx={0} cy={-16} rx={84} ry={20} fill={whiteC} />
          <ellipse cx={0} cy={-16} rx={68} ry={14} fill={shade(whiteC, 0.05)} />
          <ellipse cx={0} cy={-16} rx={52} ry={34} fill={yolkC} />
          <ellipse cx={-14} cy={-30} rx={16} ry={9} fill="#FFFFFF" opacity={0.35} />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <BoiledEgg {...p} />;
}
