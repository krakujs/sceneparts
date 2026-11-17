import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Frieze } from "../style/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Frieze y={p.y} kind={p.kind} />;
}
