import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Combine harvester, side view, facing right: wide cutting header with a spinning reel at the front, sloped feeder,
// tall body with a glass cab on top front, grain tank behind it, folded unloading pipe, big front and small rear wheels.
// Room scale: about 940 px wide and 780 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": wheels and reel turn and the body rocks a little; vx moves it along x (px per frame).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 6 : 0;
  const reel = driving ? f * 4 : 0;
  const rock = driving ? Math.sin((f * 2 * Math.PI) / 24) * 0.8 : 0;
  const dark = shade(body, 0.2);
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      {Array.from({ length: 14 }, (_, k) => (
        <rect key={k} x={cx - 9} y={-2 * r - 4} width={18} height={18} rx={4} fill={C.ink}
          transform={`rotate(${f1(spin + k * (360 / 14))} ${cx} ${-r})`} />
      ))}
      <circle cx={cx} cy={-r} r={r * 0.55} fill={C.yellow} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} cx={cx + r * 0.36} cy={-r} r={r * 0.07} fill={shade(C.yellow, 0.3)} transform={`rotate(${k * 60} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.17} fill={shade(C.yellow, 0.35)} />
    </g>
  );
  // reel: hub at (440, -300), radius 120, six arms with bats
  const RX = 440, RY = -300, RR = 120;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform="translate(-55 0) scale(0.9)">
        <g transform={`rotate(${f1(rock)} 0 -150)`}>
          {/* unloading pipe folded back over the rear */}
          <path d="M -250 -600 L -420 -700" stroke={metal} strokeWidth={34} strokeLinecap="round" />
          <path d="M -420 -700 L -440 -640" stroke={metal} strokeWidth={30} strokeLinecap="round" />
          <rect x={-275} y={-640} width={40} height={60} rx={8} fill={metal} />
          {/* grain tank */}
          <path d="M -320 -560 L -330 -660 Q -330 -680 -310 -680 L 60 -680 Q 80 -680 78 -660 L 70 -560 Z" fill={dark} />
          <rect x={-330} y={-690} width={410} height={22} rx={8} fill={shade(body, 0.32)} />
          {/* main body */}
          <path d="M -400 -200 L -400 -520 Q -400 -560 -360 -560 L 200 -560 Q 230 -560 230 -530 L 230 -200 Z" fill={body} />
          <rect x={-400} y={-250} width={630} height={50} fill={dark} />
          {/* side panels and vents */}
          <rect x={-330} y={-500} width={230} height={170} rx={14} fill={dark} />
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={-310} y={-480 + k * 30} width={190} height={12} rx={6} fill={shade(body, 0.36)} />
          ))}
          <rect x={-60} y={-500} width={230} height={90} rx={12} fill={shade(body, 0.1)} />
          <rect x={-40} y={-470} width={120} height={14} rx={7} fill={C.white} opacity={0.6} />
          {/* rear straw spreader */}
          <path d="M -400 -230 L -460 -200 L -460 -150 L -400 -170 Z" fill={metal} />
          {/* ladder to the cab */}
          <rect x={150} y={-520} width={10} height={300} fill={metal} />
          {[0, 1, 2, 3, 4].map((k) => (<rect key={k} x={150} y={-500 + k * 60} width={60} height={8} rx={4} fill={metal} />))}
          {/* cab */}
          <path d="M 40 -560 L 40 -790 Q 40 -810 60 -810 L 250 -810 Q 275 -810 275 -785 L 290 -560 Z" fill={dark} />
          <path d="M 62 -580 L 62 -780 L 250 -780 L 266 -580 Z" fill={C.sky} />
          <path d="M 90 -780 L 140 -780 L 100 -580 L 70 -580 Z" fill="#FFFFFF" opacity={0.45} />
          <rect x={30} y={-830} width={260} height={26} rx={10} fill={body} />
          <rect x={150} y={-850} width={28} height={22} rx={6} fill={C.yellow} />
          {/* feeder house sloping down to the header */}
          <path d="M 200 -470 L 340 -230 L 340 -60 L 230 -60 L 160 -250 Z" fill={dark} />
          <path d="M 215 -430 L 310 -260" stroke={shade(body, 0.4)} strokeWidth={12} strokeLinecap="round" />
          {/* header: long low platform with an end plate, trough and toothed cutter bar */}
          <path d="M 300 -250 L 470 -250 L 560 -110 L 580 -40 L 300 -40 Z" fill={body} />
          <path d="M 330 -215 L 455 -215 L 530 -100 L 545 -64 L 330 -64 Z" fill={dark} />
          <path d="M 340 -150 L 530 -150" stroke={metal} strokeWidth={14} strokeLinecap="round" opacity={0.7} />
          <rect x={290} y={-52} width={300} height={28} rx={8} fill={metal} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (<path key={k} d={`M ${450 + k * 18} -30 l 18 8 l -18 4 Z`} fill={C.greyLight} />))}
          {/* reel arm support */}
          <path d="M 240 -470 L 430 -300" stroke={metal} strokeWidth={24} strokeLinecap="round" />
          {/* reel */}
          <circle cx={RX} cy={RY} r={RR} fill={C.ink} opacity={0.12} />
          <circle cx={RX} cy={RY} r={RR} fill="none" stroke={metal} strokeWidth={10} />
          <g transform={`rotate(${f1(reel)} ${RX} ${RY})`}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k} transform={`rotate(${k * 60} ${RX} ${RY})`}>
                <rect x={RX - 7} y={RY - RR} width={14} height={RR} fill={metal} />
                <rect x={RX - 34} y={RY - RR - 14} width={68} height={28} rx={8} fill={C.yellow} />
              </g>
            ))}
          </g>
          <circle cx={RX} cy={RY} r={28} fill={metal} />
          <circle cx={RX} cy={RY} r={11} fill={C.greyLight} />
          {/* lights */}
          <rect x={268} y={-800} width={18} height={14} rx={4} fill={C.yellow} />
          <rect x={-410} y={-510} width={14} height={30} rx={4} fill={C.red} />
        </g>
        {wheel(70, 165)}
        {wheel(-290, 100)}
        </g>
      </g>
    </g>
  );
}
