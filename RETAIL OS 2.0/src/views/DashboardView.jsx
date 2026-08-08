import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  ScanLine, 
  DollarSign, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

export const DashboardView = () => {
  const { products, orders, events, setIsCaptureModalOpen, openScanner, addToast } = useRetail();
  const navigate = useNavigate();

  const [approvedPOs, setApprovedPOs] = useState([]);
  const [reviewedAnomalies, setReviewedAnomalies] = useState([]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const handleApprovePO = (poId, poName) => {
    setApprovedPOs((prev) => [...prev, poId]);
    addToast(`Approved ${poName}! Order sent to supplier AeroTech.`, "success");
  };

  const handleReviewAnomaly = (skuId) => {
    setReviewedAnomalies((prev) => [...prev, skuId]);
    addToast(`Price anomaly confirmed and locked for ${skuId}.`, "info");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* 1. BUSINESS COMMAND EXECUTIVE BANNER */}
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
              COMMAND CENTER — ACTION ENGINE
            </span>
            <span className="status-badge badge-success">Live Executive Stream</span>
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

        {/* PULSE METRICS CHIPS */}
        <div className="pulse-chips-row">
          <div className="pulse-chip">
            <DollarSign size={16} color="var(--success)" />
            <span>Revenue <strong>+18.6%</strong> (${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })})</span>
          </div>

          <div className="pulse-chip">
            <AlertTriangle size={16} color="var(--warning)" />
            <span><strong>{lowStockCount} SKUs</strong> approaching stockout</span>
          </div>

          <div className="pulse-chip">
            <ShieldAlert size={16} color="var(--ai-accent)" />
            <span><strong>2 AI Drafts</strong> awaiting Human Approval</span>
          </div>
        </div>
      </motion.div>

      {/* 2. THREE STRATEGIC COMMAND SECTIONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* SECTION 1: NEEDS APPROVAL (HUMAN IN THE LOOP) */}
        <div className="card-panel" style={{ borderLeft: "4px solid var(--warning)" }}>
          <div className="command-card-header">
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
                1. Needs Approval (Human-in-the-Loop)
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                AI-drafted operational actions requiring manager sign-off
              </div>
            </div>
            <span className="status-badge badge-warning">2 Drafts Pending</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {/* DRAFT PO 1 */}
            <div style={{ padding: "14px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>PO Draft: AeroTech Audio (50 units)</span>
                  <span className="status-badge badge-ai">Supply Saathi</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Triggered by low stock (Quantum Sound Pro, 4 units left). Estimated cost: $10,500.
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                {approvedPOs.includes("po-1") ? (
                  <span className="status-badge badge-success" style={{ gap: "4px" }}><CheckCircle2 size={12} /> Approved & Sent</span>
                ) : (
                  <button onClick={() => handleApprovePO("po-1", "PO #PO-981")} className="btn btn-primary btn-sm" style={{ gap: "4px" }}>
                    <ShieldCheck size={14} /> Approve Purchase Order
                  </button>
                )}
              </div>
            </div>

            {/* ANOMALY DRAFT 2 */}
            <div style={{ padding: "14px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Price Anomaly Detected: SKU-104</span>
                  <span className="status-badge badge-warning">Insight Saathi</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Selling price set to $399.99 vs supplier cost $210.00 (Margin 47.5%).
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                {reviewedAnomalies.includes("sku-104") ? (
                  <span className="status-badge badge-success" style={{ gap: "4px" }}><CheckCircle2 size={12} /> Confirmed</span>
                ) : (
                  <button onClick={() => handleReviewAnomaly("sku-104")} className="btn btn-secondary btn-sm" style={{ gap: "4px" }}>
                    Review & Lock Price
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHAT HAPPENED (BUSINESS MEMORY LAYER) */}
        <div className="grid-12">
          <div className="col-6 card-panel">
            <div className="command-card-header">
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>2. What Happened (Memory Layer)</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Recent business velocity & audit log</div>
              </div>
              <Activity size={16} color="var(--primary)" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ padding: "10px 12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Sales Velocity Spiked +15% Yesterday</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>High volume driven by Diwali prep shopper traffic in Metro Store.</div>
              </div>

              {events.slice(0, 2).map((evt) => (
                <div key={evt.id} style={{ padding: "10px 12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{evt.productTitle} ({evt.type})</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{evt.actor} • {evt.note}</div>
                  </div>
                  <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT WILL HAPPEN (PREDICTIVE ENGINE) */}
          <div className="col-6 card-panel">
            <div className="command-card-header">
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>3. What Will Happen (Predictive)</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI velocity forecasting & stockout risk</div>
              </div>
              <Sparkles size={16} color="var(--ai-accent)" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Quantum Sound Pro Headphones</span>
                  <span className="status-badge badge-error">Stockout in 2 days</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Only 4 units left. Recommended supplier reorder: 50 units from AeroTech.
                </div>
              </div>

              <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>ErgoDesk Smart Electric Frame</span>
                  <span className="status-badge badge-warning">Stockout in 4.5 days</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Demand velocity +34%. Draft PO auto-created by Supply Saathi.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
