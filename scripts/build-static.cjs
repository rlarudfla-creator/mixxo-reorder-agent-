const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const standaloneDir = path.join(root, "standalone");
const sourceDir = fs.existsSync(standaloneDir) ? standaloneDir : root;
const outputDir = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(outputDir, file));
}

console.log(`Built static MIXXO app from ${sourceDir} to ${outputDir}`);
