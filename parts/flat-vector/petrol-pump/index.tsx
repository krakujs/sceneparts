import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fuel dispenser with a top display, keypad, a side nozzle holder, a curled hose and a nozzle. No brand.
// Origin = floor centre under the plinth. Room scale: about 900 px tall at s = 1.
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const base = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-170} y={-50} width={340} height={50} rx={10} fill={base} />
        <rect x={-140} y={-820} width={280} height={780} rx={26} fill={body} />
        <rect x={-160} y={-860} width={320} height={60} rx={22} fill={shade(body, 0.2)} />
        {/* display with segment bars */}
        <rect x={-100} y={-790} width={200} height={110} rx={14} fill={C.ink} />
        <rect x={-70} y={-760} width={140} height={12} rx={4} fill={C.lime} />
        <rect x={-70} y={-728} width={70} height={12} rx={4} fill={C.lime} />
        <rect x={-70} y={-700} width={100} height={12} rx={4} fill={C.lime} />
        {/* keypad */}
        <rect x={-80} y={-640} width={160} height={36} rx={8} fill={base} />
        {[-50, 0, 50].map((kx) => <circle key={kx} cx={kx} cy={-622} r={9} fill={C.greyLight} />)}
        {/* lower door panel */}
        <rect x={-120} y={-420} width={240} height={320} rx={16} fill={shade(body, 0.15)} />
        {/* nozzle holder, hose and nozzle */}
        <rect x={140} y={-580} width={30} height={110} rx={10} fill={base} />
        <path d="M 140 -470 C 240 -470 230 -170 190 -150" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
        <g transform="translate(190 -150) rotate(-20)">
          <rect x={-24} y={-18} width={60} height={36} rx={10} fill={base} />
          <rect x={30} y={-8} width={40} height={16} rx={6} fill={base} />
        </g>
      </g>
    </g>
  );
}
