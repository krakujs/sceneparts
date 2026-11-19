import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Winding river in low 3/4 view between grassy banks, wide at the front and narrowing into the distance. Origin = centre of the near edge. About 1000 px wide and 680 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

// Sample the river along its length: t = 0 at the near edge, 1 at the far end.
const N = 24;
const PTS = Array.from({ length: N + 1 }, (_, i) => {
  const t = i / N;
  return { yy: -640 * t, cx: 80 * Math.sin(t * 4.2) * (1 - 0.3 * t), w: 250 * Math.pow(1 - t, 1.25) + 10 };
});
const EDGE = `M ${PTS.map((q) => `${f1(q.cx - q.w)} ${f1(q.yy)}`).join(" L ")} L ${PTS.slice().reverse().map((q) => `${f1(q.cx + q.w)} ${f1(q.yy)}`).join(" L ")} Z`;
const line = (k: number) => `M ${PTS.map((q) => `${f1(q.cx - q.w * k)} ${f1(q.yy)}`).join(" L ")}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const water = col(p.color, "#4AA3D9");
  const bank = col(p.color2, C.green);
  const anim: string = p.anim ?? "none";
  const dash = anim === "flow";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* grassy bank land */}
        <path d="M -500 0 L -500 -560 Q -500 -680 -380 -680 L 380 -680 Q 500 -680 500 -560 L 500 0 Z" fill={bank} />
        <path d="M -500 -560 Q -500 -680 -380 -680 L 380 -680 Q 500 -680 500 -560 Q 300 -600 0 -600 Q -300 -600 -500 -560 Z" fill={C.lime} opacity={0.35} />
        <path d="M -410 -120 l 14 -26 l 10 26 M 380 -90 l 14 -26 l 10 26 M -330 -440 l 12 -22 l 9 22 M 300 -420 l 12 -22 l 9 22" stroke={shade(bank, 0.25)} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* water */}
        <path d={EDGE} fill={water} />
        {/* flowing streaks */}
        <path d={line(0)} stroke={C.white} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.45}
          strokeDasharray={dash ? "60 110" : undefined} strokeDashoffset={dash ? -f * 4 : 0} />
        <path d={line(0.5)} stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.35}
          strokeDasharray={dash ? "40 140" : undefined} strokeDashoffset={dash ? -f * 3 : 0} />
      </g>
    </g>
  );
}
