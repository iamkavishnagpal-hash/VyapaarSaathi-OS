import React, { useState, useEffect } from "react";
import { Cpu, CheckCircle2, RefreshCw } from "lucide-react";

export const SystemBootModal = ({ isOpen, onClose }) => {
  const [bootStep, setBootStep] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  const steps = [
    "Initializing Spatial UI Engine & Render Subsystem...",
    "Loading AI Vision Camera Model (TensorFlow/Code128)...",
    "Connecting Inventory Telemetry & POS Counter Sync...",
    "Validating Multi-Channel Bridge (Shopify & WMS)...",
    "System Boot Complete: Retail OS Ready!"
  ];

  useEffect(() => {
    if (isOpen) {
      setBootStep(0);
      setIsBooting(true);

      const interval = setInterval(() => {
        setBootStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setIsBooting(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        background: "rgba(11, 15, 23, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div 
        style={{
          width: "560px",
          maxWidth: "90vw",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
          textAlign: "center"
        }}
      >
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "1px solid rgba(37, 99, 235, 0.3)" }}>
          <Cpu size={32} color="var(--primary)" className={isBooting ? "spin-slow" : ""} />
        </div>

        <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
          Retail Business OS
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-main)", margin: "0 0 20px 0" }}>
          System Initialization Sequence
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", marginBottom: "24px" }}>
          {steps.map((text, idx) => {
            const isActive = idx === bootStep;
            const isPassed = idx <= bootStep;

            return (
              <div
                key={idx}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: isActive ? "rgba(37, 99, 235, 0.12)" : "rgba(0,0,0,0.1)",
                  border: isActive ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: isPassed ? "var(--text-main)" : "var(--text-dim)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {isActive && isBooting ? (
                  <RefreshCw size={14} color="var(--primary)" className="spin-slow" />
                ) : isPassed ? (
                  <CheckCircle2 size={14} color="#10B981" />
                ) : (
                  <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1px solid var(--text-dim)" }} />
                )}
                <span>{text}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          disabled={isBooting}
          className="btn btn-primary"
          style={{
            minHeight: "44px",
            width: "100%",
            borderRadius: "9999px",
            fontWeight: "800",
            fontSize: "14px"
          }}
        >
          {isBooting ? "Booting OS Subsystems..." : "Enter Retail OS Control Center →"}
        </button>
      </div>
    </div>
  );
};
