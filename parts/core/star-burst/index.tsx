import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Star burst: a ring of small five-point stars flung outward from (x, y), spinning as they go and fading.
// Each star travels on an eased radial path, shrinks a little and fades after ~30 frames.

const star5 = (R: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? R : R * 0.46;
    pts.push(`${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`);
  }
  return "M" + pts.join(" L") + " Z";
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "stars");
  const n = Math.round(clamp(Number(p.count ?? 10), 4, 20));
  const dist = Number(p.r ?? 340);
  const T = 30;
  const phase = random(`${sd}-phase`) * Math.PI * 2;
  const fade = 1 - clamp((lf - T) / 40);
  const e = ease(clamp(lf / T));
  const flash = lf < 8 ? 1 - lf / 8 : 0;
  const path = star5(56);
  const stars = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = phase + (i / n) * Math.PI * 2;
    const sc = ease(clamp(lf / 6)) * (1 - 0.25 * clamp((lf - T) / 30)) * (0.8 + 0.4 * q(0));
    const spin = lf * (6 + q(1) * 6) * (i % 2 ? 1 : -1);
    return {
      x: Math.cos(a) * dist * e, y: Math.sin(a) * dist * e,
      sc, rot: spin, c: u.series[i % 4],
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {flash > 0 ? <circle r={(40 + lf * 3).toFixed(1)} fill={u.white} opacity={flash.toFixed(3)} /> : null}
      <g opacity={fade.toFixed(3)}>
        {stars.map((st, i) => (
          <g key={i} transform={`translate(${st.x.toFixed(1)} ${st.y.toFixed(1)}) rotate(${st.rot.toFixed(1)}) scale(${st.sc.toFixed(3)})`}>
            <path d={path} fill={st.c} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
          </g>
        ))}
      </g>
    </g>
  );
}
