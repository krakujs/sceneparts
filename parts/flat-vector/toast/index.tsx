import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector toast: a slice of golden toast with a crust outline, a spread of butter or jam, or none.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~380 px tall at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Toast(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const spread: string = p.spread ?? "butter";
  const crust = p.color ?? "#C98A4B";
  const crumb = "#F5C86B";
  // the slice outline: a bread shape with a domed top
  const slice = "M -150 0 L -150 -230 C -200 -236 -206 -312 -150 -336 C -96 -360 96 -360 150 -336 C 206 -312 200 -236 150 -230 L 150 0 Z";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // spread across the top of the crumb: a wavy melted blob with a pat on top
  const blobD = "M -118 -282 C -110 -312 -60 -318 -40 -300 C -20 -322 30 -322 46 -298 C 80 -308 118 -292 116 -270 C 124 -252 108 -240 92 -244 C 60 -226 -60 -224 -92 -246 C -116 -244 -126 -262 -118 -282 Z";
  const butterD = "M -118 -282 C -110 -312 -60 -318 -40 -300 C -20 -322 30 -322 46 -298 C 80 -308 118 -292 116 -270 C 124 -252 108 -240 92 -244 C 60 -226 -60 -224 -92 -246 C -116 -244 -126 -262 -118 -282 Z";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {/* crust outline */}
        <path d={slice} fill={crust} />
        <path d={slice} fill="none" stroke={shade(crust, 0.2)} strokeWidth={0} />
        {/* crumb: the same shape inset */}
        <path d={slice} fill={crumb} transform="translate(0 -170) scale(0.84 0.84) translate(0 170)" />
        {/* toasted speckles */}
        {Array.from({ length: 14 }, (_, i) => {
          const cx = -110 + ((i * 53) % 220), cy = -60 - ((i * 37) % 160);
          return <ellipse key={i} cx={cx} cy={cy} rx={4} ry={3} fill="#E0A21F" opacity={0.7} />;
        })}
        <path d="M -120 -90 Q -110 -150 -110 -200" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.35} />
        {spread === "butter" && (
          <g>
            <path d={butterD} fill="#FFE07A" />
            <path d={butterD} fill="none" stroke="#E8B83A" strokeWidth={3} />
            <path d="M -60 -282 Q -30 -294 0 -286" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.7} />
          </g>
        )}
        {spread === "jam" && (
          <g>
            <path d={blobD} fill="#B3247F" />
            <path d={blobD} fill="none" stroke={shade("#B3247F", 0.25)} strokeWidth={3} />
            {[[-60, -272], [-10, -278], [40, -270], [70, -282]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={3} fill="#E3409A" opacity={0.7} />)}
            <path d="M -70 -284 Q -40 -294 -10 -290" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.35} />
          </g>
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Toast {...p} />;
}
