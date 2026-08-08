import React, { useState } from "react";
import { 
  Brain, 
  Play, 
  Database, 
  Layers, 
  CheckCircle2, 
  X, 
  Zap, 
  Info, 
  Activity,
  Cpu,
  RefreshCw
} from "lucide-react";

export const featureIntelligenceRegistry = {
  dashboard: {
    title: "Executive Control Center & Multi-Channel Bridge",
    purpose: "Unified telemetry engine linking physical POS counters, Shopify web storefront, and central warehouse stock.",
    whyExists: "Eliminates stockout risks and cashflow delays by providing instant end-to-end visibility across physical and digital sales channels.",
    userFlow: [
      "View real-time sales telemetry across POS & Online",
      "Click Multi-Channel Bridge nodes to inspect inventory state",
      "Execute AI Advisor re-engagement campaigns",
      "Monitor warehouse capacity progress tracks"
    ],
    systemBehavior: [
      "Polls POS SQLite proxy & Shopify GraphQL endpoint every 12ms",
      "Calculates Gross Sales & Net Profit margins after COGS automatically",
      "Triggers low-stock alerts when inventory drops below safety threshold",
      "Updates GSTR-3B tax ledger for CGST & SGST compliance"
    ],
    impact: [
      "Revenue tracking 100% reconciled in real-time",
      "Automated PO dispatch ready within 24 hours",
      "Zero catalog discrepancies between physical & web stores"
    ],
    simulationSteps: [
      "Initializing POS Telemetry Listener...",
      "Fetching Live Orders from Counter #1 & Shopify...",
      "Reconciling Inventory Deductions against Warehouse Database...",
      "Calculating Net Margin (38%) & Tax Liability...",
      "Bridge Synced: All 5 Retail Outlets Operational!"
    ]
  },

  inventory: {
    title: "AI Product Identity & Inventory Management",
    purpose: "Converts physical products into AI-understood digital identities linked with SKUs, barcodes, and stock levels.",
    whyExists: "Legacy inventory systems require manual data entry; this AI vision pipeline extracts attributes and generates barcodes in seconds.",
    userFlow: [
      "Capture product image via AI Camera Vision",
      "AI detects object category, brand, and selling price",
      "System auto-generates SKU, barcode, and batch number",
      "Stock level and godown location saved to database"
    ],
    systemBehavior: [
      "Triggers TensorFlow/Vision model for attribute extraction",
      "Generates Code128 / EAN-13 barcode binary stream",
      "Inserts item into central product catalog table",
      "Notifies POS terminals of new item availability"
    ],
    impact: [
      "Reduces item onboarding time from 5 mins to 8 seconds",
      "Prevents duplicate SKU creation with barcode verification",
      "Enables automated stock reorder triggers"
    ],
    simulationSteps: [
      "Activating AI Camera Vision Viewport...",
      "Detecting Object: Wireless Bluetooth Earbuds Pro (Confidence: 98.4%)...",
      "Extracting Attributes: Category=Electronics, Price=₹2,499, GST=18%...",
      "Generating Barcode: BAR-8894102-PRO...",
      "Product Identity Created & Synced to All Outlets!"
    ]
  },

  pos: {
    title: "High-Speed Counter POS & Thermal Receipt Engine",
    purpose: "Offline-first point-of-sale counter billing supporting barcode scanning, GST breakdown, and instant payment settlement.",
    whyExists: "Retail counters cannot afford downtime; this engine works offline with local SQLite storage and syncs automatically when online.",
    userFlow: [
      "Scan barcode or select item from fast catalog",
      "Select customer or issue quick cash/UPI bill",
      "Apply line-item discounts and tax calculations",
      "Complete checkout & print thermal receipt"
    ],
    systemBehavior: [
      "Deducts stock quantity from local cache immediately",
      "Calculates CGST (9%) + SGST (9%) line breakdown",
      "Enqueues transaction sync payload to cloud server",
      "Sends ESC/POS command to local thermal receipt printer"
    ],
    impact: [
      "Average bill creation time under 6 seconds",
      "Zero sales loss during internet outages",
      "Instant WhatsApp digital receipt delivery"
    ],
    simulationSteps: [
      "Barcode Scanned: BAR-8894102-PRO...",
      "Adding Item to POS Cart (Price: ₹2,499)...",
      "Calculating GST: CGST ₹224.91 + SGST ₹224.91...",
      "Processing Instant UPI QR Settlement...",
      "Checkout Complete! Printing ESC/POS Receipt #POS-9920!"
    ]
  },

  ai: {
    title: "AI Co-Pilot & Scenario Simulation Core",
    purpose: "Generative AI advisor analyzing customer purchasing trends, stock risks, and ROI campaign triggers.",
    whyExists: "Replaces guesswork with data-driven decision intelligence for pricing, promotions, and reordering.",
    userFlow: [
      "Ask AI Co-Pilot voice or text queries",
      "Inspect AI reasoning breakdown and confidence scores",
      "Run 'What-If' scenario simulations (e.g. +20% sales demand)",
      "One-click execute recommended WhatsApp campaigns"
    ],
    systemBehavior: [
      "Executes RAG vector search across sales & customer tables",
      "Generates predictive forecasting models",
      "Calculates confidence score based on historical purchase frequency",
      "Prepares automated marketing payload"
    ],
    impact: [
      "+18.4% average revenue lift from targeted win-back campaigns",
      "Reduces dead stock by 34% through predictive ordering",
      "Automates VIP customer engagement"
    ],
    simulationSteps: [
      "Analyzing 1,420 Historical Customer Ledger Entries...",
      "Identified 12 VIP Customers Inactive > 30 Days...",
      "Calculating Campaign ROI: Estimated +₹48,000 Revenue...",
      "Generating Discount Coupon Code: DIWALI10...",
      "Recommendation Ready: 92% Confidence Score!"
    ]
  },

  analytics: {
    title: "Executive Business Telemetry & Financial Reports",
    purpose: "Real-time analytics engine tracking gross margins, channel performance, and GSTR-3B tax compliance.",
    whyExists: "Provides owners and financial teams with audited cashflow metrics without manual spreadsheet calculations.",
    userFlow: [
      "View daily, weekly, and monthly revenue trends",
      "Inspect store-by-store sales breakdown",
      "Export GST tax reconciliation logs",
      "Review inventory turnover velocity"
    ],
    systemBehavior: [
      "Aggregates POS and e-commerce ledger records",
      "Computes moving averages for demand forecasting",
      "Formats audit trails for GSTR-3B return filing",
      "Monitors payment gateway settlement timelines"
    ],
    impact: [
      "Audit-ready GST tax reports generated instantly",
      "Full visibility into gross margin vs operating expenses",
      "Prevents capital tie-up in slow-moving inventory"
    ],
    simulationSteps: [
      "Connecting to Financial Ledger Aggregator...",
      "Compiling 182 Transactions for Current Billing Cycle...",
      "Reconciling Payment Gateways (Razorpay/UPI/Cash)...",
      "Generating GSTR-3B Tax Schedule...",
      "Analytics Dashboard Rendered: 100% Audit Verified!"
    ]
  }
};

export const PrototypeIntelligencePanel = ({ 
  isOpen, 
  onClose, 
  activeFeatureId = "dashboard" 
}) => {
  const [activeTab, setActiveTab] = useState("explain"); // 'explain' | 'impact' | 'simulation'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const feature = featureIntelligenceRegistry[activeFeatureId] || featureIntelligenceRegistry.dashboard;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= feature.simulationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "520px",
        maxWidth: "92vw",
        zIndex: 1100,
        background: "var(--bg-surface)",
        borderLeft: "1px solid var(--border-color)",
        boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.6)",
        display: "flex",
        flexDirection: "column",
        animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {/* HEADER */}
      <div 
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--bg-card)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Brain size={20} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Prototype Intelligence Layer
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", margin: 0 }}>
              {feature.title}
            </h3>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="btn btn-ghost"
          style={{ padding: "6px", minWidth: "36px", minHeight: "36px", color: "var(--text-muted)" }}
          aria-label="Close Intelligence Panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* MODE TABS */}
      <div 
        style={{
          display: "flex",
          padding: "8px 24px",
          background: "rgba(0, 0, 0, 0.12)",
          borderBottom: "1px solid var(--border-color)",
          gap: "8px"
        }}
      >
        <button
          onClick={() => setActiveTab("explain")}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "explain" ? "var(--primary)" : "transparent",
            color: activeTab === "explain" ? "#ffffff" : "var(--text-muted)",
            fontWeight: "700",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          <Info size={14} /> <span>1. Explain Mode</span>
        </button>

        <button
          onClick={() => setActiveTab("impact")}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "impact" ? "var(--primary)" : "transparent",
            color: activeTab === "impact" ? "#ffffff" : "var(--text-muted)",
            fontWeight: "700",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          <Layers size={14} /> <span>2. Impact Mode</span>
        </button>

        <button
          onClick={() => setActiveTab("simulation")}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "simulation" ? "#10B981" : "transparent",
            color: activeTab === "simulation" ? "#ffffff" : "var(--text-muted)",
            fontWeight: "700",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          <Play size={14} /> <span>3. Simulate Mode</span>
        </button>
      </div>

      {/* BODY CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* TAB 1: EXPLAIN MODE */}
        {activeTab === "explain" && (
          <>
            <div className="glass-card" style={{ padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
                What This Feature Does
              </div>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-main)", margin: 0 }}>
                {feature.purpose}
              </p>
            </div>

            <div className="glass-card" style={{ padding: "16px", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.25)", borderRadius: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#60A5FA", textTransform: "uppercase", marginBottom: "6px" }}>
                Why It Exists (Business Value)
              </div>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-main)", margin: 0 }}>
                {feature.whyExists}
              </p>
            </div>

            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Zap size={14} color="var(--primary)" /> <span>User Action Flow</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {feature.userFlow.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(0,0,0,0.1)", border: "1px solid var(--border-color)", borderRadius: "8px", fontSize: "12px", color: "var(--text-main)" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: IMPACT MODE */}
        {activeTab === "impact" && (
          <>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Database size={14} color="var(--primary)" /> <span>System Behavior & Database Changes</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {feature.systemBehavior.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "10px", fontSize: "12px", color: "var(--text-main)" }}>
                    <Cpu size={16} color="var(--primary)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ lineHeight: "1.5" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Activity size={14} color="#10B981" /> <span>Business Impact Visualization</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {feature.impact.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "10px", fontSize: "12px", color: "#34D399" }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: "600" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 3: SIMULATION MODE */}
        {activeTab === "simulation" && (
          <>
            <div className="glass-card" style={{ padding: "16px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "#34D399", marginBottom: "4px" }}>
                Interactive Prototype Simulation
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 14px 0" }}>
                Click below to watch a simulated execution of this feature's underlying AI model and database operations.
              </p>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="btn btn-primary"
                style={{
                  minHeight: "44px",
                  padding: "0 24px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  fontWeight: "800",
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={16} className="spin-slow" />
                    <span>Running Simulation...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>👉 Run Action Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* SIMULATION STEP ANIMATION LOG */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Execution Terminal Output
              </div>

              {feature.simulationSteps.map((stepText, idx) => {
                const isActive = isSimulating && idx === simStep;
                const isPassed = isSimulating ? idx < simStep : true;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: isActive 
                        ? "rgba(16, 185, 129, 0.15)" 
                        : isPassed 
                        ? "rgba(0,0,0,0.2)" 
                        : "rgba(0,0,0,0.05)",
                      border: isActive 
                        ? "1px solid #10B981" 
                        : "1px solid var(--border-color)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: isActive ? "#34D399" : isPassed ? "var(--text-main)" : "var(--text-dim)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {isActive ? (
                      <RefreshCw size={14} color="#10B981" className="spin-slow" />
                    ) : isPassed ? (
                      <CheckCircle2 size={14} color="#10B981" />
                    ) : (
                      <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1px solid var(--text-dim)", display: "inline-block" }} />
                    )}
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>

      {/* FOOTER */}
      <div 
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border-color)",
          background: "var(--bg-card)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          OS Intelligence v2.4 • Active Node: {activeFeatureId.toUpperCase()}
        </span>
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{ minHeight: "36px", padding: "0 16px", fontSize: "12px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
