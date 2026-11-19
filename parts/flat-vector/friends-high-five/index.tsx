import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Friends high five: two people facing each other (the right one flipped), front hands meeting at the
// middle, with a small burst at contact. The burst pulses every 40 frames so the loop is seamless.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const sc = p.s ?? 1;
  const loop = f % 40;
  const bt = loop / 14; // burst lasts 14 frames, then rests
  const on = loop < 14;
  const bs = on ? 0.6 + 0.4 * Math.sin(Math.min(1, bt) * Math.PI) : 0;
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -sc : sc} ${sc})`}>
      <Person x={-190} y={0} s={0.5} f={f} pose="point" expression="laugh" skin="tan" hair="bun" hairColor="black" top="tshirt" topColor={C.orange} bottom="shorts" bottomColor={C.blueDark} shoes="sneakers" shoesColor={C.white} />
      <Person x={190} y={0} s={0.5} f={f + 4} flip pose="point" expression="open" skin="dark" hair="afro" hairColor="black" top="hoodie" topColor={C.teal} bottom="trousers" bottomColor={C.navy} shoes="sneakers" shoesColor={C.yellow} />
      {on ? (
        <g transform={`translate(0 -380) scale(${bs.toFixed(3)})`}>
          {rays.map((a) => (
            <line key={a} x1={0} y1={0} x2={Math.sin((a * Math.PI) / 180) * 70} y2={-Math.cos((a * Math.PI) / 180) * 70} stroke={C.yellow} strokeWidth={9} strokeLinecap="round" />
          ))}
          <circle r={18} fill={C.white} />
        </g>
      ) : null}
    </g>
  );
}
