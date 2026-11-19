import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kitchen pedal bin, about 380 px tall. variant "closed": lid shut; "open": lid tipped back on its hinge.
// anim "flap" opens and shuts the lid over time. Origin = bottom centre (the bin rests on y).
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.grey;
  const lid = shade(c, -0.12);
  const open = p.variant === "open";
  // lid angle: open = tipped back 30 degrees; flap animates between shut and open
  const cyc = (1 - Math.cos((f * 2 * Math.PI) / 90)) / 2;
  const angle = p.anim === "flap" ? (open ? -30 * (1 - cyc) : -30 * cyc) : open ? -30 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* bin body with a darker right side */}
        <rect x={-120} y={-330} width={240} height={330} rx={24} fill={c} />
        <rect x={84} y={-318} width={36} height={306} rx={16} fill={shade(c, 0.2)} />
        {/* pedal, low on the front */}
        <rect x={-80} y={-44} width={160} height={26} rx={10} fill={shade(c, 0.2)} />
        {/* lid, hinged at the back-left corner */}
        <g transform={`rotate(${f1(angle)} -120 -328)`}>
          <rect x={-132} y={-364} width={264} height={36} rx={18} fill={lid} />
          <rect x={-100} y={-356} width={200} height={8} rx={4} fill={C.white} opacity={0.25} />
        </g>
      </g>
    </g>
  );
}
