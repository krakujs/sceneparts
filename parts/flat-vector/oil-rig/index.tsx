import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Offshore oil platform: sea band at the bottom, four thick legs standing in the water, a deck with living quarters,
// a lattice derrick tower, a crane arm, a round helipad on posts and a flare stack with a small flame.
// Origin = centre of the sea floor line (y). About 920 px wide and 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const DECK_TOP = -340, DECK_BOT = -318;
const DT = -900; // top of the derrick tower
const DERRICK_X = 120, DERRICK_BASE_HALF = 80;

/** Lattice of a tapered tower from y = DECK_TOP up to DT, centred on DERRICK_X: two legs, rungs and cross-braces. */
const lattice = (steel: string) => {
  const LEVELS = 7;
  const at = (k: number) => {
    const t = k / LEVELS;
    const y = DECK_TOP + (DT - DECK_TOP) * t;
    const hw = DERRICK_BASE_HALF * (1 - t) + 12;
    return { y, hw };
  };
  const out: React.ReactElement[] = [];
  for (let k = 0; k < LEVELS; k++) {
    const a = at(k), b = at(k + 1);
    out.push(
      <path key={`d${k}`} d={`M ${f1(DERRICK_X - a.hw)} ${f1(a.y)} L ${f1(DERRICK_X + b.hw)} ${f1(b.y)} M ${f1(DERRICK_X + a.hw)} ${f1(a.y)} L ${f1(DERRICK_X - b.hw)} ${f1(b.y)}`}
        stroke={steel} strokeWidth={6} strokeLinecap="round" fill="none" />
    );
    out.push(
      <line key={`r${k}`} x1={f1(DERRICK_X - b.hw)} y1={f1(b.y)} x2={f1(DERRICK_X + b.hw)} y2={f1(b.y)} stroke={steel} strokeWidth={7} strokeLinecap="round" />
    );
  }
  out.push(<line key="rt" x1={DERRICK_X - 16} y1={DT} x2={DERRICK_X + 16} y2={DT} stroke={steel} strokeWidth={8} strokeLinecap="round" />);
  return out;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const steel = pick(p.color, C.greyDark);
  const accent = pick(p.color2, C.orange);
  const anim: string = p.anim ?? "none";
  const lamp = anim === "lights" && Math.floor(f / 15) % 2 ? C.red : "#FFB3A8";
  const winOn = (i: number) => (anim === "lights" ? (Math.floor(f / 12) + i) % 3 !== 0 : true);
  const sea = "#3F9AD6";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* sea: a band from the water surface down to the sea floor */}
        <rect x={-500} y={-130} width={1000} height={130} fill={sea} />
        {[-108, -70, -34].map((wy, i) => (
          <path key={i} d={`M ${-440 + i * 40} ${wy} Q ${-400 + i * 40} ${wy - 10} ${-360 + i * 40} ${wy} T ${-280 + i * 40} ${wy}`} stroke={C.white} strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.5} />
        ))}
        <rect x={-500} y={-14} width={1000} height={14} fill={shade(sea, 0.3)} />
        {/* legs with braces, standing in the water */}
        {[-380, -200, 200, 380].map((lx) => (
          <path key={lx} d={`M ${lx - 20} ${DECK_BOT} L ${lx + 20} ${DECK_BOT} L ${lx + 34} 0 L ${lx - 34} 0 Z`} fill={steel} />
        ))}
        <path d="M -380 -230 L -200 -110 M -200 -230 L -380 -110 M 200 -230 L 380 -110 M 380 -230 L 200 -110" stroke={shade(steel, 0.2)} strokeWidth={8} strokeLinecap="round" fill="none" />
        {[-380, -200, 200, 380].map((lx) => (
          <rect key={`f${lx}`} x={lx - 44} y={-14} width={88} height={14} rx={4} fill={shade(steel, 0.2)} />
        ))}
        {/* deck with guard rail */}
        <rect x={-440} y={DECK_TOP} width={880} height={DECK_BOT - DECK_TOP} rx={8} fill={steel} />
        <rect x={-440} y={DECK_TOP - 6} width={880} height={6} rx={3} fill={shade(steel, 0.35)} />
        {[-440, -300, -160, 0, 160, 300, 440].map((rx) => (
          <line key={rx} x1={rx} y1={DECK_TOP} x2={rx} y2={DECK_TOP - 30} stroke={shade(steel, 0.3)} strokeWidth={5} />
        ))}
        <line x1={-440} y1={DECK_TOP - 30} x2={440} y2={DECK_TOP - 30} stroke={shade(steel, 0.3)} strokeWidth={5} />
        {/* living quarters with a row of lit windows */}
        <rect x={-230} y={-430} width={140} height={90} rx={8} fill={C.white} />
        <rect x={-230} y={-350} width={140} height={10} fill={shade(C.white, 0.2)} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-214 + i * 44} y={-416} width={28} height={28} rx={4} fill={winOn(i) ? C.yellow : C.sky} />
        ))}
        {/* helipad on two posts, upper left */}
        <rect x={-380} y={-470} width={12} height={130} fill={steel} />
        <rect x={-292} y={-470} width={12} height={130} fill={steel} />
        <ellipse cx={-336} cy={-470} rx={100} ry={28} fill={C.white} />
        <ellipse cx={-336} cy={-470} rx={78} ry={19} fill={C.blue} />
        {/* derrick tower and beacon on top */}
        {lattice(steel)}
        <circle cx={DERRICK_X} cy={DT - 14} r={11} fill={lamp} />
        {/* crane arm with cable and hook */}
        <path d={`M ${DERRICK_X + 20} -600 L 400 -690`} stroke={accent} strokeWidth={18} strokeLinecap="round" />
        <path d={`M 150 -560 L 340 -640`} stroke={shade(steel, 0.15)} strokeWidth={8} strokeLinecap="round" />
        <line x1={400} y1={-690} x2={400} y2={-566} stroke={C.ink} strokeWidth={4} />
        <circle cx={400} cy={-552} r={11} fill={C.ink} />
        {/* flare stack with a small flame */}
        <rect x={462} y={-560} width={12} height={220} fill={steel} />
        <path d="M 468 -560 C 446 -586 470 -612 466 -646 C 500 -612 500 -586 468 -560 Z" fill={C.orange} />
        <path d="M 468 -562 C 458 -580 474 -596 470 -614 C 486 -596 486 -580 468 -562 Z" fill={C.yellow} />
      </g>
    </g>
  );
}
