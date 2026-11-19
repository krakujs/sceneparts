import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Brown volcano cone with a glowing crater and lava streams. Origin = centre of the base. About 840 px wide and 730 px tall at s = 1 (smoke rises above).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const cone = col(p.color, C.brown);
  const lava = col(p.color2, C.orange);
  const anim: string = p.anim ?? "none";
  const puffs = [0, 1, 2, 3, 4].map((i) => {
    const P = 96, ph = ((f + i * 19) % P) / P;
    const base = [-30, 25, -5, 55, -60][i], drift = [-40, 50, -20, 30, -60][i];
    return { cx: base + drift * ph, cy: -730 - ph * 430, r: 34 + ph * 80, op: 0.85 * (1 - ph) };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={440} ry={22} fill={C.shadow} />
        {/* cone */}
        <path d="M -420 0 L -80 -700 Q 0 -728 80 -700 L 420 0 Z" fill={cone} />
        <path d="M 0 -726 Q 40 -728 80 -700 L 420 0 L 0 0 Z" fill={shade(cone, 0.2)} />
        {/* lava streams */}
        <path d="M -30 -706 Q -120 -560 -190 -380" stroke={lava} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d="M 36 -704 Q 120 -540 230 -330" stroke={lava} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d="M -30 -706 Q -120 -560 -190 -380" stroke={C.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 36 -704 Q 120 -540 230 -330" stroke={C.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />
        <circle cx={-190} cy={-380} r={22} fill={lava} />
        <circle cx={230} cy={-330} r={22} fill={lava} />
        {/* crater */}
        <ellipse cx={0} cy={-712} rx={70} ry={20} fill={C.brownDark} />
        <ellipse cx={0} cy={-710} rx={56} ry={13} fill={lava} />
        <ellipse cx={0} cy={-711} rx={30} ry={6} fill={C.yellow} />
        {anim === "smoke" && puffs.map((q, i) => (
          <circle key={i} cx={f1(q.cx)} cy={f1(q.cy)} r={f1(q.r)} fill={C.greyLight} opacity={f1(q.op)} />
        ))}
      </g>
    </g>
  );
}
