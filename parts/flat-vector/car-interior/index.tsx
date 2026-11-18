import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { skyColours, lit, asTime, asWeather, mix, WeatherFx } from "../backdrop/index";

// Car interior (flat-vector background): the driver's view. A big windscreen shows the sky and weather, a road
// with moving lane lines running to the horizon, and trees, framed by the roof and the A-pillars. The dashboard
// fills the lower third with the steering wheel lower-left, gauges, a centre console and the rear-view mirror.
// Nothing of the road shows below the dashboard. anim: drift = lane lines and weather move.
const WS = "M 190 250 Q 540 170 890 250 L 1050 1450 L 30 1450 Z"; // windscreen outline
const HZ = 820; // horizon y
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const dash = L(p.dash ?? "#353C52"), roof = L("#2B3042"), pillar = L("#262B3C");
  const [skyTop, skyMid, skyHz] = skyColours(time, weather);
  const grass = lit(time === "night" ? "#2F5A3E" : "#6DB36A", time);
  const road = lit(time === "night" ? "#2A2F3D" : "#6A7188", time);
  const sp = drift ? 0.02 : 0;
  const dashes: React.ReactNode[] = [];
  for (let k = 0; k < 6; k++) {
    const s0 = (((k / 6 + f * sp) % 1) + 1) % 1, s1 = s0 + 0.07;
    const y0 = HZ + (1450 - HZ) * s0 * s0, y1 = HZ + (1450 - HZ) * Math.min(1, s1) * Math.min(1, s1);
    const w0 = 4 + 26 * s0, w1 = 4 + 26 * Math.min(1, s1);
    dashes.push(<path key={k} d={`M ${540 - w0} ${y0} L ${540 + w0} ${y0} L ${540 + w1} ${y1} L ${540 - w1} ${y1} Z`} fill={lit("#F4F1EA", time)} />);
  }
  const tree = (x: number, s: number, i: number) => (
    <g key={i}>
      <rect x={x - 6 * s} y={HZ + 10 - 60 * s} width={12 * s} height={60 * s} fill={C.brownDark} />
      <circle cx={x} cy={HZ - 30 * s} r={62 * s} fill={shade(grass, 0.2)} />
    </g>
  );
  return (
    <g>
      {/* windscreen: sky, road, verges and trees, clipped to the screen shape */}
      <clipPath id="ci-screen"><path d={WS} /></clipPath>
      <g clipPath="url(#ci-screen)">
        <rect x={0} y={0} width={1080} height={HZ} fill={skyTop} />
        <rect x={0} y={HZ - 260} width={1080} height={260} fill={skyMid} />
        <rect x={0} y={HZ - 40} width={1080} height={40} fill={skyHz} />
        <rect x={0} y={HZ} width={1080} height={700} fill={grass} />
        {[[90, 1.0], [220, 0.7], [330, 0.5], [860, 0.6], [960, 1.0]].map(([x, s], i) => tree(x, s, i))}
        <path d={`M 500 ${HZ} L 580 ${HZ} L 920 1450 L 160 1450 Z`} fill={road} />
        {dashes}
        <WeatherFx kind={weather} f={drift ? f : 0} seed={12} x={0} y={0} w={1080} h={1450} intensity={1.3} />
      </g>
      {/* roof framing and A-pillars */}
      <path d="M 0 0 L 1080 0 L 1080 240 L 890 250 Q 540 170 190 250 L 0 240 Z" fill={roof} />
      <path d="M -10 230 L 190 250 L 30 1460 L -10 1460 Z" fill={pillar} />
      <path d="M 1090 230 L 890 250 L 1050 1460 L 1090 1460 Z" fill={pillar} />
      {/* rear-view mirror hanging from the roof */}
      <rect x={530} y={232} width={20} height={26} fill={pillar} />
      <rect x={420} y={150} width={240} height={90} rx={20} fill={shade(roof, 0.2)} />
      <rect x={436} y={164} width={208} height={62} rx={12} fill={mix(skyMid, "#FFFFFF", 0.25)} />
      {/* dashboard across the lower third */}
      <rect x={0} y={1440} width={1080} height={480} fill={dash} />
      <rect x={0} y={1440} width={1080} height={26} fill={lit("#4A5270", time)} />
      <rect x={680} y={1494} width={320} height={30} rx={10} fill={shade(dash, 0.3)} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={700 + i * 60} y={1500} width={8} height={18} rx={4} fill={lit("#5B6480", time)} />)}
      {/* centre console with a touch screen and buttons */}
      <rect x={460} y={1440} width={190} height={480} fill={shade(dash, 0.1)} />
      <rect x={486} y={1478} width={138} height={100} rx={12} fill={C.ink} />
      <rect x={498} y={1490} width={114} height={76} rx={6} fill={time === "night" ? "#2E4A6B" : "#1F4E63"} />
      <rect x={510} y={1534} width={18} height={22} fill={C.teal} />
      <rect x={534} y={1518} width={18} height={38} fill={C.yellow} />
      <rect x={558} y={1506} width={18} height={50} fill={C.teal} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={496 + i * 36} cy={1628} r={12} fill={lit(C.greyLight, time)} />)}
      <rect x={490} y={1670} width={130} height={60} rx={10} fill={shade(dash, 0.25)} />
      <circle cx={520} cy={1700} r={11} fill={C.orange} />
      <circle cx={590} cy={1700} r={11} fill={C.greyLight} />
      {/* steering column and wheel, lower-left */}
      <rect x={232} y={1600} width={36} height={260} fill={C.ink} />
      <circle cx={250} cy={1690} r={178} fill="none" stroke={C.ink} strokeWidth={46} />
      <circle cx={250} cy={1690} r={156} fill="none" stroke={shade(C.greyDark, 0.2)} strokeWidth={4} opacity={0.6} />
      <path d="M 72 1690 L 428 1690 M 250 1690 L 250 1868" stroke={C.ink} strokeWidth={28} strokeLinecap="round" />
      <circle cx={250} cy={1690} r={40} fill={shade(C.greyDark, 0.25)} />
      {/* gauges seen through the top of the wheel */}
      {[212, 288].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={1632} r={34} fill={lit(C.white, time)} />
          <circle cx={x} cy={1632} r={34} fill="none" stroke={C.greyDark} strokeWidth={4} />
          <line x1={x} y1={1632} x2={x + (i ? 16 : -14)} y2={1610} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}
