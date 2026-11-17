import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Birthday child preset: child-sized, striped cone party hat, yellow tee, red shorts, and a red balloon on a string in the front hand that sways with the frame.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sway = Math.sin(p.f / 18);
  const bob = Math.sin(p.f / 12) * 6;
  return (
    <Person
      {...p}
      age="child"
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.yellow}
      bottom="shorts"
      bottomColor={C.teal}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      topper={() => (
        <g>
          <path d="M -58 -72 L 14 -250 L 60 -68 Z" fill={C.pink} />
          <path d="M -26 -134 L 40 -128 M -44 -100 L 52 -94" stroke={C.yellow} strokeWidth={10} strokeLinecap="round" />
          <circle cx={14} cy={-254} r={13} fill={C.white} />
        </g>
      )}
      held={(h) => {
        const bx = h.x + 110 + sway * 14;
        const by = h.y - 300 + bob;
        return (
          <g>
            <path d={`M ${h.x} ${h.y} Q ${h.x + 60} ${h.y - 120} ${bx} ${by + 56}`} stroke={C.greyDark} strokeWidth={3} fill="none" />
            <ellipse cx={bx} cy={by} rx={46} ry={56} fill={C.red} />
            <ellipse cx={bx - 14} cy={by - 20} rx={12} ry={16} fill={C.white} opacity={0.45} />
            <path d={`M ${bx - 8} ${by + 54} L ${bx + 8} ${by + 54} L ${bx} ${by + 66} Z`} fill={shade(C.red, 0.2)} />
          </g>
        );
      }}
    />
  );
}
