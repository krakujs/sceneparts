import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round webcam with a clip on top, a lens and a status LED, on a small desk stand. Origin = bottom centre (stands on y).
// About 260 px wide and 420 px tall at s = 1. anim "blink": the LED blinks on and off.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const led = p.led && p.led !== "none" ? p.led : C.green;
  const anim: string = p.anim ?? "none";
  const ledOn = anim !== "blink" || Math.floor(f / 15) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-90} y={-22} width={180} height={22} rx={11} fill={shade(body, 0.25)} />
        <rect x={-16} y={-160} width={32} height={140} rx={12} fill={shade(body, 0.15)} />
        <circle cx={0} cy={-160} r={24} fill={shade(body, 0.2)} />
        {/* clip on the top edge */}
        <rect x={-84} y={-392} width={168} height={56} rx={22} fill={shade(body, 0.3)} />
        {/* head */}
        <circle cx={0} cy={-270} r={120} fill={body} />
        <circle cx={0} cy={-270} r={104} fill={shade(body, 0.2)} />
        <circle cx={0} cy={-270} r={84} fill={body} />
        <circle cx={0} cy={-270} r={62} fill={C.ink} />
        <circle cx={0} cy={-270} r={46} fill={C.navy} />
        <circle cx={-14} cy={-284} r={12} fill={C.white} opacity={0.5} />
        <circle cx={16} cy={-256} r={5} fill={C.white} opacity={0.3} />
        <path d="M -90 -300 A 100 100 0 0 1 -20 -368" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.25} />
        {ledOn && <circle cx={72} cy={-340} r={18} fill={led} opacity={0.3} />}
        <circle cx={72} cy={-340} r={9} fill={ledOn ? led : shade(led, 0.4)} />
      </g>
    </g>
  );
}
