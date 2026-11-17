import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flying saucer (UFO), front view: wide disc with a glass dome, a ring of lights and an optional tractor beam.
// Origin = bottom of the disc; about 940 px wide and 340 px tall at s = 1 (the beam adds about 400 px below).
// anim "fly": hovers up and down and the lights blink in turn; "bob" is a slower hover; beam = tractor beam.
const f1 = (v: number) => v.toFixed(1);
const hover = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 90) + 1) * 14;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
const LIGHTS = [-340, -204, -68, 68, 204, 340];
const LIGHT_COLOURS = [C.yellow, C.red, C.green, C.yellow, C.red, C.green];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const glass = p.color2 && p.color2 !== "none" ? p.color2 : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const beam = !!p.beam;
  const pulse = 0.2 + 0.08 * Math.sin((f * 2 * Math.PI) / 40);
  return (
    <g transform={`translate(${f1(x)} ${f1(y + hover(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {beam && (
          <g>
            <path d="M -130 -4 L 130 -4 L 320 400 L -320 400 Z" fill={C.yellow} opacity={pulse * 0.8} />
            <path d="M -60 -4 L 60 -4 L 160 400 L -160 400 Z" fill={C.white} opacity={pulse} />
          </g>
        )}
        {/* dome */}
        <path d="M -220 -180 A 220 150 0 0 1 220 -180 Z" fill={glass} />
        <path d="M -150 -200 Q -130 -270 -60 -304 L -40 -292 Q -110 -256 -128 -198 Z" fill={C.white} opacity={0.6} />
        <rect x={-226} y={-194} width={452} height={22} rx={11} fill={shade(body, 0.12)} />
        {/* disc and shaded underside */}
        <ellipse cx={0} cy={-90} rx={470} ry={90} fill={body} />
        <path d="M -470 -90 A 470 90 0 0 0 470 -90 Z" fill={shade(body, 0.22)} />
        <ellipse cx={0} cy={-150} rx={300} ry={24} fill={C.white} opacity={0.18} />
        {/* ring of lights */}
        {LIGHTS.map((lx, k) => {
          const on = anim === "none" || Math.sin(f * 0.25 + k * 1.1) > -0.3;
          return (
            <g key={k}>
              <circle cx={lx} cy={-44} r={22} fill={LIGHT_COLOURS[k]} opacity={on ? 0.28 : 0} />
              <circle cx={lx} cy={-44} r={14} fill={on ? LIGHT_COLOURS[k] : shade(LIGHT_COLOURS[k], 0.5)} />
            </g>
          );
        })}
        {/* top light */}
        <circle cx={0} cy={-338} r={12} fill={C.yellow} />
      </g>
    </g>
  );
}
