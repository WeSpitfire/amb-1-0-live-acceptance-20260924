import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  });
}

const invalid = files("src").filter((file) => readFileSync(file, "utf8").includes("FIXME"));
if (invalid.length > 0) {
  console.error(`Rejected synthetic FIXME marker in ${invalid.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("Synthetic validator accepted the candidate.");
}
