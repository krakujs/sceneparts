import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector music notes: two beamed eighth notes with white die-cut edges, shadow and one darker shade.
// Float and sway from p.f only. Centre (x, y), about 370 px wide at s = 1.

/** The note shapes in one fill and stroke, drawn as layers. */
function Notes({ fill, stroke, sw, dy }: { fill: string; stroke: string; sw: number; dy: number }) {
  const st = { fill, stroke, strokeWidth: sw, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(0 ${dy})`}>
      <ellipse cx={-80} cy={120} rx={62} ry={46} transform="rotate(-18 -80 120)" {...st} />
      <ellipse cx={110} cy={80} rx={62} ry={46} transform="rotate(-18 110 80)" {...st} />
      <rect x={-35} y={-120} width={26} height={240} rx={6} {...st} />
      <rect x={165} y={-160} width={26} height={240} rx={6} {...st} />
      <polygon points="-35,-120 191,-160 191,-110 -35,-70" {...st} />
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.purple;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "bob";
  let dy = 0, rot = 0;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 12;
  else if (anim === "sway") rot = Math.sin(f * 0.1) * 5;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k}) rotate(${rot})`}>
      <Notes fill={C.shadow} stroke={C.shadow} sw={34} dy={16} />
      <Notes fill="#FFFFFF" stroke="#FFFFFF" sw={34} dy={0} />
      <Notes fill={shade(col, 0.18)} stroke="none" sw={0} dy={12} />
      <Notes fill={col} stroke="none" sw={0} dy={0} />
    </g>
  );
}
