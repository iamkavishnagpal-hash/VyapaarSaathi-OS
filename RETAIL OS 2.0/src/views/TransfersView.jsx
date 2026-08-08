import React from "react";
import { useRetail } from "../context/RetailContext";
import { Truck, Plus, ArrowRight, CheckCircle2 } from "lucide-react";

export const TransfersView = () => {
  const { transfers, addToast } = useRetail();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Multi-Store Inventory Transfers</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Transfer stock between distribution centers and retail storefronts
          </p>
        </div>

        <button onClick={() => addToast("Initiated new store transfer workflow", "info")} className="btn btn-primary" style={{ gap: "6px" }}>
          <Plus size={16} /> New Stock Transfer
        </button>
      </div>

      {/* TRANSFERS TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>Transfer ID</th>
              <th>Source Location</th>
              <th>Destination Location</th>
              <th>Date</th>
              <th>Items Transferred</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((tr) => (
              <tr key={tr.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{tr.id.toUpperCase()}</td>
                <td style={{ fontWeight: "600", color: "var(--text-main)" }}>{tr.sourceStore}</td>
                <td style={{ fontWeight: "600", color: "var(--text-main)" }}>{tr.destStore}</td>
                <td>{tr.transferDate}</td>
                <td>{tr.itemCount} units</td>
                <td>
                  <span className={`status-badge ${tr.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                    {tr.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => addToast(`Transfer ${tr.id} audit confirmed`, "success")} className="btn btn-secondary btn-sm">
                    View Manifest
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
