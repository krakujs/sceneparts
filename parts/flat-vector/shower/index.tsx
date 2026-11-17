import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shower: wall-mounted head on an arm, a white floor tray and a curtain on a rail. About 1150 px tall at s = 1.
// Origin = bottom centre of the tray. anim "water" drops falling from the head into the tray.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const drops = p.anim === "water";
  // Head holes: a small grid under the disc, where the drops start.
  const holes: [number, number][] = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) holes.push([-290 + i * 30, -1078 + j * 12]);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wall flange and arm */}
        {/* wall pipe rising from the tray, then a gooseneck arm to the head */}
        <rect x={-372} y={-1140} width={22} height={1048} rx={11} fill={C.greyDark} />
        <path d="M -361 -1100 L -361 -1130 Q -361 -1160 -330 -1160 Q -270 -1160 -240 -1128" stroke={C.greyDark} strokeWidth={20} strokeLinecap="round" fill="none" />
        {/* shower head: dome above a flat disc with holes */}
        <rect x={-246} y={-1126} width={32} height={26} rx={8} fill={C.greyDark} />
        <path d="M -330 -1074 C -330 -1122 -130 -1122 -130 -1074 Z" fill={C.greyLight} />
        <ellipse cx={-230} cy={-1074} rx={100} ry={22} fill={shade(C.greyLight, 0.18)} />
        {holes.map(([hx, hy], i) => <circle key={i} cx={hx} cy={hy} r={4} fill={C.greyDark} />)}
        {/* rail and curtain */}
        <rect x={-352} y={-1000} width={704} height={16} rx={8} fill={C.greyDark} />
        <path d="M -320 -992 L 320 -992 L 320 -100 Q 280 -70 240 -100 Q 200 -130 160 -100 Q 120 -70 80 -100 Q 40 -130 0 -100 Q -40 -70 -80 -100 Q -120 -130 -160 -100 Q -200 -70 -240 -100 Q -280 -130 -320 -100 Z" fill={c} />
        {[-200, -100, 0, 100, 200].map((fx) => (
          <path key={fx} d={`M ${fx} -960 L ${fx} -150`} stroke={shade(c, 0.15)} strokeWidth={8} strokeLinecap="round" fill="none" />
        ))}
        {/* drops, in front of the curtain */}
        {drops && Array.from({ length: 12 }, (_, i) => {
          const dx = -300 + (i % 6) * 26 + (i >= 6 ? 10 : 0);
          const t = (((f * 3) + i * 37) % 110) / 110;
          return <ellipse key={i} cx={dx} cy={-1050 + t * 950} rx={8} ry={14} fill={C.skyDeep} opacity={t > 0.9 ? (1 - t) * 10 : 0.9} />;
        })}
        {/* white floor tray */}
        <rect x={-360} y={-96} width={720} height={96} rx={30} fill={C.white} />
        <rect x={-360} y={-44} width={720} height={44} rx={22} fill={shade(C.white, 0.15)} />
      </g>
    </g>
  );
}
