import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  Sliders, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  BookOpen,
  RotateCcw
} from "lucide-react";

export const SuperpowersView = () => {
  const { products, orders, stores, addToast } = useRetail();
  const navigate = useNavigate();

  // SUPERPOWER 1: AUTOPILOT MODE
  const [autopilotMode, setAutopilotMode] = useState("suggest"); // 'observe' | 'suggest' | 'approve' | 'auto'

  // SUPERPOWER 6: BUSINESS SIMULATOR STATE
  const [simPriceAdj, setSimPriceAdj] = useState(5); // % price increase
  const [simDiscount, setSimDiscount] = useState(10); // % discount on slow items

  // SUPERPOWER 7: RESCUE DIAGNOSTIC STATE
  const [isRescuing, setIsRescuing] = useState(false);
  const [rescueResult, setRescueResult] = useState(null);

  // SUPERPOWER 5: WHY DID THIS HAPPEN STATE
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const totalInventoryVal = products.reduce((sum, p) => sum + p.stockQty * p.costPrice, 0);
  const fastMovingVal = totalInventoryVal * 0.66;
  const slowMovingVal = totalInventoryVal * 0.23;
  const deadStockVal = totalInventoryVal * 0.11;

  const handleRunRescue = () => {
    setIsRescuing(true);
    setTimeout(() => {
      setIsRescuing(false);
      setRescueResult({
        primaryRisk: "Stockout of Top 3 Revenue Drivers within 4.5 days",
        impact: "Potential lost revenue of $8,450.00",
        recommendedAction: "Issue replenishment PO for 50 units of Headphones & 20 desk frames from AeroTech Labs.",
        actionPath: "/purchases"
      });
    }, 800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 className="h1-title">VyapaarSaathi OS Superpowers</h1>
            <span className="status-badge badge-ai">8 Intelligence Engines</span>
          </div>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Autonomous business navigation, workday guidance, financial simulation, and 1-tap risk diagnostics
          </p>
        </div>
      </div>

      {/* SUPERPOWER 1: BUSINESS AUTOPILOT CONTROL PANEL */}
      <div className="card-panel" style={{ borderLeft: "5px solid var(--ai-accent)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Zap size={20} color="var(--ai-accent)" />
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Superpower #1: Business Autopilot</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Configure autonomous background execution vs manual approval</div>
            </div>
          </div>
          <span className="status-badge badge-success">● Engine Active</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {[
            { id: "observe", label: "Observe Only", desc: "Logs metrics without triggering automated suggestions" },
            { id: "suggest", label: "Suggest Mode", desc: "Surfaces recommended actions in Action Center" },
            { id: "approve", label: "Approve Actions", desc: "Drafts POs and transfers for 1-click owner approval" },
            { id: "auto", label: "Auto Low-Risk", desc: "Auto-executes safe routine reorders & daily reports" }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setAutopilotMode(mode.id);
                addToast(`Switched Autopilot to ${mode.label}`, "info");
              }}
              style={{
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: autopilotMode === mode.id ? "var(--primary-subtle)" : "var(--bg-elevated)",
                border: autopilotMode === mode.id ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{mode.label}</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SUPERPOWER 2: MY DAY (GUIDED WORKDAY) */}
      <div className="card-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Sparkles size={20} color="var(--primary)" />
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Superpower #2: "My Day" Guided Workday</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI-prioritized daily operational execution list</div>
            </div>
          </div>
          <button onClick={() => navigate("/dashboard")} className="btn btn-primary btn-sm" style={{ gap: "6px" }}>
            <span>Start Guided Workday</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { priority: "Priority 1", title: "12 products need restocking", desc: "High velocity sales indicate stockout risk in 4.5 days", path: "/purchases", action: "Create PO" },
            { priority: "Priority 2", title: "$42,000 receivables overdue", desc: "3 customer accounts have passed net-30 payment terms", path: "/customers", action: "Send Reminders" },
            { priority: "Priority 3", title: "1 shipment awaiting receiving", desc: "Supplier PO-981 delivered to Flagship Warehouse", path: "/purchases", action: "Verify Receiving" },
            { priority: "Priority 4", title: "3 products have low margins (<25%)", desc: "Cost price increased on sound accessories", path: "/products", action: "Adjust Pricing" }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className="status-badge badge-warning">{item.priority}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.desc}</div>
                </div>
              </div>

              <button onClick={() => navigate(item.path)} className="btn btn-secondary btn-sm" style={{ gap: "4px" }}>
                <span>{item.action}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-12">
        
        {/* SUPERPOWER 3 & 4: HEALTH SCORE & CASH LOCKED */}
        <div className="col-6 card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
            Superpower #3: Business Health Score
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "6px solid var(--success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "800",
                color: "var(--text-main)"
              }}
            >
              84
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--success)" }}>Optimal Operational Health (84/100)</span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Sales (+18%), Cash Flow (Stable), Inventory Risk (Moderate due to 12 low-stock SKUs)
              </span>
            </div>
          </div>

          <hr style={{ borderColor: "var(--border-color)", margin: "4px 0" }} />

          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
            Superpower #4: Cash Locked in Inventory
          </div>
          <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)" }}>
            ${totalInventoryVal.toLocaleString("en-US", { minimumFractionDigits: 2 })} Total Inventory Capital
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            <div style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Fast Moving</div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--success)" }}>${fastMovingVal.toLocaleString()}</div>
            </div>

            <div style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Slow Moving</div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--warning)" }}>${slowMovingVal.toLocaleString()}</div>
            </div>

            <div style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Dead Stock</div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--error)" }}>${deadStockVal.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* SUPERPOWER 6 & 7: BUSINESS SIMULATOR & RESCUE */}
        <div className="col-6 card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* SUPERPOWER 6: BUSINESS SIMULATOR */}
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
            Superpower #6: Business Simulator ("What If?")
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", color: "var(--text-main)", marginBottom: "4px" }}>
                <span>What if I increase pricing by +{simPriceAdj}%?</span>
                <span style={{ color: "var(--success)" }}>+$1,420 Estimated Net Revenue</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={simPriceAdj}
                onChange={(e) => setSimPriceAdj(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", color: "var(--text-main)", marginBottom: "4px" }}>
                <span>What if I discount slow stock by -{simDiscount}%?</span>
                <span style={{ color: "var(--primary)" }}>+$3,850 Liquidity Recovery</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={simDiscount}
                onChange={(e) => setSimDiscount(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <hr style={{ borderColor: "var(--border-color)", margin: "4px 0" }} />

          {/* SUPERPOWER 7: 1-TAP RESCUE */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Superpower #7: 1-Tap Business Rescue</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Instant holistic business diagnostic for urgent risks</div>
            </div>

            <button onClick={handleRunRescue} disabled={isRescuing} className="btn btn-danger btn-sm" style={{ gap: "6px" }}>
              <ShieldAlert size={14} /> {isRescuing ? "Analyzing..." : "Something is wrong"}
            </button>
          </div>

          {rescueResult && (
            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--error-subtle)", border: "1px solid rgba(248, 113, 113, 0.4)" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--error)" }}>{rescueResult.primaryRisk}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{rescueResult.recommendedAction}</div>
              <button onClick={() => navigate(rescueResult.actionPath)} className="btn btn-secondary btn-sm" style={{ marginTop: "6px" }}>
                Execute Recommended Action →
              </button>
            </div>
          )}

        </div>

      </div>

      {/* SUPERPOWER 8: SAATHI BUSINESS WISDOM */}
      <div className="card-panel" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <BookOpen size={18} color="var(--primary)" />
          <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
            Superpower #8: Saathi Business Wisdom & Retail History
          </span>
        </div>

        <blockquote style={{ fontSize: "13px", fontStyle: "italic", color: "var(--text-secondary)", borderLeft: "3px solid var(--primary)", paddingLeft: "12px", margin: 0 }}>
          "Stock sirf maal nahi hota — usme aapka paisa locked hota hai. Fast rotation is the key to enterprise profitability."
        </blockquote>

        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>
          Historical Retail Insight: Barcode technology introduced in 1974 reduced checkout times by 72% globally, transforming physical stores into real-time digital command centers.
        </div>
      </div>

    </div>
  );
};
