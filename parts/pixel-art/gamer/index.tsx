import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Gamer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "headset", "hatColour": "k", "top": "hoodie", "topColour": "d", "hold": "controller", "itemColour": "k", "hair": "spiky", "hairColour": "blue", "skin": "light"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
