import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, mix, asTime } from "../backdrop/index";

// Theatre stage: proscenium arch with red velvet curtains and a valance, wooden stage floor, footlights and spotlight beams.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const velvet = L(p.curtains ?? C.red), wood = L(p.wood ?? "#B9825A");
  const floorY = 1280, sway = drift ? Math.sin(f / 40) * 6 : 0;
  const spotOn = time !== "day" ? 0.22 : 0.14;
  return (
    <g>
      <Room time={time} wall={L("#2A2340")} floor={wood} floorY={floorY} floorKind="boards" panels={false} skirting={false} />
      {/* back cloth between the curtains */}
      <rect x={0} y={0} width={1080} height={floorY} fill={mix(L("#2A2340"), L(C.navy), 0.4)} />
      <path d="M 300 1000 L 200 420 L 880 420 L 780 1000 Z" fill={mix(L(C.purple), L("#2A2340"), 0.5)} opacity={0.55} />
      {/* spotlight beams from the top corners of the arch */}
      <path d="M 230 0 L 120 1280 L 430 1280 L 300 0 Z" fill="#FFF3C4" opacity={spotOn} />
      <path d="M 850 0 L 660 1280 L 960 1280 L 850 0 Z" fill="#FFF3C4" opacity={spotOn} />
      {/* proscenium arch: solid frame around an opening */}
      <rect x={0} y={0} width={1080} height={300} fill={shade(velvet, 0.35)} />
      <path d="M 90 0 L 90 1280 L 150 1280 L 150 0 Z" fill={shade(velvet, 0.35)} />
      <path d="M 930 0 L 930 1280 L 990 1280 L 990 0 Z" fill={shade(velvet, 0.35)} />
      {/* velvet valance with scallops */}
      <rect x={0} y={0} width={1080} height={210} fill={velvet} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M ${i * 160 - 20} 210 Q ${i * 160 + 60} 270 ${i * 160 + 140} 210 Z`} fill={velvet} />)}
      {/* side curtains swaying gently */}
      <path d={`M 150 210 Q ${240 + sway} 700 ${160 + sway} 1280 L 40 1280 L 40 210 Z`} fill={velvet} />
      <path d={`M 930 210 Q ${840 - sway} 700 ${920 - sway} 1280 L 1040 1280 L 1040 210 Z`} fill={velvet} />
      {/* gold tassel rope on each side */}
      <path d="M 150 300 Q 110 420 150 520" stroke={L(C.yellow)} strokeWidth={10} fill="none" />
      <path d="M 930 300 Q 970 420 930 520" stroke={L(C.yellow)} strokeWidth={10} fill="none" />
      {/* footlights along the front edge of the stage */}
      {new Array(12).fill(0).map((_, i) => (
        <circle key={i} cx={100 + i * 80} cy={floorY + 16} r={9} fill={C.yellow} opacity={0.6 + 0.35 * Math.sin(f / 10 + i)} />
      ))}
      <rect x={0} y={floorY + 4} width={1080} height={10} fill={shade(wood, 0.25)} />
    </g>
  );
}
