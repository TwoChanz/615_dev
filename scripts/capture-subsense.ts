/**
 * SubSense Screenshot Capture Script
 *
 * This script uses Playwright (a browser automation tool) to:
 * 1. Open a real Chrome browser (but hidden/headless)
 * 2. Navigate to the SubSense website
 * 3. Scroll to different sections
 * 4. Take screenshots at each position
 * 5. Save them as PNG files
 *
 * WHY WE NEED THIS:
 * - Manual screenshots are time-consuming
 * - This ensures consistent image sizes and quality
 * - Can be re-run anytime the website changes
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
 *   npm run screenshots:subsense
 *
 * Note: Requires network access to www.subsense.me. If running in a restricted
 * environment, run this script locally where external URLs are accessible.
 */

// ============================================================================
// IMPORTS - Loading the tools we need
// ============================================================================

// 'chromium' is a browser engine (what Chrome is built on)
// 'Browser' and 'BrowserContext' are TypeScript types that help catch errors
import { chromium, type Browser, type BrowserContext } from 'playwright'

// 'fs' = File System - lets us create folders and save files
import * as fs from 'fs'

// 'path' helps us work with file paths (like joining folder names)
import * as path from 'path'

// ============================================================================
// CONFIGURATION - Settings we can easily change
// ============================================================================

const config = {
  // The website we're taking screenshots of
  baseUrl: 'https://www.subsense.me',

  // Where to save the screenshots
  // process.cwd() = "current working directory" (your project folder)
  // path.join() safely combines folder names (handles / vs \ on different OS)
  outputDir: path.join(process.cwd(), 'public/tools/screenshots/subsense'),

  // How long to wait (in milliseconds) before giving up
  // 60000ms = 60 seconds
  timeout: 60000,

  // iPhone 14 Pro Max screen size (for mobile screenshots if needed)
  mobileViewport: { width: 430, height: 932 },

  // Standard desktop screen size (1440p is common for marketing)
  desktopViewport: { width: 1440, height: 900 },

  // High resolution for the premium hero image
  heroViewport: { width: 1920, height: 1080 },
}

// ============================================================================
// TYPE DEFINITIONS - Describing the shape of our data
// ============================================================================

/**
 * TypeScript "interface" = a blueprint describing what properties an object has
 * This helps catch typos and mistakes before the code runs
 */
interface ScreenshotSpec {
  // Unique identifier for the screenshot (used internally)
  id: string

  // Human-readable name shown in console output
  name: string

  // The file name to save as (e.g., "subsense-dashboard.png")
  filename: string

  // Description of what this screenshot shows
  description: string

  // Browser window size { width: number, height: number }
  viewport: { width: number; height: number }

  // How far down the page to scroll (in pixels)
  // 0 = top of page, 800 = scroll down 800 pixels, etc.
  scrollY?: number // The '?' means this is optional

  // CSS selector to wait for before taking screenshot
  // Example: ".hero-section" would wait for an element with class "hero-section"
  waitFor?: string

  // Flag to mark this as the premium/featured image
  isPremium?: boolean
}

// ============================================================================
// SCREENSHOT SPECIFICATIONS - What screenshots to capture
// ============================================================================

/**
 * This array defines each screenshot we want to capture.
 * Each object follows the ScreenshotSpec interface above.
 *
 * HOW SCROLL POSITIONS WORK:
 * - scrollY: 0 = top of the page (no scrolling)
 * - scrollY: 800 = scroll down 800 pixels
 * - You may need to adjust these based on the actual page layout
 */
const SCREENSHOT_SPECS: ScreenshotSpec[] = [
  {
    id: 'dashboard',
    name: '1. Command Center Dashboard',
    filename: 'subsense-dashboard.png',
    description: 'Hero section with Total Monthly/Yearly Spend and Upcoming Bills',
    viewport: config.desktopViewport,
    scrollY: 0, // Top of page - no scrolling
  },
  {
    id: 'categories',
    name: '2. Smart Categorization',
    filename: 'subsense-categories.png',
    description: 'Custom categories: Entertainment, Utilities, Software, Health',
    viewport: config.desktopViewport,
    scrollY: 800, // Scroll down to see categories section
  },
  {
    id: 'analytics',
    name: '3. Analytics & ROI Graphs',
    filename: 'subsense-analytics.png',
    description: 'Spending Overview charts with Potential Savings metrics',
    viewport: config.desktopViewport,
    scrollY: 1600, // Further down for analytics
  },
  {
    id: 'alerts',
    name: '4. Intelligent Alerts',
    filename: 'subsense-alerts.png',
    description: 'Trial Ending Alerts and smart notification features',
    viewport: config.desktopViewport,
    scrollY: 2400, // Even further for alerts section
  },
  {
    id: 'security',
    name: '5. Security & Privacy',
    filename: 'subsense-security.png',
    description: 'Biometric authentication (FaceID/TouchID) security features',
    viewport: config.desktopViewport,
    scrollY: 3200, // Near bottom for security features
  },
  {
    id: 'premium-hero',
    name: '6. Premium Hero Shot',
    filename: 'subsense-premium-hero.png',
    description: 'High-res 3D mockup for homepage feature highlight',
    viewport: config.heroViewport, // Higher resolution!
    scrollY: 0, // Top of page
    isPremium: true,
  },
]

// ============================================================================
// HELPER FUNCTIONS - Reusable pieces of code
// ============================================================================

/**
 * Creates a folder if it doesn't already exist
 *
 * WHY WE NEED THIS:
 * Before saving files, the folder must exist or we get an error
 *
 * @param dir - The folder path to create
 */
async function ensureDirectoryExists(dir: string) {
  // fs.existsSync() checks if a folder/file exists (returns true/false)
  if (!fs.existsSync(dir)) {
    // fs.mkdirSync() creates the folder
    // { recursive: true } means "create parent folders too if needed"
    // Example: if "public/tools" doesn't exist, it creates that first
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
}

/**
 * Captures a single screenshot based on the specification
 *
 * @param context - The browser context (like an incognito window)
 * @param spec - The screenshot specification telling us what to capture
 * @returns An object with success status and file path or error message
 */
async function captureScreenshot(
  context: BrowserContext,
  spec: ScreenshotSpec,
  pageCache?: { url: string }
): Promise<{ success: boolean; path?: string; error?: string }> {
  // Create a new browser tab
  const page = await context.newPage()

  // Build the full file path where we'll save the screenshot
  const screenshotPath = path.join(config.outputDir, spec.filename)

  try {
    // Log what we're doing (helps with debugging)
    console.log(`\n📸 ${spec.name}`)
    console.log(`   📝 ${spec.description}`)

    // Set the browser window size
    // This affects how the website renders (responsive design)
    await page.setViewportSize(spec.viewport)

    // Navigate to the website
    console.log(`   🌐 Navigating to ${config.baseUrl}...`)
    await page.goto(config.baseUrl, {
      // 'networkidle' = wait until no network requests for 500ms
      // This ensures images and content have finished loading
      waitUntil: 'networkidle',
      timeout: config.timeout,
    })

    // Extra wait for the page structure to be ready
    await page.waitForLoadState('domcontentloaded')

    // Wait 2 seconds for animations to finish
    // Many websites have fade-in effects that we want to complete
    await page.waitForTimeout(2000)

    // Scroll to the right position on the page
    if (spec.scrollY && spec.scrollY > 0) {
      console.log(`   📜 Scrolling to position ${spec.scrollY}px...`)

      // page.evaluate() runs JavaScript code INSIDE the browser
      // window.scrollTo() is the browser's built-in scroll function
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'instant' })
      }, spec.scrollY)

      // Wait for any scroll-triggered animations
      await page.waitForTimeout(1000)
    }

    // If we specified a CSS selector to wait for, wait for it
    if (spec.waitFor) {
      await page.waitForSelector(spec.waitFor, { timeout: config.timeout })
    }

    // Take the screenshot!
    await page.screenshot({
      path: screenshotPath, // Where to save
      type: 'png', // Image format
      fullPage: false, // Only capture visible area, not entire scrollable page
    })

    console.log(`   ✅ Saved: ${spec.filename}`)
    return { success: true, path: screenshotPath }
  } catch (error) {
    // If anything went wrong, capture the error message
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error(`   ❌ Failed: ${errorMsg}`)
    return { success: false, error: errorMsg }
  } finally {
    // ALWAYS close the tab, even if there was an error
    // This prevents memory leaks
    await page.close()
  }
}

// ============================================================================
// RESULT TRACKING - Keep track of what succeeded/failed
// ============================================================================

interface CaptureResult {
  spec: ScreenshotSpec // Which screenshot this was
  success: boolean // Did it work?
  path?: string // File path if successful
  error?: string // Error message if failed
}

/**
 * Captures all screenshots defined in SCREENSHOT_SPECS
 *
 * @param browser - The Playwright browser instance
 * @returns Array of results for each screenshot attempt
 */
async function captureAllScreenshots(browser: Browser): Promise<CaptureResult[]> {
  console.log('\n🚀 Starting SubSense screenshot capture...')
  console.log(`   Target: ${config.baseUrl}`)
  console.log(`   Capturing ${SCREENSHOT_SPECS.length} screenshots\n`)

  // Create a browser context (like an incognito window)
  // All pages in this context share cookies, localStorage, etc.
  const context = await browser.newContext({
    viewport: config.desktopViewport,
    colorScheme: 'dark', // Request dark mode from the website
    // Pretend to be a real Mac Chrome browser
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })

  const results: CaptureResult[] = []

  // First, capture a full-page reference screenshot
  // This helps us see the entire page to adjust scroll positions
  console.log('📄 Capturing full-page reference...')
  const refPage = await context.newPage()
  try {
    await refPage.setViewportSize(config.desktopViewport)
    await refPage.goto(config.baseUrl, { waitUntil: 'networkidle', timeout: config.timeout })
    await refPage.waitForTimeout(2000)

    // Get total page height (for reference)
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

  // Now capture each specified screenshot
  for (const spec of SCREENSHOT_SPECS) {
    const result = await captureScreenshot(context, spec)
    results.push({
      spec,
      success: result.success,
      path: result.path,
      error: result.error,
    })
  }

  // Clean up - close the browser context
  await context.close()
  return results
}

// ============================================================================
// MAIN FUNCTION - The entry point that runs everything
// ============================================================================

async function main() {
  // Print a nice header
  console.log('')
  console.log('═'.repeat(60))
  console.log('  🎬 SubSense Screenshot Capture')
  console.log('═'.repeat(60))
  console.log('')
  console.log(`  Target URL: ${config.baseUrl}`)
  console.log(`  Output Dir: ${config.outputDir}`)
  console.log('')

  // Make sure the output folder exists
  await ensureDirectoryExists(config.outputDir)

  // Try different browser executable paths
  // This handles different environments (local, CI, Docker, etc.)
  const executablePaths = [
    '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  ].filter(Boolean) as string[]

  let browser: Browser | null = null

  // Try each path until one works
  for (const executablePath of [...executablePaths, undefined]) {
    try {
      console.log(
        `🔧 Launching browser${executablePath ? ` (${path.basename(executablePath)})` : ' (auto-detect)'}...`
      )
      browser = await chromium.launch({
        headless: true, // Run without visible window
        executablePath: executablePath,
      })
      console.log('   ✅ Browser launched successfully\n')
      break // Success! Exit the loop
    } catch (error) {
      console.log(`   ⚠️  Failed: ${error instanceof Error ? error.message.split('\n')[0] : error}`)
      if (executablePath === undefined) {
        throw new Error('Could not launch browser. Run: npx playwright install chromium')
      }
    }
  }

  if (!browser) {
    throw new Error('Failed to launch browser')
  }

  try {
    // Run the main capture process
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
    // ALWAYS close the browser
    await browser.close()
  }
}

// ============================================================================
// RUN THE SCRIPT
// ============================================================================

// main() returns a Promise. .catch() handles any errors
main().catch((error) => {
  console.error('\n❌ Fatal error:', error.message)
  console.log('\n💡 Troubleshooting:')
  console.log('   • Run: npm run screenshots:install')
  console.log('   • Check network connectivity to www.subsense.me')
  console.log('   • Try running in an environment without network restrictions')
  process.exit(1) // Exit with error code
})
