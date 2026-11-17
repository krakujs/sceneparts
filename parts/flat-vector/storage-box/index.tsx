import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Storage box: plain cardboard moving box. variant closed = flaps shut and taped; open = top flaps raised, showing the dark inside.
// No text, just a blank label and a handle hole. Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#D9A66B";
  const top = shade(c, -0.12), side = shade(c, 0.2), inside = shade(c, 0.5);
  const open = p.variant === "open";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {open ? (
          <g>
            {/* raised back flap, behind */}
            <polygon points="-120,-300 220,-300 236,-392 -104,-392" fill={shade(c, 0.06)} />
            {/* inside of the box */}
            <polygon points="-170,-260 170,-260 220,-300 -120,-300" fill={inside} />
            {/* left flap folded out */}
            <polygon points="-170,-260 -120,-300 -150,-384 -200,-344" fill={shade(c, 0.08)} />
          </g>
        ) : null}
        {/* side face */}
        <path d="M 170 -260 L 220 -300 L 220 -40 L 170 0 Z" fill={side} />
        {/* front face */}
        <rect x={-170} y={-260} width={340} height={260} rx={6} fill={c} />
        {/* top face (closed only shows the flaps) */}
        {!open ? (
          <g>
            <path d="M -170 -260 L -120 -300 L 220 -300 L 170 -260 Z" fill={top} />
            <line x1={-145} y1={-280} x2={195} y2={-280} stroke={shade(c, 0.3)} strokeWidth={5} />
            <path d="M -12 -260 L 12 -260 L 62 -300 L 38 -300 Z" fill={C.sand} opacity={0.9} />
          </g>
        ) : null}
        {/* handle hole and blank label */}
        <rect x={-50} y={-206} width={100} height={36} rx={18} fill={inside} />
        <rect x={-130} y={-150} width={110} height={78} rx={8} fill={C.white} opacity={0.85} />
      </g>
    </g>
  );
}
