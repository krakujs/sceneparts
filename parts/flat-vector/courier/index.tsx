import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Courier preset: yellow polo with navy collar, navy cap and shorts, carrying a parcel box in both arms. Box is the prop default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.yellow}
      hat="cap"
      hatColor={C.navy}
      bottom="shorts"
      bottomColor={C.navy}
      over={() => (
        <g fill={C.navy}>
          <path d="M -24 -812 L 4 -776 L 0 -756 L -32 -796 Z" />
          <path d="M 52 -812 L 24 -776 L 28 -756 L 60 -796 Z" />
          <rect x={10} y={-776} width={8} height={40} rx={3} />
        </g>
      )}
      prop={p.prop ?? "box"}
    />
  );
}
