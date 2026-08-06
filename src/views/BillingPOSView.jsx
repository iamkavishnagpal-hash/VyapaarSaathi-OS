import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Printer, 
  Share2, 
  CheckCircle2, 
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
    clearCart,
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
    const newOrder = processCheckout(paymentMethod);
    if (newOrder) {
      setCompletedOrder(newOrder);
      setShowInvoiceModal(true);
    }
  };

  return (
    <div className="view-container" style={{ display: "flex", gap: "20px", height: "calc(100vh - 110px)", overflow: "hidden" }}>
      
      {/* Left: Product Catalog Grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden" }}>
        
        {/* Search & Category Filter Bar */}
        <div className="glass-panel" style={{ padding: "14px", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} color="var(--text-dim)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: "36px" }}
              placeholder={t("searchProductPlaceholder")}
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
              <option key={cat} value={cat}>{cat === "ALL" ? "All Items" : cat}</option>
            ))}
          </select>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "14px",
            paddingRight: "4px"
          }}
        >
          {filteredProducts.map((p) => {
            const isOutOfStock = p.stockQty === 0;

            return (
              <div
                key={p.id}
                onClick={() => !isOutOfStock && addToCart(p)}
                className="glass-panel"
                style={{
                  padding: "12px",
                  cursor: isOutOfStock ? "not-allowed" : "pointer",
                  opacity: isOutOfStock ? 0.5 : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.15s ease",
                  border: "1px solid var(--border-color)"
                }}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
                  />
                )}
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: "700" }}>{p.category}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff", lineHeight: "1.3", margin: "2px 0 6px 0" }}>
                    {p.title}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: "800", color: "#fff" }}>₹{p.sellingPrice}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>+{p.gstRate}% GST</div>
                  </div>
                  <span className={`badge ${p.stockQty > p.lowStockThreshold ? "badge-success" : p.stockQty > 0 ? "badge-warning" : "badge-danger"}`}>
                    {p.stockQty > 0 ? `${p.stockQty} left` : "Out"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Cart & Billing Ledger */}
      <div
        className="glass-panel"
        style={{
          width: "420px",
          display: "flex",
          flexDirection: "column",
          padding: "18px",
          overflow: "hidden"
        }}
      >
        {/* Cart Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingCart size={18} color="var(--primary)" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              {t("cart")} ({cart.reduce((acc, i) => acc + i.qty, 0)})
            </h3>
          </div>
          {cart.length > 0 && (
            <button onClick={clearCart} className="btn btn-danger" style={{ fontSize: "0.72rem", padding: "4px 8px" }}>
              Clear
            </button>
          )}
        </div>

        {/* Customer Selector */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
            {t("selectCustomer")}
          </label>
          <select
            className="input-field"
            style={{ fontSize: "0.85rem" }}
            value={selectedCustomer?.id || ""}
            onChange={(e) => {
              const cust = customers.find((c) => c.id === e.target.value);
              setSelectedCustomer(cust || null);
            }}
          >
            <option value="">-- {t("walkInCustomer")} --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
        </div>

        {/* Cart Line Items */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--text-dim)", fontSize: "0.85rem" }}>
              Click products on left catalog to add to bill
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff" }}>{item.product.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    ₹{item.product.sellingPrice} x {item.qty} (+{item.product.gstRate}% GST)
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "2px" }}>
                    <button
                      onClick={() => updateCartQty(idx, item.qty - 1)}
                      style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "2px 6px" }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: "0.85rem", fontWeight: "700", width: "18px", textAlign: "center" }}>{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(idx, item.qty + 1)}
                      style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "2px 6px" }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Calculations Summary */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
            <span>{t("subtotal")}</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
            <span>{t("taxGST")} (CGST+SGST)</span>
            <span style={{ color: "#a5b4fc" }}>+₹{Math.round(gstTotal).toLocaleString("en-IN")}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--text-muted)" }}>{t("discount")} (₹)</span>
            <input
              type="number"
              className="input-field"
              style={{ width: "90px", padding: "4px 8px", fontSize: "0.82rem", textAlign: "right" }}
              value={cartDiscount}
              onChange={(e) => setCartDiscount(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: "1.15rem", fontWeight: "800", borderTop: "1px solid var(--border-color)", paddingTop: "8px", marginTop: "4px" }}>
            <span>{t("grandTotal")}</span>
            <span style={{ color: "#34d399" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "6px" }}>{t("paymentMethod")}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {["Cash", "UPI", "Card", "Khata"].map((pm) => (
              <button
                key={pm}
                onClick={() => setPaymentMethod(pm)}
                className={`btn ${paymentMethod === pm ? "btn-primary" : "btn-secondary"}`}
                style={{ fontSize: "0.72rem", padding: "6px 2px" }}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckoutSubmit}
          disabled={cart.length === 0}
          className="btn btn-success"
          style={{ width: "100%", marginTop: "14px", padding: "12px", fontSize: "0.95rem" }}
        >
          <CheckCircle2 size={18} />
          <span>{t("checkout")} • ₹{grandTotal.toLocaleString("en-IN")}</span>
        </button>

      </div>

      {/* Printable Tax Invoice Modal */}
      {showInvoiceModal && completedOrder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(6px)" }}>
          <div className="glass-panel" style={{ width: "520px", padding: "24px", maxWidth: "95%", background: "#fff", color: "#000", borderRadius: "12px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "2px dashed #ccc", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#000", margin: 0 }}>
                  {currentStore.name}
                </h3>
                <div style={{ fontSize: "0.78rem", color: "#555" }}>GSTIN: {currentStore.GSTIN} • NCR Branch</div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#000" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "14px", color: "#333" }}>
              <div>
                <div><strong>Invoice No:</strong> {completedOrder.id}</div>
                <div><strong>Date:</strong> {new Date(completedOrder.timestamp).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div><strong>Customer:</strong> {completedOrder.customerName}</div>
                <div><strong>Payment:</strong> {completedOrder.paymentMethod}</div>
              </div>
            </div>

            {/* Line Items Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", marginBottom: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #000", textAlign: "left" }}>
                  <th style={{ padding: "4px 0" }}>Item</th>
                  <th style={{ padding: "4px 0", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "4px 0", textAlign: "right" }}>Rate</th>
                  <th style={{ padding: "4px 0", textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {completedOrder.items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "6px 0" }}>{it.title}</td>
                    <td style={{ padding: "6px 0", textAlign: "center" }}>{it.qty}</td>
                    <td style={{ padding: "6px 0", textAlign: "right" }}>₹{it.price}</td>
                    <td style={{ padding: "6px 0", textAlign: "right" }}>₹{it.price * it.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ borderTop: "2px solid #000", paddingTop: "8px", fontSize: "0.85rem", color: "#000" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal:</span>
                <span>₹{completedOrder.subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>GST Tax (CGST 9% + SGST 9%):</span>
                <span>₹{completedOrder.gstTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "1.1rem", marginTop: "6px" }}>
                <span>Grand Total:</span>
                <span>₹{completedOrder.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ flex: 1, color: "#000", borderColor: "#ccc" }}>
                <Printer size={16} />
                <span>{t("printInvoice")}</span>
              </button>

              <button
                onClick={() => {
                  alert(`Invoice shared via WhatsApp to ${completedOrder.customerPhone || "Customer"}`);
                  setShowInvoiceModal(false);
                }}
                className="btn btn-success"
                style={{ flex: 1 }}
              >
                <Share2 size={16} />
                <span>{t("shareWhatsApp")}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
