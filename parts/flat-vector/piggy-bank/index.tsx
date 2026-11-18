import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pink ceramic piggy bank, side view facing right, with a coin slot on its back (top, left side).
// Original design. Origin = floor centre under the feet (1 m ~ 560 px; about 0.4 m tall at s = 1 => ~ 430 px).
// anim "coin": a coin drops into the slot every 90 frames and vanishes as it goes in.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pink = p.color && p.color !== "none" ? p.color : C.pink;
  const anim: string = p.anim ?? "none";
  // coin: hovers above the slot at frame 0, falls in over 70 frames, then the cycle restarts.
  const q = Math.min(1, (f % 90) / 70);
  const coinY = -560 + (-424 + 560) * q * q;
  const coinOp = q < 0.85 ? 1 : Math.max(0, (1 - q) / 0.15);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* the drawing is built at 1.25x its final size; the 0.8 here makes s = 1 about 560 px wide */}
      <g transform="scale(0.8)">
      <ellipse cx={0} cy={0} rx={330} ry={16} fill={C.shadow} />
      {/* curly tail at the back */}
      <path d="M -236 -270 C -300 -300 -310 -220 -262 -228" stroke={pink} strokeWidth={18} strokeLinecap="round" fill="none" />
      {/* back legs (darker), then front legs */}
      <rect x={-170} y={-130} width={66} height={130} rx={30} fill={shade(pink, 0.2)} />
      <rect x={-60} y={-130} width={66} height={130} rx={30} fill={shade(pink, 0.2)} />
      {/* body */}
      <ellipse cx={0} cy={-250} rx={250} ry={170} fill={pink} />
      {/* belly shade along the bottom */}
      <path d="M -200 -150 Q 0 -60 200 -150 Q 120 -110 0 -110 Q -120 -110 -200 -150 Z" fill={shade(pink, 0.12)} />
      {/* front legs */}
      <rect x={70} y={-130} width={66} height={130} rx={30} fill={pink} />
      <rect x={150} y={-130} width={66} height={130} rx={30} fill={pink} />
      {/* coin slot on top of the back */}
      <rect x={-120} y={-426} width={96} height={12} rx={6} fill={C.inkSoft} />
      {/* the coin, falling towards the slot */}
      {anim === "coin" && (
        <g opacity={coinOp}>
          <circle cx={-72} cy={coinY} r={40} fill={C.yellowDark} />
          <circle cx={-72} cy={coinY} r={34} fill={C.yellow} />
          <circle cx={-72} cy={coinY} r={16} fill={C.yellowDark} opacity={0.5} />
        </g>
      )}
      {/* head with snout and ear at the right */}
      <circle cx={232} cy={-262} r={130} fill={pink} />
      <path d="M 200 -372 L 252 -446 L 276 -360 Z" fill={shade(pink, 0.15)} />
      <ellipse cx={346} cy={-236} rx={44} ry={56} fill={shade(pink, 0.12)} />
      <circle cx={334} cy={-246} r={8} fill={shade(pink, 0.4)} />
      <circle cx={356} cy={-226} r={8} fill={shade(pink, 0.4)} />
      <circle cx={280} cy={-300} r={17} fill={C.ink} />
      <circle cx={286} cy={-306} r={5} fill={C.white} />
      {/* cheek */}
      <circle cx={290} cy={-240} r={20} fill={C.red} opacity={0.25} />
      </g>
    </g>
  );
}
