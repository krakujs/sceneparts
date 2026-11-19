import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Laser beam: a straight glowing beam fires from (x1, y1) to (x2, y2). It grows in about 10 frames,
// with a coloured halo, a white core and sparks at the impact point. It fades out after ~45 frames.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1;
  const x1 = Number(p.x1 ?? 160), y1 = Number(p.y1 ?? 1000), x2 = Number(p.x2 ?? 920), y2 = Number(p.y2 ?? 760);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "laser");
  const fade = 1 - clamp((lf - 44) / 16);
  if (fade <= 0) return null;
  const prog = ease(clamp(lf / 10));
  const ex = x1 + (x2 - x1) * prog, ey = y1 + (y2 - y1) * prog;
  const flick = 1 + 0.08 * Math.sin(lf * 1.3);
  const back = Math.atan2(y1 - y2, x1 - x2);
  const hit = clamp((lf - 10) / 14);
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = back + (q(0) - 0.5) * 2.2;
    const len = (30 + q(1) * 80) * ease(clamp((lf - 10 - q(2) * 4) / 6));
    const on = random(`${sd}-${i}-${Math.floor(lf / 3)}`) > 0.2 ? 1 : 0.3;
    return { a, len, on, c: i % 3 === 0 ? u.white : u.accent };
  });
  const mxs = (x1 + x2) / 2, mys = (y1 + y2) / 2;
  return (
    <g transform={`translate(${mxs} ${mys}) scale(${s}) translate(${-mxs} ${-mys})`} opacity={fade.toFixed(3)}>
      <line x1={x1} y1={y1} x2={ex.toFixed(1)} y2={ey.toFixed(1)} stroke={u.accent} strokeWidth={(44 * flick).toFixed(1)} strokeLinecap="round" opacity={0.35} />
      <line x1={x1} y1={y1} x2={ex.toFixed(1)} y2={ey.toFixed(1)} stroke={u.accent} strokeWidth={(20 * flick).toFixed(1)} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={ex.toFixed(1)} y2={ey.toFixed(1)} stroke={u.white} strokeWidth={(7 * flick).toFixed(1)} strokeLinecap="round" />
      {hit > 0 ? (
        <g>
          <circle cx={x2} cy={y2} r={(18 + 10 * Math.sin(lf)).toFixed(1)} fill={u.white} opacity={(1 - hit * 0.5).toFixed(3)} />
          {sparks.map((q, i) => {
            const sx = x2 + Math.cos(q.a) * q.len * 0.3, sy = y2 + Math.sin(q.a) * q.len * 0.3;
            const ax = x2 + Math.cos(q.a) * q.len, ay = y2 + Math.sin(q.a) * q.len;
            return <line key={i} x1={sx.toFixed(1)} y1={sy.toFixed(1)} x2={ax.toFixed(1)} y2={ay.toFixed(1)} stroke={q.c} strokeWidth={5} strokeLinecap="round" opacity={q.on} />;
          })}
        </g>
      ) : null}
    </g>
  );
}
