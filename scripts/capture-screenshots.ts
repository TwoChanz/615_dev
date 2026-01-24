/**
 * Tool Screenshot Capture Script
 *
 * This script uses Playwright to capture screenshots of external tool websites
 * in dark mode for use on six1five.dev.
 *
 * Usage:
 *   1. Install Playwright: npm install -D @playwright/test playwright
 *   2. Install browsers: npx playwright install chromium
 *   3. Run: npx tsx scripts/capture-screenshots.ts
 *
 * Screenshots are saved to: public/tools/screenshots/
 */

import { chromium, type Browser, type Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

// Tool configurations for screenshots
const tools = [
  {
    slug: 'subsense',
    name: 'SubSense',
    url: 'https://subsense.app',
    waitForSelector: 'body', // Wait for this selector before capture
  },
  {
    slug: 'apppilot',
    name: 'AppPilot',
    url: 'https://apppilot.co',
    waitForSelector: 'body',
  },
  {
    slug: 'flightwindow',
    name: 'FlightWindow',
    url: 'https://flightwindow.app',
    waitForSelector: 'body',
  },
  {
    slug: 'devdash',
    name: 'DevDash',
    url: 'https://devdash.dev',
    waitForSelector: 'body',
  },
]

// Screenshot configuration
const config = {
  outputDir: path.join(process.cwd(), 'public/tools/screenshots'),
  viewport: { width: 1280, height: 720 },
  timeout: 30000,
  // Dark mode preferences
  colorScheme: 'dark' as const,
}

async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Created directory: ${dir}`)
  }
}

async function captureScreenshot(
  browser: Browser,
  tool: typeof tools[0]
): Promise<string | null> {
  const context = await browser.newContext({
    viewport: config.viewport,
    colorScheme: config.colorScheme,
    // Prefer dark mode
    extraHTTPHeaders: {
      'Sec-CH-Prefers-Color-Scheme': 'dark',
    },
  })

  const page = await context.newPage()
  const screenshotPath = path.join(config.outputDir, `${tool.slug}-hero.png`)

  try {
    console.log(`Navigating to ${tool.name} (${tool.url})...`)

    await page.goto(tool.url, {
      waitUntil: 'networkidle',
      timeout: config.timeout,
    })

    // Wait for the page to be fully loaded
    await page.waitForSelector(tool.waitForSelector, { timeout: config.timeout })

    // Additional wait for animations to settle
    await page.waitForTimeout(2000)

    // Try to enable dark mode if there's a toggle
    await enableDarkMode(page)

    // Wait for dark mode transition
    await page.waitForTimeout(500)

    // Take the screenshot
    await page.screenshot({
      path: screenshotPath,
      type: 'png',
      fullPage: false,
    })

    console.log(`✓ Captured: ${screenshotPath}`)
    return screenshotPath
  } catch (error) {
    console.error(`✗ Failed to capture ${tool.name}:`, error)
    return null
  } finally {
    await context.close()
  }
}

async function enableDarkMode(page: Page) {
  // Try common dark mode toggle patterns
  const darkModeSelectors = [
    '[data-theme="dark"]',
    '[aria-label*="dark"]',
    '[aria-label*="Dark"]',
    'button:has-text("Dark")',
    '[class*="theme-toggle"]',
    '[class*="dark-mode"]',
    '[id*="theme"]',
  ]

  for (const selector of darkModeSelectors) {
    try {
      const element = await page.$(selector)
      if (element) {
        await element.click()
        console.log(`  Clicked dark mode toggle: ${selector}`)
        return
      }
    } catch {
      // Continue trying other selectors
    }
  }

  // If no toggle found, try setting via JavaScript
  try {
    await page.evaluate(() => {
      // Try to set theme via common methods
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', 'dark')
        localStorage.setItem('color-theme', 'dark')
        localStorage.setItem('darkMode', 'true')
      }
      // Add dark class to html/body
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    })
  } catch {
    // Ignore if this fails
  }
}

async function captureLocalScreenshots(browser: Browser) {
  // Capture screenshots of the local dev server
  const localPages = [
    { name: 'homepage', path: '/', filename: 'six1five-homepage.png' },
    { name: 'tools', path: '/tools', filename: 'six1five-tools.png' },
  ]

  const context = await browser.newContext({
    viewport: config.viewport,
    colorScheme: config.colorScheme,
  })

  const page = await context.newPage()

  // Set dark mode cookie/localStorage
  await page.addInitScript(() => {
    localStorage.setItem('theme', 'dark')
  })

  for (const localPage of localPages) {
    try {
      const url = `http://localhost:3000${localPage.path}`
      console.log(`Capturing local: ${localPage.name}...`)

      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: config.timeout,
      })

      await page.waitForTimeout(1000)

      const screenshotPath = path.join(config.outputDir, localPage.filename)
      await page.screenshot({
        path: screenshotPath,
        type: 'png',
        fullPage: false,
      })

      console.log(`✓ Captured: ${screenshotPath}`)
    } catch (error) {
      console.error(`✗ Failed to capture ${localPage.name}:`, error)
    }
  }

  await context.close()
}

async function main() {
  console.log('🎬 Starting screenshot capture...\n')

  // Ensure output directory exists
  await ensureDirectoryExists(config.outputDir)

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  })

  const results: { tool: string; success: boolean; path?: string }[] = []

  // Capture external tool screenshots
  for (const tool of tools) {
    const screenshotPath = await captureScreenshot(browser, tool)
    results.push({
      tool: tool.name,
      success: screenshotPath !== null,
      path: screenshotPath || undefined,
    })
  }

  // Optionally capture local screenshots (uncomment if dev server is running)
  // await captureLocalScreenshots(browser)

  await browser.close()

  // Print summary
  console.log('\n📊 Summary:')
  console.log('─'.repeat(50))

  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`✓ Successful: ${successful.length}`)
  successful.forEach(r => console.log(`  - ${r.tool}: ${r.path}`))

  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`)
    failed.forEach(r => console.log(`  - ${r.tool}`))
  }

  console.log('\n✨ Done!')

  // Print next steps
  console.log('\n📝 Next steps:')
  console.log('1. Review screenshots in public/tools/screenshots/')
  console.log('2. Update lib/tools.ts to reference the new screenshots')
  console.log('3. Run the dev server to verify they display correctly')
}

main().catch(console.error)
