import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector sea lion, sitting upright on its front flippers, with small ear flaps. Origin = bottom centre
// (ground), faces right, honours flip. About 470 px tall at s = 1.
// pose rest: breathing only. idle: slow head sway. swim: body sway and flipper paddle.

const BROWN = "#8A5A3C", DARK = shade(BROWN, 0.28), CHEST = "#B88A62", MUZ = "#C9A27E";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "rest";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1500;
  const ph = f * 0.07;
  const breathe = 1 + Math.sin(f * 0.07) * 0.01;
  const headRot = pose === "idle" ? Math.sin(f * 0.05) * 4 : 0;
  const sway = pose === "swim" ? Math.sin(ph) * 3 : 0;
  const paddle = pose === "swim" ? Math.sin(ph * 2) * 10 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${sway} 0 0) scale(1 ${breathe})`}>
        <path d="M -120 -4 C -150 -2 -186 0 -196 6 C -170 14 -130 12 -110 6 Z" fill={DARK} />
        <path d="M -120 -4 C -160 -80 -160 -200 -130 -270 C -110 -330 -60 -360 0 -364 C 60 -368 100 -340 116 -300 C 140 -250 150 -190 140 -130 C 128 -60 100 -20 60 -4 Z" fill={BROWN} />
        <path d="M 60 -320 C 100 -280 120 -200 110 -130 C 90 -150 70 -200 60 -260 Z" fill={CHEST} />
        <g transform={`rotate(${paddle} 50 -262)`}>{taper([60, -250], [118, -130], [92, -14], 92, 34, DARK, "fl", true)}</g>
        <g transform={`rotate(${headRot} 30 -370)`}>
          <path d="M -36 -446 Q -62 -444 -58 -418 Q -44 -424 -30 -432 Z" fill={DARK} />
          <ellipse cx={30} cy={-400} rx={78} ry={66} fill={BROWN} />
          <ellipse cx={96} cy={-382} rx={42} ry={30} fill={MUZ} />
          <circle cx={130} cy={-388} r={9} fill={C.ink} />
          <circle cx={50} cy={-410} r={11} fill={C.ink} />
          <circle cx={53} cy={-414} r={3.5} fill="#FFFFFF" />
        </g>
      </g>
    </g>
  );
}
