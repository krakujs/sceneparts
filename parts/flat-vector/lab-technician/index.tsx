import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Lab technician preset: pink shirt, white apron, test tube rack in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#F27BA6"
      extra="apron"
      extraColor={C.white}
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="sneakers"
      shoesColor={C.white}
      accessory="glasses"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={-48} y={-8} width={96} height={18} rx={5} fill={C.brown} /><rect x={-40} y={-84} width={12} height={78} rx={6} fill="#BFE6F5" /><rect x={-40} y={-44} width={12} height={36} rx={6} fill={C.red} /><rect x={-14} y={-84} width={12} height={78} rx={6} fill="#BFE6F5" /><rect x={-14} y={-34} width={12} height={28} rx={6} fill={C.teal} /><rect x={12} y={-84} width={12} height={78} rx={6} fill="#BFE6F5" /><rect x={12} y={-52} width={12} height={20} rx={6} fill={C.yellow} /><rect x={36} y={-84} width={12} height={78} rx={6} fill="#BFE6F5" /><rect x={36} y={-40} width={12} height={32} rx={6} fill={C.purple} /></g>)}
    />
  );
}
