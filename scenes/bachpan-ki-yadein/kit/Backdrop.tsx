import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../theme";

export type Sky = "night" | "dawn" | "day" | "paper" | "modern" | "dark";

const GRADIENTS: Record<Sky, string> = {
  night: `linear-gradient(180deg, #0B1122 0%, ${C.navy} 55%, ${C.dusk} 100%)`,
  dawn: `linear-gradient(180deg, ${C.dusk} 0%, #8C6A8E 45%, ${C.dawn} 80%, ${C.glow} 100%)`,
  day: `linear-gradient(180deg, #8EC3D6 0%, #CFE3DA 70%, ${C.cream} 100%)`,
  paper: `radial-gradient(circle at 50% 40%, ${C.cream} 0%, ${C.paper} 60%, ${C.paperDark} 100%)`,
  modern: `linear-gradient(160deg, ${C.modernA} 0%, ${C.modernB} 100%)`,
  dark: `radial-gradient(circle at 50% 40%, #2A2238 0%, #0C0A12 100%)`,
};

const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      {new Array(70).fill(0).map((_, i) => {
        const x = random(`sx${i}`) * 1080;
        const y = random(`sy${i}`) * 1000;
        const r = 1 + random(`sr${i}`) * 2.6;
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(frame / (14 + random(`st${i}`) * 30) + i));
        return <circle key={i} cx={x} cy={y} r={r} fill={C.cream} opacity={tw} />;
      })}
    </svg>
  );
};

const Moon: React.FC<{ x?: number; y?: number }> = ({ x = 860, y = 700 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    <defs>
      <radialGradient id="moonGlow">
        <stop offset="0%" stopColor={C.glow} stopOpacity={0.55} />
        <stop offset="100%" stopColor={C.glow} stopOpacity={0} />
      </radialGradient>
    </defs>
    <circle cx={x} cy={y} r={260} fill="url(#moonGlow)" />
    <circle cx={x} cy={y} r={95} fill="#FFF3D1" />
    <circle cx={x - 30} cy={y - 20} r={14} fill="#EADDB8" />
    <circle cx={x + 28} cy={y + 30} r={20} fill="#EADDB8" />
  </svg>
);

const Fog: React.FC<{ opacity?: number }> = ({ opacity = 0.3 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -400,
            top: 1150 + i * 170,
            width: 1900,
            height: 240,
            borderRadius: "50%",
            background: "rgba(220,225,240,1)",
            filter: "blur(60px)",
            opacity: opacity * (1 - i * 0.25),
            translate: `${Math.sin(frame / (90 + i * 30) + i) * 160}px 0px`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Paper grain + vignette give every scene the storybook texture.
export const Grain: React.FC<{ strength?: number }> = ({ strength = 0.16 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 3) % 5;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: strength, mixBlendMode: "multiply" }}>
        <filter id={`grain${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }}
      />
    </AbsoluteFill>
  );
};

export const Backdrop: React.FC<{
  sky?: Sky;
  stars?: boolean;
  moon?: boolean;
  fog?: boolean;
  children?: React.ReactNode;
}> = ({ sky = "night", stars, moon, fog, children }) => {
  const frame = useCurrentFrame();
  const isNight = sky === "night";
  return (
    <AbsoluteFill style={{ background: GRADIENTS[sky], overflow: "hidden" }}>
      {(stars ?? isNight) ? <Stars /> : null}
      {(moon ?? isNight) ? (
        <AbsoluteFill style={{ translate: `0px ${interpolate(frame, [0, 300], [10, -10])}px` }}>
          <Moon />
        </AbsoluteFill>
      ) : null}
      {children}
      {(fog ?? isNight) ? <Fog /> : null}
      <Grain />
    </AbsoluteFill>
  );
};
