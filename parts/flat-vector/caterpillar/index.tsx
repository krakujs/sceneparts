import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Caterpillar: eight round green segments with tiny stub legs and a friendly face on the head (right).
// An inch-along wave travels from tail to head: each segment arches up in turn, driven by f.
// Origin = ground under the body, bottom centre; faces right; honours flip, s and vx.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, flip = !!p.flip;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const col: string = p.color ?? C.green, dk = shade(col, 0.22), R = 28;
  const N = 8;
  // segment centres from tail (i = 0) to head (i = N - 1)
  const segs = Array.from({ length: N }, (_, i) => {
    const head = i === N - 1;
    const r = head ? 36 : R;
    const cx = head ? 104 : -110 + i * 30;
    // inch-along wave: a hump of lift travels forward (higher i = later in the wave)
    const lift = 16 * Math.max(0, Math.sin(f * 0.14 - i * 0.85));
    return { i, head, r, cx, cy: -r - lift };
  });

  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={9} fill={C.shadow} />
      {/* tiny stub legs under each segment, drawn first so the body overlaps them */}
      {segs.map((g) => {
        const bottom = g.cy + g.r;
        return <rect key={`l${g.i}`} x={g.cx - 7} y={bottom - 8} width={14} height={11} rx={5.5} fill={dk} />;
      })}
      {segs.map((g) => (
        <g key={`b${g.i}`}>
          <circle cx={g.cx} cy={g.cy + 4} r={g.r} fill={dk} />
          <circle cx={g.cx} cy={g.cy} r={g.r - 2} fill={col} />
          {!g.head && <circle cx={g.cx - g.r * 0.3} cy={g.cy - g.r * 0.34} r={g.r * 0.18} fill={C.lime} />}
          {!g.head && <circle cx={g.cx + g.r * 0.2} cy={g.cy - g.r * 0.5} r={g.r * 0.12} fill={C.lime} />}
        </g>
      ))}
      {/* head: antennae, face */}
      {(() => {
        const h = segs[N - 1], hx = h.cx, hy = h.cy;
        const wob = Math.sin(f * 0.2) * 4;
        return (
          <g>
            <path d={`M ${hx + 8} ${hy - 30} Q ${hx + 14} ${hy - 48} ${hx + 26 + wob} ${hy - 58}`} stroke={dk} strokeWidth={5} strokeLinecap="round" fill="none" />
            <circle cx={hx + 26 + wob} cy={hy - 60} r={7} fill={C.lime} />
            <circle cx={hx + 16} cy={hy - 6} r={10} fill={C.white} />
            <circle cx={hx + 19} cy={hy - 5} r={5.5} fill={C.ink} />
            <circle cx={hx + 21} cy={hy - 7.5} r={1.8} fill={C.white} />
            <circle cx={hx + 8} cy={hy + 12} r={6} fill={C.pink} opacity={0.7} />
            <path d={`M ${hx + 14} ${hy + 14} Q ${hx + 24} ${hy + 22} ${hx + 32} ${hy + 12}`} stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" fill="none" />
          </g>
        );
      })()}
    </g>
  );
}
