import React from "react";
import { ui, startFrame, enter, type UI } from "../stat-card/index";
import { clamp, type PartProps } from "@sceneparts/core";

// Pointing hand (UI style): white glove-like hand with an ink outline, index finger straight out, the other
// three fingers curled into knuckles and the thumb tucked along the side. The fingertip is the hotspot at (x, y).
// Drawn pointing up (tip at 0,0, hand below it); `dir` rotates it. Exported as <Hand> for other parts.
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Hand(q: { u: UI; sw?: number; fill?: string }) {
  const ink = q.u.ink, fill = q.fill ?? q.u.white, sw = q.sw ?? 7;
  const st = { fill, stroke: ink, strokeWidth: sw, strokeLinejoin: "round" as const };
  return (
    <g>
      {/* drop shadow */}
      <path d="M -14 10 L 14 10 Q 30 10 30 30 L 30 92 L 112 92 Q 134 92 134 120 L 134 196 Q 134 236 96 236 L 6 236 Q -30 236 -40 204 L -66 140 Q -74 116 -50 108 L -30 104 L -30 30 Q -30 10 -14 10 Z"
        fill="rgba(0,0,0,0.18)" transform="translate(10 12)" />
      {/* thumb: lies along the left side, its tip angled out and up */}
      <path d="M -26 176 L -62 132 Q -74 114 -56 104 Q -42 96 -30 110 L 0 148 Z" {...st} />
      {/* palm / back of the hand */}
      <path d="M -22 104 L 124 104 Q 136 104 136 124 L 136 196 Q 136 238 96 238 L 6 238 Q -30 238 -32 200 Z" {...st} />
      {/* three curled fingers: knuckles stepping down to the little finger */}
      <rect x={18} y={84} width={40} height={64} rx={20} {...st} />
      <rect x={56} y={92} width={40} height={60} rx={20} {...st} />
      <rect x={94} y={102} width={38} height={54} rx={19} {...st} />
      {/* index finger, straight up */}
      <path d="M -24 150 L -24 20 Q -24 0 0 0 Q 24 0 24 20 L 24 150" {...st} />
      <path d="M -10 34 Q 0 30 10 34" stroke={ink} strokeWidth={sw * 0.6} fill="none" strokeLinecap="round" opacity={0.5} />
      {/* cuff */}
      <rect x={-20} y={234} width={148} height={34} rx={10} {...st} fill={q.u.soft} />
    </g>
  );
}

const ROT: Record<string, number> = { up: 0, right: 90, down: 180, left: -90 };

export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const x = p.x ?? 540, y = p.y ?? 960;
  const dir: string = p.dir ?? "right";
  const rot = dir === "left" ? 90 : ROT[dir] ?? 90;
  const mx = dir === "left" ? -1 : 1;
  const S = s * 1.5;
  const anim: string = p.anim ?? "point";
  const f = p.f ?? 0;
  const t = f - at;
  const k = at <= 0 ? 1 : enter(f, at, 10);
  // point: nudges toward the target every 30 frames; tap: presses in and sends a ripple from the tip.
  let off = 0, sc = 1, rip = -1;
  if (anim === "point") off = 18 * Math.max(0, Math.sin(Math.max(0, t) * 2 * Math.PI / 30));
  if (anim === "tap") {
    const c = ((Math.max(0, t) % 36) + 36) % 36;
    sc = c < 8 ? 1 - 0.1 * Math.sin((c / 8) * Math.PI) : 1;
    rip = c >= 4 ? clamp((c - 4) / 22) : -1;
  }
  const col = p.color ?? u.accent;
  return (
    <g opacity={k}>
      {rip >= 0 ? (
        <g transform={`translate(${x} ${y}) scale(${S})`} opacity={1 - rip}>
          <circle cx={0} cy={0} r={16 + rip * 80} fill="none" stroke={col} strokeWidth={8} />
        </g>
      ) : null}
      <g transform={`translate(${x} ${y}) scale(${mx} 1) rotate(${rot}) scale(${S * sc}) translate(0 ${(1 - k) * 60 + 14 - off})`}>
        <Hand u={u} />
      </g>
    </g>
  );
}
