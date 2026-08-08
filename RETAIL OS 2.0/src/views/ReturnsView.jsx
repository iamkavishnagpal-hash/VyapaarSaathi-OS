import React from "react";
import { useRetail } from "../context/RetailContext";
import { RotateCcw, Plus, CheckCircle2, ShieldAlert } from "lucide-react";

export const ReturnsView = () => {
  const { returns, addToast } = useRetail();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Returns & Stock Replenishment</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Customer returns, condition verification, and inventory restocking credit
          </p>
        </div>

        <button onClick={() => addToast("Opened customer return workflow", "info")} className="btn btn-primary" style={{ gap: "6px" }}>
          <Plus size={16} /> Process New Return
        </button>
      </div>

      {/* RETURNS TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Product Returned</th>
              <th>Reason & Condition</th>
              <th>Refund Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret) => (
              <tr key={ret.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{ret.id.toUpperCase()}</td>
                <td style={{ fontWeight: "700", color: "var(--text-main)" }}>{ret.customerName}</td>
                <td>{ret.date}</td>
                <td style={{ fontWeight: "600" }}>{ret.productTitle}</td>
                <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>{ret.reason}</td>
                <td style={{ fontWeight: "700", color: "var(--text-main)" }}>${ret.refundAmount.toFixed(2)}</td>
                <td>
                  <span className="status-badge badge-success">{ret.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
