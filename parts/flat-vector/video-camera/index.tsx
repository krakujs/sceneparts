import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld camcorder in side view, facing right: top carry handle, lens at the front, a flip-out screen
// hinged on the left side and a red record light. Origin = bottom centre. anim "rec" blinks the REC dot.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const recOn = anim === "rec" ? Math.floor(f / 30) % 2 === 0 : true;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={20} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "rec" ? "" : anim, f)}>
        {/* carry handle */}
        <path d="M -90 -270 V -320 Q -90 -342 -68 -342 H 16 Q 38 -342 38 -320 V -270" fill="none" stroke={shade(body, 0.3)} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
        {/* grip underneath */}
        <rect x={-150} y={-100} width={70} height={100} rx={26} fill={shade(body, 0.15)} />
        {/* main body */}
        <rect x={-170} y={-280} width={280} height={190} rx={36} fill={body} />
        <rect x={-150} y={-262} width={170} height={12} rx={6} fill={C.white} opacity={0.15} />
        <rect x={-130} y={-200} width={120} height={60} rx={14} fill={shade(body, 0.22)} />
        <circle cx={40} cy={-180} r={9} fill={C.greyDark} />
        <circle cx={70} cy={-180} r={9} fill={C.greyDark} />
        {/* record light */}
        <circle cx={96} cy={-258} r={10} fill={C.red} opacity={recOn ? 1 : 0.25} />
        {/* front lens barrel */}
        <rect x={100} y={-232} width={92} height={84} rx={12} fill={C.ink} />
        <rect x={174} y={-248} width={26} height={116} rx={10} fill={C.greyDark} />
        <ellipse cx={200} cy={-190} rx={9} ry={44} fill={C.navy} />
        <ellipse cx={197} cy={-212} rx={3} ry={12} fill={C.white} opacity={0.6} />
        {/* flip-out screen, hinged on the left side of the body */}
        <g transform="translate(-170 -226) rotate(-14)">
          <rect x={-130} y={-80} width={130} height={100} rx={12} fill={body} />
          <rect x={-118} y={-68} width={106} height={76} rx={8} fill={scr} />
          <rect x={-104} y={-60} width={40} height={8} rx={4} fill={C.white} opacity={0.4} />
          <circle cx={-28} cy={-40} r={6} fill={C.red} opacity={recOn ? 1 : 0.25} />
        </g>
      </g>
    </g>
  );
}
