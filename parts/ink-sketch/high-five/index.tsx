import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ink } from "../style/index";
import Flat from "../../flat-vector/high-five/index";

// High Five (ink sketch): the flat-vector/high-five geometry redrawn as one ink contour + paper + loose wash.
// Same params, anchor and scale as the flat-vector part.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return ink(<Flat {...p} />, 6);
}
