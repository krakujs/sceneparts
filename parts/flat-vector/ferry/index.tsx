import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Car and passenger ferry, side view facing right. Origin = waterline centre. Room scale: about 800 px wide.
// Wide hull, open car deck with two cars showing, passenger deck with windows and a wheelhouse on top.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 100) * 1.0)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 70} y={8} width={100} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 170} y={18} width={100} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const hull = p.color2 && p.color2 !== "none" ? p.color2 : C.blueDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* wheelhouse on top */}
        <rect x={30} y={-382} width={170} height={16} rx={8} fill={shade(body, 0.15)} />
        <rect x={40} y={-370} width={150} height={70} rx={10} fill={body} />
        <rect x={56} y={-358} width={118} height={30} rx={6} fill={C.sky} />
        <rect x={110} y={-410} width={6} height={28} fill={C.greyDark} />
        {/* passenger deck with a row of windows */}
        <rect x={-330} y={-300} width={640} height={92} rx={10} fill={body} />
        <rect x={-330} y={-216} width={640} height={8} fill={shade(body, 0.15)} />
        {Array.from({ length: 11 }, (_, k) => (
          <rect key={k} x={-300 + k * 56} y={-286} width={40} height={30} rx={6} fill={C.sky} />
        ))}
        {/* open car deck: a dark interior with two cars */}
        <rect x={-400} y={-208} width={780} height={14} rx={6} fill={body} />
        <rect x={-370} y={-194} width={720} height={92} fill={C.greyDark} />
        <rect x={-390} y={-196} width={12} height={104} fill={body} />
        <rect x={378} y={-196} width={12} height={104} fill={body} />
        <rect x={-320} y={-150} width={130} height={46} rx={16} fill={C.red} />
        <rect x={-300} y={-170} width={80} height={24} rx={6} fill={C.sky} />
        <circle cx={-290} cy={-98} r={14} fill={C.ink} />
        <circle cx={-220} cy={-98} r={14} fill={C.ink} />
        <rect x={60} y={-150} width={130} height={46} rx={16} fill={C.yellow} />
        <rect x={80} y={-170} width={80} height={24} rx={6} fill={C.sky} />
        <circle cx={90} cy={-98} r={14} fill={C.ink} />
        <circle cx={160} cy={-98} r={14} fill={C.ink} />
        {/* hull */}
        <path d="M -400 -92 L 380 -92 Q 420 -92 360 -20 L 290 12 L -380 12 Q -410 -40 -400 -92 Z" fill={hull} />
        <rect x={-398} y={-60} width={740} height={10} fill={shade(hull, 0.25)} />
      </g>
      <Water w={840} />
    </g>
  );
}
