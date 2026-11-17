import React from "react";
import { pop, type PartProps } from "@sceneparts/core";

// The style's own headline card (Egypt: cartouche). Falls back to bold text if the style has none.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const k = p.pop === false ? 1 : pop(p.f, (p.at ?? 0) * p.d + 2);
  if (p.style.title) return <>{p.style.title({ x: p.x, y: p.y, lines: p.lines, accent: p.accent, size: p.size, pop: k })}</>;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${k})`}>
      {(p.lines as string[]).map((l, i) => (
        <text key={i} x={0} y={i * p.size * 1.12} textAnchor="middle" fontFamily={p.style.font} fontWeight={800} fontSize={p.size} fill={l === p.accent ? p.style.accent : p.style.ink}>{l}</text>
      ))}
    </g>
  );
}
