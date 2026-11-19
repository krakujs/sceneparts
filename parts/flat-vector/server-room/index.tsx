import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room } from "../backdrop/index";

// Server room background: rows of server racks with blinking LEDs at both sides and the back, a raised floor of
// tiles, an overhead cable tray and cool blue light. A sealed room has no time of day or Windows, so there are no
// time or weather params. The centre floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, drift = (p.anim ?? "drift") !== "none";
  const led = p.led ?? "#6FE3FF", wall = p.wall ?? "#2A3A66";
  const rackBody = "#1C2545", rackFront = "#26335F", unit = "#2F3D6E", ink = "#141B33";
  const floorY = 1280;
  // one rack: a tall cabinet with stacked units, two LEDs each that blink on their own phase
  const Rack = ({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) => {
    const units = 8, uh = (h - 40) / units, out: React.ReactNode[] = [];
    for (let u = 0; u < units; u++) {
      const uy = y + 20 + u * uh;
      out.push(<rect key={`u${u}`} x={x + 10} y={uy + 4} width={w - 20} height={uh - 8} rx={3} fill={unit} />);
      out.push(<line key={`g${u}`} x1={x + 16} y1={uy + uh / 2} x2={x + w * 0.6} y2={uy + uh / 2} stroke={ink} strokeWidth={3} strokeLinecap="round" />);
      for (let k = 0; k < 2; k++) {
        const ph = seed * 1.7 + u * 0.9 + k * 2.3;
        const on = drift ? 0.35 + 0.65 * Math.abs(Math.sin(f / (9 + ((u + k) % 4) * 3) + ph)) : 0.9;
        out.push(<circle key={`l${u}-${k}`} cx={x + w - 24 - k * 14} cy={uy + uh / 2} r={4.5} fill={led} opacity={on} />);
      }
    }
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill={rackBody} />
        <rect x={x + 4} y={y + 6} width={w - 8} height={h - 12} rx={4} fill={rackFront} />
        {out}
      </g>
    );
  };
  return (
    <g>
      <Room time="day" wall={wall} floor="#34456F" floorY={floorY} floorKind="tiles" panels={false} />
      {/* overhead cable tray with cables dropping to the racks */}
      <rect x={0} y={214} width={1080} height={26} rx={4} fill="#4A5680" />
      {[60, 210, 880, 1020].map((x, i) => (
        <path key={`cb${i}`} d={`M ${x} 240 Q ${x + 18} 300 ${x - 8} 380`} stroke="#0E1430" strokeWidth={7} fill="none" strokeLinecap="round" />
      ))}
      {/* raised floor: a couple of vented tiles */}
      {[[420, 1400], [560, 1500], [700, 1420]].map(([x, y], i) => (
        <g key={`vt${i}`}>
          <rect x={x} y={y} width={100} height={60} rx={3} fill={shade("#34456F", 0.25)} />
          {[0, 1, 2, 3].map((k) => <line key={k} x1={x + 12} y1={y + 12 + k * 12} x2={x + 88} y2={y + 12 + k * 12} stroke="#22304F" strokeWidth={4} />)}
        </g>
      ))}
      {/* racks at the back centre, the left and the right */}
      <Rack x={410} y={700} w={120} h={580} seed={1} />
      <Rack x={560} y={700} w={120} h={580} seed={2} />
      <Rack x={20} y={380} w={150} h={900} seed={3} />
      <Rack x={180} y={520} w={130} h={760} seed={4} />
      <Rack x={880} y={380} w={150} h={900} seed={5} />
      <Rack x={770} y={520} w={130} h={760} seed={6} />
    </g>
  );
}
