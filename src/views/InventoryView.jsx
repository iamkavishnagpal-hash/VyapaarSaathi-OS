import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  Plus, 
  Layers, 
  X,
  RefreshCw
} from "lucide-react";

export const InventoryView = () => {
  const { products, addProduct, adjustStock, t } = useRetail();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filterStockStatus, setFilterStockStatus] = useState("ALL");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [targetProduct, setTargetProduct] = useState(null);
  const [adjustQty, setAdjustQty] = useState(1);
  const [adjustReason, setAdjustReason] = useState("New Inventory Batch Received");

  // New Product Form State
  const [newProd, setNewProd] = useState({
    title: "",
    category: "Apparel",
    brand: "",
    sku: "",
    barcode: "",
    costPrice: 500,
    sellingPrice: 999,
    gstRate: 18,
    stockQty: 25,
    lowStockThreshold: 10
  });

  const categories = ["ALL", "Apparel", "Electronics", "Grocery", "Accessories", "Home & Lighting"];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;

    let matchesStock = true;
    if (filterStockStatus === "LOW") matchesStock = p.stockQty <= p.lowStockThreshold && p.stockQty > 0;
    if (filterStockStatus === "OUT") matchesStock = p.stockQty === 0;

    return matchesSearch && matchesCat && matchesStock;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.title) return;
    const finalSku = newProd.sku || `SKU-${Date.now().toString().slice(-6)}`;
    addProduct({ ...newProd, sku: finalSku });
    setShowAddModal(false);
    setNewProd({
      title: "",
      category: "Apparel",
      brand: "",
      sku: "",
      barcode: "",
      costPrice: 500,
      sellingPrice: 999,
      gstRate: 18,
      stockQty: 25,
      lowStockThreshold: 10
    });
  };

  const handleExecuteStockAdjust = (e) => {
    e.preventDefault();
    if (!targetProduct) return;
    adjustStock(targetProduct.id, Number(adjustQty), adjustReason);
    setShowAdjustModal(false);
    setTargetProduct(null);
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
            {t("inventory")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            Real-time stock ledger, variant manager & reorder alerts
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>{t("addProduct")}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: "16px", marginBottom: "20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
        
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
          <Search size={16} color="var(--text-dim)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: "36px" }}
            placeholder={t("searchProductPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={16} color="var(--text-muted)" />
          <select
            className="input-field"
            style={{ width: "160px" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === "ALL" ? t("allCategories") : cat}</option>
            ))}
          </select>
        </div>

        {/* Stock Status Buttons */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => setFilterStockStatus("ALL")}
            className={`btn ${filterStockStatus === "ALL" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "0.78rem", padding: "6px 12px" }}
          >
            All Stock
          </button>
          <button
            onClick={() => setFilterStockStatus("LOW")}
            className={`btn ${filterStockStatus === "LOW" ? "btn-danger" : "btn-secondary"}`}
            style={{ fontSize: "0.78rem", padding: "6px 12px" }}
          >
            Low Stock Alerts
          </button>
          <button
            onClick={() => setFilterStockStatus("OUT")}
            className={`btn ${filterStockStatus === "OUT" ? "btn-secondary" : "btn-secondary"}`}
            style={{ fontSize: "0.78rem", padding: "6px 12px" }}
          >
            Out of Stock
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel" style={{ padding: "16px" }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU / Brand</th>
                <th>Category</th>
                <th>GST %</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Available Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => {
                let badgeClass = "badge-success";
                let badgeText = t("inStock");

                if (prod.stockQty === 0) {
                  badgeClass = "badge-danger";
                  badgeText = t("outOfStock");
                } else if (prod.stockQty <= prod.lowStockThreshold) {
                  badgeClass = "badge-warning";
                  badgeText = t("lowStock");
                }

                return (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {prod.image && (
                          <img
                            src={prod.image}
                            alt={prod.title}
                            style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: "700", color: "#fff" }}>{prod.title}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                            Barcode: {prod.barcode || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: "600", color: "var(--primary)" }}>{prod.sku}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{prod.brand}</div>
                    </td>

                    <td>
                      <span className="badge badge-info">{prod.category}</span>
                    </td>

                    <td>{prod.gstRate}% GST</td>
                    <td>₹{prod.costPrice}</td>
                    <td style={{ fontWeight: "700", color: "#fff" }}>₹{prod.sellingPrice}</td>

                    <td>
                      <div style={{ fontSize: "1rem", fontWeight: "800", color: prod.stockQty <= prod.lowStockThreshold ? "#f87171" : "#34d399" }}>
                        {prod.stockQty} units
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Min alert: {prod.lowStockThreshold}</div>
                    </td>

                    <td>
                      <span className={`badge ${badgeClass}`}>{badgeText}</span>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          setTargetProduct(prod);
                          setShowAdjustModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                      >
                        <RefreshCw size={13} />
                        <span>{t("adjustStock")}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(4px)" }}>
          <div className="glass-panel" style={{ width: "540px", padding: "24px", maxWidth: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                {t("addProduct")}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-secondary" style={{ padding: "4px 8px" }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Product Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Silk Printed Saree"
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Category</label>
                  <select
                    className="input-field"
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home & Lighting">Home & Lighting</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Brand</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Brand Name"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-3">
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={newProd.sellingPrice}
                    onChange={(e) => setNewProd({ ...newProd, sellingPrice: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Cost Price (₹)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newProd.costPrice}
                    onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>GST Slab (%)</label>
                  <select
                    className="input-field"
                    value={newProd.gstRate}
                    onChange={(e) => setNewProd({ ...newProd, gstRate: Number(e.target.value) })}
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18%</option>
                    <option value={28}>28%</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Initial Stock Qty</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newProd.stockQty}
                    onChange={(e) => setNewProd({ ...newProd, stockQty: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Low Stock Alert Qty</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newProd.lowStockThreshold}
                    onChange={(e) => setNewProd({ ...newProd, lowStockThreshold: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  {t("cancel")}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustModal && targetProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(4px)" }}>
          <div className="glass-panel" style={{ width: "420px", padding: "24px", maxWidth: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                Adjust Stock: {targetProduct.title}
              </h3>
              <button onClick={() => setShowAdjustModal(false)} className="btn btn-secondary" style={{ padding: "4px 8px" }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              Current Available Quantity: <strong style={{ color: "#fff" }}>{targetProduct.stockQty} units</strong>
            </p>

            <form onSubmit={handleExecuteStockAdjust} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Stock Quantity Change (+ to Add, - to Deduct)
                </label>
                <input
                  type="number"
                  required
                  className="input-field"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Audit Trail Reason *
                </label>
                <select
                  className="input-field"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                >
                  <option value="New Inventory Batch Received">Purchase / New Stock In</option>
                  <option value="Manual Physical Stock Count">Manual Count Correction</option>
                  <option value="Damage / Expiry Loss">Damage / Loss / Expiry</option>
                  <option value="Customer Return Restock">Customer Return Restock</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowAdjustModal(false)} className="btn btn-secondary">
                  {t("cancel")}
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Audit & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
