import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Rabbi preset: dark suit with white shirt and tie, a small skullcap and a full grey beard, holding a book. Generic and respectful.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.ink}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.inkSoft}
      accessory="beard"
      hat="skullcap"
      hatColor={C.navy}
      extra="tie"
      extraColor={C.blueDark}
      prop={p.prop ?? "book"}
      propColor={p.propColor ?? C.brownDark}
    />
  );
}
