#!/usr/bin/env node
// sceneparts – find, use and contribute SceneParts parts; validate, preview and render stories.
// Messages are short and say how to fix things, so an AI agent can loop on them.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { registryRoot, registryCommit, downloadRegistry, REPO } from "./paths.mjs";
import { available, closure, loadRegistry, resolveId, scanParts, storyRefs } from "./parts.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const [cmd, ...rest] = process.argv.slice(2);
const flags = {}, args = [];
for (let i = 0; i < rest.length; i++) {
  const a = rest[i];
  if (a.startsWith("--")) {
    const [k, v] = a.slice(2).split("=");
    flags[k] = v ?? (rest[i + 1] && !rest[i + 1].startsWith("--") ? rest[++i] : true);
  } else args.push(a);
}
function die(msg) { console.error(`sceneparts: ${msg}`); process.exit(1); }
const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { die(`cannot read ${p}: ${e.message}`); } };
const root = async (optional = false) => { try { return await registryRoot(flags.registry); } catch (e) { if (optional) { console.error(`sceneparts: library not reachable (${e.message}); using this project's parts/ only`); return null; } die(e.message); } };
const projectDir = (storyPath) => path.dirname(path.resolve(storyPath));
const isRegistryDir = (d) => fs.existsSync(path.join(d, "parts", "core", "style", "part.json"));

const HELP = `sceneparts – open library of animated TSX parts

Use parts
  search "<words>" [--type character] [--style egypt-tomb] [--limit 10]
  info <id>                       full part.json (params, defaults, example)
  add <id...>                     copy parts (+ what they use) into ./parts, pinned
  styles                          list styles
Make a video
  init <dir> [--style egypt-tomb] new project: story.json, parts/, public/
  validate <story.json>           schema + part + timing checks; exit 1 on errors
  preview <story.json> [--out preview.png] [--frame N]
  render <story.json> [--out out/video.mp4] [--concurrency N] [--browser /path/to/chrome]
  artifact --query "<text>" [--source met|aic|all] [--list] | --id met:<id>
Contribute
  new <type> <style/name> [--author <github>]   scaffold a part (types: style character prop scenery background effect text template)
  check <id...> | --all [--json report.json] [--out dir]   every CI rule + preview sheet
  pr <id> [--draft]               check, then fork, branch, commit (signed-off) and open the PR with gh
Maintainers
  index [--verify]                rebuild index/parts.jsonl
  gallery [--out site]            build the static gallery

Library: --registry <clone> | $SCENEPARTS_REGISTRY | a parent folder that is a clone | download of ${REPO}
`;

switch (cmd) {
  case "search": {
    const r = await root();
    const { readIndex, search } = await import("./search.mjs");
    const hits = search(readIndex(r), args.join(" "), { type: flags.type, style: flags.style, limit: Number(flags.limit ?? 10) });
    if (!hits.length) { console.log("no parts found – try other words, drop --style, or draw it and contribute it (sceneparts new …)"); break; }
    for (const e of hits) console.log(`${e.id.padEnd(30)} ${e.type.padEnd(10)} ${e.summary}\n${" ".repeat(31)}params: ${e.params.join(", ") || "–"}`);
    break;
  }
  case "styles": {
    const avail = scanParts(await root());
    for (const [id, p] of Object.entries(avail)) if (p.manifest.type === "style") {
      const n = Object.values(avail).filter((x) => x.manifest.style === p.manifest.style).length - 1;
      console.log(`${p.manifest.style.padEnd(18)} ${String(n).padStart(4)} parts  ${p.manifest.summary}`);
    }
    break;
  }
  case "info": {
    const r = await root();
    const avail = available(r, fs.existsSync("parts") && !isRegistryDir(".") ? "." : null);
    const id = resolveId(avail, args[0] ?? die("give a part id"), flags.style ?? "core") ?? die(`no part ${args[0]}`);
    console.log(JSON.stringify(avail[id].manifest, null, 2));
    break;
  }
  case "add": {
    const r = await root();
    if (isRegistryDir(process.cwd())) die("you are inside the library itself; parts here are already available");
    const avail = available(r, null);
    const want = args.map((a) => resolveId(avail, a, flags.style ?? "core") ?? die(`no part ${a} – sceneparts search "${a}"`));
    const ids = closure(avail, want);
    const lockPath = path.join("parts", "sceneparts.lock.json");
    const lock = fs.existsSync(lockPath) ? readJson(lockPath) : { source: REPO, parts: {} };
    for (const id of ids) {
      const dest = path.join("parts", id);
      if (fs.existsSync(dest) && !flags.force) { console.log(`= ${id} (already here)`); continue; }
      fs.mkdirSync(dest, { recursive: true });
      for (const f of fs.readdirSync(avail[id].dir)) fs.copyFileSync(path.join(avail[id].dir, f), path.join(dest, f));
      lock.parts[id] = { version: avail[id].manifest.version, commit: registryCommit(r) ?? "download" };
      console.log(`+ ${id}`);
    }
    fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");
    break;
  }
  case "init": {
    const dir = args[0] ?? die("give a folder name");
    if (fs.existsSync(dir) && fs.readdirSync(dir).length) die(`${dir} is not empty`);
    fs.mkdirSync(path.join(dir, "public"), { recursive: true });
    fs.mkdirSync(path.join(dir, "parts"), { recursive: true });
    const tpl = readJson(path.join(here, "..", "templates", "story.json"));
    if (flags.style) { tpl.style = flags.style; tpl.shots = [{ at: 0, items: [{ t: "title", y: 960, lines: ["NEW", "VIDEO"], accent: "NEW" }] }]; tpl.duration = 3; delete tpl.captions; tpl.loop = false; }
    tpl.$schema = "./node_modules/@sceneparts/cli/src/story.schema.json";
    fs.writeFileSync(path.join(dir, "story.json"), JSON.stringify(tpl, null, 2) + "\n");
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({
      name: path.basename(dir), private: true, type: "module",
      scripts: { validate: "sceneparts validate story.json", preview: "sceneparts preview story.json", render: "sceneparts render story.json" },
      dependencies: { "@sceneparts/cli": "^0.1.0", "@sceneparts/core": "^0.1.0", "@sceneparts/remotion": "^0.1.0", remotion: "4.0.536", "@remotion/cli": "4.0.536", react: "19.3.1", "react-dom": "19.3.1" },
    }, null, 2) + "\n");
    fs.writeFileSync(path.join(dir, ".gitignore"), "node_modules/\nout/\n.sceneparts/\n");
    fs.writeFileSync(path.join(dir, "README.md"), `# ${path.basename(dir)}\n\nMade with [SceneParts](https://github.com/${REPO}).\n\n1. \`npm install\`\n2. Find parts: \`npx sceneparts search "jackal god"\`; add them: \`npx sceneparts add <id>\`\n3. Edit \`story.json\`, then \`npm run validate && npm run preview\`\n4. Voice-over in \`public/voice.mp3\` + \`"audio": "voice.mp3"\`\n5. \`npm run render\`\n\nRendering uses Remotion: free for individuals and teams of up to 3 people; larger companies need a Remotion company licence.\n`);
    console.log(`✓ ${dir}/ created – next: cd ${dir} && npm install && npx sceneparts add <ids from your story> && npm run preview`);
    break;
  }
  case "validate":
  case "preview":
  case "render": {
    const storyPath = args[0] ?? die("give the path to story.json");
    const story = readJson(storyPath);
    const pd = projectDir(storyPath);
    const r = await root(fs.existsSync(path.join(pd, "parts")));
    const avail = available(r, r && isRegistryDir(pd) ? null : pd);
    const { validateStory } = await import("./validate.mjs");
    const v = validateStory(story, avail);
    if (cmd === "validate" || v.errors.length) {
      for (const e of v.errors) console.log(`ERROR  ${e}`);
      for (const w of v.warnings) console.log(`warn   ${w}`);
      console.log(v.errors.length ? `✗ ${v.errors.length} error(s), ${v.warnings.length} warning(s)` : `✓ valid (${v.warnings.length} warning(s))`);
      if (v.errors.length) process.exit(1);
      if (cmd === "validate") break;
    }
    const ids = closure(avail, [...storyRefs(story).map((t) => resolveId(avail, t, story.style)), `${story.style}/style`]);
    if (cmd === "preview") {
      const reg = await loadRegistry(avail, ids);
      const { contactSheet, frameSvg, toPng } = await import("./frames.mjs");
      const t0 = Date.now();
      if (flags.frame !== undefined) {
        const out = flags.out ?? "frame.png";
        fs.writeFileSync(out, toPng(frameSvg(story, reg, Number(flags.frame)), Number(flags.width ?? 540)));
        console.log(`✓ ${out}`);
      } else {
        const out = flags.out ?? path.join(pd, "preview.png");
        fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
        fs.writeFileSync(out, toPng(contactSheet(story, reg, { per: Number(flags.per ?? 3) })));
        console.log(`✓ ${out} (${((Date.now() - t0) / 1000).toFixed(1)} s) – look at every shot before rendering`);
      }
      break;
    }
    // render: write a Remotion entry that imports exactly the parts this story needs
    const work = path.join(pd, ".sceneparts");
    fs.mkdirSync(work, { recursive: true });
    const rel = (p) => { const x = path.relative(work, p).split(path.sep).join("/"); return x.startsWith(".") ? x : `./${x}`; };
    const lines = ['import { registerRoot } from "remotion";', 'import { makeRoot } from "@sceneparts/remotion";'];
    ids.forEach((id, i) => { lines.push(`import m${i} from "${rel(path.join(avail[id].dir, "part.json"))}";`, `import * as c${i} from "${rel(path.join(avail[id].dir, "index.tsx")).replace(/\.tsx$/, "")}";`); });
    lines.push("const reg = {", ...ids.map((id, i) => `  ${JSON.stringify(id)}: m${i}.type === "style" ? { manifest: m${i}, style: c${i}.default } : { manifest: m${i}, component: c${i}.default },`), "};", "// eslint-disable-next-line @typescript-eslint/no-explicit-any", "registerRoot(makeRoot(reg as any));");
    const entry = path.join(work, "entry.tsx");
    fs.writeFileSync(entry, lines.join("\n") + "\n");
    const out = path.resolve(flags.out ?? path.join(pd, "out", `${path.basename(pd)}.mp4`));
    const props = path.join(os.tmpdir(), `sceneparts-props-${Date.now()}.json`);
    fs.writeFileSync(props, JSON.stringify({ story }));
    const pub = path.join(pd, "public");
    const a = ["remotion", "render", entry, "SceneVideo", out, `--props=${props}`, ...(fs.existsSync(pub) ? [`--public-dir=${pub}`] : []),
      ...(flags.concurrency ? [`--concurrency=${flags.concurrency}`] : []), ...(flags.browser ? [`--browser-executable=${flags.browser}`] : []), ...(flags.frames ? [`--frames=${flags.frames}`] : [])];
    console.log(`sceneparts: npx ${a.join(" ")}`);
    const res = spawnSync("npx", ["--no-install", ...a], { stdio: "inherit", cwd: pd });
    if (res.status) console.error("sceneparts: render failed. Is the renderer installed? npm i @sceneparts/remotion remotion @remotion/cli (check Remotion's licence for your team size)");
    process.exit(res.status ?? 1);
  }
  case "new": {
    const [type, id] = args;
    if (!type || !id) die("usage: sceneparts new <type> <style/name>");
    const r = await root();
    const { newPart } = await import("./scaffold.mjs");
    let author = flags.author;
    if (!author) { try { author = execFileSync("gh", ["api", "user", "--jq", ".login"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { /* keep default */ } }
    try { const dir = newPart(r, type, id, author); console.log(`✓ ${path.relative(process.cwd(), dir) || dir}/ – edit part.json and index.tsx, then: sceneparts check ${id}`); } catch (e) { die(e.message); }
    break;
  }
  case "check": {
    const r = await root();
    const avail = scanParts(r);
    const { readIndex } = await import("./search.mjs");
    const index = fs.existsSync(path.join(r, "index", "parts.jsonl")) ? readIndex(r) : [];
    const { staticCheck, renderCheck, previewPng } = await import("./check.mjs");
    const ids = flags.all ? Object.keys(avail).sort() : args.map((a) => (avail[a] ? a : die(`no part ${a} under ${r}/parts`)));
    if (!ids.length) die("give part ids or --all");
    const report = {};
    let bad = 0;
    for (const id of ids) {
      const s = staticCheck(id, avail[id], avail, index);
      const rc = s.errors.length ? { errors: [], warnings: [], tiles: [] } : await renderCheck(id, avail);
      const errors = [...s.errors, ...rc.errors], warnings = [...s.warnings, ...rc.warnings];
      report[id] = { errors, warnings, flags: s.flags };
      if (errors.length) bad++;
      if (!flags.all || errors.length || warnings.length) {
        console.log(`${errors.length ? "✗" : "✓"} ${id}`);
        errors.forEach((e) => console.log(`    ERROR  ${e}`));
        warnings.forEach((w) => console.log(`    warn   ${w}`));
      }
      if (!flags.all && rc.tiles?.length && !errors.length) {
        const outDir = flags.out ?? path.join(r, ".sceneparts", "check");
        fs.mkdirSync(outDir, { recursive: true });
        const f = path.join(outDir, `${id.replace("/", "__")}.png`);
        fs.writeFileSync(f, previewPng(rc.reg, id, rc.tiles));
        console.log(`    preview ${f}`);
      }
    }
    if (flags.json) fs.writeFileSync(flags.json, JSON.stringify(report, null, 2));
    console.log(bad ? `✗ ${bad} of ${ids.length} part(s) failed` : `✓ ${ids.length} part(s) passed`);
    process.exit(bad ? 1 : 0);
  }
  case "pr": {
    const id = args[0] ?? die("give the part id");
    const r = await root();
    if (!fs.existsSync(path.join(r, ".git"))) die("pr needs a git clone of the library: gh repo clone " + REPO + " && cd sceneparts && npm install");
    const git = (...a) => execFileSync("git", ["-C", r, ...a], { encoding: "utf8" }).trim();
    const gh = (...a) => execFileSync("gh", a, { encoding: "utf8", cwd: r }).trim();
    try { gh("auth", "status"); } catch { die("log in to GitHub first: gh auth login"); }
    const chk = spawnSync(process.execPath, [fileURLToPath(import.meta.url), "check", id, "--registry", r], { stdio: "inherit" });
    if (chk.status) die("fix the check errors first");
    const m = readJson(path.join(r, "parts", id, "part.json"));
    const login = gh("api", "user", "--jq", ".login");
    const branch = `part/${id.replace("/", "-")}`;
    git("checkout", "-B", branch);
    git("add", path.join("parts", id));
    try { git("commit", "-s", "-m", `Add ${id}: ${m.name}`); } catch { console.log("(nothing new to commit)"); }
    const upstream = REPO.split("/")[0];
    let remote = "origin";
    if (login !== upstream) {
      try { gh("repo", "fork", REPO, "--remote", "--remote-name", "fork"); } catch { /* fork may exist */ }
      try { git("remote", "get-url", "fork"); } catch { git("remote", "add", "fork", `https://github.com/${login}/${REPO.split("/")[1]}.git`); }
      remote = "fork";
    }
    git("push", "-u", remote, branch, "--force-with-lease");
    const tpl = fs.readFileSync(path.join(r, ".github", "pull_request_template.md"), "utf8");
    const body = `**Part:** \`${id}\` (${m.type}, style \`${m.style}\`)\n\n${m.summary}\n\n\`sceneparts check ${id}\` passed locally.\n\n` + tpl.replace(/<!--[\s\S]*?-->\n?/g, "");
    const bodyFile = path.join(os.tmpdir(), `sceneparts-pr-${Date.now()}.md`);
    fs.writeFileSync(bodyFile, body);
    const url = gh("pr", "create", "--repo", REPO, "--base", "main", "--head", `${login === upstream ? "" : login + ":"}${branch}`, "--title", `Add ${id}: ${m.name}`, "--body-file", bodyFile, ...(flags.draft ? ["--draft"] : []));
    console.log(`✓ ${url}\n  A maintainer reviews every part by hand. Tick the checklist in the PR description.`);
    break;
  }
  case "index": {
    const r = await root();
    const { buildIndex } = await import("./search.mjs");
    const f = path.join(r, "index", "parts.jsonl");
    const next = buildIndex(r);
    if (flags.verify) {
      const cur = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
      if (cur !== next) die("index/parts.jsonl is out of date – run: sceneparts index");
      console.log("✓ index up to date");
    } else {
      fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, next);
      console.log(`✓ ${f} (${next.trim().split("\n").length} parts)`);
    }
    break;
  }
  case "gallery": {
    const { buildGallery } = await import("./gallery.mjs");
    const n = await buildGallery(await root(), flags.out ?? "site");
    console.log(`✓ gallery with ${n} parts in ${flags.out ?? "site"}/`);
    break;
  }
  case "artifact": {
    const { artifact } = await import("./artifact.mjs");
    try { await artifact({ query: flags.query, id: flags.id, source: flags.source ?? "met", n: Number(flags.n ?? 1), list: !!flags.list, out: flags.out ?? "public/artifacts", labelText: flags.label }); } catch (e) { die(e.message); }
    break;
  }
  case "refresh": {
    const d = await downloadRegistry({ refresh: true });
    console.log(`✓ library refreshed: ${d}`);
    break;
  }
  default:
    console.log(HELP);
    process.exit(cmd && !["help", "--help", "-h"].includes(cmd) ? 1 : 0);
}
