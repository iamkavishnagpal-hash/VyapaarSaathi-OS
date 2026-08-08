import React from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { Layers, Plus, Minus, AlertTriangle, TrendingUp, RefreshCw, Package } from "lucide-react";

export const InventoryView = () => {
  const { products, adjustStock } = useRetail();
  const navigate = useNavigate();

  const totalStockQty = products.reduce((sum, p) => sum + p.stockQty, 0);
  const totalValue = products.reduce((sum, p) => sum + p.stockQty * p.costPrice, 0);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Inventory Matrix & Movement</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Real-time stock quantities, reorder thresholds, and warehouse movements
          </p>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid-12">
        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Units in Stock</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>{totalStockQty.toLocaleString()} units</div>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Valuation (Cost)</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>SKUs Needing Reorder</span>
          <div className="kpi-text" style={{ marginTop: "4px", color: lowStockItems.length > 0 ? "var(--warning)" : "var(--success)" }}>
            {lowStockItems.length} SKUs
          </div>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Catalog SKU Count</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>{products.length} Items</div>
        </div>
      </div>

      {/* INVENTORY MATRIX TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>SKU & Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Threshold</th>
              <th>Reorder Qty</th>
              <th>Stock Status</th>
              <th>Quick Adjust</th>
              <th>Passport</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const isLow = p.stockQty <= p.lowStockThreshold;
              return (
                <tr key={p.id}>
                  <td>
                    <div
                      style={{ fontWeight: "700", color: "var(--text-main)", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${p.id}`);
                      }}
                    >
                      {p.title}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>{p.sku}</div>
                  </td>
                  <td>
                    <span className="status-badge badge-muted">{p.category}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: isLow ? "var(--warning)" : "var(--text-main)" }}>
                      {p.stockQty}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>{p.lowStockThreshold} units</td>
                  <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>+{p.reorderQty || 25}</td>
                  <td>
                    {isLow ? (
                      <span className="status-badge badge-warning" style={{ gap: "4px" }}>
                        <AlertTriangle size={12} /> Low Stock
                      </span>
                    ) : (
                      <span className="status-badge badge-success">Optimal</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustStock(p.id, -1, "Manual Decrement");
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "4px 8px" }}
                        title="Deduct 1"
                      >
                        <Minus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustStock(p.id, 1, "Manual Increment");
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "4px 8px" }}
                        title="Add 1"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustStock(p.id, 10, "Bulk Stock In");
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "4px 8px" }}
                        title="Add 10"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${p.id}`);
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      Passport
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
