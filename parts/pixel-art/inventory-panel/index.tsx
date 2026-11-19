import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL } from "../style/index";
import { Icon, Panel, PixText } from "../backdrop/index";

// Inventory panel: pixel-art item bag (reference for grid menus). A 4 by 3 grid of dark slots with item icons and
// stack counts, a highlighted cursor that steps through the slots, and a header. Transparent around the panel.

const ITEMS: ({ icon: string; n?: number } | null)[] = [
  { icon: "potion", n: 2 }, { icon: "sword" }, { icon: "key" }, { icon: "gem", n: 3 },
  { icon: "coin", n: 42 }, { icon: "chest" }, { icon: "potion", n: 5 }, { icon: "gem" },
  { icon: "key" }, null, { icon: "sword" }, null,
];
const SLOT = 96, PITCH = 120, COLS = 4, ROWS = 3;
const GRID_W = (COLS - 1) * PITCH + SLOT, GRID_H = (ROWS - 1) * PITCH + SLOT;
const PAD = 48, HEADER = 96;
const W = GRID_W + 2 * PAD, H = GRID_H + HEADER + PAD;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const t = Math.max(0, p.f - (p.at ?? 0));
  if (p.f < (p.at ?? 0)) return <g />;
  const pop = t < 6 ? 0.6 + (0.4 * t) / 6 : 1;
  const move = (p.anim ?? "move") === "move";
  const cursor = move ? Math.floor(p.f / 15) % (COLS * ROWS) : 0;
  const top = -H / 2 + HEADER + PAD / 2 - 24;
  const left = -GRID_W / 2;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * pop})`}>
      <Panel x={-W / 2} y={-H / 2} w={W} h={H} />
      <PixText x={0} y={-H / 2 + 64} text={p.title ?? "BAG"} size={44} fill={PAL.y} />
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const cx = left + (i % COLS) * PITCH, cy = top + Math.floor(i / COLS) * PITCH;
        const item = ITEMS[i];
        const sel = i === cursor;
        return (
          <g key={i}>
            {sel && <rect x={cx - 12} y={cy - 12} width={SLOT + 24} height={SLOT + 24} fill={PAL.y} />}
            <rect x={cx} y={cy} width={SLOT} height={SLOT} fill="#5a6170" />
            <rect x={cx + 12} y={cy + 12} width={SLOT - 24} height={SLOT - 24} fill="#0b0b22" />
            {item && <Icon name={item.icon} x={cx + 8} y={cy + 8} cell={8} />}
            {item?.n && <PixText x={cx + SLOT - 12} y={cy + SLOT - 14} text={`x${item.n}`} size={22} anchor="end" shadow={false} fill={PAL.w} />}
          </g>
        );
      })}
    </g>
  );
}
