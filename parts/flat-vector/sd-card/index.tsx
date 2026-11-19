import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// SD card standing upright: chamfered top-right corner, blank label, write-protect tab and nine gold contacts.
// Origin = bottom centre (the card stands on y). anim "shine": a glint sweeps across the card.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const CONTACTS = Array.from({ length: 9 }, (_, i) => -112 + i * 28);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const t = (f % 60) / 60;
  const glintX = -146 + 260 * t;
  const glintO = anim === "shine" ? 0.4 * Math.sin(Math.PI * t) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -150 0 L -150 -360 L 88 -360 L 150 -298 L 150 0 Z" fill={body} />
        <rect x={-150} y={-226} width={12} height={60} rx={3} fill={shade(body, 0.4)} />
        <rect x={-118} y={-330} width={236} height={150} rx={10} fill={C.white} opacity={0.92} />
        <rect x={-118} y={-150} width={236} height={4} rx={2} fill={shade(body, 0.25)} />
        <rect x={-118} y={-138} width={236} height={4} rx={2} fill={shade(body, 0.25)} />
        {CONTACTS.map((cx, i) => (
          <g key={i}>
            <rect x={cx} y={-60} width={16} height={52} rx={2} fill={C.yellowDark} />
            <rect x={cx + 3} y={-60} width={5} height={52} fill={C.yellow} />
          </g>
        ))}
        {anim === "shine" && <rect x={glintX} y={-360} width={30} height={360} fill={C.white} opacity={glintO} />}
      </g>
    </g>
  );
}
