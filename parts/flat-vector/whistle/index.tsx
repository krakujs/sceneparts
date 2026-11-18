import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic metal sports whistle on a lanyard, seen from the side: a rounded barrel with a flat mouthpiece
// sticking out to the left, a rectangular air slot on top, and a ring at the back that the lanyard cord
// passes through. The cord loops up from the ring to the top of the lanyard.
// x = centre of the whistle, y = top of the lanyard (the loop apex, which is the swing pivot).
// About 390 px wide and 370 px tall at s = 1. anim "blow": sound lines puff out of the mouthpiece.
const f1 = (v: number) => v.toFixed(1);
const swingAngle = (anim: string, f: number) => (anim === "swing" ? 7 * Math.sin((f * 2 * Math.PI) / 60) : 0);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const cord = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  const ang = swingAngle(anim, f);
  // sound lines: each one slides out of the mouthpiece and fades, staggered
  const puffs = anim === "blow"
    ? [0, 1, 2].map((i) => {
      const t = ((f + i * 14) % 42) / 42;
      return { op: Math.sin(Math.PI * t) * 0.9, dx: -t * 22, y: 222 + i * 27, len: i === 1 ? 34 : 26 };
    })
    : [];
  // The apex sits 146 px right of the whistle's centre (the whistle is drawn scaled 1.2 about the apex).
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <g transform={`translate(0 ${f1(bob)})`}>
        <g transform={`translate(146 0) rotate(${f1(ang)})`}>
          <g transform="scale(1.2) translate(-118 0)">
            {/* lanyard cord: loops up from the ring and back down into it, apex at (118, 0) */}
            <path d="M 84 150 C 78 -50 158 -50 152 150" fill="none" stroke={cord} strokeWidth={16} strokeLinecap="round" />
            {/* ring at the back, under the cord, hooked over the barrel */}
            <circle cx={118} cy={150} r={34} fill="none" stroke={C.greyDark} strokeWidth={14} />

            {/* mouthpiece: a flat tab sticking out to the left */}
            <path d="M -96 214 L -158 222 Q -166 224 -166 236 L -166 262 Q -166 274 -158 276 L -96 282 Z" fill={shade(metal, 0.12)} />
            <rect x={-166} y={240} width={8} height={18} rx={3} fill={C.ink} />

            {/* barrel: a rounded chamber */}
            <rect x={-102} y={186} width={260} height={120} rx={60} fill={metal} />
            <path d="M -102 246 A 60 60 0 0 0 -42 306 L 98 306 A 60 60 0 0 0 158 246 Z" fill={shade(metal, 0.25)} />
            {/* rectangular air slot on top */}
            <rect x={-72} y={190} width={70} height={14} rx={4} fill={C.ink} opacity={0.75} />
            {/* shine along the top */}
            <rect x={10} y={194} width={100} height={8} rx={4} fill="#FFFFFF" opacity={0.4} />

            {/* sound lines */}
            {puffs.map((q, i) => (
              <line key={i} x1={-186 + q.dx} y1={q.y} x2={-186 - q.len + q.dx} y2={q.y} stroke={C.blueDark} strokeWidth={7} strokeLinecap="round" opacity={f1(q.op) as any} />
            ))}
          </g>
        </g>
      </g>
    </g>
  );
}
