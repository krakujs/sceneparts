import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pharmacist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "#8a8a8a", "skin": "tan", "top": "coat", "topColour": "#f5f1e8", "inner": "#8fb8d8", "glasses": "glasses", "beard": "moustache", "hold": "bottle", "itemColour": "#e09a2b", "legs": "trousers", "legsColour": "#4a4a5a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
