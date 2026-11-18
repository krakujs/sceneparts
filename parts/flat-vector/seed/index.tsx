/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Seeds: one large striped sunflower-style seed with two small beans, or one bean splitting open with a tiny sprout.
// Origin = bottom centre of the group.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const bean = (cx: number, cy: number, sc: number, c: string) => (
  <g transform={`translate(${f1(cx)} ${f1(cy)}) rotate(-20) scale(${f1(sc)})`}>
    <ellipse cx={0} cy={0} rx={60} ry={84} fill={c} />
    <path d="M 22 -70 C 50 -40 52 40 26 72" stroke={shade(c, 0.25)} strokeWidth={10} strokeLinecap="round" fill="none" />
    <ellipse cx={-18} cy={-30} rx={14} ry={22} fill="#FFFFFF" opacity={0.25} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const seedC = p.color && p.color !== "none" ? p.color : "#8A5A3C";
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const sprouting = p.variant === "sprouting";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
        {sprouting ? (
          <g>
            <ellipse cx={0} cy={-90} rx={110} ry={130} fill={seedC} />
            <path d="M 0 -220 C -40 -210 -110 -170 -100 -100 C -90 -60 -30 -60 0 -120 Z" fill={shade(seedC, 0.2)} />
            <path d="M 0 -220 C 40 -210 110 -170 100 -100 C 90 -60 30 -60 0 -120 Z" fill={seedC} />
            <path d="M -4 -150 C -10 -200 4 -240 10 -270" stroke={C.green} strokeWidth={10} strokeLinecap="round" fill="none" />
            <ellipse cx={40} cy={-270} rx={34} ry={20} fill={C.green} transform="rotate(30 40 -270)" />
            <ellipse cx={-30} cy={-300} rx={22} ry={14} fill={shade(C.green, 0.12)} transform="rotate(-30 -30 -300)" />
          </g>
        ) : (
          <g>
            <g transform="translate(-80 -60)">
              <ellipse cx={0} cy={-80} rx={130} ry={170} fill={shade("#5E3B26", 0.1)} />
              <ellipse cx={0} cy={-80} rx={120} ry={160} fill="#E8D2A6" />
              {[-70, -35, 0, 35, 70].map((xx, i) => (
                <path key={i} d={`M ${xx} -230 Q ${xx * 0.8} -80 ${xx * 0.9} 70`} stroke={i % 2 ? "#5E3B26" : "#8A5A3C"} strokeWidth={16} fill="none" strokeLinecap="round" />
              ))}
            </g>
            {bean(150, -54, 0.9, "#C9704E")}
            {bean(240, -24, 0.7, "#A8D85A")}
          </g>
        )}
      </g>
    </g>
  );
}
