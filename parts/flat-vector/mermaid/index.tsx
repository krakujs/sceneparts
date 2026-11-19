import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mermaid: a woman with a teal fish tail, long dark hair and a coral top, sitting on a grey rock by the sea.
// Original look: deep teal tail, dark hair, coral top. Custom drawing. Rock base at y, ~800 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SKIN = "#F2C29E", SKIND = shade("#F2C29E", 0.14), HAIR = "#2B2420", TOP = "#FF8A7A", ROCK = "#8C9BAB", ROCKD = shade("#8C9BAB", 0.2), SEA = "#CFE9F3";
export default function Part(p: PartProps<any>) {
  const TAIL = (p as any).color || "#2FA7C7", TAILD = shade(TAIL, 0.22);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const wave = Math.sin(f / 18);
  const blink = f % 110 < 4;
  const tailSway = wave * 14;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={360} ry={22} fill={C.shadow} />
      {/* rock */}
      <path d="M -320 0 Q -340 -130 -230 -210 Q -120 -270 10 -240 Q 150 -270 240 -180 Q 330 -110 300 0 Z" fill={ROCK} />
      <path d="M -230 -210 Q -120 -270 10 -240 Q -60 -220 -150 -200 Q -200 -190 -230 -210 Z" fill={shade(ROCK, -0.2)} opacity={0.6} />
      <path d="M 120 -40 Q 220 -60 290 -10" stroke={ROCKD} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
      {/* sea foam at the rock base */}
      <path d={`M -360 -8 Q -300 ${-24 + wave * 4} -240 -8 T -120 -8 T 0 -8 T 120 -8 T 240 -8 T 360 -8`} stroke={SEA} strokeWidth={16} fill="none" strokeLinecap="round" />
      {/* fish tail over the rock and down into the sea */}
      <path d={`M -70 -250 C 40 ${-300 + tailSway * 0.3}, 190 ${-270 + tailSway * 0.4}, 250 ${-190 + tailSway * 0.3} C 290 ${-120 + tailSway * 0.6}, 300 ${-90 + tailSway * 0.8}, 330 ${-60 + tailSway} L 300 ${-30 + tailSway} C 250 ${-80 + tailSway}, 200 ${-100 + tailSway * 0.6}, 140 ${-110} C 80 ${-120}, 20 ${-150}, -40 ${-160} Z`} fill={TAIL} />
      <path d={`M 150 ${-120} Q 200 ${-150} 250 ${-190}`} stroke={TAILD} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />
      <path d={`M 40 ${-170} Q 90 ${-190} 120 ${-150}`} stroke={TAILD} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />
      {/* tail fin */}
      <path d={`M 300 ${-40 + tailSway} Q 390 ${-150 + tailSway} 420 ${-70 + tailSway} Q 400 ${-20 + tailSway} 350 ${-10 + tailSway} Q 390 ${30 + tailSway} 340 ${60 + tailSway} Q 300 ${40 + tailSway} 292 ${-10 + tailSway} Z`} fill={TAILD} />
      {/* back hair flowing down over the rock */}
      <path d="M -20 -640 Q -170 -640 -150 -440 Q -140 -300 -80 -250 L -40 -300 Q -70 -430 -40 -560 Z" fill={HAIR} />
      {/* torso in a coral top */}
      <path d="M -70 -520 Q -84 -420 -70 -250 L 70 -250 Q 84 -420 70 -520 Q 0 -540 -70 -520 Z" fill={SKIN} />
      <path d="M -70 -520 Q 0 -540 70 -520 L 74 -440 Q 0 -420 -74 -440 Z" fill={TOP} />
      {/* arm resting on the rock */}
      <path d="M -62 -500 Q -120 -400 -120 -270" stroke={SKIND} strokeWidth={46} fill="none" strokeLinecap="round" />
      <circle cx={-120} cy={-258} r={24} fill={SKIND} />
      {/* waving arm */}
      <path d={`M 62 -500 Q ${130 + wave * 8} ${-520} ${150 + wave * 14} ${-600 + wave * 8}`} stroke={SKIN} strokeWidth={46} fill="none" strokeLinecap="round" />
      <circle cx={152 + wave * 14} cy={-620 + wave * 8} r={24} fill={SKIN} />
      {/* head */}
      <circle cx={0} cy={-640} r={82} fill={SKIN} />
      <path d="M -84 -640 Q -88 -740 0 -736 Q 86 -730 84 -650 Q 46 -698 -20 -690 Q -66 -684 -84 -640 Z" fill={HAIR} />
      <path d="M 52 -690 Q 84 -680 88 -640" stroke={HAIR} strokeWidth={10} fill="none" strokeLinecap="round" />
      {blink ? (
        <g>
          <path d="M 18 -628 Q 30 -622 42 -628" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M 52 -628 Q 64 -622 76 -628" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <ellipse cx={30} cy={-630} rx={9} ry={12} fill={C.ink} />
          <ellipse cx={66} cy={-630} rx={9} ry={12} fill={C.ink} />
        </g>
      )}
      <circle cx={24} cy={-600} r={12} fill={C.pink} opacity={0.35} />
      <circle cx={72} cy={-600} r={12} fill={C.pink} opacity={0.35} />
      <path d="M 30 -596 Q 48 -578 66 -596" stroke={C.inkSoft} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* bubbles from the sea */}
      {[0, 1, 2].map((i) => {
        const t = ((f + i * 40) % 120) / 120;
        return <circle key={i} cx={300 + i * 26} cy={-260 - t * 240} r={6 + i * 2} fill="none" stroke={C.white} strokeWidth={3} opacity={1 - t} />;
      })}
    </g>
  );
}
