import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mumbai chawl: a four-storey block with a shop-front ground floor, long common balconies with railings and washing
// lines hung with bright cloths, rows of windows and two water tanks on the roof. Origin = ground centre.
// About 960 px wide and 1010 px tall at s = 1.
// anim "lights": the windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={3} fill={glow ? C.yellow : C.sky} />
    <rect x={x0 + w / 2 - 2} y={y0} width={4} height={h} fill={C.white} opacity={0.7} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F5D07A";
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 6 === k;
  const decks = [-275, -490, -705, -920];
  const winXs = [-300, -180, -60, 60, 180, 300];
  const cloths = [C.pink, C.blue, C.yellow, C.lime, C.white, C.orange, C.purple];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={480} ry={20} fill={C.shadow} />
        {/* body and ground-floor shop plinth */}
        <rect x={-400} y={-940} width={800} height={940} fill={wall} />
        <rect x={-400} y={-60} width={800} height={60} fill={shade(wall, 0.25)} />
        <rect x={-412} y={-952} width={824} height={16} rx={4} fill={trim} />
        {[-920, -705, -490, -275].map((dy) => <rect key={`st${dy}`} x={-400} y={dy - 6} width={800} height={10} fill={shade(wall, 0.12)} />)}
        {/* ground floor: shop shutters */}
        {[-330, -165, 0, 165, 330].map((sx) => (
          <g key={`sh${sx}`}>
            <rect x={sx - 52} y={-230} width={104} height={170} rx={4} fill={C.brownDark} />
            {[-210, -190, -170, -150, -130, -110, -90].map((ly) => <rect key={`sl${sx}${ly}`} x={sx - 50} y={ly} width={100} height={3} fill={shade(C.brownDark, 0.35)} />)}
          </g>
        ))}
        {/* long common balconies with railings and washing */}
        {decks.slice(0, 3).map((dy, floor) => (
          <g key={`bal${dy}`}>
            <rect x={-412} y={dy - 12} width={824} height={14} rx={3} fill={trim} />
            {Array.from({ length: 35 }, (_, i) => (
              <rect key={`rl${dy}${i}`} x={-400 + i * 24} y={dy - 100} width={6} height={88} fill={trim} />
            ))}
            <rect x={-412} y={dy - 104} width={824} height={10} rx={4} fill={trim} />
            <rect x={-380} y={dy - 84} width={760} height={3} fill={C.greyDark} />
            {[-340, -230, -120, 0, 120, 230, 340].map((cx, i) => (
              <rect key={`cl${dy}${cx}`} x={cx - 16} y={dy - 84} width={32} height={34 + ((i + floor) % 3) * 6} fill={cloths[(i + floor) % cloths.length]} />
            ))}
          </g>
        ))}
        {/* windows in each upper floor band */}
        {[-275, -490, -705].map((dy, floor) => winXs.map((wx, i) => (
          win(`w${dy}${wx}`, wx - 28, dy - 186, 56, 78, lit((floor * 6 + i) % 6))
        )))}
        {/* roof parapet and water tanks */}
        <rect x={-400} y={-950} width={800} height={12} fill={shade(wall, 0.12)} />
        {[-170, 150].map((tx) => (
          <g key={`tk${tx}`}>
            <rect x={tx - 30} y={-1000} width={60} height={50} fill={C.greyDark} />
            <ellipse cx={tx} cy={-1000} rx={30} ry={9} fill={shade(C.greyDark, 0.3)} />
            <rect x={tx - 34} y={-1006} width={68} height={8} rx={3} fill={C.greyDark} />
          </g>
        ))}
        {/* stair cover on the right */}
        <rect x={330} y={-980} width={70} height={30} fill={shade(wall, 0.2)} />
      </g>
    </g>
  );
}
