import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Office worker preset: light-blue shirt, trousers, staff lanyard and a mug. Pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#9FD3E8"
      bottom="trousers"
      bottomColor="#3A4157"
      extra="lanyard"
      extraColor={C.teal}
      prop={p.prop ?? "mug"}
    />
  );
}
