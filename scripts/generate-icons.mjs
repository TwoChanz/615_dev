#!/usr/bin/env node
/**
 * Icon Bundle Generator
 *
 * Usage:
 *   node scripts/generate-icons.mjs --input public/icon-source.png --out public/icons
 *
 * What it does:
 *  - Generates standard favicon/app icon PNG sizes
 *  - Generates a multi-size favicon.ico (16, 32, 48)
 *
 * Notes:
 *  - Assumes input is a square-ish image (PNG preferred)
 *  - Keeps your original background (no transparency added)
 */

import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import fs from "fs-extra";
import pngToIco from "png-to-ico";

function getArg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const val = process.argv[idx + 1];
  if (!val || val.startsWith("--")) return fallback;
  return val;
}

function printHelpAndExit() {
  console.log(`
Icon Bundle Generator

Required:
  --input <path>    Path to source image (recommend: square PNG)
  --out <dir>       Output directory

Example:
  node scripts/generate-icons.mjs --input public/icon-source.png --out public/icons
`);
  process.exit(1);
}

const inputPath = getArg("--input");
const outDir = getArg("--out");

if (!inputPath || !outDir) printHelpAndExit();

const resolvedInput = path.resolve(process.cwd(), inputPath);
const resolvedOut = path.resolve(process.cwd(), outDir);

const PNG_TARGETS = [
  { filename: "favicon-16x16.png", size: 16 },
  { filename: "favicon-32x32.png", size: 32 },
  { filename: "apple-touch-icon.png", size: 180 },
  { filename: "android-chrome-192x192.png", size: 192 },
  { filename: "android-chrome-512x512.png", size: 512 }
];

// For favicon.ico we generate a multi-size ico from these sizes.
// (48 helps on some Windows / legacy contexts)
const ICO_SIZES = [16, 32, 48];

async function main() {
  // Validate input exists
  const exists = await fs.pathExists(resolvedInput);
  if (!exists) {
    console.error(`❌ Input file not found: ${resolvedInput}`);
    process.exit(1);
  }

  await fs.ensureDir(resolvedOut);

  // Read input once
  const inputBuffer = await fs.readFile(resolvedInput);

  // Basic sanity read (also catches unsupported formats early)
  let meta;
  try {
    meta = await sharp(inputBuffer).metadata();
  } catch (err) {
    console.error("❌ Failed to read input image. Make sure it is a valid image file (PNG/JPG/WebP).");
    console.error(err?.message || err);
    process.exit(1);
  }

  if (!meta.width || !meta.height) {
    console.error("❌ Could not detect image dimensions.");
    process.exit(1);
  }

  // We want sharp results at tiny sizes:
  // - use Lanczos3
  // - mild sharpening helps keep edges readable at 16/32
  // (This is the "correct change" you wanted: improves perceived contrast/clarity at favicon sizes)
  const basePipeline = sharp(inputBuffer).resize({
    // resizing happens per-target below; this just ensures we don't carry weird metadata
    fit: "cover"
  });

  console.log(`ℹ️ Input: ${resolvedInput} (${meta.width}x${meta.height})`);
  console.log(`ℹ️ Output dir: ${resolvedOut}`);

  // Generate PNG targets
  for (const t of PNG_TARGETS) {
    const outPath = path.join(resolvedOut, t.filename);

    await sharp(inputBuffer)
      .resize(t.size, t.size, {
        fit: "cover",
        kernel: sharp.kernel.lanczos3
      })
      // tiny boost to maintain crisp edges at small sizes
      .sharpen({ sigma: 0.7 })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(outPath);

    console.log(`✅ Wrote ${t.filename} (${t.size}x${t.size})`);
  }

  // Generate ICO source PNG buffers
  const icoPngBuffers = [];
  for (const s of ICO_SIZES) {
    const buf = await sharp(inputBuffer)
      .resize(s, s, {
        fit: "cover",
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({ sigma: 0.8 })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toBuffer();

    icoPngBuffers.push(buf);
  }

  // Generate favicon.ico
  const icoBuffer = await pngToIco(icoPngBuffers);
  const icoOutPath = path.join(resolvedOut, "favicon.ico");
  await fs.writeFile(icoOutPath, icoBuffer);
  console.log(`✅ Wrote favicon.ico (sizes: ${ICO_SIZES.join(", ")})`);

  console.log("\n🎉 Done. Your icon bundle is ready.");
  console.log(`➡️  Use these in your site from: ${outDir.replace(/\\/g, "/")}/`);
}

main().catch((err) => {
  console.error("❌ Unexpected error:");
  console.error(err);
  process.exit(1);
});
