/**
 * Multi-Screenshot Gallery Capture Script
 *
 * Captures multiple screenshots from each tool's website by scrolling
 * through different sections, creating a gallery similar to SubSense.
 *
 * Usage:
 *   npm run screenshots:galleries
 */

import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

const config = {
  outputDir: path.join(process.cwd(), 'public/tools/screenshots'),
  timeout: 60000,
  viewport: { width: 1440, height: 900 },
}

interface ToolConfig {
  slug: string
  name: string
  url: string
  // Scroll positions to capture (as percentage of page height)
  scrollPositions: number[]
  // Custom page URLs to capture (optional)
  pages?: string[]
}

const tools: ToolConfig[] = [
  {
    slug: 'apppilot',
    name: 'AppPilot',
    url: 'https://apppilot.co',
    scrollPositions: [0, 0.15, 0.30, 0.50, 0.70],
  },
  {
    slug: 'flightwindow',
    name: 'FlightWindow',
    url: 'https://flightwindow.app',
    scrollPositions: [0, 0.20, 0.40, 0.60, 0.80],
  },
  {
    slug: 'receiptrider',
    name: 'ReceiptRider',
    url: 'https://receiptrider.com',
    scrollPositions: [0, 0.25, 0.50, 0.75],
  },
]

async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
}

async function enableDarkMode(page: Page) {
  const darkModeSelectors = [
    '[aria-label*="dark"]',
    '[aria-label*="Dark"]',
    'button:has-text("Dark")',
    '[class*="theme-toggle"]',
    '[class*="dark-mode"]',
  ]

  for (const selector of darkModeSelectors) {
    try {
      const element = await page.$(selector)
      if (element) {
        await element.click()
        console.log(`   🌙 Enabled dark mode`)
        await page.waitForTimeout(500)
        return
      }
    } catch {
      // Continue
    }
  }

  // Try JavaScript approach
  try {
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    })
  } catch {
    // Ignore
  }
}

async function captureToolGallery(browser: Browser, tool: ToolConfig): Promise<string[]> {
  const toolDir = path.join(config.outputDir, tool.slug)
  await ensureDirectoryExists(toolDir)

  const context = await browser.newContext({
    viewport: config.viewport,
    colorScheme: 'dark',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })

  const page = await context.newPage()
  const capturedFiles: string[] = []

  try {
    console.log(`\n📸 Capturing ${tool.name} (${tool.url})...`)

    await page.goto(tool.url, {
      waitUntil: 'networkidle',
      timeout: config.timeout,
    })

    await page.waitForTimeout(2000)
    await enableDarkMode(page)
    await page.waitForTimeout(500)

    // Get page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    console.log(`   📏 Page height: ${pageHeight}px`)

    // Capture at each scroll position
    for (let i = 0; i < tool.scrollPositions.length; i++) {
      const scrollPercent = tool.scrollPositions[i]
      const scrollY = Math.floor(pageHeight * scrollPercent)

      const filename = i === 0 ? 'hero.png' : `section${i}.png`
      const filepath = path.join(toolDir, filename)

      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY)
      await page.waitForTimeout(800)

      await page.screenshot({
        path: filepath,
        type: 'png',
        fullPage: false,
      })

      console.log(`   ✅ ${filename} (scroll: ${Math.round(scrollPercent * 100)}%)`)
      capturedFiles.push(`/tools/screenshots/${tool.slug}/${filename}`)
    }

    // Capture additional pages if specified
    if (tool.pages) {
      for (const pagePath of tool.pages) {
        const pageUrl = new URL(pagePath, tool.url).toString()
        const pageName = pagePath.replace(/\//g, '-').replace(/^-/, '') || 'home'
        const filename = `${pageName}.png`
        const filepath = path.join(toolDir, filename)

        try {
          await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: config.timeout })
          await page.waitForTimeout(1500)
          await enableDarkMode(page)
          await page.waitForTimeout(500)

          await page.screenshot({ path: filepath, type: 'png', fullPage: false })
          console.log(`   ✅ ${filename} (page: ${pagePath})`)
          capturedFiles.push(`/tools/screenshots/${tool.slug}/${filename}`)
        } catch (error) {
          console.log(`   ⚠️  Skipped ${pagePath}: ${error instanceof Error ? error.message.split('\n')[0] : error}`)
        }
      }
    }

  } catch (error) {
    console.error(`   ❌ Failed: ${error instanceof Error ? error.message : error}`)
  } finally {
    await context.close()
  }

  return capturedFiles
}

async function main() {
  console.log('')
  console.log('═'.repeat(60))
  console.log('  🎬 Tool Gallery Screenshot Capture')
  console.log('═'.repeat(60))

  const browser = await chromium.launch({ headless: true })
  const results: { tool: string; screenshots: string[] }[] = []

  try {
    for (const tool of tools) {
      const screenshots = await captureToolGallery(browser, tool)
      results.push({ tool: tool.name, screenshots })
    }

    // Print summary
    console.log('\n')
    console.log('═'.repeat(60))
    console.log('  📊 Summary')
    console.log('═'.repeat(60))

    for (const result of results) {
      console.log(`\n  ${result.tool}: ${result.screenshots.length} screenshots`)
      result.screenshots.forEach(s => console.log(`     • ${s}`))
    }

    // Generate tools.ts update snippet
    console.log('\n')
    console.log('═'.repeat(60))
    console.log('  📝 Update lib/tools.ts with these screenshot arrays:')
    console.log('═'.repeat(60))

    for (const result of results) {
      if (result.screenshots.length > 0) {
        console.log(`\n  // ${result.tool}`)
        console.log(`  screenshots: [`)
        result.screenshots.forEach(s => console.log(`    "${s}",`))
        console.log(`  ],`)
      }
    }

    console.log('\n✨ Done!')

  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error('\n❌ Fatal error:', error.message)
  process.exit(1)
})
