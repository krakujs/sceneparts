import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

// Full-width bottom news band: a flashing accent label block, a headline band that slides in
// from the right, and a thin scrolling ticker under it. x = centre, y = top edge.
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
  const cx = p.x ?? 540, y = p.y ?? 1560;
  const label = String(p.label ?? "BREAKING");
  const headline = String(p.headline ?? "Officials confirm the new plan starts next week");
  const ticker = String(p.ticker ?? "More details to follow  •  Stay with us  •  ");
  const BLK = 300, BAND_H = 140, TK = 62, SPEED = 3;

  const eBlk = enter(p.f, at, 12);
  const eBand = enter(p.f, at + 8, 18);
  const eTk = enter(p.f, at + 20, 14);
  const flash = 0.5 + 0.5 * Math.sin(p.f * 0.45);

  // headline: at most two lines, the second one ellipsised
  const HL_W = 1080 - BLK - 72;
  let hSize = 46;
  let lines = wrap(headline, Math.floor(HL_W / (hSize * 0.58)));
  if (lines.length > 2) lines = [lines[0], lines[1].slice(0, Math.floor(HL_W / (hSize * 0.58)) - 1) + "…"];
  const baselines = lines.length === 1 ? [BAND_H / 2 + 14] : [BAND_H / 2 - 6, BAND_H / 2 + 46];

  // ticker: repeat the string so it loops seamlessly
  const tSize = 34;
  const period = Math.max(1, ticker.length * tSize * 0.66);
  const off = (Math.max(0, p.f - at) * SPEED) % period;
  const copies: React.ReactNode[] = [];
  for (let i = -2; i <= 2; i++) {
    const x = i * period - off;
    if (x + period > -560 && x < 560) {
      copies.push(
        <text key={i} x={x} y={BAND_H + TK / 2 + 12} fontFamily={u.font} fontSize={tSize} fontWeight={800} fill={u.card}>{ticker}</text>,
      );
    }
  }

  return (
    <g transform={`translate(${cx - 540} ${y}) scale(${p.s ?? 1})`}>
      <g transform={`translate(${(1 - eBlk) * -BLK} 0)`}>
        <rect x={0} y={0} width={BLK} height={BAND_H} fill={u.accent} stroke={u.ink} strokeWidth={5} />
        <rect x={0} y={0} width={BLK} height={BAND_H} fill={u.white} opacity={0.35 * flash * eBlk} />
        <Txt x={BLK / 2} y={BAND_H / 2 + 16} u={u} size={44} weight={900} fill={u.white} maxW={BLK - 40} ls={2}>{label}</Txt>
      </g>
      <g transform={`translate(${(1 - eBand) * (1080 - BLK)} 0)`}>
        <rect x={BLK} y={0} width={1080 - BLK} height={BAND_H} fill={u.card} stroke={u.ink} strokeWidth={5} />
        {lines.map((l, i) => (
          <Txt key={i} x={BLK + 36} y={baselines[i]} u={u} size={hSize} weight={900} anchor="start">{l}</Txt>
        ))}
      </g>
      <g opacity={eTk}>
        <rect x={0} y={BAND_H} width={1080} height={TK} fill={u.ink} />
        <g clipPath={`url(#bn-clip-${Math.round(p.y ?? 0)})`}>{copies}</g>
        <defs>
          <clipPath id={`bn-clip-${Math.round(p.y ?? 0)}`}>
            <rect x={0} y={BAND_H} width={1080} height={TK} />
          </clipPath>
        </defs>
      </g>
    </g>
  );
}
