import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, bodyFont } from "../theme";
import type { Word } from "../types";

type Page = { words: (Word & { i: number })[]; start: number; end: number };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, "");

// Group words into short "pages" of max 3 words, breaking on punctuation.
export const paginate = (words: Word[], maxWords = 3): Page[] => {
  const pages: Page[] = [];
  let cur: (Word & { i: number })[] = [];
  words.forEach((w, i) => {
    cur.push({ ...w, i });
    const punct = /[.,!?;:—]$/.test(w.text);
    if (cur.length >= maxWords || punct) {
      pages.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
      cur = [];
    }
  });
  if (cur.length) pages.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return pages;
};

export const Captions: React.FC<{
  words: Word[];
  delay: number; // seconds before voice starts in the scene
  highlight?: string[];
  position?: "low" | "high" | "mid";
}> = ({ words, delay, highlight = [], position = "low" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delay;
  const pages = paginate(words);
  const hl = new Set(highlight.flatMap((h) => h.split(/\s+/)).map(norm));
  const idx = pages.findIndex((p, k) => t >= p.start - 0.05 && (k === pages.length - 1 ? t <= p.end + 0.6 : t < pages[k + 1].start - 0.05));
  if (idx < 0) return null;
  const page = pages[idx];
  const local = (t - page.start) * fps;
  const top = position === "high" ? 470 : position === "mid" ? 860 : 1270;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 160,
          top,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "4px 38px",
          fontFamily: bodyFont,
          fontWeight: 900,
          fontSize: 92,
          lineHeight: 1.08,
          textTransform: "uppercase",
          letterSpacing: 1,
          scale: interpolate(local, [0, 6], [0.82, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 1.4, 0.4, 1),
          }),
        }}
      >
        {page.words.map((w) => {
          const active = t >= w.start - 0.03 && t < w.end + 0.08;
          const isHl = hl.has(norm(w.text));
          return (
            <span
              key={w.i}
              style={{
                color: isHl ? C.mustard : active ? "#FFFFFF" : C.cream,
                WebkitTextStroke: `12px ${C.ink}`,
                paintOrder: "stroke fill",
                textShadow: "0 10px 0 rgba(0,0,0,0.35)",
                translate: active ? "0px -6px" : "0px 0px",
                display: "inline-block",
              }}
            >
              {w.text.replace(/[,;:]$/, "")}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
