import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Doctor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "black", "top": "labcoat", "topColour": "#f5f1e8", "inner": "#5ab4f0", "legsColour": "#23305e", "neck": "stethoscope", "hold": "clipboard", "glasses": "glasses"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
