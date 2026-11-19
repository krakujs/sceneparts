import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// 1920s aviator: leather flying helmet with goggles, leather jacket, jodhpurs and boots, and a long
// scarf that flutters behind him. Preset of storybook/townsfolk. The scarf tail is animated with p.f.
const INK = C.ink;

const Scarf: React.FC<{ f: number; colour: string }> = ({ f, colour }) => {
  const w1 = Math.sin(f / 5) * 56;
  const w2 = Math.sin(f / 5 + 1.3) * 64;
  const w3 = Math.sin(f / 5 + 2.6) * 44;
  const d = `M -6 -446 C -90 ${-410 + w1} -150 ${-500 - w2} -230 ${-440 + w3}`;
  const d2 = `M -6 -438 C -100 ${-380 + w2} -160 ${-350 - w1} -200 ${-318 + w2 * 0.7}`;
  return (
    <g>
      <path d={d} fill="none" stroke={INK} strokeWidth={36} strokeLinecap="round" />
      <path d={d} fill="none" stroke={colour} strokeWidth={26} strokeLinecap="round" />
      <path d={d2} fill="none" stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d={d2} fill="none" stroke={colour} strokeWidth={16} strokeLinecap="round" />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const scarf = p.scarf ?? C.mustard;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="pilot" hatColour={p.jacket ?? "#6B4B2E"} hair="short" hairColour="#4A3324"
      top="jacket" coat={p.jacket ?? "#6B4B2E"} shirt={C.cream} lower="breeches" legs="#B08A55" boots="#2B2420"
      skin={p.skin} pose="forward" backPose="down" action="idle"
      scarf={scarf}
      behind={<Scarf f={f} colour={scarf} />}
    />
  );
}
