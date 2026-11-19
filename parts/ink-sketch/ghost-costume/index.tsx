import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Ghost costume: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"tank","topColour":"#f7f2e7","legs":"none","shoeStyle":"bare","shoes":"#c9c4b8","hair":"none","skin":"#f7f2e7","extra":[{"d":"M -104 60 Q -114 -120 0 -122 Q 114 -120 106 60 Q 60 94 0 84 Q -60 94 -104 60 Z M 27 -4 A 13 15 0 1 0 53 -4 A 13 15 0 1 0 27 -4 Z M 61 -4 A 13 15 0 1 0 87 -4 A 13 15 0 1 0 61 -4 Z","at":"head"},{"d":"M -84 -800 Q -92 -822 -56 -824 L 60 -824 Q 96 -822 92 -790 Q 110 -560 100 -360 Q 118 -180 104 -120 Q 92 -60 108 2 Q 66 -16 34 6 Q 2 -14 -28 4 Q -64 -16 -98 2 Q -110 -120 -96 -300 Q -86 -560 -84 -800 Z","at":"body"},{"d":"M -44 -700 Q -26 -560 -40 -420 Q -54 -560 -44 -700 Z","at":"body"},{"d":"M 30 -640 Q 52 -480 38 -300 Q 22 -480 30 -640 Z","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
