import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Slide in text: the words slide in from one side and stay hidden outside a mask box (the text's own extent), so they
// emerge from behind its edge. Up/down use a hard-edged gradient mask; left/right reveal each letter as it crosses the edge.

const vgrad = (id: string, color: string, a: number, b: number) => (
  <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} y1={a} x2={0} y2={b}>
    <stop offset={0} stopColor={color} stopOpacity={0} />
    <stop offset={0.0001} stopColor={color} stopOpacity={1} />
    <stop offset={1} stopColor={color} stopOpacity={1} />
    <stop offset={1} stopColor={color} stopOpacity={0} />
  </linearGradient>
);

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const n = text.length;
  const sz = fitSize(text, Number(p.size ?? 130), 960, 0.74);
  const cw = sz * 0.62;
  const W = n * cw;
  const uid = String(p.seed ?? "slide").replace(/[^a-zA-Z0-9]/g, "") || "slide";
  const e = 1 - Math.pow(1 - clamp(lf / Math.max(4, Number(p.len ?? 22))), 3);
  const away = 1 - e;
  const dir = String(p.dir ?? "left");
  let dx = 0, dy = 0;
  if (dir === "left") dx = -(W + 80) * away;
  else if (dir === "right") dx = (W + 80) * away;
  else if (dir === "up") dy = sz * 2.2 * away;
  else dy = -sz * 2.2 * away;
  const base = sz * 0.35;
  const head = `translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`;
  const txt = { x: 0, y: base, textAnchor: "middle" as const, fontFamily: u.font, fontWeight: 900, fontSize: sz, strokeWidth: sz * 0.06, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };
  if (dir === "up" || dir === "down") {
    const by1 = -sz * 1.0, by2 = by1 + sz * 1.8;
    return (
      <g transform={head}>
        <defs>
          {vgrad(`${uid}-f`, u.accent, by1 - dy, by2 - dy)}
          {vgrad(`${uid}-s`, u.ink, by1 - dy, by2 - dy)}
        </defs>
        <text {...txt} transform={`translate(0 ${dy.toFixed(1)})`} fill={`url(#${uid}-f)`} stroke={`url(#${uid}-s)`}>{text}</text>
      </g>
    );
  }
  const bx1 = -W / 2 - sz * 0.2, bx2 = W / 2 + sz * 0.2;
  return (
    <g transform={head}>
      <text {...txt} transform={`translate(${dx.toFixed(1)} 0)`} fill={u.accent} stroke={u.ink}>
        {Array.from(text).map((ch, i) => {
          if (ch === " ") return " ";
          const cx = -W / 2 + (i + 0.5) * cw + dx;
          const shown = cx >= bx1 && cx <= bx2;
          return <tspan key={i} fillOpacity={shown ? 1 : 0} strokeOpacity={shown ? 1 : 0}>{ch}</tspan>;
        })}
      </text>
    </g>
  );
}
