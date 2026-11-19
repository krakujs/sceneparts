import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Santa costume: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"coat","topColour":"red","inner":"#f7f2e7","belt":true,"hat":"santa","hatColour":"red","beard":"beard","hair":"short","hairColour":"white","legs":"trousers","legsColour":"red","shoeStyle":"boots","shoes":"#2a2624","hold":"bag","itemColour":"brown","skin":"fair","extra":[{"d":"M -56 -820 Q -20 -846 14 -838 Q 52 -846 66 -820 L 70 -796 Q 40 -780 14 -786 Q -22 -780 -52 -796 Z","at":"body"},{"d":"M -102 -350 Q -86 -368 -68 -352 Q -50 -368 -30 -352 Q -12 -368 6 -352 Q 24 -368 42 -352 Q 60 -368 78 -352 Q 92 -366 104 -350 L 106 -322 L -104 -322 Z","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
