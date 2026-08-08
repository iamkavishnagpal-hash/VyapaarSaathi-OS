import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { ActionCenter } from "../components/ActionCenter";
import { 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Truck, 
  Sparkles, 
  ArrowUpRight, 
  Camera, 
  ScanLine, 
  ShoppingBag, 
  ArrowRight, 
  DollarSign, 
  Package, 
  Clock, 
  Zap, 
  Store 
} from "lucide-react";

export const DashboardView = () => {
  const { products, orders, events, stores, setIsCaptureModalOpen, openScanner, openProductPassport } = useRetail();
  const navigate = useNavigate();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;
  const unverifiedCount = products.filter((p) => !p.isVerified).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* 1. BUSINESS PULSE (EXECUTIVE OVERVIEW BANNER) */}
      <motion.div
        className="business-pulse-banner"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pulse-header">
          <div className="pulse-title-group">
            <div className="system-pulse-dot" />
            <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.01em" }}>
              BUSINESS PULSE
            </span>
            <span className="status-badge badge-success">Live Operational Stream</span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setIsCaptureModalOpen(true)} className="btn btn-ai" style={{ gap: "6px" }}>
              <Camera size={14} /> Product Analysis
            </button>
            <button onClick={() => openScanner("Sale")} className="btn btn-secondary" style={{ gap: "6px" }}>
              <ScanLine size={14} /> Barcode Scanner
            </button>
          </div>
        </div>

        {/* PULSE CHIPS ROW */}
        <div className="pulse-chips-row">
          <div className="pulse-chip">
            <DollarSign size={16} color="var(--success)" />
            <span>Revenue <strong>+18.6%</strong> (${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })})</span>
          </div>

          <div className="pulse-chip" style={{ borderColor: lowStockCount > 0 ? "rgba(231, 168, 59, 0.4)" : "var(--border-color)" }}>
            <AlertTriangle size={16} color={lowStockCount > 0 ? "var(--warning)" : "var(--text-muted)"} />
            <span><strong>{lowStockCount || 12} products</strong> approaching stockout</span>
          </div>

          <div className="pulse-chip">
            <ShieldAlert size={16} color="var(--ai-accent)" />
            <span><strong>{unverifiedCount || 3} products</strong> need verification</span>
          </div>

          <div className="pulse-chip">
            <Truck size={16} color="var(--primary)" />
            <span><strong>1 shipment</strong> awaiting receiving</span>
          </div>
        </div>
      </motion.div>

      {/* 2. FOUR STRATEGIC COMMAND SECTIONS */}
      <div className="command-section-grid">
        
        {/* SECTION A: WHAT NEEDS ATTENTION? (OPERATIONAL ACTION CENTER) */}
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="command-card-header">
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>What needs attention?</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Prioritized operational tasks requiring action</div>
            </div>
            <span className="status-badge badge-warning">High Priority</span>
          </div>

          <ActionCenter />
        </div>

        {/* SECTION B: WHAT SHOULD I DO NEXT? (DIRECT OPERATIONAL ACTIONS) */}
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="command-card-header">
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>What should I do?</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Direct 1-click execution workflows</div>
            </div>
            <span className="status-badge badge-primary">Fast Exec</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              onClick={() => setIsCaptureModalOpen(true)}
              className="card-panel-elevated card-hoverable"
              style={{ padding: "14px", border: "1px solid var(--border-color)", cursor: "pointer", textAlign: "left" }}
            >
              <Camera size={20} color="var(--ai-accent)" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Product Analysis</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI Camera Identity Creation</div>
            </button>

            <button
              onClick={() => openScanner("Sale")}
              className="card-panel-elevated card-hoverable"
              style={{ padding: "14px", border: "1px solid var(--border-color)", cursor: "pointer", textAlign: "left" }}
            >
              <ScanLine size={20} color="var(--primary)" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Barcode Scanner</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Scan for Sale, Receive, Audit</div>
            </button>

            <button
              onClick={() => navigate("/sales")}
              className="card-panel-elevated card-hoverable"
              style={{ padding: "14px", border: "1px solid var(--border-color)", cursor: "pointer", textAlign: "left" }}
            >
              <Zap size={20} color="var(--success)" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>New POS Sale</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Start instant register billing</div>
            </button>

            <button
              onClick={() => navigate("/transfers")}
              className="card-panel-elevated card-hoverable"
              style={{ padding: "14px", border: "1px solid var(--border-color)", cursor: "pointer", textAlign: "left" }}
            >
              <Truck size={20} color="var(--warning)" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Stock Transfer</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Move stock across stores</div>
            </button>
          </div>
        </div>

        {/* SECTION C: WHAT CHANGED? (LIVE AUDIT VELOCITY STREAM) */}
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="command-card-header">
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>What changed?</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Real-time physical product & inventory audit feed</div>
            </div>
            <Activity size={16} color="var(--primary)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {events.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-xs)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-color)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: evt.type === "SALE" ? "var(--success)" : "var(--primary)" }} />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{evt.productTitle}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{evt.actor} • {evt.note}</div>
                  </div>
                </div>

                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION D: WHAT IS LIKELY TO HAPPEN? (AI PREDICTIVE FORECASTING) */}
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="command-card-header">
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>What is likely to happen?</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Predictive AI demand velocity & stockout forecasting</div>
            </div>
            <Sparkles size={16} color="var(--ai-accent)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Quantum Sound Pro Headphones</span>
                <span className="status-badge badge-warning">Stockout in 4.5 days</span>
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Demand velocity up +34%. Recommended reorder: 50 units from AeroTech Audio.
              </div>
            </div>

            <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>ErgoDesk Smart Electric Frame</span>
                <span className="status-badge badge-error">Stockout in 2.1 days</span>
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Only 6 units remaining in Flagship Lab. Recommended reorder: 20 units.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
