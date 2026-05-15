const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const standaloneDir = path.join(root, "standalone");
const sourceDir = fs.existsSync(path.join(standaloneDir, "index.html")) ? standaloneDir : root;
const outputDir = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js", "bi-data.js", "detail-data.js", "image-data.js"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  const sourceFile = path.join(sourceDir, file);
  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Missing required file: ${sourceFile}`);
  }
  fs.copyFileSync(sourceFile, path.join(outputDir, file));
}

console.log(`Built static MIXXO app from ${sourceDir} to ${outputDir}`);
