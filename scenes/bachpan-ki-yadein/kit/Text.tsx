import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, bodyFont, titleFont, typeFont } from "../theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// Persistent series badge, top-left.
export const SeriesBadge: React.FC<{ number: number }> = ({ number }) => (
  <div
    style={{
      position: "absolute",
      left: 70,
      top: 120,
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontFamily: bodyFont,
      fontWeight: 800,
      fontSize: 30,
      letterSpacing: 3,
      color: C.cream,
      background: "rgba(43,22,12,0.72)",
      border: `3px solid ${C.mustard}`,
      borderRadius: 999,
      padding: "10px 24px",
    }}
  >
    <span style={{ color: C.mustard }}>BACHPAN KI YADEIN</span>
    <span style={{ opacity: 0.85 }}>#{String(number).padStart(2, "0")}</span>
  </div>
);

// Thin progress bar at the very top (helps retention).
export const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, top: 0, height: 12, width: `${(frame / durationInFrames) * 100}%`, background: C.mustard }} />
  );
};

// Typewriter "LONDON · 1931" label.
export const Typewriter: React.FC<{ text: string; top?: number; size?: number; delay?: number; color?: string }> = ({
  text,
  top = 300,
  size = 56,
  delay = 4,
  color = C.cream,
}) => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame - delay, [0, text.length * 2], [0, text.length], clamp));
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 80,
        right: 160,
        textAlign: "center",
        fontFamily: typeFont,
        fontSize: size,
        color,
        letterSpacing: 4,
        textShadow: "0 4px 0 rgba(0,0,0,0.5)",
      }}
    >
      {text.slice(0, n)}
      <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>▌</span>
    </div>
  );
};

// Big slab headline whose words pop in one after another.
export const Headline: React.FC<{ text: string; top?: number; size?: number; color?: string; accent?: string[]; stagger?: number; strokeColor?: string }> = ({
  text,
  top = 520,
  size = 112,
  color = C.cream,
  accent = [],
  stagger = 4,
  strokeColor,
}) => {
  const frame = useCurrentFrame();
  const sc = strokeColor ?? (color === C.ink ? C.cream : C.ink);
  const acc = new Set(accent.map((a) => a.toLowerCase()));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top,
          left: 80,
          right: 140,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0px 26px",
          fontFamily: titleFont,
          fontSize: size,
          lineHeight: 1.12,
          textAlign: "center",
        }}
      >
        {text.split(" ").map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: acc.has(w.toLowerCase().replace(/[^a-z0-9]/g, "")) ? C.mustard : color,
              WebkitTextStroke: `12px ${sc}`,
              paintOrder: "stroke fill",
              textShadow: sc === C.ink ? "0 12px 0 rgba(0,0,0,0.35)" : "none",
              opacity: interpolate(frame - i * stagger, [0, 4], [0, 1], clamp),
              scale: interpolate(frame - i * stagger, [0, 8], [1.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.3, 0.4, 1) }),
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Name tag ("MARY SMITH · LIMEHOUSE")
export const Tag: React.FC<{ text: string; x?: number; y?: number; delay?: number }> = ({ text, x = 540, y = 760, delay = 10 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% 0",
        fontFamily: typeFont,
        fontSize: 44,
        color: C.ink,
        background: C.cream,
        border: `5px solid ${C.ink}`,
        borderRadius: 12,
        padding: "10px 26px",
        whiteSpace: "nowrap",
        rotate: "-3deg",
        boxShadow: "0 10px 0 rgba(0,0,0,0.35)",
        opacity: interpolate(frame - delay, [0, 6], [0, 1], clamp),
        scale: interpolate(frame - delay, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }),
      }}
    >
      {text}
    </div>
  );
};
