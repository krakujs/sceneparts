import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Neatly wrapped turban on a plain, faceless light-grey display bust. Origin = bottom centre of the
// bust base (it stands on y). About 380 px wide and 660 px tall at s = 1.
// color = the wrapped cloth, color2 = the pleated fan at the front. anim "pop" settles in with a bounce.
const f1 = (v: number) => v.toFixed(1);

const Bust = () => (
  <g>
    <rect x={-170} y={-26} width={340} height={26} rx={10} fill={C.grey} />
    <rect x={-62} y={-262} width={124} height={44} fill={shade(C.greyLight, 0.08)} />
    <path d="M -190 -26 L -190 -150 Q -190 -208 -130 -222 L -66 -240 L 66 -240 L 130 -222 Q 190 -208 190 -150 L 190 -26 Z" fill={C.greyLight} />
    <ellipse cx={0} cy={-430} rx={124} ry={150} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.orange;
  const fan = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  // fan of pleats at the front, from a point on the band out to an arc up and to the right
  const C0 = [70, -478], R = 118;
  const pt = (deg: number) => [C0[0] + R * Math.cos((deg * Math.PI) / 180), C0[1] + R * Math.sin((deg * Math.PI) / 180)];
  const a0 = pt(200), a1 = pt(328);
  const rays = [200, 226, 252, 278, 304, 328].map((d) => pt(d));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(pop)})`}>
        <Bust />
        {/* crown of the turban */}
        <path d="M -164 -500 Q -184 -626 0 -656 Q 184 -626 164 -500 Q 0 -468 -164 -500 Z" fill={cloth} />
        <path d="M -120 -560 Q 0 -530 120 -560" stroke={shade(cloth, 0.25)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M -150 -596 Q 0 -560 150 -596" stroke={shade(cloth, 0.2)} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* wrapped band across the forehead */}
        <rect x={-170} y={-524} width={340} height={72} rx={36} fill={cloth} />
        <path d="M -150 -500 Q 0 -478 150 -500" stroke={shade(cloth, 0.25)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M -150 -474 Q 0 -452 150 -474" stroke={shade(cloth, 0.25)} strokeWidth={7} fill="none" strokeLinecap="round" />
        {/* pleated fan at the front */}
        <path d={`M ${f1(C0[0])} ${f1(C0[1])} L ${f1(a0[0])} ${f1(a0[1])} A ${R} ${R} 0 0 1 ${f1(a1[0])} ${f1(a1[1])} Z`} fill={fan} />
        {rays.slice(1, -1).map(([rx, ry], i) => (
          <path key={i} d={`M ${f1(C0[0])} ${f1(C0[1])} L ${f1(rx)} ${f1(ry)}`} stroke={shade(fan, 0.3)} strokeWidth={5} />
        ))}
        <path d={`M ${f1(C0[0])} ${f1(C0[1])} L ${f1(a0[0])} ${f1(a0[1])} A ${R} ${R} 0 0 1 ${f1(a1[0])} ${f1(a1[1])} Z`} fill="none" stroke={shade(fan, 0.2)} strokeWidth={4} />
      </g>
    </g>
  );
}
