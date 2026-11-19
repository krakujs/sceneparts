import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Hazard-stripe warning banner: yellow and black border, a triangle "!" icon and short warning text.
// It shakes on entrance. x, y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const title = String(p.title ?? "WARNING").toUpperCase();
  const text = String(p.text ?? "Wet floor ahead");
  const W = 860, H = 200, B = 30, STRIPE = 56;
  const TEXT_X = B + 200, TEXT_W = W - TEXT_X - 36;
  const tSize = fitSize(text, 56, TEXT_W);
  const k = popIn(p.f, at, 10);
  const amp = 18 * (1 - enter(p.f, at, 22));
  const shake = p.f >= at ? Math.sin((p.f - at) * 2.6) * amp : 0;
  const eIn = enter(p.f, at + 4, 12);
  const clipId = `warning-banner-clip-${W}-${H}`;

  const stripes: React.ReactNode[] = [];
  for (let i = -1; i * STRIPE < W + H; i++) {
    const x0 = i * STRIPE;
    stripes.push(
      <polygon key={i} points={`${x0},0 ${x0 + STRIPE / 2},0 ${x0 + STRIPE / 2 + H},${H} ${x0 + H},${H}`} fill={u.warn} />,
    );
  }

  const cx = B + 100, cy = H / 2;
  return (
    <g transform={`translate(${(p.x ?? 540) - W / 2 + shake} ${(p.y ?? 960) - H / 2}) scale(${(p.s ?? 1) * k})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={W} height={H} rx={22} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x={0} y={0} width={W} height={H} fill={u.ink} />
        {stripes}
      </g>
      <rect x={0} y={0} width={W} height={H} rx={22} fill="none" stroke={u.ink} strokeWidth={6} />
      <rect x={B} y={B} width={W - 2 * B} height={H - 2 * B} rx={12} fill={u.card} />
      <g opacity={eIn}>
        <path d={`M${cx} ${cy - 62} L${cx + 64} ${cy + 46} L${cx - 64} ${cy + 46} Z`} fill={u.warn} stroke={u.ink} strokeWidth={8} strokeLinejoin="round" />
        <Txt x={cx} y={cy + 38} u={u} size={84} weight={900}>!</Txt>
        <Txt x={TEXT_X} y={cy - 22} u={u} size={34} weight={900} anchor="start" fill={u.bad} ls={6}>{title}</Txt>
        <Txt x={TEXT_X} y={cy + 40} u={u} size={tSize} weight={800} anchor="start">{text}</Txt>
      </g>
    </g>
  );
}
