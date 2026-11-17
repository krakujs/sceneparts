import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Symmetrical palace, front view: a central block with a dome, two wings, a column portico and wide steps.
// Origin = centre of the floor line. About 1000 px wide and 740 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const winLit = (f: number, i: number) => (Math.floor(f / 10) + i) % 5 === 0 ? C.yellow : C.sky;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.paper;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? winLit(f, i) : C.sky);
  const wins: React.ReactNode[] = [];
  let k = 0;
  // windows on both wings: two rows, symmetrical
  for (const wx of [-420, -320, -220, 160, 260, 360]) {
    for (const wy of [-420, -300]) {
      wins.push(<rect key={k} x={wx} y={wy} width={60} height={90} rx={28} fill={C.white} />, <rect key={k + 100} x={wx + 7} y={wy + 7} width={46} height={76} rx={22} fill={lit(k)} />);
      k++;
    }
  }
  const col = (cx: number) => <rect key={`c${cx}`} x={cx - 10} y={-340} width={20} height={250} fill={C.white} />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={500} ry={22} fill={C.shadow} />
        {/* wings and centre block */}
        <rect x={-500} y={-400} width={1000} height={400} rx={8} fill={stone} />
        <rect x={-500} y={-410} width={1000} height={20} fill={shade(stone, 0.12)} />
        <rect x={-130} y={-560} width={260} height={160} fill={stone} />
        <rect x={-150} y={-580} width={300} height={24} fill={shade(stone, 0.1)} />
        {/* dome on a drum */}
        <rect x={-100} y={-640} width={200} height={70} fill={stone} />
        <path d="M -110 -640 Q -110 -760 0 -790 Q 110 -760 110 -640 Z" fill={accent} />
        <path d="M -40 -780 L 40 -780 L 30 -820 L -30 -820 Z" fill={shade(accent, 0.1)} />
        <rect x={-4} y={-850} width={8} height={36} fill={C.greyDark} />
        {/* windows */}
        {wins}
        {/* central portico with columns */}
        <rect x={-150} y={-360} width={300} height={24} fill={shade(stone, 0.1)} />
        {[-120, -60, 0, 60, 120].map((cx) => col(cx))}
        <rect x={-130} y={-350} width={260} height={16} fill={C.white} />
        {/* door */}
        <path d="M -40 -110 L -40 -220 Q -40 -250 0 -250 Q 40 -250 40 -220 L 40 -110 Z" fill={C.brownDark} />
        {/* steps */}
        <rect x={-300} y={-110} width={600} height={20} fill={shade(stone, 0.08)} />
        <rect x={-380} y={-90} width={760} height={20} fill={shade(stone, 0.16)} />
        <rect x={-460} y={-70} width={920} height={20} fill={shade(stone, 0.24)} />
        <rect x={-500} y={-40} width={1000} height={40} fill={shade(stone, 0.3)} />
      </g>
    </g>
  );
}
