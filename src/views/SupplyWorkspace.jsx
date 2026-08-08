import React, { useState } from "react";
import { ProductsView } from "./ProductsView";
import { InventoryView } from "./InventoryView";
import { PurchasesView } from "./PurchasesView";
import { TransfersView } from "./TransfersView";
import { ManagementViews } from "./ManagementViews";
import { Package, Layers, ShoppingCart, Truck, Building2 } from "lucide-react";

export const SupplyWorkspace = () => {
  const [activeSubTab, setActiveSubTab] = useState("products"); // 'products' | 'inventory' | 'purchases' | 'transfers' | 'suppliers'

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* WORKSPACE SUB-NAVIGATION TABS */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", overflowX: "auto" }}>
        <button
          onClick={() => setActiveSubTab("products")}
          className={`btn ${activeSubTab === "products" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Package size={16} /> Products Catalog
        </button>

        <button
          onClick={() => setActiveSubTab("inventory")}
          className={`btn ${activeSubTab === "inventory" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Layers size={16} /> Inventory Matrix
        </button>

        <button
          onClick={() => setActiveSubTab("purchases")}
          className={`btn ${activeSubTab === "purchases" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <ShoppingCart size={16} /> Purchase Orders (POs)
        </button>

        <button
          onClick={() => setActiveSubTab("transfers")}
          className={`btn ${activeSubTab === "transfers" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Truck size={16} /> Stock Transfers
        </button>

        <button
          onClick={() => setActiveSubTab("suppliers")}
          className={`btn ${activeSubTab === "suppliers" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Building2 size={16} /> Suppliers & Vendors
        </button>
      </div>

      {/* RENDER ACTIVE SUPPLY SUB-TAB */}
      {activeSubTab === "products" && <ProductsView />}
      {activeSubTab === "inventory" && <InventoryView />}
      {activeSubTab === "purchases" && <PurchasesView />}
      {activeSubTab === "transfers" && <TransfersView />}
      {activeSubTab === "suppliers" && <ManagementViews view="suppliers" />}
    </div>
  );
};
