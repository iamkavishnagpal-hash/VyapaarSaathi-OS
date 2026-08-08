import React, { useState } from "react";
import { SalesView } from "./SalesView";
import { ReturnsView } from "./ReturnsView";
import { ManagementViews } from "./ManagementViews";
import { ShoppingBag, RotateCcw, Users } from "lucide-react";

export const CommerceWorkspace = () => {
  const [activeSubTab, setActiveSubTab] = useState("sales"); // 'sales' | 'returns' | 'customers'

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* WORKSPACE SUB-NAVIGATION TABS */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveSubTab("sales")}
          className={`btn ${activeSubTab === "sales" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <ShoppingBag size={16} /> POS Terminal & Sales
        </button>

        <button
          onClick={() => setActiveSubTab("returns")}
          className={`btn ${activeSubTab === "returns" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <RotateCcw size={16} /> Returns & Refunds
        </button>

        <button
          onClick={() => setActiveSubTab("customers")}
          className={`btn ${activeSubTab === "customers" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Users size={16} /> Customers Directory
        </button>
      </div>

      {/* RENDER ACTIVE COMMERCE SUB-TAB */}
      {activeSubTab === "sales" && <SalesView />}
      {activeSubTab === "returns" && <ReturnsView />}
      {activeSubTab === "customers" && <ManagementViews view="customers" />}
    </div>
  );
};
