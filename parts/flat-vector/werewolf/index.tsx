import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Werewolf: a friendly, slightly spooky cartoon wolf-person on two legs in a torn shirt and shorts.
// pose "howl" tips the head back with the muzzle open (uses the cheer arms). Topper draws the wolf head.
/* eslint-disable @typescript-eslint/no-explicit-any */
const FUR = "#8D7A66", FUR_D = "#5E4E40", SHIRT = "#6B5A8A", INNER = "#F2A7B8";
const pick = (p: any, d: Record<string, any>) => {
  const o: any = { ...d };
  for (const k of Object.keys(p)) if (p[k] !== undefined) o[k] = p[k];
  return o;
};
export default function Part(p: PartProps<any>) {
  const v = pick(p, { pose: "stand", expression: "smile", skin: FUR, howl: 0 });
  const f = p.f ?? 0;
  const howl = p.pose === "howl";
  const open = howl ? 0.6 + 0.4 * Math.sin(f / 5) : 0;
  return (
    <Person
      x={(p.x ?? 540) + (p.vx ?? 0) * f}
      y={p.y ?? 1560}
      s={p.s ?? 1}
      f={f}
      flip={!!p.flip}
      pose={howl ? "cheer" : v.pose}
      expression="open"
      skin={v.skin}
      hair="none"
      top="tshirt"
      topColor={SHIRT}
      bottom="shorts"
      bottomColor="#5A4636"
      shoes="sneakers"
      shoesColor="#3B2A1E"
      over={() => (
        <g>
          {/* torn hem and a rip on the shirt, showing fur */}
          <path d="M 30 -700 L 52 -680 L 40 -660 L 60 -636 L 36 -626 Z" fill={FUR} />
        </g>
      )}
      topper={() => (
        <g>
          {/* wolf head: rotated back and open when howling */}
          <g transform={howl ? "rotate(-22 0 40)" : undefined}>
            <path d="M -92 -22 L -118 -118 L -40 -84 Z" fill={FUR} />
            <path d="M 18 -88 L 40 -180 L 84 -100 Z" fill={FUR} />
            <path d="M -48 -20 L -62 -116 L 6 -70 Z" fill={INNER} opacity={0.35} />
            <path d="M 18 -88 L 40 -170 L 70 -110 Z" fill={INNER} opacity={0.35} />
            <ellipse cx={-4} cy={0} rx={96} ry={90} fill={FUR} />
            <path d="M -96 40 Q -60 98 4 90 Q 60 96 96 40 Q 70 80 4 78 Q -60 80 -96 40 Z" fill={FUR_D} opacity={0.5} />
            <path d="M 6 -2 Q 46 6 78 42 Q 96 56 110 46 Q 124 60 118 84 Q 80 112 30 104 Q 0 96 -22 70 Q 0 40 6 -2 Z" fill={FUR} />
            <path d="M 60 40 Q 92 46 112 48" stroke={FUR_D} strokeWidth={5} fill="none" strokeLinecap="round" />
            {open > 0 ? <path d="M 40 60 Q 80 72 112 50 Q 110 60 98 80 Q 60 100 40 84 Z" fill={INNER} transform={`translate(0 ${open * 8})`} /> : null}
            <circle cx={112} cy={46} r={10} fill={C.ink} />
            <ellipse cx={30} cy={-20} rx={9} ry={howl ? 5 : 11} fill={C.yellow} />
            <ellipse cx={72} cy={-16} rx={9} ry={howl ? 5 : 11} fill={C.yellow} />
            <ellipse cx={30} cy={-20} rx={3} ry={8} fill={C.ink} />
            <ellipse cx={72} cy={-16} rx={3} ry={8} fill={C.ink} />
            <path d="M 14 -40 Q 30 -52 46 -42" stroke={FUR_D} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M 56 -38 Q 72 -48 88 -38" stroke={FUR_D} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}
    />
  );
}
