import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hanbok: a short jacket (jeogori) with a white V collar, cuffs and a bow ribbon (goreum) over a full,
// high-waisted pleated skirt (chima). Hangs from a wooden hanger; the skirt hangs from the waist.
// Origin = bottom centre (the skirt hem rests on y). About 600 px wide, 740 px tall at s = 1.
// Params: color = jacket (jeogori), color2 = skirt (chima) and ribbon, trim cuffs are shaded from color2.
const f1 = (v: number) => v.toFixed(1);

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const jacket = p.color && p.color !== "none" ? p.color : C.red;
  const skirt = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const pleats = Array.from({ length: 9 }, (_, i) => {
    const t = -4 + i;
    return <path key={i} d={`M ${t * 36} -300 L ${t * 46} 0`} stroke={shade(skirt, 0.3)} strokeWidth={5} fill="none" />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* full high-waisted skirt with pleats, flaring to the hem */}
          <path d="M -150 -306 L 150 -306 L 270 0 L -270 0 Z" fill={skirt} />
          <path d="M -270 -26 L 270 -26 L 270 0 L -270 0 Z" fill={shade(skirt, 0.14)} />
          {pleats}
          {/* short jacket with sleeves to the wrist */}
          <path d="M -72 -588 L 72 -588 L 150 -572 L 186 -350 L 160 -340 L 150 -440 L 150 -300 L -150 -300 L -150 -440 L -160 -340 L -186 -350 L -150 -572 Z" fill={jacket} />
          <path d="M 168 -392 L 194 -398 L 186 -350 L 160 -342 Z" fill={skirt} />
          <path d="M -168 -392 L -194 -398 L -186 -350 L -160 -342 Z" fill={skirt} />
          {/* white V collar */}
          <path d="M -72 -588 L 0 -480 L 72 -588 L 56 -588 L 0 -500 L -56 -588 Z" fill={C.white} />
          {/* goreum bow ribbon and its two long tails */}
          <ellipse cx={-22} cy={-426} rx={26} ry={13} transform="rotate(-22 -22 -426)" fill={skirt} />
          <ellipse cx={22} cy={-426} rx={26} ry={13} transform="rotate(22 22 -426)" fill={skirt} />
          <path d="M -6 -420 Q -44 -340 -30 -226 L -12 -226 Q -24 -330 0 -414 Z" fill={shade(skirt, 0.2)} />
          <path d="M 6 -420 Q 44 -340 30 -226 L 12 -226 Q 24 -330 0 -414 Z" fill={shade(skirt, 0.2)} />
          {/* sash at the waist */}
          <rect x={-150} y={-318} width={300} height={18} rx={4} fill={shade(skirt, 0.1)} />
        </g>
      </g>
    </g>
  );
}
