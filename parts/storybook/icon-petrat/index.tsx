import React from "react";
import type { PartProps } from "@sceneparts/core";
import Icon from "../icon/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Icon {...p} name="petrat" />;
}
