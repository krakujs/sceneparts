import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Flames } from "../world-sky/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Flames f={p.f} y={p.y} level={p.level} x0={p.x0} x1={p.x1} />;
}
