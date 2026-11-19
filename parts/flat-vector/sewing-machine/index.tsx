import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic desktop sewing machine, unbranded, side view facing right: flat base, column, arm with head, needle,
// thread spool on top and a handwheel on the right. About 600 px wide and 520 px tall at s = 1.
// Origin = bottom centre (the base sits on y). anim "spin": the handwheel turns and the needle bobs.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin";
  const wheelAng = spin ? (f * 6) % 360 : 0;
  const needleY = spin ? Math.sin((f * 2 * Math.PI) / 30) * 14 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={14} fill={C.shadow} />
      <g transform={motion(spin ? "none" : anim, f)}>
        {/* base plate */}
        <rect x={-300} y={-60} width={600} height={60} rx={20} fill={shade(body, 0.25)} />
        {/* bed plate on top of the base, where the fabric goes */}
        <rect x={-220} y={-80} width={380} height={24} rx={10} fill={metal} />
        {/* column */}
        <rect x={-200} y={-340} width={110} height={262} rx={22} fill={body} />
        {/* arm reaching right over the bed */}
        <rect x={-200} y={-400} width={300} height={100} rx={34} fill={body} />
        {/* head at the front end of the arm */}
        <rect x={60} y={-390} width={150} height={190} rx={28} fill={body} />
        <rect x={60} y={-260} width={150} height={60} rx={20} fill={shade(body, 0.22)} />
        {/* face plate */}
        <rect x={160} y={-360} width={44} height={150} rx={12} fill={C.white} opacity={0.25} />
        {/* needle bar and needle */}
        <rect x={120} y={-210} width={14} height={60} rx={6} fill={metal} />
        <rect x={124} y={-150 + needleY} width={6} height={70} rx={3} fill={C.greyDark} />
        <rect x={114} y={-84 + needleY} width={10} height={10} rx={3} fill={C.greyDark} />
        {/* thread spool on the top, pin, and thread guide */}
        <rect x={-150} y={-440} width={18} height={40} rx={6} fill={metal} />
        <ellipse cx={-141} cy={-458} rx={32} ry={22} fill={C.orange} />
        <rect x={-172} y={-474} width={64} height={14} rx={6} fill={shade(C.orange, 0.2)} />
        {/* handwheel on the right side of the column */}
        <g transform={`translate(-60 -250) rotate(${f1(wheelAng)})`}>
          <circle cx={0} cy={0} r={72} fill={shade(body, 0.18)} />
          <circle cx={0} cy={0} r={48} fill={metal} />
          {[0, 60, 120].map((a) => <rect key={a} x={-8} y={-64} width={16} height={128} rx={8} fill={shade(body, 0.3)} transform={`rotate(${a})`} />)}
          <circle cx={0} cy={0} r={12} fill={C.greyDark} />
        </g>
        {/* foot pedal hint on the base */}
        <rect x={-120} y={-18} width={120} height={18} rx={9} fill={shade(body, 0.4)} opacity={0.5} />
      </g>
    </g>
  );
}
