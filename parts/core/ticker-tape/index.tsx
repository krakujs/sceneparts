import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter } from "../stat-card/index";

// Thin full-width strip with items scrolling right to left, separated by dots. x, y = centre.
const H = 84, SIZE = 40, SPEED = 4, GAP = 96;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const items: string[] = Array.isArray(p.items) && p.items.length ? p.items.map((t: any) => String(t)) : ["Top story", "Market update", "Weather ahead"];
  const widths = items.map((t) => t.length * SIZE * 0.62);
  const slot = widths.map((w) => w + GAP);
  const P = slot.reduce((a, b) => a + b, 0);
  const e = enter(p.f, at, 14);
  const cid = `ticker-clip-${Math.round(p.x ?? 540)}-${Math.round(p.y ?? 960)}`;
  const off = (Math.max(0, p.f - at) * SPEED) % P;

  // Only emit the items that touch the strip: far off-canvas copies would stretch the shot's filter region.
  const nodes: React.ReactNode[] = [];
  for (let c = -4; c <= 4; c++) {
    let x = c * P - off;
    items.forEach((t, i) => {
      if (x + widths[i] + GAP > -560 && x < 560) {
        nodes.push(
          <text key={`t${c}-${i}`} x={x} y={14} fontFamily={u.font} fontSize={SIZE} fontWeight={800} fill={u.white}>{t}</text>,
        );
        nodes.push(<circle key={`d${c}-${i}`} cx={x + widths[i] + GAP / 2} cy={0} r={7} fill={u.accent} />);
      }
      x += slot[i];
    });
  }

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g opacity={Math.max(0.01, e)} transform={`translate(0 ${(1 - e) * 40})`}>
        <rect x={-540} y={-H / 2} width={1080} height={H} fill={u.ink} />
        <g clipPath={`url(#${cid})`}>{nodes}</g>
        <defs>
          <clipPath id={cid}>
            <rect x={-540} y={-H / 2} width={1080} height={H} />
          </clipPath>
        </defs>
      </g>
    </g>
  );
}
