import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tracked bulldozer facing right with a wide front blade. Room scale, about 770 px tall and 720 px wide at s = 1.
// Origin = floor centre under the tracks. anim "push": the whole dozer drives forward and back.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const K = 1.35; // overall size of the drawing

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const push = anim === "push" ? (30 * (1 - Math.cos((f * 2 * Math.PI) / 90))) / 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${f1(push)} 0) scale(${K})`}>
          {/* tracks with rollers */}
          <rect x={-320} y={-120} width={400} height={120} rx={60} fill={C.inkSoft} />
          {[-270, -200, -130, -60, 10].map((tx) => (
            <circle key={tx} cx={tx} cy={-60} r={22} fill={C.greyDark} />
          ))}
          {/* body, cab and exhaust stack */}
          <rect x={-250} y={-300} width={340} height={190} rx={30} fill={body} />
          <rect x={-240} y={-560} width={26} height={260} rx={8} fill={frame} />
          <rect x={-248} y={-572} width={42} height={20} rx={6} fill={C.inkSoft} />
          <rect x={-210} y={-470} width={170} height={180} rx={28} fill={body} />
          <rect x={-190} y={-440} width={130} height={100} rx={12} fill={C.sky} />
          <rect x={-220} y={-490} width={190} height={30} rx={12} fill={shade(body, 0.2)} />
          {/* blade arms and blade */}
          <rect x={70} y={-270} width={60} height={36} rx={8} fill={frame} />
          <rect x={70} y={-190} width={60} height={36} rx={8} fill={frame} />
          <path d="M120,-430 L190,-430 Q216,-250 186,-120 L120,-120 Z" fill={frame} />
          <rect x={118} y={-132} width={74} height={20} rx={6} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
