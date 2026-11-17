import fs from "node:fs";
import path from "node:path";

const TYPES = ["style", "character", "prop", "scenery", "background", "effect", "text", "template"];

/** Create parts/<style>/<name>/ with a starter part.json and index.tsx. */
export function newPart(root, type, id, author = "your-github-handle") {
  if (!TYPES.includes(type)) throw new Error(`type must be one of ${TYPES.join(", ")}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\/[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) throw new Error(`id must be <style>/<name> in kebab-case, e.g. flat-vector/firefighter`);
  const [style, name] = id.split("/");
  if (type === "style" && name !== "style") throw new Error(`a style lives at <style>/style, e.g. ${style}/style`);
  if (type !== "style" && !fs.existsSync(path.join(root, "parts", style, "style", "part.json"))) throw new Error(`style "${style}" doesn't exist yet. Reuse an existing style (sceneparts search --type style), or create it first: sceneparts new style ${style}/style`);
  const dir = path.join(root, "parts", style, name);
  if (fs.existsSync(dir)) throw new Error(`parts/${id} already exists`);
  fs.mkdirSync(dir, { recursive: true });
  const title = name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  const anchor = ["character", "prop", "scenery"].includes(type);
  const manifest = {
    id, type, style, name: title,
    summary: `TODO one line: what it is and when to use it (max 120 characters).`,
    tags: ["todo"],
    params: type === "style" ? [] : [
      { name: "x", type: "number", default: 540, note: "0..1080" },
      { name: "y", type: "number", default: anchor ? 1520 : 960, note: anchor ? "base line; ground is 1520" : "0..1920" },
      { name: "s", type: "number", default: 1, note: "scale" },
      ...(anchor ? [{ name: "flip", type: "boolean", note: "face left" }] : []),
    ],
    example: type === "style" ? {} : { x: 540 },
    author, license: "MIT", origin: "original", version: "1.0.0",
  };
  fs.writeFileSync(path.join(dir, "part.json"), JSON.stringify(manifest, null, 2) + "\n");
  const src = type === "style"
    ? `import type { Style } from "@sceneparts/core";\n\n// ${title} style: palette, paper, optional sky/ground bands and title card for every ${style} part.\nexport const INK = "#1a1410";\nexport const C = { accent: "#c8413a" };\n\nconst style: Style = { id: "${style}", ink: INK, accent: C.accent, font: "Georgia, serif", paper: { base: "#f3ecdc" } };\nexport default style;\n`
    : `import React from "react";\nimport type { PartProps } from "@sceneparts/core";\nimport { INK } from "../style/index";\n\n// ${title}. Draw around the anchor (x, y)${anchor ? " = bottom centre, facing right" : ""}; about 1000 px tall at s = 1 for a person.\n// Animate with p.f (frame) and p.d (shot length); number params given as [from, to] arrive already eased.\n/* eslint-disable @typescript-eslint/no-explicit-any */\nexport default function Part(p: PartProps<any>) {\n  return (\n    <g transform={\`translate(\${p.x} \${p.y}) scale(\${p.flip ? -p.s : p.s} \${p.s})\`}>\n      <rect x={-150} y={-600} width={300} height={600} rx={40} fill="#cccccc" stroke={INK} strokeWidth={10} />\n    </g>\n  );\n}\n`;
  fs.writeFileSync(path.join(dir, "index.tsx"), src);
  return dir;
}
