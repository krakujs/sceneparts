import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime, asWeather, skyColours, mix } from "../backdrop/index";

// Attic background: sloped roof beams over the room, a small round window, stacked boxes, an old trunk,
// a dusty chair under a sheet and a hanging bulb. The stage in the middle of the floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const beam = L(p.beam ?? "#8A5A3C"), beamDark = shade(beam, 0.2), roof = L(p.roof ?? "#5E3B26");
  const floorY = 1360;
  const [sa, , sc] = skyColours(time, weather);
  const sky = mix(sa, sc, 0.5);
  const bulbOn = time === "night" || time === "dusk";
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#E0B98F"} floor={p.floor ?? "#B58A5E"} floorY={floorY} floorKind="boards" panels={false} />
      {/* roof: dark space above the sloped rafters */}
      <path d="M 0 0 L 1080 0 L 1080 440 L 540 120 L 0 440 Z" fill={roof} />
      {/* small round window in the gable */}
      <circle cx={540} cy={370} r={100} fill={L(C.brownDark)} />
      <circle cx={540} cy={370} r={84} fill={sky} />
      {time !== "night" && <circle cx={580} cy={345} r={22} fill={time === "dusk" ? C.orange : C.yellow} />}
      {time === "night" && weather === "clear" && <circle cx={580} cy={345} r={16} fill="#F4F1EA" />}
      <rect x={540 - 84} y={370 - 4} width={168} height={8} fill={L(C.brownDark)} />
      <rect x={540 - 4} y={286} width={8} height={168} fill={L(C.brownDark)} />
      {/* rafters and a ridge beam */}
      <path d="M 0 440 L 540 120 L 1080 440" stroke={beam} strokeWidth={30} fill="none" strokeLinejoin="round" />
      <path d="M 0 440 L 540 120 L 1080 440" stroke={beamDark} strokeWidth={6} fill="none" transform="translate(0 16)" />
      {[120, 300, 780, 960].map((x, i) => {
        const y = 440 - (Math.abs(x - 540) / 540) * 320;
        return <line key={i} x1={x} y1={y} x2={x} y2={0} stroke={beam} strokeWidth={14} />;
      })}
      <rect x={0} y={640} width={1080} height={22} fill={beam} />
      <rect x={0} y={662} width={1080} height={8} fill={beamDark} />
      {/* hanging bulb */}
      <rect x={537} y={120} width={6} height={460} fill={C.ink} />
      {bulbOn && <ellipse cx={540} cy={600} rx={190} ry={120} fill="#FFE9A8" opacity={0.25} />}
      <path d="M 520 580 L 560 580 L 552 620 L 528 620 Z" fill={L(C.greyDark)} />
      <circle cx={540} cy={636} r={22} fill={bulbOn ? "#FFF3C4" : C.greyLight} />
      {/* stacked boxes on the left */}
      <rect x={40} y={1220} width={160} height={140} rx={4} fill={L(C.sand)} />
      <rect x={60} y={1120} width={130} height={100} rx={4} fill={L(shade(C.sand, 0.06))} />
      <rect x={100} y={1250} width={70} height={18} fill={L(C.yellowDark)} opacity={0.7} />
      <rect x={112} y={1120} width={16} height={100} fill={L(C.yellowDark)} opacity={0.6} />
      <rect x={60} y={1160} width={130} height={10} fill={L(shade(C.sand, 0.15))} />
      {/* dusty chair under a sheet, left-centre */}
      <rect x={300} y={1120} width={110} height={100} rx={10} fill={L(C.greyLight)} />
      <rect x={300} y={1210} width={110} height={34} rx={6} fill={L(C.white)} opacity={0.9} />
      <path d="M 300 1244 L 320 1260 L 340 1244 L 360 1260 L 380 1244 L 400 1260 L 410 1244 L 410 1290 L 300 1290 Z" fill={L(C.white)} />
      <rect x={310} y={1290} width={12} height={40} fill={L(C.greyDark)} />
      <rect x={388} y={1290} width={12} height={40} fill={L(C.greyDark)} />
      {/* old trunk on the right */}
      <rect x={760} y={1260} width={240} height={90} rx={6} fill={L(C.brown)} />
      <path d="M 760 1260 Q 760 1190 880 1190 Q 1000 1190 1000 1260 Z" fill={L(shade(C.brown, 0.08))} />
      <rect x={760} y={1250} width={240} height={14} fill={L(C.brownDark)} />
      <rect x={858} y={1210} width={44} height={44} rx={6} fill={L(C.yellow)} />
      <rect x={790} y={1200} width={10} height={150} fill={L(C.brownDark)} />
      <rect x={960} y={1200} width={10} height={150} fill={L(C.brownDark)} />
      {/* a cobweb in the corner */}
      <path d="M 1080 0 L 980 0 Q 1000 60 1080 100 Z" fill={L(C.white)} opacity={0.3} />
      <path d="M 1080 0 L 1040 20 M 1080 0 L 1060 60 M 1080 0 L 1020 40" stroke={L(C.white)} strokeWidth={2} opacity={0.6} transform={drift ? `translate(${Math.sin(f / 40) * 2} 0)` : undefined} />
    </g>
  );
}
