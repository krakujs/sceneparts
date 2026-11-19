import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// USB flash drive lying flat: metal connector (left), coloured body with an LED, and a cap piece (right).
// Origin = bottom centre (the stick lies on y). anim "blink": the activity LED flickers.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const cap = p.cap && p.cap !== "none" ? p.cap : C.blueDark;
  const anim: string = p.anim ?? "none";
  const ledOn = anim !== "blink" || Math.floor(f / 8) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={290} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* metal connector with contact slot */}
        <rect x={-300} y={-82} width={150} height={36} rx={4} fill={C.greyLight} />
        <rect x={-290} y={-74} width={130} height={20} rx={3} fill={C.greyDark} />
        <rect x={-290} y={-70} width={130} height={3} fill={C.greyLight} opacity={0.6} />
        {/* body */}
        <rect x={-150} y={-120} width={240} height={112} rx={22} fill={body} />
        <rect x={-130} y={-112} width={200} height={14} rx={7} fill={C.white} opacity={0.3} />
        <rect x={-150} y={-30} width={240} height={22} rx={11} fill={shade(body, 0.2)} />
        <circle cx={-60} cy={-64} r={7} fill={ledOn ? C.green : shade(C.green, 0.6)} />
        {/* cap */}
        <rect x={90} y={-120} width={170} height={112} rx={22} fill={cap} />
        <circle cx={240} cy={-64} r={10} fill={C.white} />
      </g>
    </g>
  );
}
