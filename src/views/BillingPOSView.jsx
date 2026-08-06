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
  X
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
    currentStore
  } = useRetail();

  const [posSearch, setPosSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Invoice Print Modal State
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const categories = ["ALL", "Apparel", "Electronics", "Grocery", "Accessories", "Home & Lighting"];

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
      
      {/* LEVEL 1 HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h2>{t("posBilling")}</h2>
        <p className="caption" style={{ margin: "4px 0 0 0" }}>
          Instant counter checkout, GST invoice calculation & digital receipts
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "1.6fr 1fr", gap: "24px" }}>
        
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
                placeholder="Search products or scan barcode..."
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
                    <span className="badge badge-info" style={{ fontSize: "12px" }}>{prod.category}</span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: prod.stockQty <= prod.lowStockThreshold ? "#f87171" : "#34d399" }}>
                      {prod.stockQty} left
                    </span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0", color: "#fff" }}>
                    {prod.title}
                  </h3>
                  <div className="caption" style={{ fontSize: "12px" }}>SKU: {prod.sku}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                    ₹{prod.sellingPrice}
                  </div>
                  <button className="btn btn-primary" style={{ minHeight: "44px", minWidth: "44px", padding: "8px" }}>
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
            <label className="caption" style={{ display: "block", marginBottom: "6px", color: "#fff", fontWeight: "600" }}>Customer</label>
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
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px" }}>
            {cart.length === 0 ? (
              <div className="caption" style={{ textAlign: "center", padding: "40px 10px" }}>
                Cart is empty. Click items on the catalog to add.
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>{item.product.title}</div>
                    <div className="caption" style={{ fontSize: "12px" }}>
                      ₹{item.product.sellingPrice} x {item.qty} (+{item.product.gstRate}% GST)
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.4)", borderRadius: "8px", padding: "2px" }}>
                      <button
                        onClick={() => updateCartQty(idx, item.qty - 1)}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "8px", minWidth: "36px", minHeight: "36px" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: "16px", fontWeight: "700", width: "24px", textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(idx, item.qty + 1)}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "8px", minWidth: "36px", minHeight: "36px" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(idx)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "8px" }}
                    >
                      <Trash2 size={18} />
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
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }} className="caption">
              <span>{t("taxGST")} (CGST+SGST)</span>
              <span style={{ color: "#a5b4fc" }}>+₹{Math.round(gstTotal).toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="caption">{t("discount")} (₹)</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "100px", padding: "6px 10px", textAlign: "right" }}
                value={cartDiscount}
                onChange={(e) => setCartDiscount(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: "22px", fontWeight: "800", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "8px" }}>
              <span>{t("grandTotal")}</span>
              <span style={{ color: "#34d399" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
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
                  style={{ fontSize: "14px", padding: "8px 4px", minHeight: "44px" }}
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
            style={{ width: "100%", marginTop: "20px", padding: "16px", fontSize: "18px", opacity: cart.length === 0 ? 0.5 : 1 }}
          >
            <ShoppingCart size={22} />
            <span>Complete Sale & Print Bill</span>
          </button>
        </div>

      </div>

      {/* INVOICE PRINT MODAL */}
      {showInvoiceModal && completedOrder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)", padding: "16px" }}>
          <div className="glass-panel" style={{ width: "480px", padding: "24px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Tax Invoice — {completedOrder.id}</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <div className="printable-invoice" style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#fff", margin: 0 }}>{currentStore.name}</h3>
                <div className="caption">{currentStore.address}, {currentStore.city}</div>
                <div className="caption" style={{ fontWeight: "700" }}>GSTIN: {currentStore.GSTIN}</div>
              </div>

              <div style={{ fontSize: "14px", display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span>Bill To: <strong>{completedOrder.customerName}</strong></span>
                <span>Pay Mode: <strong>{completedOrder.paymentMethod}</strong></span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {completedOrder.items.map((it, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span>{it.title} x {it.qty}</span>
                    <span style={{ fontWeight: "700" }}>₹{it.price * it.qty}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                <span>Total Amount Paid</span>
                <span style={{ color: "#34d399" }}>₹{completedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ flex: 1 }}>
                <Printer size={18} />
                <span>Print Tax Invoice</span>
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
