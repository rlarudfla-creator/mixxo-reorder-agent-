const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "standalone");
const outputDir = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(outputDir, file));
}

console.log(`Built static MIXXO app to ${outputDir}`);
