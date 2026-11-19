import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

// Friendly tip banner: a green (or accent, via color) rounded banner with a lightbulb icon and "TIP:" + text.
const wrap = (text: string, maxChars: number) => {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (next.length > maxChars && cur) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const fill: string = p.color ?? u.good;
  const label = String(p.label ?? "TIP:");
  const text = String(p.text ?? "Save the receipt until you are sure the order is right.");
  const W = 900, PAD_L = 180, PAD_R = 44, SIZE = 44, LH = 58;
  const lines = wrap(text, Math.floor((W - PAD_L - PAD_R) / (SIZE * 0.56))).slice(0, 3);
  const chipW = Math.round(label.length * 30 * 0.7 + 40);
  const firstBase = 136;
  const H = Math.max(176, firstBase + (lines.length - 1) * LH + 42);
  const eSlide = enter(p.f, at, 16);
  const eBulb = enter(p.f, at + 8, 12);
  const eText = enter(p.f, at + 14, 14);
  const glow = 0.5 + 0.5 * Math.sin(p.f * 0.25);
  const cx = 96, cy = H / 2;

  return (
    <g transform={`translate(${(p.x ?? 540) - W / 2 + (1 - eSlide) * -120} ${(p.y ?? 960) - H / 2}) scale(${p.s ?? 1})`} opacity={eSlide}>
      <rect x={6} y={14} width={W} height={H} rx={26} fill="rgba(0,0,0,0.18)" />
      <rect x={0} y={0} width={W} height={H} rx={26} fill={fill} stroke={u.ink} strokeWidth={5} />
      <g transform={`translate(${cx} ${cy}) scale(${eBulb})`}>
        <circle r={54} fill={u.white} stroke={u.ink} strokeWidth={4} />
        <circle r={60} fill={u.white} opacity={0.25 * glow} />
        <circle cx={0} cy={-8} r={23} fill={fill} />
        <rect x={-11} y={12} width={22} height={15} rx={4} fill={fill} />
        <path d="M-10 26 L10 26" stroke={u.white} strokeWidth={3} />
      </g>
      <g opacity={eText}>
        <rect x={PAD_L} y={36} width={chipW} height={50} rx={25} fill={u.ink} />
        <Txt x={PAD_L + chipW / 2} y={70} u={u} size={30} weight={900} fill={u.white} ls={3}>{label}</Txt>
        {lines.map((l, i) => (
          <Txt key={i} x={PAD_L} y={firstBase + i * LH} u={u} size={SIZE} weight={700} anchor="start" fill={u.white}>{l}</Txt>
        ))}
      </g>
    </g>
  );
}
