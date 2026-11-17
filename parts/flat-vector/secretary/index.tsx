import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Secretary preset: pink blouse, navy pencil skirt, heels, a notepad and pen held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#F7C6D9"
      bottom="skirt"
      bottomColor="#253058"
      shoes="heels"
      shoesColor={C.redDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-36} y={-46} width={72} height={88} rx={8} fill={C.yellow} />
          <rect x={-30} y={-40} width={60} height={76} rx={4} fill={C.white} />
          {[-20, 0, 20].map((x) => <circle key={x} cx={x} cy={-46} r={5} fill={C.greyDark} />)}
          {[-14, 2, 18].map((y) => <rect key={y} x={-22} y={y} width={44} height={5} rx={2} fill={C.greyLight} />)}
          <g transform="rotate(32)">
            <rect x={-5} y={-10} width={10} height={70} rx={4} fill={C.blue} />
            <path d="M -5 60 L 0 74 L 5 60 Z" fill={C.ink} />
          </g>
        </g>
      )}
    />
  );
}
