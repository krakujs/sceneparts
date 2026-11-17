import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fridge-freezer: tall two-door fridge with a freezer door on top. variant "open" swings the fridge door
// towards the viewer and shows shelves with food. Origin = bottom centre, real size (about 1000 px tall).
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.12);
  const handle = C.greyDark;
  const open = p.variant === "open";

  const freezer = (
    <g>
      <rect x={-200} y={-992} width={386} height={330} rx={22} fill={c} />
      <rect x={-170} y={-900} width={18} height={150} rx={9} fill={handle} />
    </g>
  );

  let fridge: React.ReactNode;
  if (open) {
    fridge = (
      <g>
        {/* interior */}
        <rect x={-200} y={-660} width={386} height={640} rx={16} fill="#EEF2F7" />
        {/* glass shelves */}
        {[-560, -440, -320, -200].map((yy) => (
          <rect key={yy} x={-186} y={yy} width={360} height={10} rx={4} fill={C.skyDeep} opacity={0.75} />
        ))}
        {/* food on the top shelf: bottle and jar */}
        <rect x={-140} y={-640} width={44} height={80} rx={14} fill={C.green} />
        <rect x={-70} y={-630} width={60} height={70} rx={12} fill={C.orange} />
        {/* tomatoes and cheese on the second shelf */}
        <circle cx={-120} cy={-468} r={28} fill={C.red} />
        <circle cx={-70} cy={-464} r={26} fill={C.redDark} />
        <rect x={20} y={-500} width={80} height={60} rx={6} fill={C.yellow} />
        <rect x={20} y={-500} width={80} height={12} rx={4} fill={C.yellowDark} />
        {/* milk carton and lettuce on the third shelf */}
        <rect x={-150} y={-430} width={70} height={110} rx={8} fill={C.white} />
        <rect x={-150} y={-430} width={70} height={22} rx={6} fill={C.blue} />
        <ellipse cx={60} cy={-342} rx={50} ry={34} fill={C.lime} />
        <ellipse cx={100} cy={-350} rx={30} ry={24} fill={C.green} />
        {/* crisper drawer at the bottom */}
        <rect x={-186} y={-170} width={360} height={150} rx={14} fill={C.greyLight} />
        <rect x={-160} y={-150} width={130} height={40} rx={18} fill={C.green} />
        <rect x={-10} y={-150} width={130} height={40} rx={18} fill={C.greenDark} />
        {/* door hinged on the left, swung towards the viewer */}
        <polygon points="-200,-660 -96,-690 -96,-10 -200,-22" fill={c} />
        <polygon points="-112,-690 -96,-690 -96,-10 -112,-20" fill={dk} />
        <rect x={-120} y={-560} width={14} height={170} rx={7} fill={handle} />
      </g>
    );
  } else {
    fridge = (
      <g>
        <rect x={-200} y={-660} width={386} height={640} rx={22} fill={c} />
        <rect x={-200} y={-676} width={386} height={14} fill={C.greyLight} />
        <rect x={-170} y={-600} width={18} height={260} rx={9} fill={handle} />
      </g>
    );
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={225} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* cabinet side shade and plinth */}
        <rect x={-210} y={-1000} width={420} height={1000} rx={30} fill={shade(c, 0.2)} />
        {freezer}
        {fridge}
        <rect x={-200} y={-24} width={400} height={24} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
