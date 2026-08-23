import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  /** Changing this clears a caught error. Pass the route to recover on navigation. */
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === 'string') {
    return new Error(value);
  }
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

function DefaultFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f2e8] p-6 text-[#3d2339]">
      <div className="max-w-md w-full text-center bg-[#fff9f0] border border-[#cfbea8] p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(80,42,47,.08)]">
        <h1 className="display text-3xl font-semibold text-[#3d2339]">
          Something went a little off-recipe
        </h1>
        <p className="mt-3 text-sm text-[#6e5763] leading-6">
          We encountered an unexpected error rendering this view. Please try refreshing or reloading the page.
        </p>
        {import.meta.env.DEV ? (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-[#f8f2e8] p-3 text-left text-xs text-[#3d2339] border border-[#cfbea8]">
            {error.message || String(error)}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={resetError}
          className="solid-button mt-6 inline-flex items-center gap-2 rounded-full bg-[#d86343] px-6 py-3.5 text-xs font-bold text-[#fff8ee]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error(
      'ErrorBoundary caught an error:',
      toError(error),
      info.componentStack,
    );
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.error !== null &&
      prevProps.resetKey !== this.props.resetKey
    ) {
      this.resetError();
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) {
      return this.props.children;
    }
    const Fallback = this.props.FallbackComponent ?? DefaultFallback;
    return <Fallback error={error} resetError={this.resetError} />;
  }
}
