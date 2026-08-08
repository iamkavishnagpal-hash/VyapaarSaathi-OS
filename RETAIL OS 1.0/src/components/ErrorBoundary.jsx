import React from "react";
import { AlertTriangle, RefreshCw, RotateCcw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Retail OS Runtime Error Caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetState = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (_err) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            background: "#0B0F17",
            color: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textAlign: "center"
          }}
        >
          <div
            style={{
              maxWidth: "520px",
              width: "100%",
              background: "#111726",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(244, 63, 94, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto"
              }}
            >
              <AlertTriangle size={28} color="#F43F5E" />
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px", color: "#ffffff" }}>
              Retail OS Diagnostic Recovery
            </h2>

            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: "1.6", marginBottom: "20px" }}>
              An unexpected UI runtime error occurred. You can refresh the application or reset local workspace state below.
            </p>

            {this.state.error && (
              <div
                style={{
                  padding: "12px",
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#F87171",
                  marginBottom: "24px",
                  textAlign: "left",
                  overflowX: "auto"
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
                style={{
                  minHeight: "44px",
                  padding: "0 20px",
                  borderRadius: "9999px",
                  fontWeight: "700",
                  fontSize: "13px",
                  background: "#2563EB",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <RefreshCw size={16} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="btn btn-secondary"
                style={{
                  minHeight: "44px",
                  padding: "0 20px",
                  borderRadius: "9999px",
                  fontWeight: "700",
                  fontSize: "13px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#F8FAFC",
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <RotateCcw size={16} />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
