import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import {
  Search,
  Plus,
  X,
  RefreshCw,
  Barcode,
  Printer,
  Cpu
} from "lucide-react";
import { ProductIdentityModal } from "../components/ProductIdentityModal";

export const InventoryView = () => {
  const { products, addProduct, adjustStock, t, currency, stores } = useRetail();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filterStockStatus, setFilterStockStatus] = useState("ALL");
  const [selectedGodown, setSelectedGodown] = useState("ALL");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
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
    batchNo: "BATCH-2026-A",
    expiryDate: "2027-12-31",
    serialNo: "",
    costPrice: 500,
    sellingPrice: 999,
    gstRate: 18,
    stockQty: 25,
    lowStockThreshold: 10
  });

  const categories = ["ALL", "Apparel", "Electronics", "Grocery", "Accessories", "Home & Lighting"];
  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "AED" ? "د.إ" : "₹";

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

  // Calculate total inventory valuation
  const totalValuation = products.reduce((acc, p) => acc + (p.costPrice * p.stockQty), 0);
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

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
      batchNo: "BATCH-2026-A",
      expiryDate: "2027-12-31",
      serialNo: "",
      costPrice: 500,
      sellingPrice: 999,
      gstRate: 18,
      stockQty: 25,
      lowStockThreshold: 10
    });
  };

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (targetProduct) {
      adjustStock(targetProduct.id, Number(adjustQty), adjustReason);
      setShowAdjustModal(false);
      setTargetProduct(null);
    }
  };

  return (
    <div className="view-container">
      {/* LEVEL 1 HEADER & SINGLE PRIMARY CTA */}
      <div className="mobile-hero-header">
        <div>
          <h2>{t("inventory")}</h2>
          <p className="caption hide-subtitle-mobile" style={{ margin: "4px 0 0 0" }}>
            Live stock tracking, batch/expiry management, barcode generation & warehouse valuation
          </p>
        </div>

        <div>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>{t("addProduct")}</span>
          </button>
        </div>
      </div>

      {/* INVENTORY VALUATION KPI STRIP (SINGLE-SOURCE RESPONSIVE CONTAINER) */}
      <div className="responsive-kpi-container" style={{ marginBottom: "24px" }}>
        <div className="glass-card" style={{ padding: "16px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Total Inventory Valuation</div>
          <div className="num-tabular" style={{ fontSize: "24px", color: "#34D399", margin: "4px 0" }}>
            {currencySymbol}{totalValuation.toLocaleString("en-IN")}
          </div>
          <div className="caption" style={{ fontSize: "12px" }}>Asset valuation at cost price</div>
        </div>

        <div className="glass-card" style={{ padding: "16px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Total Catalog SKUs</div>
          <div className="num-tabular" style={{ fontSize: "24px", color: "#ffffff", margin: "4px 0" }}>
            {products.length} Products
          </div>
          <div className="caption" style={{ fontSize: "12px" }}>Active stock keeping units</div>
        </div>

        <div className="glass-card" style={{ padding: "16px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Low Stock Reorder Alerts</div>
          <div className="num-tabular" style={{ fontSize: "24px", color: lowStockCount > 0 ? "#F87171" : "#34D399", margin: "4px 0" }}>
            {lowStockCount} Items
          </div>
          <div className="caption" style={{ fontSize: "12px" }}>Below safety stock buffer</div>
        </div>
      </div>

      {/* FILTER SEARCH & WAREHOUSE BAR (RESPONSIVE 2-COLUMN GRID ON MOBILE) */}
      <div className="glass-panel filter-bar-container" style={{ padding: "16px", marginBottom: "24px" }}>
        <div className="filter-bar-search" style={{ flex: 1, minWidth: "200px", position: "relative" }}>
          <Search size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: "42px" }}
            placeholder="Search Product, SKU, Brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar-selects">
          <select
            className="input-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === "ALL" ? t("allCategories") : cat}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={filterStockStatus}
            onChange={(e) => setFilterStockStatus(e.target.value)}
          >
            <option value="ALL">All Stock Status</option>
            <option value="LOW">Low Stock Alerts</option>
            <option value="OUT">Out of Stock</option>
          </select>

          <select
            className="input-field"
            style={{ gridColumn: "span 2" }}
            value={selectedGodown}
            onChange={(e) => setSelectedGodown(e.target.value)}
          >
            <option value="ALL">All Warehouse Locations</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DESKTOP DATA TABLE */}
      <div className="glass-panel hide-on-mobile" style={{ padding: "20px" }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product & SKU</th>
                <th>Category</th>
                <th>Batch / Expiry</th>
                <th>Selling Price</th>
                <th>Cost Price</th>
                <th>Stock Qty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: "700", color: "#fff" }}>{p.title}</div>
                    <div className="sku-code">SKU: {p.sku} • {p.brand}</div>
                  </td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td>
                    <div className="sku-code" style={{ fontSize: "11px" }}>B: BATCH-2026-A</div>
                    <div className="caption" style={{ fontSize: "11px" }}>Exp: 2027-12-31</div>
                  </td>
                  <td className="num-tabular" style={{ fontWeight: "700", color: "#fff" }}>
                    {currencySymbol}{p.sellingPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="num-tabular" style={{ color: "var(--text-muted)" }}>
                    {currencySymbol}{p.costPrice.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span className="num-tabular" style={{ fontSize: "16px", color: p.stockQty <= p.lowStockThreshold ? "#f87171" : "#34d399" }}>
                      {p.stockQty}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${p.stockQty <= p.lowStockThreshold ? "badge-danger" : "badge-success"}`}>
                      {p.stockQty <= p.lowStockThreshold ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setTargetProduct(p);
                          setShowAdjustModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "13px", padding: "6px 10px", minHeight: "36px" }}
                      >
                        <RefreshCw size={14} />
                        <span>Adjust</span>
                      </button>
                      <button
                        onClick={() => {
                          setTargetProduct(p);
                          setShowIdentityModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "12px", padding: "6px 10px", minHeight: "36px", color: "var(--primary)" }}
                        title="View AI Identity & Lifecycle"
                      >
                        <Cpu size={14} />
                        <span>AI Identity</span>
                      </button>
                      <button
                        onClick={() => {
                          setTargetProduct(p);
                          setShowBarcodeModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "13px", padding: "6px 10px", minHeight: "36px" }}
                      >
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

      {/* MOBILE REFLOW CARD LIST (NON-CLIPPING CTAS & OPTICAL BASELINE PRICES) */}
      <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredProducts.map((p) => (
          <div key={p.id} className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "10px" }}>
              <div>
                <span className="badge badge-info" style={{ marginBottom: "6px" }}>{p.category}</span>
                <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "2px 0", color: "#ffffff", lineHeight: "1.4" }}>{p.title}</h3>
                <div className="sku-code" style={{ fontSize: "12px", color: "#94A3B8" }}>SKU: {p.sku}</div>
              </div>
              <span className={`badge ${p.stockQty <= p.lowStockThreshold ? "badge-danger" : "badge-success"}`} style={{ flexShrink: 0 }}>
                {p.stockQty} left
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", marginTop: "12px" }}>
              {/* NON-TRUNCATED OPTICAL BASELINE PRICE */}
              <div className="kpi-optical-number" style={{ marginBottom: 0, whiteSpace: "nowrap" }}>
                <span className="currency-symbol" style={{ fontSize: "14px", color: "#94A3B8" }}>{currencySymbol}</span>
                <span className="num-tabular" style={{ fontSize: "17px", fontWeight: "700", color: "#ffffff" }}>
                  {p.sellingPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {/* 36PX FIXED HEIGHT NON-CLIPPING CTA */}
              <button
                onClick={() => {
                  setTargetProduct(p);
                  setShowAdjustModal(true);
                }}
                className="btn btn-secondary"
                style={{ minHeight: "36px", height: "36px", fontSize: "12px", fontWeight: "600", padding: "6px 14px", borderRadius: "10px" }}
              >
                <RefreshCw size={14} />
                <span>Adjust Stock</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(10px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "560px", padding: "24px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Add New Product SKU</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Product Title</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Wireless Noise Cancelling Headphones"
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Category</label>
                  <select
                    className="input-field"
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  >
                    {categories.filter((c) => c !== "ALL").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Brand Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Sony"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Selling Price ({currencySymbol})</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={newProd.sellingPrice}
                    onChange={(e) => setNewProd({ ...newProd, sellingPrice: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Cost Price ({currencySymbol})</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={newProd.costPrice}
                    onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Initial Stock Qty</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={newProd.stockQty}
                    onChange={(e) => setNewProd({ ...newProd, stockQty: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="caption" style={{ display: "block", marginBottom: "4px", color: "#fff", fontWeight: "600" }}>Low Stock Alert Level</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={newProd.lowStockThreshold}
                    onChange={(e) => setNewProd({ ...newProd, lowStockThreshold: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "12px", padding: "14px" }}>
                <Plus size={18} />
                <span>Create Product SKU</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADJUST STOCK MODAL */}
      {showAdjustModal && targetProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(10px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "440px", padding: "24px", maxWidth: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0 }}>Adjust Stock — {targetProduct.title}</h3>
              <button onClick={() => setShowAdjustModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Current Stock Qty</label>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>{targetProduct.stockQty} units</div>
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Stock Change Qty (+ or -)</label>
                <input
                  type="number"
                  className="input-field"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Adjustment Note</label>
                <input
                  type="text"
                  className="input-field"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                <RefreshCw size={18} />
                <span>Confirm Stock Adjustment</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BARCODE GENERATOR PRINT MODAL */}
      {showBarcodeModal && targetProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(10px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "400px", padding: "24px", maxWidth: "100%", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0 }}>Barcode Label Generator</h3>
              <button onClick={() => setShowBarcodeModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", color: "#000", marginBottom: "20px" }}>
              <div style={{ fontWeight: "800", fontSize: "14px" }}>{targetProduct.title}</div>
              <div style={{ fontSize: "12px", margin: "4px 0" }}>Price: {currencySymbol}{targetProduct.sellingPrice}</div>
              <div className="sku-code" style={{ fontSize: "18px", letterSpacing: "4px", margin: "12px 0", fontWeight: "800" }}>
                ||||| | |||| ||| |||||||
              </div>
              <div className="sku-code" style={{ fontSize: "12px" }}>{targetProduct.barcode || targetProduct.sku}</div>
            </div>

            <button onClick={() => window.print()} className="btn btn-primary" style={{ width: "100%" }}>
              <Printer size={18} />
              <span>Print Barcode Sticker</span>
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT IDENTITY & LIFECYCLE MODAL */}
      <ProductIdentityModal
        isOpen={showIdentityModal}
        onClose={() => setShowIdentityModal(false)}
        product={targetProduct}
      />

    </div>
  );
};
