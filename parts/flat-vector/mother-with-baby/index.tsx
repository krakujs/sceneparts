import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade, skinColour } from "../style/index";

// Mother with baby: adult woman in a dress, holding a small swaddled baby in her arms (drawn via held, centred between her hands).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sk = skinColour(p.skin);
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      bottom="skirt"
      held={(h) => {
        const mx = (h.x + h.bx) / 2 + 6, my = (h.y + h.by) / 2 - 8;
        return (
          <g>
            <ellipse cx={mx + 12} cy={my + 6} rx={92} ry={56} fill={C.yellow} />
            <path d={`M ${mx - 30} ${my - 40} Q ${mx - 6} ${my + 4} ${mx - 30} ${my + 52}`} stroke={C.yellowDark} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d={`M ${mx + 50} ${my - 46} Q ${mx + 70} ${my} ${mx + 50} ${my + 46}`} stroke={shade(C.yellow, 0.2)} strokeWidth={6} fill="none" strokeLinecap="round" />
            <circle cx={mx - 58} cy={my - 18} r={42} fill={sk} />
            <path d={`M ${mx - 66} ${my - 52} Q ${mx - 58} ${my - 70} ${mx - 46} ${my - 56}`} stroke={C.brownDark} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d={`M ${mx - 74} ${my - 14} q 6 6 12 0 M ${mx - 52} ${my - 14} q 6 6 12 0`} stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d={`M ${mx - 66} ${my + 8} Q ${mx - 56} ${my + 16} ${mx - 46} ${my + 8}`} stroke={C.inkSoft} strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        );
      }}
    />
  );
}
