// Bundle budget: fails if the JavaScript Vite builds into dist/ is over the budget, gzipped.
// Run `npm run build` first.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET_KB = 10;
const dir = "dist/assets";

let files;
try {
  files = readdirSync(dir).filter((f) => f.endsWith(".js"));
} catch {
  console.error(`No ${dir}: run "npm run build" first.`);
  process.exit(1);
}

let total = 0;
for (const f of files) {
  const kb = gzipSync(readFileSync(join(dir, f))).length / 1024;
  total += kb;
  console.log(`${f}  ${kb.toFixed(1)} kB gzipped`);
}
console.log(`Total ${total.toFixed(1)} kB of ${BUDGET_KB} kB budget`);
if (total > BUDGET_KB) {
  console.error(`Over budget by ${(total - BUDGET_KB).toFixed(1)} kB`);
  process.exit(1);
}
