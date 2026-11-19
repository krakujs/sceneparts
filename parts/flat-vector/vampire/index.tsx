import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Vampire preset: friendly-spooky. Pale skin, slicked dark hair, high-collar cape (dark outside, red lining) and small fangs.
/* eslint-disable @typescript-eslint/no-explicit-any */
const cape = "#2A1F3D", lining = "#B0264A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      skin="#EFE3F0"
      top="shirt"
      topColor={C.white}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={cape}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      hair="side"
      hairColor="#1F1A2E"
      expression="smile"
      over={() => (
        <g>
          <path d="M -70 -880 L -44 -880 L -30 -790 L -84 -790 Z" fill={cape} />
          <path d="M 80 -880 L 54 -880 L 40 -790 L 94 -790 Z" fill={cape} />
          <path d="M -86 -800 Q 4 -790 90 -800 L 150 -300 Q 40 -270 -120 -300 Z" fill={cape} />
          <path d="M -60 -800 Q 4 -790 70 -800 L 100 -340 Q 20 -320 -88 -340 Z" fill={lining} />
          <path d="M -86 -800 Q -100 -560 -120 -300 Q -100 -300 -88 -300 Q -70 -560 -60 -800 Z" fill={cape} />
          <circle cx={10} cy={-790} r={12} fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M 50 40 L 60 62 L 68 40 Z" fill={C.white} />
          <path d="M 76 40 L 86 62 L 94 40 Z" fill={C.white} />
        </g>
      )}
    />
  );
}
