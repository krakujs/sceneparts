import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Sailor preset: white top with navy collar, sailor cap, rope coil in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="sailor"
      hatColor={C.white}
      over={() => (<path d="M -48 -806 L 10 -730 L 66 -806 L 66 -776 L 10 -700 L -48 -776 Z" fill={C.navy} />)}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><circle r={40} fill="#E9D3A9" /><circle r={28} fill="#D9B983" /><circle r={15} fill="#E9D3A9" /><circle r={8} fill="#D9B983" /></g>)}
    />
  );
}
