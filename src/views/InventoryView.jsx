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
      {/* LEVEL 1 HEADER & SINGLE PRIMARY CTA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2>{t("inventory")}</h2>
          <p className="caption" style={{ margin: "4px 0 0 0" }}>
            Real-time stock ledger, variant manager & reorder alerts
          </p>
        </div>

        {/* SINGLE PRIMARY CTA PER SCREEN SPECIFICATION */}
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>{t("addProduct")}</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-panel" style={{ padding: "16px", marginBottom: "24px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
          <Search size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: "42px" }}
            placeholder={t("searchProductPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={18} color="var(--text-muted)" />
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
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setFilterStockStatus("ALL")}
            className={`btn ${filterStockStatus === "ALL" ? "btn-secondary" : "btn-ghost"}`}
            style={{ fontSize: "14px", padding: "8px 14px" }}
          >
            All
          </button>
          <button
            onClick={() => setFilterStockStatus("LOW")}
            className={`btn ${filterStockStatus === "LOW" ? "btn-danger" : "btn-ghost"}`}
            style={{ fontSize: "14px", padding: "8px 14px" }}
          >
            Low Stock
          </button>
        </div>
      </div>

      {/* DESKTOP DATA TABLE */}
      <div className="glass-panel hide-on-mobile" style={{ padding: "20px" }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU / Brand</th>
                <th>Category</th>
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
                          <div className="caption" style={{ fontSize: "12px" }}>
                            Barcode: {prod.barcode || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: "600", color: "var(--primary)" }}>{prod.sku}</div>
                      <div className="caption" style={{ fontSize: "12px" }}>{prod.brand}</div>
                    </td>

                    <td>
                      <span className="badge badge-info">{prod.category}</span>
                    </td>

                    <td>₹{prod.costPrice}</td>
                    <td style={{ fontWeight: "700", color: "#fff" }}>₹{prod.sellingPrice}</td>

                    <td>
                      <div style={{ fontSize: "18px", fontWeight: "800", color: prod.stockQty <= prod.lowStockThreshold ? "#f87171" : "#34d399" }}>
                        {prod.stockQty} units
                      </div>
                      <div className="caption" style={{ fontSize: "12px" }}>Alert: {prod.lowStockThreshold}</div>
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
                        style={{ fontSize: "14px", padding: "8px 12px", minHeight: "40px" }}
                      >
                        <RefreshCw size={14} />
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

      {/* MOBILE REFLOW CARDS (NO HORIZONTAL SCROLL GUARANTEE) */}
      <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
            <div key={prod.id} className="glass-card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px 0" }}>{prod.title}</h3>
                  <div className="caption">{prod.brand} • {prod.sku}</div>
                </div>
                <span className={`badge ${badgeClass}`}>{badgeText}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                <div>
                  <div className="caption">Selling Price</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff" }}>₹{prod.sellingPrice}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="caption">Stock Level</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: prod.stockQty <= prod.lowStockThreshold ? "#f87171" : "#34d399" }}>
                    {prod.stockQty} units
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTargetProduct(prod);
                  setShowAdjustModal(true);
                }}
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <RefreshCw size={16} />
                <span>Adjust Stock Level</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* ADD PRODUCT MODAL FORM (SINGLE COLUMN FORM ON MOBILE SPECIFICATION) */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "540px", padding: "24px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>{t("addProduct")}</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Product Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Silk Printed Saree"
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Category</label>
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
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Brand</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Brand Name"
                  value={newProd.brand}
                  onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  className="input-field"
                  value={newProd.sellingPrice}
                  onChange={(e) => setNewProd({ ...newProd, sellingPrice: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Cost Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  value={newProd.costPrice}
                  onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>GST Slab (%)</label>
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

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Initial Stock Units</label>
                <input
                  type="number"
                  required
                  className="input-field"
                  value={newProd.stockQty}
                  onChange={(e) => setNewProd({ ...newProd, stockQty: Number(e.target.value) })}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADJUST STOCK MODAL */}
      {showAdjustModal && targetProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "480px", padding: "24px", maxWidth: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ margin: 0 }}>Stock Adjustment</h3>
              <button onClick={() => setShowAdjustModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleExecuteStockAdjust} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>{targetProduct.title}</div>
                <div className="caption">Current Stock: <strong>{targetProduct.stockQty} units</strong></div>
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Quantity Change (+ or -)</label>
                <input
                  type="number"
                  required
                  className="input-field"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", color: "var(--text-main)", fontWeight: "600" }}>Adjustment Reason</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
