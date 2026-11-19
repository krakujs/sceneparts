import React from "react";
import { ui, startFrame, enter, popIn, fitSize, Txt, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// CTA button: pops in, then a soft accent glow breathes behind it and a white shine band sweeps across every 90 frames.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 760, H = 170, R = H / 2;
  const k = popIn(p.f, at, 14);
  const on = enter(p.f, at, 8);
  const since = p.f - at;
  const breathe = 0.5 + 0.5 * Math.sin((since / 45) * Math.PI * 2);
  const glowOp = on * (0.25 + 0.25 * breathe);
  const glowGrow = 14 + 18 * breathe;
  const sweepStart = 20;
  const sweepT = since < sweepStart ? -1 : ((since - sweepStart) % 90) / 40;
  const band = sweepT >= 0 && sweepT <= 1 ? sweepT : -1;
  const bx = -W / 2 - 160 + (W + 320) * (band < 0 ? 0 : band);
  const clipId = `cta-clip-${(p.text ?? "x").length}-${W}`;
  const text = String(p.text ?? "Learn more");
  const tw = W - 300;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1000}) scale(${s * k})`}>
      <rect x={-W / 2 - glowGrow} y={-H / 2 - glowGrow} width={W + glowGrow * 2} height={H + glowGrow * 2} rx={R + glowGrow} fill={p.color ?? u.accent} opacity={glowOp} />
      <rect x={-W / 2 + 6} y={-H / 2 + 14} width={W} height={H} rx={R} fill="rgba(0,0,0,0.22)" opacity={on} />
      <defs>
        <clipPath id={clipId}><rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} /></clipPath>
      </defs>
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={R} fill={p.color ?? u.accent} stroke={u.ink} strokeWidth={6} opacity={on} />
      {band >= 0 ? (
        <g clipPath={`url(#${clipId})`}>
          <polygon points={`${bx - 60},${H / 2} ${bx + 20},${-H / 2} ${bx + 80},${-H / 2} ${bx},${H / 2}`} fill={u.white} opacity={0.4} />
        </g>
      ) : null}
      <Txt x={-40} y={20} u={u} size={fitSize(text, 64, tw)} weight={900} fill={u.white} maxW={tw} opacity={on}>{text}</Txt>
      <g transform={`translate(${W / 2 - 92} 0)`} opacity={on}>
        <circle cx={0} cy={0} r={38} fill={u.white} stroke={u.ink} strokeWidth={5} />
        <path d="M-16 0 L16 0 M4 -13 L16 0 L4 13" fill="none" stroke={u.ink} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}
