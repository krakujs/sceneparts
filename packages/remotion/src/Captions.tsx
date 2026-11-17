import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@sceneparts/core";

/** Simple burned-in captions: one line at a time, bold, outlined, with a quick pop. */
export const Captions: React.FC<{ captions: Caption[]; pos?: "low" | "mid" | "high"; font?: string }> = ({ captions, pos = "mid", font = "Georgia, serif" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const c = captions.find((x) => t >= x.from && t < x.to);
  if (!c) return null;
  const k = Math.min(1, (t - c.from) * fps / 4);
  const top = pos === "low" ? 1380 : pos === "high" ? 300 : 1080;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", fontFamily: font, fontWeight: 800, fontSize: 64, lineHeight: 1.15, color: "#fff", WebkitTextStroke: "10px #1a1410", paintOrder: "stroke fill", scale: `${0.85 + 0.15 * k}`, textTransform: "uppercase" }}>
      {c.text}
    </div>
  );
};
