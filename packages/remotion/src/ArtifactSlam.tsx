import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/** A real museum photo slams onto the screen as "proof", with a museum-style label and a credit line. */
export const ArtifactSlam: React.FC<{ src: string; label: string; credit?: string; at: number; until?: number; accent?: string; tilt?: number }> = ({ src, label, credit, at, until, accent = "#c8413a", tilt = -4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - Math.round(at * fps);
  if (f < -1) return null;
  if (until !== undefined && frame > Math.round(until * fps)) return null;
  const drop = spring({ frame: f, fps, config: { damping: 11, stiffness: 160, mass: 0.9 } });
  const impact = f >= 0 && f < 10 ? interpolate(f, [0, 10], [14, 0]) * Math.sin(f * 2.2) : 0;
  const labelIn = spring({ frame: f - 8, fps, config: { damping: 20 } });
  const url = /^(https?:|data:)/.test(src) ? src : staticFile(src);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", translate: `${impact}px ${impact * 0.6}px` }}>
      <div style={{ position: "relative", width: 780, padding: 22, background: "#f6f1e4", boxShadow: "0 30px 80px rgba(0,0,0,0.7)", scale: `${interpolate(drop, [0, 1], [2.2, 1])}`, rotate: `${interpolate(drop, [0, 1], [tilt * 4, tilt])}deg`, opacity: Math.min(1, drop * 3) }}>
        <Img src={url} style={{ width: "100%", height: 760, objectFit: "contain", background: "#111" }} />
        <div style={{ position: "absolute", top: -26, left: 40, width: 150, height: 46, background: "rgba(240,230,200,0.85)", rotate: "-6deg" }} />
        <div style={{ marginTop: 16, padding: "10px 16px", borderLeft: `10px solid ${accent}`, background: "#111", color: "#fff", fontFamily: "'Courier New', monospace", fontSize: 30, letterSpacing: 1, opacity: labelIn, translate: `${(1 - labelIn) * 40}px 0px` }}>
          REAL ARTIFACT · {label}
        </div>
      </div>
      {credit ? <div style={{ position: "absolute", bottom: 140, left: 60, right: 60, color: "rgba(255,255,255,0.8)", fontFamily: "sans-serif", fontSize: 20, textAlign: "center", opacity: labelIn }}>{credit}</div> : null}
    </div>
  );
};
