import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  ScanLine, 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  User, 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  Printer, 
  X, 
  Receipt 
} from "lucide-react";

export const SalesView = () => {
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    selectedCustomer,
    setSelectedCustomer,
    customers,
    cartDiscount,
    setCartDiscount,
    completeCheckout,
    openScanner
  } = useRetail();

  const [searchQuery, setSearchQuery] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery)
  );

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const discountAmt = (subtotal * cartDiscount) / 100;
  const taxableTotal = subtotal - discountAmt;
  const estimatedTax = taxableTotal * 0.18; // 18% tax
  const finalTotal = taxableTotal + estimatedTax;

  const handleCheckout = (paymentMethod) => {
    const order = completeCheckout(paymentMethod);
    if (order) {
      setCompletedOrder(order);
    }
  };

  return (
    <div className="grid-12" style={{ gap: "20px" }}>
      
      {/* LEFT 7 COLUMNS: PRODUCT SEARCH & POS CATALOG GRID */}
      <div className="col-8" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* HEADER & SCAN TRIGGER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="h1-title">POS Billing & Point of Sale</h1>
            <p className="body-text" style={{ fontSize: "13px" }}>
              High-speed checkout with instant barcode lookup and stock synchronization
            </p>
          </div>

          <button onClick={() => openScanner("Sale")} className="btn btn-primary" style={{ gap: "6px" }}>
            <ScanLine size={16} /> Barcode Scanner
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="card-panel" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            placeholder="Scan barcode or search title, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* PRODUCTS CARDS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="card-panel card-hoverable"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "12px",
                cursor: "pointer"
              }}
              onClick={() => addToCart(p)}
            >
              <div>
                <span className="status-badge badge-muted" style={{ fontSize: "10px" }}>{p.category}</span>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", marginTop: "4px" }}>{p.title}</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>SKU: {p.sku}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "8px", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>${p.sellingPrice.toFixed(2)}</span>
                <button className="btn btn-secondary btn-sm" style={{ padding: "2px 8px" }}>
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT 4 COLUMNS: LIVE CART & CHECKOUT TERMINAL */}
      <div className="col-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        <div className="card-panel-elevated" style={{ display: "flex", flexDirection: "column", gap: "16px", minHeight: "580px", justifyContent: "space-between" }}>
          
          <div>
            {/* CART HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShoppingCart size={18} color="var(--primary)" />
                <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)" }}>Active Cart</span>
              </div>
              {cart.length > 0 && (
                <button onClick={clearCart} className="btn btn-ghost btn-sm" style={{ color: "var(--error)" }}>
                  Clear Cart
                </button>
              )}
            </div>

            {/* CUSTOMER SELECTOR */}
            <div style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={14} color="var(--text-muted)" />
              <select
                className="input-field"
                value={selectedCustomer ? selectedCustomer.id : ""}
                onChange={(e) => {
                  const cust = customers.find((c) => c.id === e.target.value);
                  setSelectedCustomer(cust || null);
                }}
                style={{ fontSize: "12px" }}
              >
                <option value="">Walk-in Customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tier})
                  </option>
                ))}
              </select>
            </div>

            {/* CART ITEMS LIST */}
            <div style={{ maxHeight: "260px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: "13px" }}>
                  Cart is currently empty. Click a product or scan barcode to add.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "var(--radius-xs)",
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{item.product.title}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>${item.unitPrice.toFixed(2)} each</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button onClick={() => updateCartQty(item.product.id, item.qty - 1)} className="btn btn-secondary btn-sm" style={{ padding: "2px 6px" }}>
                        <Minus size={10} />
                      </button>
                      <span style={{ fontSize: "12px", fontWeight: "700", minWidth: "18px", textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.product.id, item.qty + 1)} className="btn btn-secondary btn-sm" style={{ padding: "2px 6px" }}>
                        <Plus size={10} />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="btn btn-ghost btn-sm" style={{ padding: "2px", color: "var(--error)" }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* BILLING SUMMARY & CHECKOUT BUTTONS */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-secondary)" }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-secondary)" }}>
              <span>Discount (%)</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "60px", padding: "2px 6px", textAlign: "right" }}
                value={cartDiscount}
                onChange={(e) => setCartDiscount(Number(e.target.value) || 0)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-secondary)" }}>
              <span>Estimated Tax (18%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "800", color: "var(--text-main)", borderTop: "1px solid var(--border-color)", paddingTop: "8px" }}>
              <span>Grand Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            {/* CHECKOUT PAYMENT ACTION BUTTONS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout("Cash")}
                className="btn btn-primary"
                style={{ gap: "6px" }}
              >
                <DollarSign size={14} /> Cash
              </button>
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout("Credit Card")}
                className="btn btn-ai"
                style={{ gap: "6px" }}
              >
                <CreditCard size={14} /> Card / Digital
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* RECEIPT MODAL POPUP */}
      {completedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(8, 11, 16, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setCompletedOrder(null)}
        >
          <div
            className="card-panel-elevated"
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "20px",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-lg)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <CheckCircle2 size={40} color="var(--success)" style={{ margin: "0 auto 8px auto" }} />
              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)" }}>Transaction Completed!</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Order {completedOrder.orderNumber} • Stock auto-deducted</div>
            </div>

            <div style={{ padding: "12px", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-color)", marginBottom: "16px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", marginBottom: "6px" }}>
                <span>Customer</span>
                <span>{completedOrder.customerName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", marginBottom: "6px" }}>
                <span>Payment</span>
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "14px", borderTop: "1px solid var(--border-color)", paddingTop: "6px", marginTop: "6px" }}>
                <span>Total Paid</span>
                <span>${completedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { window.print(); setCompletedOrder(null); }} className="btn btn-primary" style={{ flex: 1, gap: "6px" }}>
                <Printer size={14} /> Print Thermal Receipt
              </button>
              <button onClick={() => setCompletedOrder(null)} className="btn btn-secondary">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
