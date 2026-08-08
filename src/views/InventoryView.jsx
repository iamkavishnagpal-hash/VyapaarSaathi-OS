import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { Layers, Plus, Minus, AlertTriangle, TrendingUp, RefreshCw, Package, ShieldAlert } from "lucide-react";

export const InventoryView = () => {
  const { products, adjustStock } = useRetail();
  const navigate = useNavigate();

  const totalStockQty = products.reduce((sum, p) => sum + p.stockQty, 0);
  const totalReserved = products.reduce((sum, p) => sum + (p.reservedQty || 0), 0);
  const totalAvailable = products.reduce((sum, p) => sum + (p.availableQty || p.stockQty), 0);
  const totalValue = products.reduce((sum, p) => sum + p.stockQty * p.costPrice, 0);

  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Global Inventory Matrix & 9 Stock Buckets</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Real-time stock truth across 9 inventory buckets: Available, Reserved (Amazon/Shopify), In-Transit, Damaged, & Expired
          </p>
        </div>
      </div>

      {/* 9 INVENTORY BUCKETS SUMMARY GRID */}
      <div className="grid-12">
        {[
          { label: "Available Stock", count: `${totalAvailable.toLocaleString()} units`, color: "var(--success)" },
          { label: "Channel Reserved", count: `${totalReserved.toLocaleString()} units`, color: "var(--primary)" },
          { label: "In Transit", count: "48 units", color: "var(--info)" },
          { label: "Total Sold (MTD)", count: "1,420 units", color: "var(--text-main)" },
          { label: "Returned Stock", count: "12 units", color: "var(--warning)" },
          { label: "Damaged Bucket", count: "4 units", color: "var(--error)" },
          { label: "Expired Stock", count: "0 units", color: "var(--success)" },
          { label: "Audit Adjusted", count: "+18 units", color: "var(--primary)" },
          { label: "Inspection Quarantine", count: "2 units", color: "var(--warning)" }
        ].map((b, idx) => (
          <div key={idx} className="col-4 card-panel" style={{ padding: "10px 14px" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>{b.label}</span>
            <div style={{ fontSize: "16px", fontWeight: "800", color: b.color, marginTop: "2px" }}>{b.count}</div>
          </div>
        ))}
      </div>

      {/* INVENTORY MATRIX TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>SKU & Item Name</th>
              <th>Category</th>
              <th>Total Stock</th>
              <th>Available</th>
              <th>Channel Reserved</th>
              <th>Damaged / Return</th>
              <th>Stock Status</th>
              <th>Quick Adjust</th>
              <th>Passport</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const isLow = p.stockQty <= p.lowStockThreshold;
              const resQty = p.reservedQty || 0;
              const availQty = p.availableQty || Math.max(0, p.stockQty - resQty);

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
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
                      {p.stockQty}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--success)" }}>
                      {availQty}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: resQty > 0 ? "var(--primary)" : "var(--text-muted)" }}>
                      {resQty} reserved
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>0 Damaged</span>
                  </td>
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
