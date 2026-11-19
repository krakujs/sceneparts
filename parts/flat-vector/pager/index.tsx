import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pager: small beeper with a tiny LCD and a belt clip. Hero-scale, origin = bottom centre of the body.
// anim "blink": the LCD flickers between two tones and the bar icon pulses.
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
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const blink = anim === "blink";
  const on = blink ? (Math.sin((f * 2 * Math.PI) / 24) > -0.2 ? 1 : 0.55) : 1;
  const lcd = C.greyLight;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* belt clip peeking out at the back */}
        <rect x={70} y={-330} width={16} height={190} rx={8} fill={shade(body, 0.35)} />
        <rect x={-95} y={-330} width={190} height={330} rx={36} fill={body} />
        <rect x={-95} y={-50} width={190} height={50} rx={26} fill={shade(body, 0.25)} />
        <path d="M -68 -300 Q -70 -318 -50 -320" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.3} />
        {/* LCD window */}
        <rect x={-70} y={-298} width={140} height={84} rx={10} fill={shade(lcd, 0.15)} />
        <rect x={-58} y={-286} width={116} height={60} rx={6} fill={lcd} opacity={on} />
        {/* simple digit-like blocks and signal bars */}
        <rect x={-44} y={-266} width={22} height={34} rx={4} fill={C.ink} opacity={on} />
        <rect x={-14} y={-266} width={22} height={34} rx={4} fill={C.ink} opacity={on} />
        <rect x={16} y={-266} width={22} height={34} rx={4} fill={C.ink} opacity={on} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={36 + i * 8} y={-262 + (2 - i) * 6} width={5} height={28 - (2 - i) * 6} rx={2} fill={C.ink} opacity={blink && i === 2 ? on : 1} />
        ))}
        {/* buttons */}
        <circle cx={-40} cy={-170} r={18} fill={C.greyDark} />
        <circle cx={0} cy={-170} r={18} fill={C.greyDark} />
        <circle cx={40} cy={-170} r={18} fill={C.greyDark} />
        <rect x={-50} y={-130} width={100} height={36} rx={14} fill={C.greyDark} />
        <circle cx={-34} cy={-112} r={6} fill={C.greyLight} />
        <circle cx={34} cy={-112} r={6} fill={C.greyLight} />
        {blink && <circle cx={0} cy={-300} r={5} fill={C.red} opacity={on} />}
      </g>
    </g>
  );
}
