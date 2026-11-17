import React from "react";
import { ease, clamp, type PartProps } from "@sceneparts/core";

// Comic speech, thought or shout bubble with a tail pointing at the speaker. Pops in at `at`, wraps words to `width`.
const wrap = (text: string, maxChars: number) => {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(/\s+/)) {
    if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const k = clamp((p.f - (p.at ?? 0) * p.d) / 6);
  if (k <= 0) return null;
  const scale = ease(k) + Math.sin(k * Math.PI) * 0.12;
  const lines = wrap(String(p.text ?? ""), Math.max(6, Math.round((p.width - 100) / (p.size * 0.6))));
  const w = Math.min(p.width, Math.max(...lines.map((l) => l.length)) * p.size * 0.6 + 100);
  const h = lines.length * p.size * 1.15 + 70;
  const ink = p.style.ink;
  const fill = p.fill ?? "#ffffff";
  const tx = p.tailX - p.x, ty = p.tailY - p.y;
  const side = tx < 0 ? -1 : 1;
  const base = Math.max(-w / 2 + 50, Math.min(w / 2 - 50, tx * 0.3));
  const shake = p.kind === "shout" ? Math.sin(p.f * 2.3) * 4 : 0;
  const outline =
    p.kind === "shout"
      ? Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2, r = i % 2 ? 1.12 : 1.38;
          return `${i ? "L" : "M"}${Math.cos(a) * (w / 2) * r} ${Math.sin(a) * (h / 2) * r}`;
        }).join(" ") + " Z"
      : `M${-w / 2 + 40} ${-h / 2} H${w / 2 - 40} Q${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 40} V${h / 2 - 40} Q${w / 2} ${h / 2} ${w / 2 - 40} ${h / 2} H${-w / 2 + 40} Q${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 40} V${-h / 2 + 40} Q${-w / 2} ${-h / 2} ${-w / 2 + 40} ${-h / 2} Z`;
  return (
    <g transform={`translate(${p.x + shake} ${p.y}) scale(${scale})`}>
      {p.kind === "thought" ? (
        [0.35, 0.6, 0.85].map((q, i) => <circle key={i} cx={tx * q} cy={ty * q} r={18 - i * 5} fill={fill} stroke={ink} strokeWidth={6} />)
      ) : (
        <path d={`M${base - 26 * side} ${h / 2 - 8} L${tx} ${ty} L${base + 26 * side} ${h / 2 - 8} Z`} fill={fill} stroke={ink} strokeWidth={8} strokeLinejoin="round" />
      )}
      <path d={outline} fill={fill} stroke={ink} strokeWidth={8} strokeLinejoin="round" />
      {p.kind !== "thought" ? <path d={`M${base - 22 * side} ${h / 2 - 12} L${base + 22 * side} ${h / 2 - 12}`} stroke={fill} strokeWidth={10} /> : null}
      {lines.map((l, i) => (
        <text key={i} x={0} y={-h / 2 + 30 + p.size * 0.85 + i * p.size * 1.15} textAnchor="middle" fontFamily={p.style.font} fontWeight={700} fontSize={p.size} fill={p.color ?? ink}>{l}</text>
      ))}
    </g>
  );
}
