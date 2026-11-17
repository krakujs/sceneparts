import React from "react";

// Screen-space atmosphere drawn above the painting: drifting dust (with a few big out-of-focus motes in front = depth of field),
// slow light shafts on day shots, warm or night colour grade, and a vignette. Deterministic per frame.
const rnd = (seed: number) => {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
};

export const Atmos: React.FC<{ f: number; night?: boolean; rays?: boolean; grade?: string; dust?: number; uid: string }> = ({ f, night, rays = true, grade, dust = 1, uid }) => {
  const r = rnd(7);
  const motes = Array.from({ length: Math.round(46 * dust) }).map(() => ({ x: r() * 1080, y: r() * 1920, s: 2 + r() * 5, v: 0.4 + r() * 1.2, p: r() * 6.28 }));
  const bokeh = Array.from({ length: 6 }).map(() => ({ x: r() * 1080, y: r() * 1920, s: 40 + r() * 70, v: 0.6 + r() * 0.8, p: r() * 6.28 }));
  const g = grade ?? (night ? "night" : "warm");
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.48" r="0.75">
          <stop offset="0.55" stopColor="#1a0f08" stopOpacity="0" />
          <stop offset="1" stopColor="#1a0f08" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`ray-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff2c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`shaft-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff2c8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff2c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`bok-${uid}`}>
          <stop offset="0" stopColor={night ? "#9fb2ff" : "#ffe3a0"} stopOpacity="0.5" />
          <stop offset="1" stopColor={night ? "#9fb2ff" : "#ffe3a0"} stopOpacity="0" />
        </radialGradient>
      </defs>
      {rays && !night ? (
        <g opacity={0.45 + 0.12 * Math.sin(f * 0.03)} style={{ mixBlendMode: "screen" }}>
          {[0, 1, 2, 3].map((i) => {
            const x0 = -200 + i * 230 + Math.sin(f * 0.01 + i) * 30;
            return (
              <g key={i} transform={`translate(${x0} -50) skewX(-22)`}>
                <rect x={0} y={0} width={150 + i * 30} height={2100} fill={`url(#shaft-${uid})`} opacity={0.32} />
              </g>
            );
          })}
        </g>
      ) : null}
      {motes.map((m, i) => {
        const y = (m.y - f * m.v * 1.6 + 1920 * 4) % 1920;
        const x = m.x + Math.sin(f * 0.04 + m.p) * 18;
        return <circle key={i} cx={x} cy={y} r={m.s} fill={night ? "#cfd8ff" : "#fff1cc"} opacity={0.35 + 0.25 * Math.sin(f * 0.07 + m.p)} />;
      })}
      <g>
        {bokeh.map((m, i) => {
          const y = (m.y - f * m.v * 2.4 + 1920 * 4) % 1920;
          return <circle key={i} cx={m.x + Math.sin(f * 0.03 + m.p) * 30} cy={y} r={m.s * 1.4} fill={`url(#bok-${uid})`} opacity={0.6} />;
        })}
      </g>
      {g === "warm" ? <rect width={1080} height={1920} fill="#ff9a3c" opacity={0.07} style={{ mixBlendMode: "soft-light" }} /> : null}
      {g === "night" ? <rect width={1080} height={1920} fill="#24306a" opacity={0.18} style={{ mixBlendMode: "multiply" }} /> : null}
      {g === "red" ? <rect width={1080} height={1920} fill="#c4101c" opacity={0.16} style={{ mixBlendMode: "multiply" }} /> : null}
      {g === "gold" ? <rect width={1080} height={1920} fill="#ffcf5a" opacity={0.12} style={{ mixBlendMode: "soft-light" }} /> : null}
      <rect width={1080} height={1920} fill={`url(#vig-${uid})`} />
    </g>
  );
};
