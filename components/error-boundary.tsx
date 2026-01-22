"use client"

import * as Sentry from "@sentry/nextjs"
import { Component, ErrorInfo, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-6 text-destructive" />
          </div>

          <h3 className="mt-4 font-semibold">Something went wrong</h3>

          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            An error occurred while loading this section. Please try again.
          </p>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-4 max-w-full overflow-auto rounded bg-muted p-2 text-left text-xs text-muted-foreground">
              {this.state.error.message}
            </pre>
          )}

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={this.handleRetry}
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to manually trigger error boundary
export function useErrorBoundary() {
  return {
    captureError: (error: Error, context?: Record<string, unknown>) => {
      Sentry.captureException(error, { extra: context })
    },
  }
}
