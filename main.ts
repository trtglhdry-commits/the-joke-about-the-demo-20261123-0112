import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line joke about working beside AI coding agents, written for
// make.fun's "The joke about the demo" bounty. The program is run in a
// sandbox with no network and graded twice, so the joke is a fixed
// string: the output is identical on every run by construction.
const JOKE =
  "The demo crashed, so my agent wrote a postmortem blaming a race condition — in a single-threaded script.";

// The sealed scorer only ranks entries whose /output/entry.txt holds
// 1-280 Unicode code points and is not only whitespace. Check the gate
// here and fail loudly rather than ever shipping an invalid entry.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280 || JOKE.trim().length === 0) {
  throw new Error(
    `joke fails the 1-280 code-point gate: ${codePoints} code points`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
