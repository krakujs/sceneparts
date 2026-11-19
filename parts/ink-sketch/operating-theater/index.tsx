import React from "react";
import type { PartProps } from "@sceneparts/core";
import { inkScene } from "../style/index";
import Flat from "../../flat-vector/operating-theater/index";

// Operating theater (ink sketch): the flat-vector/operating-theater geometry redrawn as ink: one contour per object, frame-wide surfaces as a soft wash.
// Same params, anchor and scale as the flat-vector part.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return inkScene(<Flat {...p} />, 5);
}
