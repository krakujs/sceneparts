import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime } from "../backdrop/index";

// Fire station interior: engine bay with a red fire engine at the right, roller door at the back, brass pole, hoses and helmets on hooks.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const red = L(p.engine ?? C.red), floorY = 1300, flash = drift && Math.floor(f / 30) % 2 === 0;
  return (
    <g>
      <Room time={time} wall={L("#E6E2DA")} floor={L("#B9BEC8")} floorY={floorY} floorKind="concrete" panels={false} skirting={false} />
      {/* roller door with slats */}
      <rect x={300} y={200} width={480} height={560} rx={6} fill={L(C.greyDark)} />
      {new Array(12).fill(0).map((_, i) => <rect key={i} x={314} y={216 + i * 46} width={452} height={34} rx={4} fill={L(C.grey)} />)}
      <rect x={300} y={740} width={480} height={20} fill={L(C.yellow)} />
      {/* brass pole from the ceiling, left side */}
      <rect x={190} y={0} width={16} height={1300} fill={L(C.yellowDark)} />
      <rect x={180} y={380} width={36} height={18} rx={6} fill={L(C.yellowDark)} />
      {/* helmets on a hook rail, left wall */}
      <rect x={40} y={520} width={120} height={12} rx={6} fill={L(C.greyDark)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M ${60 + i * 38} 520 Q ${80 + i * 38} 470 ${100 + i * 38} 520 Z`} fill={L([C.yellow, C.white, C.red][i])} />
          <rect x={58 + i * 38} y={516} width={44} height={8} rx={4} fill={shade(L([C.yellow, C.white, C.red][i]), 0.2)} />
        </g>
      ))}
      {/* coiled hoses on hooks low on the left wall */}
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={90 + i * 0} cy={920 + i * 110} r={46} fill="none" stroke={L(C.red)} strokeWidth={18} />
          <circle cx={90} cy={920 + i * 110} r={20} fill="none" stroke={L(C.redDark)} strokeWidth={8} />
        </g>
      ))}
      {/* red fire engine at the right, side view, pulled in from the edge */}
      <g transform="translate(-60 0)">
      <rect x={720} y={960} width={360} height={260} rx={22} fill={red} />
      <rect x={1000} y={860} width={80} height={200} rx={18} fill={red} />
      <rect x={1020} y={880} width={50} height={60} rx={8} fill={L("#CFE6F5")} />
      <rect x={720} y={1080} width={360} height={24} fill={shade(red, 0.22)} />
      <rect x={740} y={1020} width={120} height={70} rx={10} fill={L("#CFE6F5")} />
      <rect x={880} y={1020} width={80} height={70} rx={10} fill={L("#CFE6F5")} />
      <rect x={960} y={1140} width={70} height={36} fill={shade(red, 0.3)} />
      <circle cx={820} cy={1250} r={52} fill={L(C.ink)} />
      <circle cx={820} cy={1250} r={22} fill={L(C.grey)} />
      <circle cx={1010} cy={1250} r={52} fill={L(C.ink)} />
      <circle cx={1010} cy={1250} r={22} fill={L(C.grey)} />
      <rect x={720} y={930} width={44} height={30} rx={8} fill={flash ? "#FFF6D8" : L(C.yellow)} />
      </g>
      {/* yellow floor markings in front of the bay */}
      <rect x={0} y={floorY + 40} width={1080} height={10} fill={L(C.yellow)} />
    </g>
  );
}
