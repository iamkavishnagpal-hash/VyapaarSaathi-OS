import React, { useState, useEffect } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  X, 
  RefreshCw, 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export const ProductCaptureModal = () => {
  const { isCaptureModalOpen, setIsCaptureModalOpen, addProduct, openProductIdentity } = useRetail();

  const [step, setStep] = useState("camera"); // 'camera' | 'processing' | 'review'
  const [processingIndex, setProcessingIndex] = useState(0);
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Extracted AI attributes with confidence scores
  const [extractedData, setExtractedData] = useState({
    title: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "Electronics",
    subCategory: "Wireless Audio",
    color: "Silver Platinum",
    size: "Standard",
    model: "WH-1000XM5",
    costPrice: "210.00",
    sellingPrice: "399.99",
    manufacturer: "Sony Electronics Inc.",
    stockQty: "25",
    aiConfidence: {
      brand: 99,
      title: 98,
      category: 96,
      color: 95,
      price: 92,
      overall: 96
    }
  });

  const processingSteps = [
    "Reading physical product label & barcode...",
    "Detecting brand, model, & color attributes...",
    "Checking catalog duplicate records...",
    "Generating SKU identity & QR barcode..."
  ];

  useEffect(() => {
    if (step === "processing") {
      setProcessingIndex(0);
      const interval = setInterval(() => {
        setProcessingIndex((prev) => {
          if (prev >= processingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setStep("review"), 600);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isCaptureModalOpen) return null;

  const handleCapture = () => {
    setStep("processing");
  };

  const handleCreateProduct = () => {
    const created = addProduct(extractedData);
    setIsCaptureModalOpen(false);
    setStep("camera");
    if (created) {
      openProductIdentity(created);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(8, 11, 16, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000
      }}
      onClick={() => setIsCaptureModalOpen(false)}
    >
      <div
        className="card-panel-elevated"
        style={{
          width: "100%",
          maxWidth: "680px",
          padding: 0,
          overflow: "hidden",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "var(--radius-sm)", background: "linear-gradient(135deg, var(--primary) 0%, var(--ai-accent) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={18} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)" }}>AI Physical Product Capture</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Computer vision label extraction & Identity creation</div>
            </div>
          </div>

          <button onClick={() => setIsCaptureModalOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: CAMERA VIEWFINDER */}
        {step === "camera" && (
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            
            {/* FRAMING GUIDE OVERLAY */}
            <div
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#000000",
                borderRadius: "var(--radius-md)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-color)"
              }}
            >
              {/* CAMERA FEED SIMULATION BG */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(91, 140, 255, 0.15) 0%, rgba(8, 11, 16, 0.9) 100%)"
                }}
              />

              {/* TARGET FRAMING CORNERS */}
              <div
                style={{
                  position: "relative",
                  width: "75%",
                  height: "75%",
                  border: "2px dashed var(--primary)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 20px rgba(91, 140, 255, 0.2)"
                }}
              >
                <Camera size={40} color="var(--primary)" style={{ opacity: 0.8 }} />
                <span style={{ fontSize: "12px", color: "var(--text-main)", fontWeight: "600", marginTop: "8px" }}>
                  Position Product Box / Label in Frame
                </span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  AI will recognize Brand, SKU, and Specs
                </span>
              </div>

              {/* CAMERA CONTROLS BAR */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  display: "flex",
                  gap: "12px",
                  backgroundColor: "rgba(14, 19, 26, 0.8)",
                  backdropFilter: "blur(4px)",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-pill)"
                }}
              >
                <button
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: isFlashOn ? "var(--warning)" : "var(--text-muted)" }}
                >
                  <Zap size={14} /> Flash {isFlashOn ? "ON" : "OFF"}
                </button>
                <button className="btn btn-ghost btn-sm">
                  <RefreshCw size={14} /> Switch Camera
                </button>
              </div>
            </div>

            <button
              onClick={handleCapture}
              className="btn btn-ai btn-lg"
              style={{ width: "100%", gap: "8px" }}
            >
              <Sparkles size={18} />
              <span>Capture & Analyze Product (AI)</span>
            </button>
          </div>
        )}

        {/* STEP 2: AI PROCESSING ANIMATION */}
        {step === "processing" && (
          <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <Loader2 size={48} color="var(--ai-accent)" style={{ animation: "spin 1s linear infinite" }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)", marginBottom: "4px" }}>
                AI Identity Recognition Engine Running
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Extracting barcode details, model specs, and catalog parameters...
              </div>
            </div>

            {/* PROGRESS CHECKLIST */}
            <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {processingSteps.map((stepText, idx) => {
                const isDone = idx < processingIndex;
                const isCurrent = idx === processingIndex;
                return (
                  <div
                    key={stepText}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      backgroundColor: isCurrent ? "var(--bg-elevated)" : "transparent",
                      color: isDone ? "var(--success)" : isCurrent ? "var(--text-main)" : "var(--text-muted)",
                      fontSize: "13px"
                    }}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} color="var(--success)" />
                    ) : isCurrent ? (
                      <Loader2 size={16} color="var(--ai-accent)" style={{ animation: "spin 1s linear infinite" }} />
                    ) : (
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid var(--border-color)" }} />
                    )}
                    <span style={{ fontWeight: isCurrent ? "700" : "500" }}>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: AI CONFIDENCE REVIEW & OVERRIDE */}
        {step === "review" && (
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* OVERALL CONFIDENCE HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--ai-subtle)",
                border: "1px solid rgba(124, 108, 255, 0.3)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={20} color="var(--ai-accent)" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>
                    Product Identity Extracted ({extractedData.aiConfidence.overall}% AI Confidence)
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Review detected parameters before committing to live catalog
                  </div>
                </div>
              </div>
              <span className="status-badge badge-ai">Verified</span>
            </div>

            {/* EDITABLE ATTRIBUTES FORM WITH CONFIDENCE SCORES */}
            <div className="grid-12" style={{ gap: "12px" }}>
              
              <div className="col-8">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Product Title</span>
                  <span style={{ color: "var(--success)" }}>{extractedData.aiConfidence.title}% Match</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.title}
                  onChange={(e) => setExtractedData({ ...extractedData, title: e.target.value })}
                />
              </div>

              <div className="col-4">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Brand</span>
                  <span style={{ color: "var(--success)" }}>{extractedData.aiConfidence.brand}%</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.brand}
                  onChange={(e) => setExtractedData({ ...extractedData, brand: e.target.value })}
                />
              </div>

              <div className="col-4">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Category</span>
                  <span style={{ color: "var(--success)" }}>{extractedData.aiConfidence.category}%</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.category}
                  onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value })}
                />
              </div>

              <div className="col-4">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Color / Variant</span>
                  <span style={{ color: "var(--success)" }}>{extractedData.aiConfidence.color}%</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.color}
                  onChange={(e) => setExtractedData({ ...extractedData, color: e.target.value })}
                />
              </div>

              <div className="col-4">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Selling Price ($)</span>
                  <span style={{ color: "var(--success)" }}>{extractedData.aiConfidence.price}%</span>
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.sellingPrice}
                  onChange={(e) => setExtractedData({ ...extractedData, sellingPrice: e.target.value })}
                />
              </div>

              <div className="col-6">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>
                  Cost Price ($)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.costPrice}
                  onChange={(e) => setExtractedData({ ...extractedData, costPrice: e.target.value })}
                />
              </div>

              <div className="col-6">
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>
                  Initial Stock Quantity
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.stockQty}
                  onChange={(e) => setExtractedData({ ...extractedData, stockQty: e.target.value })}
                />
              </div>

            </div>

            {/* ACTION FOOTER */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
              <button onClick={() => setStep("camera")} className="btn btn-secondary">
                Re-capture
              </button>
              <button onClick={handleCreateProduct} className="btn btn-primary" style={{ gap: "6px" }}>
                <span>Confirm & Generate Identity Card</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
