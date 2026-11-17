import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round smoke alarm: a white disc with a vented centre and a small LED at the bottom. anim "beep" blinks the
// red LED and shows sound arcs on both sides. Wall/ceiling item: centred on (x, y), default y 760, no ground shadow.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(Math.min(1, Math.max(0, f / 20)))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const beeping = p.anim === "beep";
  const on = !beeping || Math.floor(f / 15) % 2 === 0;
  const holes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [Math.cos(a) * 58, Math.sin(a) * 58];
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim === "beep" ? "none" : (p.anim ?? "none"), f)}>
        {/* sound arcs, on both sides, while beeping */}
        {beeping && on && (
          <g fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round">
            <path d="M -206 -60 Q -236 0 -206 60" />
            <path d="M -250 -100 Q -292 0 -250 100" opacity={0.6} />
            <path d="M 206 -60 Q 236 0 206 60" />
            <path d="M 250 -100 Q 292 0 250 100" opacity={0.6} />
          </g>
        )}
        {/* disc: rim, face, vented centre */}
        <circle cx={0} cy={0} r={170} fill={shade(c, 0.1)} />
        <circle cx={0} cy={-6} r={160} fill={c} />
        <circle cx={0} cy={-6} r={96} fill={shade(c, 0.08)} />
        {holes.map(([hx, hy], i) => (
          <circle key={i} cx={f1(hx)} cy={f1(hy - 6)} r={10} fill={shade(c, 0.35)} />
        ))}
        <circle cx={0} cy={-6} r={22} fill={shade(c, 0.2)} />
        {/* LED at the bottom edge */}
        {on && <circle cx={0} cy={124} r={24} fill={C.red} opacity={0.3} />}
        <circle cx={0} cy={124} r={12} fill={on ? C.red : C.redDark} />
      </g>
    </g>
  );
}
