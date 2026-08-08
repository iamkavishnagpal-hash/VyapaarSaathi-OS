import React, { useState, useEffect } from "react";
import { Camera, Sparkles, CheckCircle2, X, RefreshCw, Layers, Tag, DollarSign, ShieldCheck } from "lucide-react";
import { useRetail } from "../context/RetailContext";

export const ProductCaptureModal = ({ isOpen, onClose }) => {
  const { addProduct } = useRetail();
  
  const [step, setStep] = useState(1); // 1: Camera Viewport, 2: AI Processing Animation, 3: Review & Save
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedData, setExtractedData] = useState({
    title: "Nike Air Max 270 Black",
    brand: "Nike",
    category: "Footwear",
    subcategory: "Sneakers",
    color: "Black / White",
    size: "UK 9",
    costPrice: 4200,
    sellingPrice: 7995,
    sku: "NIKE-AIR-270-BLK-9",
    barcode: "8904567890123"
  });

  const aiSteps = [
    { text: "Reading product label & logo text...", doneAt: 25 },
    { text: "Detecting attributes (Color, Size, SKU)...", doneAt: 55 },
    { text: "Checking for existing duplicate inventory...", doneAt: 80 },
    { text: "Generating 128-bit Barcode & Product Identity...", doneAt: 100 }
  ];

  useEffect(() => {
    if (step === 2) {
      setProcessingProgress(0);
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 400);
            return 100;
          }
          return prev + 5;
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleSaveProduct = () => {
    addProduct({
      title: extractedData.title,
      category: extractedData.category,
      brand: extractedData.brand,
      costPrice: Number(extractedData.costPrice),
      sellingPrice: Number(extractedData.sellingPrice),
      stockQty: 12,
      lowStockThreshold: 3,
      sku: extractedData.sku,
      barcode: extractedData.barcode,
      godownLocation: "Rack B4"
    });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "16px",
          padding: "28px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)"
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Camera size={20} color="var(--primary)" /> Camera-First Product Onboarding
            </h3>
            <div className="caption">AI extracts attributes, brand, SKU & price automatically</div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        {/* STEP 1: CAMERA VIEWPORT SIMULATION */}
        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "260px",
                borderRadius: "12px",
                background: "#04060A",
                border: "2px dashed var(--primary)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <Camera size={44} color="var(--primary)" style={{ marginBottom: "12px" }} />
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>
                Position product in camera frame
              </div>
              <div className="caption" style={{ maxWidth: "320px", marginTop: "4px" }}>
                AI Vision will scan the box, label, and barcode in real-time.
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary"
              style={{ width: "100%", minHeight: "48px", fontSize: "15px", fontWeight: "700" }}
            >
              <Sparkles size={18} />
              <span>Capture & Analyze Product</span>
            </button>
          </div>
        )}

        {/* STEP 2: PROGRESSIVE AI PROCESSING ANIMATION */}
        {step === 2 && (
          <div style={{ padding: "20px 0" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <RefreshCw size={36} color="var(--primary)" className="spin-slow" style={{ margin: "0 auto 12px auto" }} />
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>
                AI Vision Processing ({processingProgress}%)
              </h4>
            </div>

            {/* PROGRESS STEPS LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {aiSteps.map((s, idx) => {
                const isDone = processingProgress >= s.doneAt;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: isDone ? "rgba(40, 183, 123, 0.08)" : "var(--bg-elevated)",
                      border: isDone ? "1px solid rgba(40, 183, 123, 0.25)" : "1px solid var(--border-color)",
                      transition: "all 0.2s"
                    }}
                  >
                    <CheckCircle2 size={16} color={isDone ? "var(--success)" : "var(--text-muted)"} />
                    <span style={{ fontSize: "13px", fontWeight: isDone ? "700" : "500", color: isDone ? "var(--text-main)" : "var(--text-muted)" }}>
                      {s.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW DETECTED INFORMATION */}
        {step === 3 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Product Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.title}
                  onChange={(e) => setExtractedData({ ...extractedData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Brand (98% AI Confidence)</label>
                <input
                  type="text"
                  className="input-field"
                  value={extractedData.brand}
                  onChange={(e) => setExtractedData({ ...extractedData, brand: e.target.value })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Cost Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.costPrice}
                  onChange={(e) => setExtractedData({ ...extractedData, costPrice: e.target.value })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Selling MRP (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  value={extractedData.sellingPrice}
                  onChange={(e) => setExtractedData({ ...extractedData, sellingPrice: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid var(--border-color)" }}>
              <button onClick={() => setStep(1)} className="btn btn-secondary">Recapture</button>
              <button onClick={handleSaveProduct} className="btn btn-primary">
                <CheckCircle2 size={16} />
                <span>Save to Inventory</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
