import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fax machine: office fax with paper feeding out of the top slot and a handset on the right side.
// Origin = bottom centre. anim "feed": a sheet slides out of the slot and back in a loop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.greyLight;
  const anim: string = p.anim ?? "none";
  const feed = anim === "feed";
  const ph = (f % 90) / 90;
  const sheetY = feed ? -40 - 80 * Math.min(1, ph < 0.5 ? ph * 2 : (1 - ph) * 2) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "feed" ? "none" : anim, f)}>
        {/* paper tray at the back */}
        <rect x={-150} y={-300} width={300} height={20} rx={6} fill={C.white} />
        <rect x={-150} y={-280} width={300} height={6} rx={3} fill={shade(C.greyLight, 0.2)} />
        {/* feeding sheet, sliding out of the top slot */}
        <g transform={`translate(0 ${f1(sheetY)})`}>
          <rect x={-120} y={-330} width={240} height={34} rx={4} fill={C.white} />
          {[0, 1].map((i) => <rect key={i} x={-96} y={-322 + i * 12} width={150 - i * 40} height={5} rx={2} fill={C.grey} />)}
        </g>
        {/* body */}
        <rect x={-220} y={-260} width={440} height={240} rx={34} fill={body} />
        <rect x={-220} y={-50} width={440} height={50} rx={24} fill={shade(body, 0.22)} />
        <rect x={-190} y={-232} width={380} height={30} rx={8} fill={shade(body, 0.12)} />
        <path d="M -190 -200 Q 0 -230 190 -200" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.35} />
        {/* display */}
        <rect x={-190} y={-190} width={160} height={60} rx={10} fill={C.ink} />
        <rect x={-172} y={-172} width={90} height={10} rx={5} fill={C.green} />
        <rect x={-172} y={-154} width={56} height={8} rx={4} fill={C.greyDark} />
        {/* keypad */}
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
          <rect key={`${r}${c}`} x={-40 + c * 42} y={-186 + r * 26} width={32} height={18} rx={6} fill={C.greyDark} />
        )))}
        {/* start and stop buttons */}
        <circle cx={160} cy={-170} r={16} fill={C.teal} />
        <circle cx={160} cy={-120} r={16} fill={C.red} />
        {/* handset on the right side, resting in a cradle */}
        <rect x={190} y={-150} width={34} height={100} rx={14} fill={C.inkSoft} transform="translate(0 0)" />
        <rect x={200} y={-170} width={30} height={40} rx={10} fill={C.inkSoft} />
        {/* slot for the outgoing paper at the front */}
        <rect x={-150} y={-40} width={300} height={6} rx={3} fill={C.ink} opacity={0.4} />
      </g>
    </g>
  );
}
