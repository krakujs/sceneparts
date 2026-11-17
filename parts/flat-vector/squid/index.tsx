import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector squid, side view, faces right. Centre (x, y), honours flip. About 420 px long at s = 1.
// Pink torpedo mantle with fins at the tail end, a big eye, eight short arms and two long trailing tentacles.
// Fins flap and arms and tentacles sway from p.f.

const SUCK = "#FCE3EC";

const smooth = (pts: [number, number][]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
};

const walk = (x0: number, y0: number, a0: number, steps: number, len: number, bend: (u: number) => number) => {
  const pts: [number, number][] = [[x0, y0]];
  let x = x0, y = y0;
  for (let k = 1; k <= steps; k++) {
    const a = a0 + bend(k / steps);
    x += Math.cos(a) * (len / steps);
    y += Math.sin(a) * (len / steps);
    pts.push([x, y]);
  }
  return pts;
};

const tube = (pts: [number, number][], r0: number, r1: number) => {
  const n = pts.length, L: string[] = [], R: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    const nx = -dy / m, ny = dx / m, r = r0 + (r1 - r0) * (i / (n - 1));
    L.push(`${(pts[i][0] + nx * r).toFixed(1)} ${(pts[i][1] + ny * r).toFixed(1)}`);
    R.push(`${(pts[i][0] - nx * r).toFixed(1)} ${(pts[i][1] - ny * r).toFixed(1)}`);
  }
  return `M ${L.join(" L ")} L ${R.reverse().join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const col = p.color ?? "#F7A8C4", dark = shade(col, 0.2), far = shade(col, 0.3);
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1000;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * (swim ? 0.1 : 0.05);
  const amp = swim ? 1 : 0.5;
  const bob = Math.sin(f * (swim ? 0.06 : 0.04)) * (swim ? 10 : 6);
  const tilt = swim ? Math.sin(ph * 0.5) * 2 : 0;
  const flap = Math.sin(ph * 1.5) * 8 * amp;

  const mantle = smooth([[-220, 0], [-170, -40], [-100, -62], [-20, -68], [46, -62], [80, -34], [88, 0], [80, 34], [46, 62], [-20, 68], [-100, 62], [-170, 40]]);
  const fin = smooth([[-214, -2], [-180, -34], [-120, -66], [-60, -70], [-46, -56], [-110, -50], [-170, -26]]);

  // tentacles run under the body, behind the mantle
  const tentacles = [0, 1].map((j) => {
    const pts = Array.from({ length: 17 }, (_, k) => {
      const u = k / 16;
      const px = 76 - (250 - j * 40) * u + Math.sin(ph * 1.2 - u * 5 + j * 1.3) * 10 * u;
      const py = 12 + j * 18 + 150 * Math.sin(u * Math.PI * 0.6) + Math.cos(ph * 1.2 - u * 5 + j * 1.3) * 8 * u;
      return [px, py] as [number, number];
    });
    const end = pts[pts.length - 1];
    return <g key={j}><path d={tube(pts, 5, 2.5)} fill={dark} /><circle cx={end[0]} cy={end[1]} r={6} fill={dark} /></g>;
  });

  // eight short arms fanning out from the front of the head
  const arms = Array.from({ length: 8 }, (_, i) => {
    const pts = walk(80, -14 + i * 6, (i - 3.5) * 0.16, 10, 92, (u) => amp * 0.5 * Math.sin(ph - u * 4 + i * 0.6) * u);
    return <path key={i} d={tube(pts, 8.5, 3)} fill={i % 2 ? far : col} />;
  });

  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${tilt}) scale(${p.flip ? -s : s} ${s})`}>
      {tentacles}
      <g transform={`rotate(${flap} -216 0)`}>
        <path d={fin} fill={dark} />
      </g>
      <g transform="scale(1 -1)">
        <g transform={`rotate(${flap} -216 0)`}>
          <path d={fin} fill={far} />
        </g>
      </g>
      <path d={mantle} fill={col} />
      <path d="M -150 4 Q -60 14 40 4" fill="none" stroke={dark} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
      {arms}
      <circle cx={40} cy={-16} r={24} fill={C.white} />
      <circle cx={48} cy={-14} r={12} fill={C.ink} />
      <circle cx={52} cy={-20} r={4} fill={C.white} />
    </g>
  );
}
