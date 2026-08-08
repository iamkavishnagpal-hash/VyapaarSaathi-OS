import React from "react";
import { useRetail } from "../context/RetailContext";
import { ActionCenter } from "../components/ActionCenter";
import { 
  TrendingUp, 
  ShoppingBag, 
  PackageCheck, 
  AlertTriangle, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  Store, 
  Clock, 
  ScanLine 
} from "lucide-react";

export const DashboardView = () => {
  const { products, orders, events, stores, setActiveView, setIsCaptureModalOpen, openScanner, openProductPassport } = useRetail();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.itemCount, 0);
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;
  const totalStockValue = products.reduce((sum, p) => sum + p.stockQty * p.costPrice, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* PAGE HEADER & QUICK ACTIONS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Operational Intelligence Overview</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Real-time physical inventory, sales performance, and AI action center
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setIsCaptureModalOpen(true)} className="btn btn-ai" style={{ gap: "6px" }}>
            <Sparkles size={14} /> AI Product Capture
          </button>
          <button onClick={() => openScanner("Sale")} className="btn btn-secondary" style={{ gap: "6px" }}>
            <ScanLine size={14} /> Barcode Scanner
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS ROW */}
      <div className="grid-12">
        
        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Gross Revenue</span>
            <div style={{ padding: "6px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}>
              <DollarSign size={16} />
            </div>
          </div>
          <div className="kpi-text" style={{ marginTop: "8px", color: "var(--text-main)" }}>
            ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--success)", marginTop: "4px" }}>
            <ArrowUpRight size={12} />
            <span>+14.2% vs last week</span>
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Orders Processed</span>
            <div style={{ padding: "6px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--success-subtle)", color: "var(--success)" }}>
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="kpi-text" style={{ marginTop: "8px", color: "var(--text-main)" }}>
            {orders.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--success)", marginTop: "4px" }}>
            <ArrowUpRight size={12} />
            <span>100% fulfilled</span>
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Low Stock Warnings</span>
            <div style={{ padding: "6px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--warning-subtle)", color: "var(--warning)" }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="kpi-text" style={{ marginTop: "8px", color: lowStockCount > 0 ? "var(--warning)" : "var(--text-main)" }}>
            {lowStockCount} SKUs
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: lowStockCount > 0 ? "var(--warning)" : "var(--text-muted)", marginTop: "4px" }}>
            <span>{lowStockCount > 0 ? "Requires reorder" : "Stock health optimal"}</span>
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Catalog Stock Value</span>
            <div style={{ padding: "6px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--ai-subtle)", color: "var(--ai-accent)" }}>
              <PackageCheck size={16} />
            </div>
          </div>
          <div className="kpi-text" style={{ marginTop: "8px", color: "var(--text-main)" }}>
            ${totalStockValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
            <span>Across {products.length} active SKUs</span>
          </div>
        </div>

      </div>

      {/* MAIN SECTION: ACTION CENTER & TOP PRODUCTS */}
      <div className="grid-12">
        
        {/* LEFT 8 COLUMNS: ACTION CENTER & SALES SUMMARY */}
        <div className="col-8" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <ActionCenter />

          {/* TOP PERFORMING PRODUCTS TABLE */}
          <div className="card-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>Top Performing Physical SKUs</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Highest inventory turnover and margin health</div>
              </div>
              <button onClick={() => setActiveView("products")} className="btn btn-ghost btn-sm">
                View Catalog →
              </button>
            </div>

            <div className="table-container">
              <table className="business-table">
                <thead>
                  <tr>
                    <th>Product & Brand</th>
                    <th>SKU</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Health</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 4).map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{p.title}</div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{p.brand} • {p.category}</div>
                      </td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>{p.sku}</td>
                      <td>
                        <span style={{ fontWeight: "700", color: p.stockQty <= p.lowStockThreshold ? "var(--warning)" : "var(--text-main)" }}>
                          {p.stockQty} units
                        </span>
                      </td>
                      <td style={{ fontWeight: "700", color: "var(--text-main)" }}>${p.sellingPrice.toFixed(2)}</td>
                      <td>
                        <span className="status-badge badge-success">{p.productHealthScore || 96}%</span>
                      </td>
                      <td>
                        <button onClick={() => openProductPassport(p)} className="btn btn-ghost btn-sm">
                          Passport
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT 4 COLUMNS: ACTIVITY FEED & LOCATION PERFORMANCE */}
        <div className="col-4" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* LIVE ACTIVITY FEED */}
          <div className="card-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Clock size={16} color="var(--primary)" />
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>System Audit Activity</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {events.slice(0, 4).map((evt) => (
                <div key={evt.id} style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                    <span style={{ fontWeight: "700", color: "var(--text-main)" }}>{evt.type}</span>
                    <span style={{ color: "var(--text-muted)" }}>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{evt.productTitle}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{evt.actor} • {evt.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MULTI-LOCATION STORE STATUS */}
          <div className="card-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Store size={16} color="var(--success)" />
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>Location Performance</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {stores.map((s) => (
                <div key={s.id} style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{s.name}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.city} • {s.registerCount} POS Terminals</div>
                  </div>
                  <span className="status-badge badge-success">Online</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
