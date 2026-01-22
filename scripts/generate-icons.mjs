#!/usr/bin/env node
/**
 * Generate favicon and app icons from source images
 * Run with: node scripts/generate-icons.mjs
 */

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

async function generateIcons() {
  console.log('Generating icons from source images...\n')

  const iconSource = path.join(publicDir, 'icon-source.png')
  const logoMark = path.join(publicDir, 'logo-mark.png')

  // Check if source files exist
  try {
    await fs.access(iconSource)
    console.log('Found: icon-source.png')
  } catch {
    console.error('ERROR: icon-source.png not found in public/')
    process.exit(1)
  }

  try {
    await fs.access(logoMark)
    console.log('Found: logo-mark.png')
  } catch {
    console.warn('WARNING: logo-mark.png not found, some icons will use icon-source.png')
  }

  // Generate PNG icons at various sizes
  const pngSizes = [
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-icon.png', size: 180 },
    { name: 'icon-light-32x32.png', size: 32 },
  ]

  for (const { name, size } of pngSizes) {
    const outputPath = path.join(publicDir, name)
    await sharp(iconSource)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath)
    console.log(`Generated: ${name} (${size}x${size})`)
  }

  // Generate dark version (inverted colors for light mode)
  const darkIconPath = path.join(publicDir, 'icon-dark-32x32.png')
  await sharp(iconSource)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .negate({ alpha: false })
    .png()
    .toFile(darkIconPath)
  console.log('Generated: icon-dark-32x32.png (32x32, inverted)')

  // Generate favicon.ico (32x32 PNG, browsers accept PNG in .ico container)
  const faviconPath = path.join(publicDir, 'favicon.ico')
  await sharp(iconSource)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPath)
  console.log('Generated: favicon.ico (32x32)')

  // Generate simple SVG placeholder (actual vector should be created in design tool)
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#14b8a6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#brandGradient)"/>
  <text x="16" y="22" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">6</text>
</svg>`

  await fs.writeFile(path.join(publicDir, 'icon.svg'), svgIcon)
  console.log('Generated: icon.svg (placeholder)')

  // Generate logo-mark.svg placeholder
  const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#14b8a6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#logoGradient)"/>
  <text x="32" y="44" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">6</text>
</svg>`

  await fs.writeFile(path.join(publicDir, 'logo-mark.svg'), logoMarkSvg)
  console.log('Generated: logo-mark.svg (placeholder)')

  // Generate full logo SVG placeholder
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" width="200" height="48">
  <defs>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#14b8a6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <text x="0" y="36" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="url(#textGradient)">Six1Five</text>
</svg>`

  await fs.writeFile(path.join(publicDir, 'logo.svg'), logoSvg)
  console.log('Generated: logo.svg (placeholder)')

  console.log('\n✅ Icon generation complete!')
  console.log('\nNote: The SVG files are placeholders. For production, create proper vector')
  console.log('versions in a design tool like Figma or Illustrator.')
}

generateIcons().catch(console.error)
