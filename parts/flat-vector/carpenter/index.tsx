import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Carpenter preset: green flannel shirt, tool belt and blue jeans, with a pencil tucked behind the ear and a plank carried in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.greenDark}
      extra="toolbelt"
      bottomColor={C.blueDark}
      topper={() => (
        <g transform="translate(-50 -10) rotate(-30)">
          <rect x={-6} y={-44} width={12} height={74} rx={3} fill={C.yellow} />
          <rect x={-6} y={-44} width={12} height={8} fill={C.pink} />
          <path d="M -6 30 L 6 30 L 0 46 Z" fill={C.sand} />
        </g>
      )}
      held={(h) => (
        <g>
          <rect x={h.bx - 30} y={h.by - 16} width={h.x - h.bx + 60} height={32} rx={4} fill="#D9A86C" />
          <path d={`M ${h.bx - 20} ${h.by - 4} L ${h.x + 20} ${h.y - 4}`} stroke="#B9854C" strokeWidth={3} strokeLinecap="round" />
          <path d={`M ${h.bx - 20} ${h.by + 8} L ${h.x + 20} ${h.y + 8}`} stroke="#B9854C" strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
    />
  );
}
