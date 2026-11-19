import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Baby: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "baby", "pose": "sit", "hair": "short", "hairColour": "#c8925a", "top": "tee", "topColour": "#bfe6ff", "legs": "none", "shoeStyle": "bare", "blush": true, "eyes": "happy", "mouth": "smile", "skin": "light", "belly": true, "extra": [{"d": "M -96 -770 Q -112 -530 -64 -446 Q 8 -414 92 -452 Q 120 -560 96 -770 Q 0 -802 -96 -770 Z", "fill": "#bfe6ff", "at": "body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
