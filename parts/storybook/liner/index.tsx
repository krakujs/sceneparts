import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Liner } from "../world-set/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Liner f={p.f} tilt={p.tilt} />;
}
