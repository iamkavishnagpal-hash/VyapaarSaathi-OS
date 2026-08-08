import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { IdentityRing } from "../components/IdentityRing";
import { 
  Package, 
  Search, 
  Plus, 
  Camera, 
  Barcode, 
  ShieldCheck, 
  Tag, 
  Layers, 
  ArrowUpDown 
} from "lucide-react";

export const ProductsView = () => {
  const { products, openProductIdentity, openProductPassport, setIsCaptureModalOpen } = useRetail();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER & TOP ACTIONS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Physical Product Identity Catalog</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Manage product specs, SKUs, barcode identities, and passport timelines
          </p>
        </div>

        <button onClick={() => setIsCaptureModalOpen(true)} className="btn btn-ai" style={{ gap: "6px" }}>
          <Camera size={16} />
          <span>AI Camera Capture</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="card-panel" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "260px" }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            placeholder="Search by title, SKU, barcode, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? "btn-primary" : "btn-secondary"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Product Identity & Brand</th>
              <th>SKU</th>
              <th>Barcode Code 128</th>
              <th>Category</th>
              <th>Cost / Price</th>
              <th>Stock</th>
              <th>Health</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <IdentityRing status={p.isVerified ? "verified" : "pending"} />
                </td>
                <td>
                  <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{p.title}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{p.brand} • {p.model || "Standard Model"}</div>
                </td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600" }}>{p.sku}</td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>{p.barcode}</td>
                <td>
                  <span className="status-badge badge-muted">{p.category}</span>
                </td>
                <td>
                  <div style={{ fontWeight: "700", color: "var(--text-main)" }}>${p.sellingPrice.toFixed(2)}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Cost: ${p.costPrice.toFixed(2)}</div>
                </td>
                <td>
                  <span style={{ fontWeight: "700", color: p.stockQty <= p.lowStockThreshold ? "var(--warning)" : "var(--success)" }}>
                    {p.stockQty} units
                  </span>
                </td>
                <td>
                  <span className="status-badge badge-success">{p.productHealthScore || 96}%</span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => openProductPassport(p)} className="btn btn-secondary btn-sm" title="Open Passport">
                      Passport
                    </button>
                    <button onClick={() => openProductIdentity(p)} className="btn btn-ghost btn-sm" title="Print Barcode">
                      <Barcode size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
