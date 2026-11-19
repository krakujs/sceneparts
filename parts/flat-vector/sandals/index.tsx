import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sandals: a pair seen from above, toes pointing up the screen. Foot-shaped cork soles with a darker rim, two wide
// flat leather straps across the forefoot and the instep (the instep strap has a gold buckle) and a heel strap.
// Origin = bottom centre (the heels rest on y). About 460 px wide and 560 px tall at s = 1.
// anim "bob": the pair lifts and settles; "wiggle": the pair rocks a little.
const f1 = (v: number) => v.toFixed(1);

// right-foot sole outline, heel at (0, 0), toes up; the left foot is mirrored
const SOLE = "M 0 0 C -62 0 -84 -40 -84 -110 C -84 -200 -98 -280 -100 -350 C -102 -440 -60 -500 10 -504 C 80 -506 104 -450 98 -380 C 92 -300 70 -220 72 -130 C 74 -40 58 0 0 0 Z";

const Sandal = ({ sole, strap, mirror }: { sole: string; strap: string; mirror?: boolean }) => (
  <g transform={mirror ? "scale(-1 1)" : undefined}>
    <path d={SOLE} fill={shade(sole, 0.25)} transform="translate(0 8)" />
    <path d={SOLE} fill={sole} />
    {/* worn footbed print */}
    <path d="M -10 -60 C -40 -60 -50 -90 -50 -140 M 10 -330 C 40 -360 50 -420 20 -450" fill="none" stroke={shade(sole, 0.12)} strokeWidth={14} strokeLinecap="round" />
    {/* heel strap: a band hugging the back of the sole */}
    <path d="M -86 -96 C -80 -20 -40 -4 0 -4 C 44 -4 72 -24 74 -96" fill="none" stroke={strap} strokeWidth={30} strokeLinecap="round" />
    {/* instep strap with buckle */}
    <path d="M -100 -232 L 90 -214 L 86 -164 L -96 -180 Z" fill={strap} />
    <path d="M -100 -232 L 90 -214 L 89 -204 L -99 -222 Z" fill={shade(strap, -0.25)} />
    <rect x={44} y={-236} width={44} height={60} rx={8} fill="none" stroke={C.yellow} strokeWidth={10} transform="rotate(5 66 -206)" />
    {/* forefoot strap */}
    <path d="M -104 -372 L 100 -390 L 98 -324 L -100 -306 Z" fill={strap} />
    <path d="M -104 -372 L 100 -390 L 99 -378 L -103 -360 Z" fill={shade(strap, -0.25)} />
    {/* stitch dots along the straps */}
    {[-70, -30, 10, 50].map((sx) => (
      <circle key={sx} cx={sx} cy={-341 - sx * 0.09} r={5} fill={shade(strap, 0.35)} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const strap = p.color && p.color !== "none" ? p.color : C.brown;
  const sole = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const wig = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 30)) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob - 10)})`}>
        <g transform={`translate(-120 0) rotate(${f1(-5 + wig)})`}>
          <Sandal sole={sole} strap={strap} mirror />
        </g>
        <g transform={`translate(120 -20) rotate(${f1(5 - wig)})`}>
          <Sandal sole={sole} strap={strap} />
        </g>
      </g>
    </g>
  );
}
