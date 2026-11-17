import React from "react";
import { camAt, camTransform, ease, lerp, pop, type ItemSpec, type PartProps } from "@sceneparts/core";
import { Txt } from "../text/index";
import { Tag } from "../tag/index";

// Signature opener for a recurring character: the hero falls into the scene (dust puff + squash), a name tag
// pops up, the hero does something they shouldn't to the other character, who reacts with "!". Owns its camera.
const ACT: Record<string, { front: [number, number]; back: [number, number]; text: string; mouth?: string; laugh?: boolean }> = {
  mock: { front: [90, 92], back: [-20, -20], text: "HA HA HA", laugh: true },
  poke: { front: [92, 94], back: [-30, -40], text: "POKE", mouth: "grin" },
  steal: { front: [150, 170], back: [-60, -80], text: "MINE!", mouth: "grin" },
  wake: { front: [160, 150], back: [-160, -150], text: "HEY! WAKE UP!", mouth: "open" },
  kick: { front: [40, 50], back: [-40, -50], text: "BONK", mouth: "grin" },
  lie: { front: [150, 175], back: [-20, -20], text: "I'M INNOCENT", mouth: "smile" },
  touch: { front: [92, 94], back: [-20, -20], text: "OOPS", mouth: "open" },
  insult: { front: [92, 94], back: [-20, -20], text: "UGLY!", laugh: true },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d, style, render } = p;
  const land = 9;
  const groundY = style.decor?.groundY ?? 1520;
  const fy = f < land ? lerp(-700, groundY, Math.pow(f / land, 2)) : groundY;
  const squash = f >= land && f < land + 5 ? 1 - Math.sin(((f - land) / 5) * Math.PI) * 0.18 : 1;
  const acting = f > 15;
  const a = ACT[p.act] ?? ACT.mock;
  const dx = p.heroX;
  const cam =
    f < land
      ? { x: 540, y: lerp(760, 960, ease(f / land)), z: 1.12 - 0.12 * ease(f / land), r: -2 + 2 * (f / land) }
      : camAt([[540, 960, 1.0, 0], [420 + dx * 0.4, 930, 1.12, 1.5]], f - land, Math.max(1, d - land), "opener", { auto: false, shake: f < land + 5 ? 10 * (1 - (f - land) / 5) : 0 });
  const hero: ItemSpec = {
    s: 0.82, stride: 50, ...(p.hero ?? { t: "traveller" }),
    x: dx, y: fy, front: acting ? a.front : f < land ? [160, 175] : [40, 60], back: f < land ? [-160, -175] : a.back,
    mouth: acting ? (a.laugh ? (Math.floor(f / 4) % 2 ? "grin" : "open") : a.mouth) : "open",
    tilt: acting && a.laugh ? Math.sin(f * 0.9) * 5 : 0, ...(p.hold ? { hold: p.hold } : {}),
  };
  return (
    <g>
      <g transform={camTransform(cam)}>
        {p.night ? <rect x={-200} y={-200} width={1480} height={2320} fill="#1b2340" opacity={0.55} /> : null}
        {p.sky !== false && style.decor?.sky ? style.decor.sky(style.decor.skyY ?? 70) : null}
        {((p.target ?? []) as ItemSpec[]).map((it, i) => render(it, `t${i}`))}
        {p.other ? render({ x: 900, s: 1.0, flip: true, front: [55, 60], stride: 50, ...p.other }, "other") : null}
        {f >= land && f < land + 10 && [0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={dx + (i - 1.5) * (40 + (f - land) * 14)} cy={groundY - 15} rx={30 + (f - land) * 4} ry={14} fill="#c9a067" stroke={style.ink} strokeWidth={4} opacity={1 - (f - land) / 10} />
        ))}
        <g transform={`translate(${dx} ${groundY}) scale(1 ${squash}) translate(${-dx} ${-groundY})`}>{render(hero, "hero")}</g>
        {p.name && f >= land + 1 ? <Tag x={dx} y={430 + (1 - pop(f, land + 1)) * 40} text={p.name} s={pop(f, land + 1)} ink={style.ink} paper={style.paper?.base ?? "#efe6cf"} accent={style.accent} font={style.font} /> : null}
        {acting && p.shout !== "" ? <Txt x={dx + 70} y={1240} text={p.shout ?? a.text} size={72} c={style.accent} ink={style.ink} font={style.font} rot={-8} /> : null}
        {f > 24 ? <Txt x={900} y={330} text="!" size={140} c={style.accent} ink={style.ink} font={style.font} /> : null}
        {style.decor?.ground ? style.decor.ground(groundY) : null}
      </g>
      {p.headline && style.title ? style.title({ x: 540, y: 1735, lines: p.headline, accent: p.accent ?? p.headline[0], size: 70 }) : null}
    </g>
  );
}
