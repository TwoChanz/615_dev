import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

import { validateDownloadToken } from "@/lib/download-token"
import { VALID_LEAD_MAGNETS } from "@/lib/validation"

// Map magnet IDs to file names
const MAGNET_FILES: Record<string, string> = {
  "saas-checklist": "saas-launch-checklist.html",
  "tech-stack-guide": "tech-stack-guide-2026.html",
  "automation-starter": "automation-workflows.html",
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ magnetId: string }> }
) {
  const { magnetId } = await params
  const token = request.nextUrl.searchParams.get("token")

  // Validate magnet ID
  if (!VALID_LEAD_MAGNETS.includes(magnetId as typeof VALID_LEAD_MAGNETS[number])) {
    return NextResponse.json(
      { error: "Invalid download" },
      { status: 404 }
    )
  }

  // Require token
  if (!token) {
    return NextResponse.json(
      { error: "Download link required. Subscribe to get access." },
      { status: 401 }
    )
  }

  // Validate token
  const payload = validateDownloadToken(token)
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid or expired download link. Please subscribe again." },
      { status: 401 }
    )
  }

  // Verify token is for this magnet
  if (payload.magnetId !== magnetId) {
    return NextResponse.json(
      { error: "This download link is for a different resource." },
      { status: 403 }
    )
  }

  // Get file path
  const fileName = MAGNET_FILES[magnetId]
  if (!fileName) {
    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 }
    )
  }

  try {
    // Read file from content directory (not public)
    const filePath = path.join(process.cwd(), "content", "downloads", fileName)
    const content = await readFile(filePath, "utf-8")

    // Log download for analytics
    console.log("[Download] Lead magnet accessed:", {
      magnetId,
      email: payload.email,
      timestamp: new Date().toISOString(),
    })

    // Return HTML content
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, max-age=3600", // Cache for 1 hour (private)
      },
    })
  } catch (error) {
    console.error("[Download] Error reading file:", error)
    return NextResponse.json(
      { error: "Failed to load resource" },
      { status: 500 }
    )
  }
}
