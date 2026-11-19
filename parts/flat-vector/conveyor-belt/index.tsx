import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Factory conveyor belt in side view with a motor at one end and cardboard boxes riding on the belt.
// Long, about 880 px wide and 370 px tall at s = 1. Origin = floor centre under the frame.
// anim "move": the boxes travel along the belt and wrap round at the ends.
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
  const frame = p.color && p.color !== "none" ? p.color : C.greyDark;
  const box = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const travel = anim === "move" ? f * 2.2 : 0;
  const BOXES = [0, 1, 2, 3];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* legs */}
        {[-400, -20, 380].map((lx) => (
          <rect key={lx} x={lx} y={-205} width={22} height={205} fill={frame} />
        ))}
        {/* motor and drive housing */}
        <rect x={-478} y={-330} width={80} height={110} rx={12} fill={shade(frame, 0.3)} />
        <circle cx={-438} cy={-290} r={22} fill={C.yellow} />
        <circle cx={-438} cy={-290} r={8} fill={C.inkSoft} />
        {/* side rail and belt */}
        <rect x={-430} y={-230} width={860} height={26} rx={10} fill={frame} />
        <rect x={-440} y={-272} width={880} height={44} rx={20} fill={C.inkSoft} />
        <rect x={-420} y={-266} width={840} height={6} rx={3} fill={C.ink} opacity={0.6} />
        <circle cx={-420} cy={-250} r={26} fill={C.greyLight} />
        <circle cx={420} cy={-250} r={26} fill={C.greyLight} />
        <circle cx={-420} cy={-250} r={9} fill={C.greyDark} />
        <circle cx={420} cy={-250} r={9} fill={C.greyDark} />
        {/* boxes, spaced along the belt */}
        {BOXES.map((i) => {
          const cx = -360 + (((i * 260 + travel) % 720) + 720) % 720;
          return (
            <g key={i}>
              <rect x={cx - 60} y={-370} width={120} height={100} rx={6} fill={box} />
              <rect x={cx - 60} y={-370} width={120} height={18} rx={5} fill={shade(box, 0.12)} />
              <rect x={cx - 9} y={-370} width={18} height={100} fill={C.brown} opacity={0.5} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
