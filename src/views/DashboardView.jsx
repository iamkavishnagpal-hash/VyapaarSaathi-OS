import React from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { ActionCenter } from "../components/ActionCenter";
import { 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  ShoppingBag, 
  Zap, 
  DollarSign, 
  ArrowRight, 
  Camera, 
  ScanLine, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

export const DashboardView = () => {
  const { products, orders, setIsCaptureModalOpen, openScanner, t } = useRetail();
  const navigate = useNavigate();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 148240;
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* LEVEL 1 HERO BANNER: BUSINESS PULSE OVERVIEW */}
      <div 
        className="card-panel"
        style={{
          borderLeft: "6px solid var(--primary)",
          background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)",
          padding: "24px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--success)", boxShadow: "0 0 10px var(--success)" }} />
              <h1 className="h1-title" style={{ fontSize: "24px" }}>BUSINESS PULSE</h1>
              <span className="status-badge badge-success" style={{ fontSize: "10px" }}>● LIVE NETWORK SYNC</span>
            </div>
            <p className="body-text" style={{ fontSize: "13px", marginTop: "4px" }}>
              Kapda Mafia & Shoe Mafia Global Command Center • Real-time sales, inventory truth, & automated actions
            </p>
          </div>

          {/* HIGH-IMPACT REVENUE METRIC */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Gross Revenue</div>
              <div className="kpi-text" style={{ fontSize: "32px", color: "var(--text-main)", marginTop: "2px" }}>
                ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: "12px", color: "var(--success)", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                <TrendingUp size={14} /> +18.6% vs last week
              </div>
            </div>

            <div style={{ width: "1px", height: "48px", backgroundColor: "var(--border-color)" }} />

            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Net Daily Profit</div>
              <div className="kpi-text" style={{ fontSize: "28px", color: "var(--success)", marginTop: "2px" }}>
                +$38,450.00
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                63 Global Orders Completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 2: WHAT CHANGED & WHAT NEEDS ATTENTION */}
      <div>
        <div style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: "12px" }}>
          What Changed & Needs Immediate Attention
        </div>

        <div className="grid-12">
          
          {/* CARD 1: STOCKOUT RISK */}
          <div
            onClick={() => navigate("/inventory")}
            className="col-3 card-panel card-hoverable"
            style={{ cursor: "pointer", borderLeft: "4px solid var(--warning)", padding: "16px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Stockout Warning</span>
              <AlertTriangle size={16} color="var(--warning)" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--warning)", marginTop: "6px" }}>
              12 Products
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Approaching low stock threshold ➔ Reorder needed
            </div>
          </div>

          {/* CARD 2: UNVERIFIED IDENTITY */}
          <div
            onClick={() => navigate("/products")}
            className="col-3 card-panel card-hoverable"
            style={{ cursor: "pointer", borderLeft: "4px solid var(--error)", padding: "16px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Data Verification</span>
              <ShieldCheck size={16} color="var(--error)" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--error)", marginTop: "6px" }}>
              3 Products
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Require barcode or barcode OCR confirmation
            </div>
          </div>

          {/* CARD 3: INBOUND SHIPMENTS */}
          <div
            onClick={() => navigate("/purchases")}
            className="col-3 card-panel card-hoverable"
            style={{ cursor: "pointer", borderLeft: "4px solid var(--info)", padding: "16px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Inbound Receiving</span>
              <Truck size={16} color="var(--info)" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--info)", marginTop: "6px" }}>
              1 Shipment
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Awaiting receiving & barcode verification at Bhiwandi WH
            </div>
          </div>

          {/* CARD 4: OVERDUE RECEIVABLES */}
          <div
            onClick={() => navigate("/finance")}
            className="col-3 card-panel card-hoverable"
            style={{ cursor: "pointer", borderLeft: "4px solid var(--ai-accent)", padding: "16px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Receivables</span>
              <DollarSign size={16} color="var(--ai-accent)" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--ai-accent)", marginTop: "6px" }}>
              $42,000 Overdue
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Pending net-30 customer payments ➔ Send reminder
            </div>
          </div>

        </div>
      </div>

      {/* LEVEL 3: OPERATIONAL ACTION CENTER & QUICK CONTROLS */}
      <div className="grid-12">
        <div className="col-8">
          <ActionCenter />
        </div>

        <div className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Direct Operations Bar</div>
          
          <button
            type="button"
            onClick={() => setIsCaptureModalOpen(true)}
            className="btn btn-ai"
            style={{ width: "100%", justifyContent: "flex-start", gap: "10px", padding: "12px" }}
          >
            <Camera size={18} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: "700" }}>Shelf Product Analysis</div>
              <div style={{ fontSize: "10px", opacity: 0.85 }}>Scan physical products with AI Camera</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openScanner("Sale")}
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "flex-start", gap: "10px", padding: "12px" }}
          >
            <ScanLine size={18} color="var(--primary)" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Barcode Scanner</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Scan SKU barcode for instant POS checkout</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate("/sales")}
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "flex-start", gap: "10px", padding: "12px" }}
          >
            <Zap size={18} color="var(--success)" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>New POS Store Sale</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Process fast walk-in retail bill</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate("/transfers")}
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "flex-start", gap: "10px", padding: "12px" }}
          >
            <Truck size={18} color="var(--info)" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Warehouse Stock Transfer</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Rebalance stock between stores</div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
