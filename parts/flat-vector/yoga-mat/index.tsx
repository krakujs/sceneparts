import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yoga mat lying on the floor in 3/4 perspective: a flat parallelogram about 800 px wide and 180 px deep,
// its front edge showing the mat's thickness, a subtle texture stripe, and a thick rolled cylinder at the
// far right end whose end shows a spiral. Origin = floor centre (the mat sits on y).
// anim "unroll": the roll starts at the left end and rolls across to the right, leaving the flat mat
// behind it, so the flat part grows over the first second.
const f1 = (v: number) => v.toFixed(1);
const H = 14; // mat thickness
const LEFT = -400; // front-left corner
const DEPTH = 180; // front edge to back edge, on screen
const SLANT = 60; // the back edge sits this far to the right of the front edge (perspective)
const ROLL_R = 42;
const ROLL_END = 330; // roll position at the far right end
const at = (xFront: number, d: number) => xFront + (SLANT * d) / DEPTH; // x of a point d px into the mat
const yAt = (d: number) => -H - d;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const matC = p.color && p.color !== "none" ? p.color : C.lime;
  const rollC = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "none";
  const t = anim === "unroll" ? Math.min(1, Math.max(0, f / 30)) : 1;
  const ease = t * t * (3 - 2 * t);
  const rollX = LEFT + ease * (ROLL_END - LEFT); // x of the roll's front end
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 4 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  // roll axis: runs along the mat's depth, resting on the floor on the right edge of the mat
  const F = { x: rollX, y: -ROLL_R }; // front end, sitting on the floor line
  const B = { x: at(rollX, DEPTH), y: yAt(DEPTH) - ROLL_R }; // back end
  const showFlat = rollX > LEFT + 2;
  // layer lines across the roll, so it reads as rolled-up mat
  const layers = [0.2, 0.4, 0.6, 0.8].map((k) => {
    const ly = F.y + (B.y - F.y) * k, lx = F.x + (B.x - F.x) * k;
    return { ly, lx };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={16} cy={0} rx={430} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {showFlat && (
          <g>
            {/* front edge: the thickness of the mat */}
            <path d={`M ${LEFT} ${-H} L ${f1(rollX)} ${-H} L ${f1(rollX)} 0 L ${LEFT} 0 Z`} fill={shade(matC, 0.28)} />
            {/* flat top */}
            <path d={`M ${LEFT} ${-H} L ${f1(rollX)} ${-H} L ${f1(at(rollX, DEPTH))} ${yAt(DEPTH)} L ${f1(at(LEFT, DEPTH))} ${yAt(DEPTH)} Z`} fill={matC} />
            {/* subtle texture stripe across the mat */}
            <path
              d={`M ${f1(at(LEFT, 62))} ${yAt(62)} L ${f1(at(rollX, 62))} ${yAt(62)} L ${f1(at(rollX, 74))} ${yAt(74)} L ${f1(at(LEFT, 74))} ${yAt(74)} Z`}
              fill={shade(matC, 0.14)} opacity={0.5}
            />
          </g>
        )}
        {/* the rolled cylinder: a thick round-ended roll lying along the mat's depth */}
        <line x1={f1(F.x) as any} y1={f1(F.y) as any} x2={f1(B.x) as any} y2={f1(B.y) as any} stroke={shade(rollC, 0.25)} strokeWidth={ROLL_R * 2} strokeLinecap="round" />
        <line x1={f1(F.x - 6) as any} y1={f1(F.y) as any} x2={f1(B.x - 6) as any} y2={f1(B.y) as any} stroke={rollC} strokeWidth={ROLL_R * 2 - 12} strokeLinecap="round" />
        <line x1={f1(F.x - 24) as any} y1={f1(F.y) as any} x2={f1(B.x - 24) as any} y2={f1(B.y) as any} stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" opacity={0.22} />
        {/* layers of the rolled mat */}
        {layers.map((l, i) => (
          <path key={i} d={`M ${f1(l.lx - ROLL_R + 8)} ${f1(l.ly + 4)} Q ${f1(l.lx)} ${f1(l.ly + 14)} ${f1(l.lx + ROLL_R - 8)} ${f1(l.ly + 4)}`} fill="none" stroke={shade(rollC, 0.3)} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
        ))}
        {/* spiral on the front end of the roll */}
        <g transform={`translate(${f1(F.x)} ${f1(F.y)}) scale(1.6 0.9)`}>
          <ellipse cx={0} cy={0} rx={ROLL_R * 0.62} ry={ROLL_R * 0.3} fill={shade(rollC, 0.12)} />
          <path d="M 0 0 A 6 6 0 0 1 6 -6 A 12 12 0 0 1 -6 -18 A 18 18 0 0 1 -24 0 A 24 24 0 0 1 0 24" fill="none" stroke={shade(rollC, 0.4)} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
