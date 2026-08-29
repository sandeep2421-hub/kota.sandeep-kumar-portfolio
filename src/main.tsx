import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  props: Readonly<Props>;
  state: Readonly<State>;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || 'Rendering error' };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.href = window.location.origin + window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-mono space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 text-xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold text-white">SYSTEM RECOVERY REQUIRED</h1>
          <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
            {this.state.errorMessage}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            RESET SYSTEM & RELOAD
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
