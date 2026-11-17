import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Jet ski (personal watercraft), side view facing right. Origin = waterline centre. Room scale: about 560 px wide.
// Sleek body, a seat, handlebars with a small visor. anim "drive" bounces on the waves and throws a spray trail.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2.2)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={w / 2 - 170} y={8} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const seat = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {driving && [0, 1, 2, 3].map((i) => {
          const cx = -280 - ((i * 60 + f * 5) % 200);
          return <ellipse key={i} cx={cx} cy={i % 2 ? -12 : 4} rx={34 - i * 4} ry={8} fill={C.white} opacity={0.95 - i * 0.2} />;
        })}
        {/* handlebars and visor */}
        <line x1={60} y1={-100} x2={90} y2={-196} stroke={C.greyDark} strokeWidth={16} strokeLinecap="round" />
        <line x1={40} y1={-200} x2={140} y2={-190} stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
        <circle cx={36} cy={-204} r={13} fill={C.ink} />
        <circle cx={140} cy={-192} r={13} fill={C.ink} />
        <path d="M 60 -200 L 110 -262 L 150 -256 L 120 -196 Z" fill={C.sky} />
        {/* body: sleek hull with a darker lower band and a jet nozzle */}
        <path d="M -250 -60 Q -250 -100 -210 -100 L 120 -100 Q 230 -100 290 -54 Q 310 -24 270 -8 L -230 -8 Q -252 -24 -250 -60 Z" fill={body} />
        <path d="M -240 -40 L 250 -40 Q 270 -24 270 -8 L -230 -8 Q -240 -24 -240 -40 Z" fill={shade(body, 0.25)} />
        <rect x={-262} y={-50} width={26} height={30} rx={8} fill={C.greyDark} />
        {/* seat */}
        <rect x={-170} y={-152} width={180} height={56} rx={24} fill={seat} />
      </g>
      <Water w={600} />
    </g>
  );
}
