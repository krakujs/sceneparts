import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { Panel, PixText } from "../backdrop/index";

// Dialog box: pixel-art RPG text box (reference for UI overlays). Centred on x, y; the text types on from `at`,
// an optional speaker tab sits on the top edge and a blinking arrow shows when the line is done.

const ARROW = ["yyyyy", ".yyy.", "..y.."];

const wrap = (t: string, n: number) => {
  const out: string[] = [];
  let line = "";
  for (const w of t.split(" ")) {
    if ((line + " " + w).trim().length > n) { out.push(line.trim()); line = w; } else line += " " + w;
  }
  if (line.trim()) out.push(line.trim());
  return out;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1500, w = p.w ?? 960, h = p.h ?? 380;
  const size = p.size ?? 48;
  const text: string = p.text ?? "Welcome, traveller! The castle lies beyond the forest.";
  const t = Math.max(0, p.f - (p.at ?? 0));
  const shown = Math.min(text.length, Math.floor(t * (p.speed ?? 1)));
  const lines = wrap(text.slice(0, p.typing === false ? text.length : shown), Math.floor((w - 120) / (size * 0.66)));
  const done = p.typing === false || shown >= text.length;
  const left = x - w / 2, top = y - h / 2;
  return (
    <g>
      <Panel x={left} y={top} w={w} h={h} />
      {p.speaker !== "" && (
        <g>
          <Panel x={left + 36} y={top - 84} w={Math.max(240, (p.speaker ?? "SAGE").length * size * 0.72 + 96)} h={108} fill={PAL.p} />
          <PixText x={left + 84} y={top - 12} text={p.speaker ?? "SAGE"} size={size * 0.9} anchor="start" fill={PAL.y} />
        </g>
      )}
      {lines.map((l, i) => <PixText key={i} x={left + 60} y={top + 60 + size + i * size * 1.5} text={l} size={size} anchor="start" />)}
      {done && Math.floor(p.f / 12) % 2 === 0 && <Pixels grid={outlined(gridOf(ARROW))} px={12} x={left + w - 132} y={top + h - 96} />}
    </g>
  );
}
