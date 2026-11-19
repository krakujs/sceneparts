import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Singer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "long",
  "hairColour": "black",
  "skin": "tan",
  "blush": true,
  "top": "gown",
  "topColour": "#7a4bb5",
  "shoeStyle": "shoes",
  "shoes": "#1b1b2e",
  "hold": "mic",
  "itemColour": "#5a6170",
  "extra": [
    {
      "d": "M -44 -654 L -40.08 -643.92 L -30 -640 L -40.08 -636.08 L -44 -626 L -47.92 -636.08 L -58 -640 L -47.92 -643.92 Z M 30 -610 L 32.8 -602.8 L 40 -600 L 32.8 -597.2 L 30 -590 L 27.2 -597.2 L 20 -600 L 27.2 -602.8 Z M -18 -552 L -14.64 -543.36 L -6 -540 L -14.64 -536.64 L -18 -528 L -21.36 -536.64 L -30 -540 L -21.36 -543.36 Z",
      "fill": "#f0cf5a"
    },
    {
      "d": "M 40 -488 L 42.24 -482.24 L 48 -480 L 42.24 -477.76 L 40 -472 L 37.76 -477.76 L 32 -480 L 37.76 -482.24 Z",
      "fill": "#c8d8ec"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
