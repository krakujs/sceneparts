import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, mix, asTime } from "../backdrop/index";

// Indoor swimming pool: tiled back wall, diving board, ladder, lane ropes and rippling water seen from the deck edge.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const water = L(p.water ?? "#3FB8E6"), tile = L("#E8F7FB"), ropeCol = [C.red, C.white, C.yellow, C.white, C.red];
  const poolTop = 900, poolBot = 1280;
  return (
    <g>
      <Room time={time} wall={L("#CFF0F7")} floor={tile} floorY={1260} floorKind="tiles" panels={false} skirting={false} />
      {/* wall tiles pattern */}
      {new Array(12).fill(0).map((_, i) => <line key={i} x1={0} y1={100 + i * 80} x2={1080} y2={100 + i * 80} stroke={shade(L("#CFF0F7"), 0.08)} strokeWidth={3} />)}
      {/* diving board on a tower at the right */}
      <rect x={880} y={560} width={26} height={400} fill={L(C.greyDark)} />
      <rect x={760} y={620} width={230} height={18} rx={8} fill={L(C.white)} />
      <rect x={760} y={638} width={230} height={8} fill={L(C.grey)} />
      {/* pool tiled rim and water */}
      <rect x={0} y={poolTop - 22} width={1080} height={22} fill={L("#9ADCEB")} />
      <rect x={0} y={poolTop} width={1080} height={poolBot - poolTop} fill={water} />
      <rect x={0} y={poolBot} width={1080} height={22} fill={L("#9ADCEB")} />
      {/* lane ropes with floats */}
      {[0, 1, 2].map((r) => {
        const y = poolTop + 60 + r * 110;
        return (
          <g key={r}>
            <line x1={0} y1={y} x2={1080} y2={y} stroke={L(C.white)} strokeWidth={4} opacity={0.8} />
            {new Array(18).fill(0).map((_, i) => <circle key={i} cx={30 + i * 60} cy={y} r={9} fill={L(ropeCol[(i + r) % 5])} />)}
          </g>
        );
      })}
      {/* ripples that drift across the water */}
      {new Array(7).fill(0).map((_, i) => {
        const x = ((i * 190 + (drift ? f * 1.5 : 0)) % 1200) - 60, y = poolTop + 100 + (i % 3) * 70;
        return <path key={i} d={`M ${x} ${y} q 30 -10 60 0 t 60 0`} stroke={L("#E8FAFF")} strokeWidth={5} fill="none" opacity={0.7} />;
      })}
      {/* ladder on the left edge into the pool */}
      {[0, 1].map((i) => <rect key={i} x={70 + i * 90} y={820} width={12} height={380} rx={6} fill={L(C.greyDark)} />)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={70} y={880 + i * 70} width={102} height={10} rx={5} fill={L(C.greyDark)} />)}
    </g>
  );
}
