import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Printer, 
  Share2, 
  Plus, 
  Minus,
  X,
  FileText,
  CheckCircle2
} from "lucide-react";

export const BillingPOSView = () => {
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    customers,
    selectedCustomer,
    setSelectedCustomer,
    cartDiscount,
    setCartDiscount,
    processCheckout,
    t,
    currentStore,
    currency
  } = useRetail();

  const [posSearch, setPosSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [docType, setDocType] = useState("Tax Invoice"); // Tax Invoice, Proforma, Quotation, Delivery Challan, Credit Note, PO
  const [printFormat, setPrintFormat] = useState("Thermal 3-Inch"); // Thermal 2-Inch, Thermal 3-Inch, A4, A5

  // Invoice Print Modal State
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const categories = ["ALL", "Apparel", "Electronics", "Grocery", "Accessories", "Home & Lighting"];
  const docTypesList = ["Tax Invoice", "Proforma Invoice", "Quotation / Estimate", "Delivery Challan", "Credit Note", "Purchase Order"];

  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "AED" ? "د.إ" : "₹";

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(posSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(posSearch.toLowerCase()) ||
      p.barcode?.includes(posSearch);

    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.qty, 0);
  const gstTotal = cart.reduce(
    (sum, item) => sum + (item.product.sellingPrice * item.qty * item.product.gstRate) / 100,
    0
  );
  const discountAmt = Number(cartDiscount) || 0;
  const grandTotal = Math.max(0, Math.round(subtotal + gstTotal - discountAmt));

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    const newOrd = processCheckout(paymentMethod);
    setCompletedOrder(newOrd);
    setShowInvoiceModal(true);
  };

  return (
    <div className="view-container">
      
      {/* LEVEL 1 HEADER & DOCUMENT SELECTOR */}
      <div className="mobile-hero-header">
        <div>
          <h2>{t("posBilling")}</h2>
          <p className="caption" style={{ margin: "4px 0 0 0" }}>
            GST / Non-GST billing, Thermal & A4 invoices, HSN/SAC codes & WhatsApp digital sharing
          </p>
        </div>

        {/* DOCUMENT TYPE SELECTOR STRIP */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {docTypesList.map((dt) => (
            <button
              key={dt}
              onClick={() => setDocType(dt)}
              className={`btn ${docType === dt ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "12px", padding: "6px 12px", minHeight: "36px" }}
            >
              <FileText size={14} />
              <span>{dt}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3" style={{ gap: "24px" }}>
        
        {/* LEFT CATALOG PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* SEARCH & CATEGORY BAR */}
          <div className="glass-panel" style={{ padding: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
              <Search size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: "42px" }}
                placeholder="Search products, SKU, or scan barcode..."
                value={posSearch}
                onChange={(e) => setPosSearch(e.target.value)}
              />
            </div>

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

          {/* PRODUCT CATALOG GRID */}
          <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", overflowY: "auto", maxHeight: "65vh" }}>
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="glass-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  userSelect: "none"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span className="badge badge-info" style={{ fontSize: "11px" }}>{prod.category}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: prod.stockQty <= prod.lowStockThreshold ? "#f87171" : "#34d399" }}>
                      {prod.stockQty} left
                    </span>
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 4px 0", color: "#fff" }}>
                    {prod.title}
                  </h3>
                  <div className="sku-code">SKU: {prod.sku} • HSN: 6204</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
                  <div className="num-tabular" style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                    {currencySymbol}{prod.sellingPrice}
                  </div>
                  <button className="btn btn-primary" style={{ minHeight: "40px", minWidth: "40px", padding: "8px" }}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHECKOUT REGISTER PANEL */}
        <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", height: "fit-content" }}>
          
          {/* CUSTOMER SELECTOR */}
          <div style={{ marginBottom: "16px" }}>
            <label className="caption" style={{ display: "block", marginBottom: "6px", color: "#fff", fontWeight: "600" }}>Customer Account</label>
            <select
              className="input-field"
              value={selectedCustomer ? selectedCustomer.id : ""}
              onChange={(e) => {
                const found = customers.find((c) => c.id === e.target.value);
                setSelectedCustomer(found || null);
              }}
            >
              <option value="">-- {t("walkInCustomer")} --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          {/* CART LINE ITEMS */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", maxHeight: "260px" }}>
            {cart.length === 0 ? (
              <div className="caption" style={{ textAlign: "center", padding: "40px 10px" }}>
                Cart is empty. Click items on the catalog to add.
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{item.product.title}</div>
                    <div className="caption" style={{ fontSize: "12px" }}>
                      {currencySymbol}{item.product.sellingPrice} x {item.qty} (+{item.product.gstRate}% GST)
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.4)", borderRadius: "8px", padding: "2px" }}>
                      <button
                        onClick={() => updateCartQty(idx, item.qty - 1)}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "6px", minWidth: "32px", minHeight: "32px" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="num-tabular" style={{ fontSize: "14px", width: "20px", textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(idx, item.qty + 1)}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "6px", minWidth: "32px", minHeight: "32px" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(idx)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "6px" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* BILL CALCULATIONS */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px", marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="caption">
              <span>{t("subtotal")}</span>
              <span className="num-tabular">{currencySymbol}{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }} className="caption">
              <span>{t("taxGST")} (CGST+SGST)</span>
              <span className="num-tabular" style={{ color: "#a5b4fc" }}>+{currencySymbol}{Math.round(gstTotal).toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="caption">{t("discount")} ({currencySymbol})</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "100px", padding: "6px 10px", textAlign: "right" }}
                value={cartDiscount}
                onChange={(e) => setCartDiscount(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: "20px", fontWeight: "800", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "8px" }}>
              <span>{t("grandTotal")}</span>
              <span className="num-tabular" style={{ color: "#34d399" }}>{currencySymbol}{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* PAYMENT METHOD SELECTOR */}
          <div style={{ marginTop: "16px" }}>
            <div className="caption" style={{ marginBottom: "8px" }}>{t("paymentMethod")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {["Cash", "UPI", "Card", "Khata"].map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  className={`btn ${paymentMethod === pm ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "13px", padding: "8px 4px", minHeight: "42px" }}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* SINGLE PRIMARY CTA PER SCREEN SPECIFICATION */}
          <button
            onClick={handleCheckoutSubmit}
            disabled={cart.length === 0}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "20px", padding: "16px", fontSize: "16px", opacity: cart.length === 0 ? 0.5 : 1 }}
          >
            <ShoppingCart size={20} />
            <span>Generate {docType} ({currencySymbol}{grandTotal})</span>
          </button>
        </div>

      </div>

      {/* INVOICE PRINT & SHARE MODAL (MOBILE BOTTOM SHEET / DESKTOP MODAL) */}
      {showInvoiceModal && completedOrder && (
        <div className="mobile-bottom-sheet-overlay" onClick={() => setShowInvoiceModal(false)}>
          <div className="mobile-bottom-sheet glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: "520px", padding: "20px" }}>
            <div className="bottom-sheet-handle hide-on-desktop" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={20} color="#10B981" />
                <h3 style={{ margin: 0 }}>{docType} — {completedOrder.id}</h3>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            {/* PRINT FORMAT SELECTOR */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              {["Thermal 2-Inch", "Thermal 3-Inch", "A4 Full Sheet", "A5 Half Sheet"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setPrintFormat(fmt)}
                  className={`btn ${printFormat === fmt ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "11px", padding: "4px 8px", minHeight: "32px", flex: 1 }}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* INVOICE PREVIEW */}
            <div className="printable-invoice" style={{ background: "#ffffff", color: "#000000", padding: "20px", borderRadius: "8px", marginBottom: "20px", fontFamily: "sans-serif" }}>
              <div style={{ textAlign: "center", marginBottom: "16px", borderBottom: "1px solid #ddd", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", margin: 0, color: "#000" }}>{currentStore.name}</h3>
                <div style={{ fontSize: "12px", color: "#555" }}>{currentStore.address}, {currentStore.city}</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#000" }}>GSTIN: {currentStore.GSTIN}</div>
              </div>

              <div style={{ fontSize: "12px", display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span>Doc Type: <strong>{docType}</strong></span>
                <span>Date: <strong>{new Date().toLocaleDateString()}</strong></span>
              </div>

              <div style={{ fontSize: "12px", display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span>Customer: <strong>{completedOrder.customerName}</strong></span>
                <span>Pay Mode: <strong>{completedOrder.paymentMethod}</strong></span>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", marginBottom: "16px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #000", textAlign: "left" }}>
                    <th style={{ padding: "4px 0" }}>Item</th>
                    <th style={{ padding: "4px 0", textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "4px 0", textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrder.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "6px 0" }}>{it.title}</td>
                      <td style={{ padding: "6px 0", textAlign: "center" }}>{it.qty}</td>
                      <td style={{ padding: "6px 0", textAlign: "right" }}>{currencySymbol}{it.price * it.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ borderTop: "2px solid #000", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "800", color: "#000" }}>
                <span>Total Paid</span>
                <span>{currencySymbol}{completedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ flex: 1 }}>
                <Printer size={18} />
                <span>Print Invoice ({printFormat})</span>
              </button>
              <button onClick={() => alert("Invoice PDF shared via WhatsApp!")} className="btn btn-secondary" style={{ flex: 1 }}>
                <Share2 size={18} />
                <span>Share WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
