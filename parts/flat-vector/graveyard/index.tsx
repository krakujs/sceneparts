import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Sky, Hills, lit, mix, rnd, asTime, asWeather, WeatherFx } from "../backdrop/index";

// Graveyard (cartoon-cute): rounded blank headstones, a crooked picket fence, a bare tree, a moon and a few
// bats. Night by default. The grass in the middle stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time ?? "night"), weather = asWeather(p.weather), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, seed = 173;
  const stone = lit(p.stone ?? "#D9DEE8", time), stoneDark = shade(stone, 0.18);
  const Stone = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={stone} />
      <circle cx={x} cy={y - h} r={w / 2} fill={stone} />
      <rect x={x - w / 2} y={y - 12} width={w} height={12} fill={stoneDark} />
      <rect x={x - w / 2 - 8} y={y - 2} width={w + 16} height={10} rx={5} fill={stoneDark} />
    </g>
  );
  const bats = p.bats !== false;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={1000} f={ff} seed={seed} />
      <Hills y={1100} color={lit("#3E4A6E", time)} amp={50} seed={seed} waves={1.5} />
      <Hills y={1170} color={lit("#2E3A5C", time)} amp={30} seed={seed + 5} waves={2.4} />
      {/* bare tree at the back right */}
      <g>
        <path d="M 880 1220 Q 890 1000 900 880 Q 912 820 950 760 M 900 880 Q 950 850 1000 800 M 890 980 Q 860 940 820 930" fill="none" stroke={lit("#3A3350", time)} strokeWidth={22} strokeLinecap="round" />
        <path d="M 950 760 Q 980 700 1010 690 M 900 880 Q 930 890 985 860" fill="none" stroke={lit("#3A3350", time)} strokeWidth={12} strokeLinecap="round" />
      </g>
      {/* crooked picket fence along the back */}
      <g>
        {new Array(14).fill(0).map((_, i) => {
          const x = i * 80 - 20, lean = (i % 3 - 1) * 6;
          return <rect key={i} x={x} y={1140 + lean * 0} width={16} height={100} rx={4} fill={lit("#4E4A6A", time)} transform={`rotate(${lean} ${x + 8} 1240)`} />;
        })}
        <rect x={-20} y={1170} width={1120} height={12} fill={lit("#4E4A6A", time)} />
        <rect x={-20} y={1210} width={1120} height={12} fill={lit("#4E4A6A", time)} />
      </g>
      {/* grass */}
      <rect x={0} y={1230} width={1080} height={690} fill={lit("#4F8F5E", time)} />
      {new Array(14).fill(0).map((_, i) => <ellipse key={i} cx={f1(rnd(seed, i) * 1080)} cy={f1(1300 + rnd(seed, i + 30) * 600)} rx={f1(24 + rnd(seed, i + 60) * 20)} ry={7} fill={lit("#3F7A4E", time)} />)}
      {/* headstones: back row and the sides */}
      <Stone x={150} y={1290} w={110} h={130} />
      <Stone x={330} y={1260} w={96} h={112} />
      <Stone x={720} y={1266} w={100} h={118} />
      <Stone x={70} y={1480} w={120} h={150} />
      <Stone x={930} y={1500} w={124} h={156} />
      <Stone x={960} y={1690} w={100} h={122} />
      {/* a low cross-free stone with a rounded top, far left */}
      <Stone x={20} y={1700} w={90} h={108} />
      {/* moon */}
      <circle cx={820} cy={300} r={110} fill="#FFF6D8" opacity={0.12} />
      <circle cx={820} cy={300} r={72} fill="#F4F1EA" />
      <circle cx={796} cy={282} r={13} fill="#DDD8CB" />
      <circle cx={842} cy={318} r={9} fill="#DDD8CB" />
      {/* bats */}
      {bats && new Array(4).fill(0).map((_, i) => {
        const x = ((rnd(seed, i) * 1300 + ff * (1.2 + i * 0.3)) % 1400) - 160, y = 340 + i * 90 + Math.sin(ff / 14 + i) * 16;
        const flap = Math.sin(ff / 4 + i) * 8;
        return (
          <g key={i} fill={lit("#2A2F45", time)}>
            <path d={`M ${f1(x)} ${f1(y)} Q ${f1(x - 20)} ${f1(y - 14 - flap)} ${f1(x - 40)} ${f1(y - 4)} Q ${f1(x - 22)} ${f1(y + 4)} ${f1(x)} ${f1(y + 6)} Z`} />
            <path d={`M ${f1(x)} ${f1(y)} Q ${f1(x + 20)} ${f1(y - 14 - flap)} ${f1(x + 40)} ${f1(y - 4)} Q ${f1(x + 22)} ${f1(y + 4)} ${f1(x)} ${f1(y + 6)} Z`} />
            <circle cx={f1(x)} cy={f1(y - 2)} r={7} />
          </g>
        );
      })}
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
