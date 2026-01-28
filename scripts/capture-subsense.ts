/**
 * SubSense Screenshot Capture Script
 *
 * Captures specific screenshots from https://www.subsense.me/ for use on six1five.dev
 *
 * Screenshots to capture (as defined by marketing requirements):
 *
 * === 5 App Screenshots ===
 * 1. "Command Center" Dashboard - Homepage hero showing "Total Monthly Spend",
 *    "Total Yearly Spend", and "Upcoming Bills" with brand logos
 * 2. Smart Categorization View - Custom categories like "Entertainment",
 *    "Utilities", "Software", "Health" with colorful groupings
 * 3. Analytics & ROI Graphs - Spending Overview with donut/bar charts and
 *    "Potential Savings" in green
 * 4. Intelligent Alerts & Reminders - Lock screen/notification showing trial
 *    ending alert (e.g., "Cancel Adobe Creative Cloud before tomorrow to save $54.99")
 * 5. Biometric Security & Privacy - FaceID/TouchID prompt on blurred app background
 *
 * === 1 Premium Feature Highlight ===
 * 6. Premium "Pro" Insights Hero Shot - 3D device mockup with Advanced Insights
 *    dashboard showing "Spending Trends" line graph (6 month view)
 *
 * Usage:
 *   # First install Playwright browsers (one-time setup)
 *   npm run screenshots:install
 *
 *   # Run the capture script
 *   npx tsx scripts/capture-subsense.ts
 *
 * Note: Requires network access to www.subsense.me. If running in a restricted
 * environment, run this script locally where external URLs are accessible.
 */

import { chromium, type Browser, type BrowserContext } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

const config = {
  baseUrl: 'https://www.subsense.me',
  outputDir: path.join(process.cwd(), 'public/tools/screenshots/subsense'),
  timeout: 60000,
  // iPhone 14 Pro Max viewport for mobile app screenshots
  mobileViewport: { width: 430, height: 932 },
  // Desktop viewport for website screenshots
  desktopViewport: { width: 1440, height: 900 },
  // High-res for premium hero shot
  heroViewport: { width: 1920, height: 1080 },
}

/**
 * Screenshot specifications aligned with marketing requirements
 */
interface ScreenshotSpec {
  // Unique identifier for the screenshot
  id: string
  // Display name for logging
  name: string
  // Output filename
  filename: string
  // Description of what to capture
  description: string
  // Viewport size
  viewport: { width: number; height: number }
  // Scroll position (pixels from top)
  scrollY?: number
  // CSS selector to wait for before capture
  waitFor?: string
  // Whether this is the premium hero shot
  isPremium?: boolean
}

const SCREENSHOT_SPECS: ScreenshotSpec[] = [
  {
    id: 'dashboard',
    name: '1. Command Center Dashboard',
    filename: 'subsense-dashboard.png',
    description: 'Hero section with Total Monthly/Yearly Spend and Upcoming Bills',
    viewport: config.desktopViewport,
    scrollY: 0,
  },
  {
    id: 'categories',
    name: '2. Smart Categorization',
    filename: 'subsense-categories.png',
    description: 'Custom categories: Entertainment, Utilities, Software, Health',
    viewport: config.desktopViewport,
    scrollY: 800,
  },
  {
    id: 'analytics',
    name: '3. Analytics & ROI Graphs',
    filename: 'subsense-analytics.png',
    description: 'Spending Overview charts with Potential Savings metrics',
    viewport: config.desktopViewport,
    scrollY: 1600,
  },
  {
    id: 'alerts',
    name: '4. Intelligent Alerts',
    filename: 'subsense-alerts.png',
    description: 'Trial Ending Alerts and smart notification features',
    viewport: config.desktopViewport,
    scrollY: 2400,
  },
  {
    id: 'security',
    name: '5. Security & Privacy',
    filename: 'subsense-security.png',
    description: 'Biometric authentication (FaceID/TouchID) security features',
    viewport: config.desktopViewport,
    scrollY: 3200,
  },
  {
    id: 'premium-hero',
    name: '6. Premium Hero Shot',
    filename: 'subsense-premium-hero.png',
    description: 'High-res 3D mockup for homepage feature highlight',
    viewport: config.heroViewport,
    scrollY: 0,
    isPremium: true,
  },
]

async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
}

async function captureScreenshot(
  context: BrowserContext,
  spec: ScreenshotSpec,
  pageCache?: { url: string }
): Promise<{ success: boolean; path?: string; error?: string }> {
  const page = await context.newPage()
  const screenshotPath = path.join(config.outputDir, spec.filename)

  try {
    console.log(`\n📸 ${spec.name}`)
    console.log(`   📝 ${spec.description}`)

    // Set viewport
    await page.setViewportSize(spec.viewport)

    // Navigate to the page
    console.log(`   🌐 Navigating to ${config.baseUrl}...`)
    await page.goto(config.baseUrl, {
      waitUntil: 'networkidle',
      timeout: config.timeout,
    })

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000) // Allow animations to settle

    // Scroll to the specific section if needed
    if (spec.scrollY && spec.scrollY > 0) {
      console.log(`   📜 Scrolling to position ${spec.scrollY}px...`)
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'instant' })
      }, spec.scrollY)
      await page.waitForTimeout(1000) // Wait for scroll animations
    }

    // Wait for specific selector if provided
    if (spec.waitFor) {
      await page.waitForSelector(spec.waitFor, { timeout: config.timeout })
    }

    // Take the screenshot
    await page.screenshot({
      path: screenshotPath,
      type: 'png',
      fullPage: false,
    })

    console.log(`   ✅ Saved: ${spec.filename}`)
    return { success: true, path: screenshotPath }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error(`   ❌ Failed: ${errorMsg}`)
    return { success: false, error: errorMsg }
  } finally {
    await page.close()
  }
}

interface CaptureResult {
  spec: ScreenshotSpec
  success: boolean
  path?: string
  error?: string
}

async function captureAllScreenshots(browser: Browser): Promise<CaptureResult[]> {
  console.log('\n🚀 Starting SubSense screenshot capture...')
  console.log(`   Target: ${config.baseUrl}`)
  console.log(`   Capturing ${SCREENSHOT_SPECS.length} screenshots\n`)

  const context = await browser.newContext({
    viewport: config.desktopViewport,
    colorScheme: 'dark',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })

  const results: CaptureResult[] = []

  // First, capture a full-page reference screenshot
  console.log('📄 Capturing full-page reference...')
  const refPage = await context.newPage()
  try {
    await refPage.setViewportSize(config.desktopViewport)
    await refPage.goto(config.baseUrl, { waitUntil: 'networkidle', timeout: config.timeout })
    await refPage.waitForTimeout(2000)

    const pageHeight = await refPage.evaluate(() => document.body.scrollHeight)
    console.log(`   📏 Page height: ${pageHeight}px`)

    const fullPagePath = path.join(config.outputDir, 'subsense-full-page.png')
    await refPage.screenshot({ path: fullPagePath, type: 'png', fullPage: true })
    console.log(`   ✅ Reference saved: subsense-full-page.png\n`)
  } catch (error) {
    console.error(`   ❌ Reference capture failed: ${error instanceof Error ? error.message : error}\n`)
  } finally {
    await refPage.close()
  }

  // Capture each specified screenshot
  for (const spec of SCREENSHOT_SPECS) {
    const result = await captureScreenshot(context, spec)
    results.push({
      spec,
      success: result.success,
      path: result.path,
      error: result.error,
    })
  }

  await context.close()
  return results
}

async function main() {
  console.log('')
  console.log('═'.repeat(60))
  console.log('  🎬 SubSense Screenshot Capture')
  console.log('═'.repeat(60))
  console.log('')
  console.log(`  Target URL: ${config.baseUrl}`)
  console.log(`  Output Dir: ${config.outputDir}`)
  console.log('')

  // Ensure output directory exists
  await ensureDirectoryExists(config.outputDir)

  // Try multiple executable paths for browser launch
  const executablePaths = [
    '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  ].filter(Boolean) as string[]

  let browser: Browser | null = null

  // Try each executable path, then fall back to default
  for (const executablePath of [...executablePaths, undefined]) {
    try {
      console.log(`🔧 Launching browser${executablePath ? ` (${path.basename(executablePath)})` : ' (auto-detect)'}...`)
      browser = await chromium.launch({
        headless: true,
        executablePath: executablePath,
      })
      console.log('   ✅ Browser launched successfully\n')
      break
    } catch (error) {
      console.log(`   ⚠️  Failed: ${error instanceof Error ? error.message.split('\n')[0] : error}`)
      if (executablePath === undefined) {
        throw new Error(
          'Could not launch browser. Run: npx playwright install chromium'
        )
      }
    }
  }

  if (!browser) {
    throw new Error('Failed to launch browser')
  }

  try {
    const results = await captureAllScreenshots(browser)

    // Print summary
    console.log('')
    console.log('═'.repeat(60))
    console.log('  📊 Capture Summary')
    console.log('═'.repeat(60))

    const successful = results.filter((r) => r.success)
    const failed = results.filter((r) => !r.success)

    console.log(`\n  ✅ Successful: ${successful.length}/${results.length}`)
    successful.forEach((r) => {
      console.log(`     • ${r.spec.filename}`)
    })

    if (failed.length > 0) {
      console.log(`\n  ❌ Failed: ${failed.length}`)
      failed.forEach((r) => {
        console.log(`     • ${r.spec.name}: ${r.error}`)
      })
    }

    // List all files in output directory
    console.log('\n  📁 Output Files:')
    try {
      const files = fs.readdirSync(config.outputDir).filter((f) => f.endsWith('.png'))
      files.forEach((file) => {
        const stats = fs.statSync(path.join(config.outputDir, file))
        const sizeKB = Math.round(stats.size / 1024)
        console.log(`     ${file} (${sizeKB} KB)`)
      })
    } catch {
      console.log('     (no files captured)')
    }

    console.log('')
    console.log('═'.repeat(60))
    console.log('  ✨ Capture complete!')
    console.log('═'.repeat(60))
    console.log('')
    console.log('  📝 Next steps:')
    console.log('     1. Review screenshots in public/tools/screenshots/subsense/')
    console.log('     2. Update lib/tools.ts to reference new screenshot paths')
    console.log('     3. Verify display on /tools/subsense page')
    console.log('')
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error('\n❌ Fatal error:', error.message)
  console.log('\n💡 Troubleshooting:')
  console.log('   • Run: npm run screenshots:install')
  console.log('   • Check network connectivity to www.subsense.me')
  console.log('   • Try running in an environment without network restrictions')
  process.exit(1)
})
