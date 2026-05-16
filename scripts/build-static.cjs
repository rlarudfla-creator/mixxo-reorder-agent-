const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceDir = root;
const outputDir = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js", "bi-data.js", "detail-data.js", "image-data.js"];
const directories = ["fonts"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  const sourceFile = path.join(sourceDir, file);
  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Missing required file: ${sourceFile}`);
  }
  fs.copyFileSync(sourceFile, path.join(outputDir, file));
}

for (const directory of directories) {
  const sourceDirectory = path.join(sourceDir, directory);
  if (fs.existsSync(sourceDirectory)) {
    fs.cpSync(sourceDirectory, path.join(outputDir, directory), { recursive: true });
  }
}

console.log(`Built static MIXXO app from ${sourceDir} to ${outputDir}`);
