# Scripts

Utility scripts for the Six1Five Devs website.

## Screenshot Capture

Captures screenshots of tool websites in dark mode using Playwright.

### Setup

```bash
# Install Playwright browsers (one-time setup)
npm run screenshots:install
```

### Usage

```bash
# Capture all tool screenshots
npm run screenshots
```

### Output

Screenshots are saved to `public/tools/screenshots/` with the naming convention:
- `{tool-slug}-hero.png` - Main hero screenshot

### Configuration

Edit `scripts/capture-screenshots.ts` to:
- Add new tools to capture
- Change viewport size (default: 1280x720)
- Modify dark mode detection selectors
- Add additional screenshot types

### Troubleshooting

If screenshots aren't capturing in dark mode:
1. Check if the site has a dark mode toggle
2. Add custom selectors to `enableDarkMode()` function
3. Some sites may need JavaScript execution to switch themes
