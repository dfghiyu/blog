import { rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryDirectories = [
  join(projectRoot, "docs", ".vuepress", ".cache"),
  join(projectRoot, "docs", ".vuepress", ".temp"),
];

for (const directory of temporaryDirectories) {
  await rm(directory, { recursive: true, force: true });
}

console.log("Cleared VuePress temporary files.");
