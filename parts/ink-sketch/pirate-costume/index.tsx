import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pirate costume: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat":"pirate","hatColour":"black","glasses":"eyepatch","top":"tee","topColour":"#f7f2e7","belt":true,"legs":"trousers","legsColour":"black","shoeStyle":"boots","shoes":"#3a2a22","beard":"moustache","hair":"none","hold":"sword","itemColour":"grey","skin":"brown","extra":[{"d":"M -72 -744 L 76 -744 L 76 -732 L -72 -732 Z","at":"body"},{"d":"M -72 -712 L 76 -712 L 76 -700 L -72 -700 Z","at":"body"},{"d":"M -72 -680 L 76 -680 L 76 -668 L -72 -668 Z","at":"body"},{"d":"M -72 -648 L 76 -648 L 76 -636 L -72 -636 Z","at":"body"},{"d":"M -72 -616 L 76 -616 L 76 -604 L -72 -604 Z","at":"body"},{"d":"M -72 -584 L 76 -584 L 76 -572 L -72 -572 Z","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
