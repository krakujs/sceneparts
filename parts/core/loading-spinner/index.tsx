import React from "react";
import { ui, startFrame, enter, popIn, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Loading spinner in three looks (arc, dots, bars). The whole ring rotates at `spin` degrees per frame, so it never stalls.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const R = 90;
  const col = p.color ?? u.accent;
  const k = popIn(p.f, at, 12);
  const on = enter(p.f, at, 8);
  const since = Math.max(0, p.f - at);
  const rot = since * (p.spin ?? 8);
  const label = String(p.label ?? "");
  const shape = String(p.shape ?? "arc");
  const N = 8;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 900}) scale(${s * k})`} opacity={on}>
      {shape === "arc" ? (
        <g transform={`rotate(${rot})`}>
          <circle cx={0} cy={0} r={R} fill="none" stroke={u.soft} strokeWidth={22} />
          <circle cx={0} cy={0} r={R} fill="none" stroke={col} strokeWidth={22} strokeLinecap="round"
            strokeDasharray={`${0.28 * 2 * Math.PI * R} ${2 * Math.PI * R}`} transform="rotate(-90)" />
        </g>
      ) : null}
      {shape === "dots" ? (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: N }).map((_, i) => {
            const a = (i / N) * Math.PI * 2;
            return <circle key={i} cx={Math.cos(a) * R} cy={Math.sin(a) * R} r={16} fill={col} opacity={0.25 + 0.75 * (i / (N - 1))} stroke={u.ink} strokeWidth={3} />;
          })}
        </g>
      ) : null}
      {shape === "bars" ? (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: N }).map((_, i) => (
            <rect key={i} x={-9} y={-R - 20} width={18} height={44} rx={9} fill={col} opacity={0.2 + 0.8 * (i / (N - 1))} transform={`rotate(${(i / N) * 360} 0 0)`} stroke={u.ink} strokeWidth={3} />
          ))}
        </g>
      ) : null}
      {label ? (
        <Txt x={0} y={R + 90} u={u} size={fitSize(label, 46, 600)} weight={800} fill={u.ink} maxW={600}>{label}</Txt>
      ) : null}
    </g>
  );
}
