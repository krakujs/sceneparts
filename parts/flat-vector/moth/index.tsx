import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Moth (preset of flat-vector/bug): dusty brown-beige moth with broad muted wings and feathery antennae; flutters in night or cosy scenes.
const LOOK = {"abdomenShape":"oval","abdomen":96,"abdomenH":34,"thorax":44,"head":26,"legs":6,"legLen":30,"legW":7,"legColor":"#6B5846","color":"#A8917A","color2":"#6B5846","thoraxColor":"#8C7560","headColor":"#A8917A","pattern":"none","wings":"moth","wingSpan":150,"wingColor":"#C9B79C","wingColor2":"#6B5846","antennae":"feathery","antennaLen":70,"antennaColor":"#6B5846","eyes":"dots","alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
