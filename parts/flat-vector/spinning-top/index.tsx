import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden spinning top on its point. Body is a rounded dome that narrows to a tip, with a coloured band and
// a handle knob on top. Origin = the tip, at bottom centre. About 300 px wide, 380 px tall at s = 1.
// anim "spin": the top turns on its point, with a small wobble and a spinning stripe pattern.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const band = p.accent && p.accent !== "none" ? p.accent : C.blue;
  const anim: string = p.anim ?? "none";
  const wobble = anim === "spin" ? Math.sin((f * 2 * Math.PI) / 24) * 3 : 0;
  const turn = anim === "spin" ? f * 22 : 0;
  // Stripes sweep across the body as it turns: their horizontal offset cycles with the spin.
  const stripeX = (k: number) => {
    const ph = (((turn + k * 120) % 360) + 360) % 360;
    return Math.cos((ph * Math.PI) / 180) * 80;
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={110} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(wobble)} 0 0)`}>
          {/* tip */}
          <path d="M -8 0 L 8 0 L 12 -40 L -12 -40 Z" fill={C.greyDark} />
          {/* body: dome narrowing to the stem */}
          <path d="M -12 -40 Q -150 -110 -140 -190 Q -130 -250 0 -260 Q 130 -250 140 -190 Q 150 -110 12 -40 Z" fill={body} />
          {/* lower shade */}
          <path d="M -12 -40 Q -110 -70 -120 -120 Q -60 -90 12 -40 Z" fill={shade(body, 0.2)} />
          {/* stripes that sweep with the spin */}
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M ${f1(stripeX(k) * 0.45)} -40 Q ${f1(stripeX(k) * 1.1)} -150 ${f1(stripeX(k) * 0.5)} -250`} fill="none" stroke={shade(body, 0.22)} strokeWidth={10} strokeLinecap="round" opacity={0.55} />
          ))}
          {/* band */}
          <path d="M -140 -170 Q 0 -150 140 -170 L 136 -132 Q 0 -112 -136 -132 Z" fill={band} />
          {/* stem and knob */}
          <rect x={-30} y={-290} width={60} height={34} rx={14} fill={C.brownDark} />
          <ellipse cx={0} cy={-296} rx={48} ry={18} fill={C.brown} />
          <ellipse cx={-14} cy={-300} rx={16} ry={5} fill={C.white} opacity={0.3} />
        </g>
      </g>
    </g>
  );
}
