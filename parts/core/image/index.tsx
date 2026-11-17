import React from "react";
import type { PartProps } from "@sceneparts/core";

// Raster image placed in the scene. Only data: URIs or files the project ships itself (never hot-linked URLs in parts).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  if (!p.src) return null;
  return <image href={p.src} x={p.x} y={p.y} width={p.w} height={p.h} opacity={p.o} preserveAspectRatio={p.fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"} transform={`rotate(${p.r} ${p.x + p.w / 2} ${p.y + p.h / 2})`} />;
}
