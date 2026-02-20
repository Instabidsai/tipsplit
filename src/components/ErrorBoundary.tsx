import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { logger } from "../lib/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error.message, "ErrorBoundary", {
      stack: error.stack ?? "no stack",
      componentStack: errorInfo.componentStack ?? "no component stack",
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
          <div className="card max-w-md text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-error/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-display-sm text-surface-900">
              Something went wrong
            </h2>
            <p className="text-surface-500">
              The calculator encountered an unexpected error. Please refresh the
              page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 active:scale-95 transition-all duration-150"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
