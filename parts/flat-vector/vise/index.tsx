import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bench vise on the edge of a wooden bench: a fixed jaw on the left, a moving jaw on the right, a block of wood
// clamped between them, and a long horizontal screw with a T-handle on its left end.
// Origin = floor centre under the bench edge. Room scale: about 600 px wide and 340 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.blue;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* bench edge */}
        <rect x={-300} y={-70} width={600} height={70} rx={8} fill={C.brown} />
        <rect x={-300} y={-70} width={600} height={10} rx={4} fill={C.brownDark} />
        {/* base plate and body block */}
        <rect x={-260} y={-92} width={520} height={22} rx={6} fill={steel} />
        <rect x={-200} y={-160} width={400} height={70} rx={10} fill={metal} />
        {/* screw bar, drawn before the jaws so the jaws hide its ends */}
        <rect x={-300} y={-272} width={470} height={40} rx={18} fill={steel} />
        <rect x={-300} y={-266} width={470} height={8} rx={4} fill={shade(steel, 0.3)} />
        {/* T-handle at the far left end of the screw */}
        <rect x={-304} y={-340} width={22} height={160} rx={10} fill={steel} />
        <circle cx={-293} cy={-340} r={26} fill={steel} />
        <circle cx={-293} cy={-180} r={26} fill={steel} />
        {/* fixed jaw and moving jaw */}
        <rect x={-150} y={-340} width={80} height={256} rx={12} fill={metal} />
        <rect x={110} y={-340} width={80} height={256} rx={12} fill={metal} />
        <rect x={-76} y={-320} width={6} height={210} rx={3} fill={shade(metal, 0.3)} />
        <rect x={104} y={-320} width={6} height={210} rx={3} fill={shade(metal, 0.3)} />
        {/* block of wood clamped between the jaws */}
        <rect x={-70} y={-300} width={180} height={150} rx={6} fill={C.sand} />
        <rect x={-60} y={-262} width={130} height={5} rx={2} fill={shade(C.sand, 0.15)} />
        <rect x={-60} y={-212} width={130} height={5} rx={2} fill={shade(C.sand, 0.15)} />
      </g>
    </g>
  );
}
