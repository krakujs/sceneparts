import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long quilted puffer coat on a wooden hanger: horizontal baffles on body and sleeves, a centre zip
// and a big hood with a fur trim. Origin = bottom centre (the hem rests on y). About 680 px wide,
// 740 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const BODY = "M -72 -588 L 72 -588 L 172 -566 L 252 -500 L 264 -236 L 208 -236 L 194 -420 L 198 0 L -198 0 L -194 -420 L -208 -236 L -264 -236 L -252 -500 L -172 -566 Z";
const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.blue;
  const fur = p.color2 && p.color2 !== "none" ? p.color2 : C.paper;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const baffles = Array.from({ length: 9 }, (_, i) => -520 + i * 60);
  const furDots = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI + (i * Math.PI) / 10;
    return [f1(160 * Math.cos(a)), f1(-574 + 106 * Math.sin(a))];
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* big hood behind the shoulders, with a fur trim along its edge */}
          <ellipse cx={0} cy={-574} rx={160} ry={106} fill={shade(main, 0.1)} />
          <ellipse cx={0} cy={-586} rx={108} ry={70} fill={shade(main, 0.4)} />
          {furDots.map(([fx, fy], i) => (
            <circle key={i} cx={fx} cy={fy} r={18} fill={fur} stroke={shade(fur, 0.12)} strokeWidth={2} />
          ))}
          {/* body and sleeves, with baffles clipped to the silhouette */}
          <clipPath id="sp-winter-coat-clip"><path d={BODY} /></clipPath>
          <path d={BODY} fill={main} />
          <g clipPath="url(#sp-winter-coat-clip)">
            {baffles.map((by, i) => (
              <g key={i}>
                <path d={`M -280 ${by} Q 0 ${by + 14} 280 ${by}`} stroke={shade(main, 0.25)} strokeWidth={8} fill="none" />
                <path d={`M -280 ${by + 9} Q 0 ${by + 23} 280 ${by + 9}`} stroke={C.white} strokeWidth={4} fill="none" opacity={0.18} />
              </g>
            ))}
          </g>
          {/* cuffs in fur trim */}
          <path d="M 212 -250 L 262 -250 L 262 -228 L 208 -228 Z" fill={fur} />
          <path d="M -212 -250 L -262 -250 L -262 -228 L -208 -228 Z" fill={fur} />
          {/* centre zip */}
          <path d="M 0 -540 L 0 -10" stroke={shade(main, 0.4)} strokeWidth={6} strokeDasharray="6 5" fill="none" />
          <rect x={-8} y={-552} width={16} height={34} rx={5} fill={C.greyLight} />
          {/* hem band */}
          <rect x={-198} y={-22} width={396} height={22} fill={shade(main, 0.2)} />
        </g>
      </g>
    </g>
  );
}
