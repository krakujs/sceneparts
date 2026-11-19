import React from "react";
import type { PartProps } from "@sceneparts/core";
import { inkEach } from "../style/index";
import Flat from "../../flat-vector/bush/index";

// Bush (ink sketch): the flat-vector/bush geometry redrawn shape by shape as ink line + paper + loose wash.
// Same params, anchor and scale as the flat-vector part (1 m ≈ 560 px beside an ink-sketch person at s = 1).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return inkEach(<Flat {...p} />, 6);
}
