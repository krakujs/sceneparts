import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lifeguard tower: a raised chair on four legs with a sloped ramp, a guard rail, a flag on a pole and a rescue
// buoy hung on the rail. Origin = ground centre under the chair. About 960 px wide and 920 px tall at s = 1.
// anim "lights": the beacon on top of the chair blinks.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const ring = (cx: number, cy: number, ro: number, ri: number) =>
  `M ${cx - ro} ${cy} a ${ro} ${ro} 0 1 0 ${2 * ro} 0 a ${ro} ${ro} 0 1 0 ${-2 * ro} 0 Z M ${cx - ri} ${cy} a ${ri} ${ri} 0 1 0 ${2 * ri} 0 a ${ri} ${ri} 0 1 0 ${-2 * ri} 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const chair = p.color && p.color !== "none" ? p.color : C.red;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const beaconOn = anim === "lights" && Math.floor(f / 8) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={470} ry={18} fill={C.shadow} />
        {/* ramp from the sand up to the deck */}
        <path d="M -430 0 L -250 -545 L -210 -545 L -390 0 Z" fill={C.brown} />
        {[-70, -140, -210, -280, -350].map((ry) => {
          const t = (0 - ry) / 545;
          const cx = -430 + (-250 + 430) * t + 20 * t;
          return <rect key={`rk${ry}`} x={cx - 22} y={ry - 3} width={44} height={6} fill={shade(C.brown, 0.3)} />;
        })}
        {/* legs and braces */}
        {[-230, -150, 150, 230].map((lx) => <rect key={`lg${lx}`} x={lx - 11} y={-530} width={22} height={530} fill={shade(C.brown, 0.1)} />)}
        <rect x={-230} y={-300} width={460} height={14} fill={shade(C.brown, 0.25)} />
        <rect x={-230} y={-130} width={460} height={14} fill={shade(C.brown, 0.25)} />
        {/* deck */}
        <rect x={-260} y={-560} width={520} height={30} rx={6} fill={C.sand} />
        {[-220, -160, -100, -40, 20, 80, 140, 200].map((px) => <rect key={`dk${px}`} x={px} y={-560} width={3} height={30} fill={shade(C.sand, 0.25)} />)}
        {/* chair body with a window */}
        <rect x={-120} y={-700} width={240} height={140} rx={12} fill={chair} />
        <rect x={-100} y={-680} width={200} height={70} rx={8} fill={C.sky} />
        <rect x={-90} y={-676} width={18} height={62} fill={C.white} opacity={0.6} />
        <rect x={-120} y={-600} width={240} height={10} fill={shade(chair, 0.25)} />
        {/* roof */}
        <rect x={-150} y={-730} width={300} height={30} rx={14} fill={trim} />
        <rect x={-150} y={-708} width={300} height={8} fill={shade(trim, 0.15)} />
        <circle cx={0} cy={-748} r={16} fill={beaconOn ? C.yellow : C.orange} />
        {/* guard rail across the front */}
        <rect x={-260} y={-620} width={520} height={10} rx={4} fill={trim} />
        {[-260, 250].map((px) => <rect key={`rp${px}`} x={px} y={-620} width={10} height={60} fill={trim} />)}
        {/* flag on a pole */}
        <rect x={180} y={-905} width={8} height={345} fill={C.greyDark} />
        <path d="M 188 -905 L 290 -872 L 188 -840 Z" fill={C.yellow} />
        <path d="M 188 -872 L 260 -872 L 188 -856 Z" fill={C.yellowDark} />
        {/* rescue buoy hung on the rail */}
        <path d={ring(-200, -560, 44, 22)} fillRule="evenodd" fill={C.orange} />
        <rect x={-244} y={-566} width={88} height={10} fill={trim} />
      </g>
    </g>
  );
}
