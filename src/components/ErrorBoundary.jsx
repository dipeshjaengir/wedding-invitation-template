import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught a critical runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-theme-bg flex items-center justify-center text-center p-6">
          <div className="max-w-md p-8 rounded-xl border border-theme-primary/20 bg-theme-card/80 backdrop-blur-md shadow-lg space-y-6">
            <h2 className="font-heading text-xl text-theme-primary tracking-widest uppercase">
              A Gracious Interruption
            </h2>
            <p className="font-body text-theme-text-muted text-sm leading-relaxed">
              We encountered a minor issue loading this segment. Please refresh the page to experience the invitation.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-2.5 font-heading text-xs tracking-widest text-theme-bg bg-theme-primary hover:bg-theme-accent rounded transition-all duration-300 uppercase font-semibold cursor-pointer"
            >
              Refresh Invitation
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
