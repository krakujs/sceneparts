import React from "react";

// Procedural paper / papyrus background: base colour + fractal-noise grain + faint horizontal fibres +
// soft stains. No image file, so it is MIT-clean and works in any renderer.
export const Paper: React.FC<{ base?: string; fibre?: string; stain?: string; uid?: string }> = ({ base = "#e6cb94", fibre = "#b8925a", stain = "#a0703a", uid = "p" }) => (
  <g>
    <defs>
      <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.12  0 0 0 0.22 0" />
      </filter>
      <filter id={`stain-${uid}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves={3} seed={9} result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.63  0 0 0 0 0.44  0 0 0 0 0.23  0 0 0 0.9 -0.32" />
      </filter>
    </defs>
    <rect width={1080} height={1920} fill={base} />
    <rect width={1080} height={1920} fill={stain} filter={`url(#stain-${uid})`} opacity={0.6} />
    {Array.from({ length: 48 }).map((_, i) => (
      <rect key={i} x={0} y={i * 40 + ((i * 17) % 13)} width={1080} height={2 + (i % 3)} fill={fibre} opacity={0.08 + (i % 4) * 0.025} />
    ))}
    <rect width={1080} height={1920} filter={`url(#grain-${uid})`} />
  </g>
);
