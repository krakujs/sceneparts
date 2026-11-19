import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, Window, lit, asTime, asWeather } from "../backdrop/index";

// Police station interior background (preset of flat-vector/backdrop): front desk with a glass screen at the back,
// a notice board with abstract papers, a row of waiting chairs at the right, blue accents and a Window with blinds.
// The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, accent = L(p.accent ?? C.blue), accentD = shade(accent, 0.2), ink = L(C.ink), steel = L(C.greyLight);
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E9F0F7"} floor="#C9D6E3" floorY={floorY} floorKind="tiles" panels={false} />
      {/* blue accent band across the wall */}
      <rect x={0} y={1000} width={1080} height={44} fill={accent} />
      <rect x={0} y={1044} width={1080} height={8} fill={accentD} />
      {/* Window with blinds */}
      <Window x={370} y={330} w={340} h={250} time={time} weather={weather} f={drift ? f : 0} view="city" frame={L(C.white)} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect key={i} x={370} y={330 + i * 22} width={340} height={12} fill={L(C.greyLight)} opacity={0.82} />
      ))}
      {/* notice board at the left wall */}
      <rect x={40} y={460} width={250} height={300} rx={10} fill={shade(L(C.brown), 0.1)} />
      <rect x={52} y={472} width={226} height={276} rx={6} fill={L("#D9B98C")} />
      <rect x={72} y={498} width={90} height={70} rx={3} fill={L(C.white)} transform="rotate(-3 117 533)" />
      <rect x={180} y={494} width={86} height={80} rx={3} fill={L(C.white)} transform="rotate(4 223 534)" />
      <rect x={76} y={600} width={150} height={62} rx={3} fill={L(C.white)} transform="rotate(2 150 631)" />
      <rect x={176} y={610} width={70} height={46} rx={3} fill={L(C.yellow)} />
      {[[77, 503], [185, 499], [80, 605], [181, 615]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={L(C.red)} />)}
      <rect x={96} y={520} width={50} height={6} rx={3} fill={L(C.greyDark)} opacity={0.5} />
      <rect x={96} y={534} width={36} height={6} rx={3} fill={L(C.greyDark)} opacity={0.5} />
      {/* front desk with glass screen above it */}
      <rect x={320} y={860} width={440} height={220} fill={steel} opacity={0.42} />
      <rect x={312} y={850} width={456} height={12} rx={4} fill={L(C.greyDark)} />
      <rect x={320} y={1080} width={440} height={30} rx={6} fill={L(C.white)} />
      <rect x={336} y={1110} width={408} height={230} fill={accentD} />
      <rect x={336} y={1110} width={408} height={10} fill={shade(accentD, 0.2)} />
      <rect x={520} y={1170} width={40} height={10} rx={5} fill={L(C.white)} opacity={0.7} />
      <rect x={394} y={1040} width={72} height={30} rx={4} fill={L(C.greyDark)} />
      <rect x={560} y={1044} width={60} height={24} rx={4} fill={ink} />
      {/* waiting chairs at the right */}
      {[866, 934, 1002].map((x, i) => (
        <g key={`ch${i}`}>
          <rect x={x} y={1190} width={60} height={24} rx={6} fill={accent} />
          <rect x={x + 4} y={1120} width={52} height={76} rx={12} fill={accent} />
          <rect x={x + 26} y={1214} width={8} height={110} fill={steel} />
          <rect x={x + 12} y={1322} width={36} height={8} rx={4} fill={steel} />
        </g>
      ))}
      {/* blue round badge on the wall above the stripe */}
      <circle cx={860} cy={740} r={50} fill={accent} />
      <circle cx={860} cy={740} r={34} fill={L(C.white)} />
      <circle cx={860} cy={740} r={12} fill={accent} />
    </g>
  );
}
