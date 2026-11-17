import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fuel station: a flat canopy on two posts over two fuel pumps, with a small shop building behind. Front view.
// Origin = bottom centre on the ground. About 960 px wide and 700 px tall at s = 1.
// anim "lights": the canopy's strip lights glow in turn with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const canopy = p.color && p.color !== "none" ? p.color : C.red;
  const shop = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const lights = [-380, -300, -220, -140, 140, 220, 300, 380];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={470} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* small shop building on the right */}
        <rect x={120} y={-420} width={330} height={420} rx={12} fill={shop} />
        <rect x={100} y={-452} width={370} height={40} rx={8} fill={shade(shop, 0.2)} />
        <rect x={140} y={-360} width={120} height={120} rx={8} fill={C.sky} />
        <path d="M 150 -360 L 172 -360 L 150 -250 L 140 -250 Z" fill={C.white} opacity={0.4} />
        <rect x={290} y={-360} width={120} height={200} rx={8} fill={C.brownDark} />
        <rect x={300} y={-350} width={100} height={60} rx={6} fill={C.sky} />
        <circle cx={380} cy={-230} r={7} fill={C.yellow} />
        <rect x={120} y={-120} width={330} height={12} fill={C.greyDark} />
        {/* canopy on two posts */}
        <rect x={-430} y={-560} width={560} height={40} rx={10} fill={canopy} />
        <rect x={-440} y={-520} width={580} height={22} rx={6} fill={shade(canopy, 0.2)} />
        <rect x={-420} y={-498} width={18} height={378} fill={C.greyDark} />
        <rect x={112} y={-498} width={18} height={378} fill={C.greyDark} />
        {lights.map((lx, i) => {
          const on = anim === "lights" && Math.floor(f / 4) % lights.length === i;
          return <rect key={lx} x={lx - 14} y={-530} width={28} height={10} rx={5} fill={on ? C.yellow : C.white} />;
        })}
        {/* two fuel pumps */}
        {[-300, -80].map((px, i) => (
          <g key={px}>
            <rect x={px - 40} y={-300} width={80} height={180} rx={14} fill={i ? C.teal : C.blue} />
            <rect x={px - 30} y={-280} width={60} height={50} rx={8} fill={C.sky} />
            <rect x={px - 30} y={-214} width={60} height={22} rx={6} fill={C.greyDark} />
            <path d={`M ${px + 40} -220 Q ${px + 70} -210 ${px + 60} -160 Q ${px + 56} -140 ${px + 42} -150`} fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
            <rect x={px - 60} y={-130} width={120} height={22} rx={8} fill={C.greyDark} />
          </g>
        ))}
        {/* forecourt base */}
        <rect x={-470} y={-120} width={940} height={14} fill={C.grey} />
        <rect x={-480} y={-108} width={960} height={108} rx={0} fill={C.greyLight} />
      </g>
    </g>
  );
}
