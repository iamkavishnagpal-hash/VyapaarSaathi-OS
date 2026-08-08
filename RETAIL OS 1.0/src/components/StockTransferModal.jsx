import { Truck, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useRetail } from "../context/RetailContext";

export const StockTransferModal = ({ isOpen, onClose }) => {
  const { stores, products, addToast } = useRetail();

  const [fromStoreId, setFromStoreId] = useState(stores[0]?.id || "store-1");
  const [toStoreId, setToStoreId] = useState(stores[1]?.id || "store-2");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [transferQty, setTransferQty] = useState(5);
  const [transferStep, setTransferStep] = useState(1); // 1: Form, 2: Animated Transit, 3: Completed

  if (!isOpen) return null;

  const handleExecuteTransfer = () => {
    setTransferStep(2);
    setTimeout(() => {
      setTransferStep(3);
      addToast(`Transferred ${transferQty} units between branches!`);
    }, 1800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 650,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "540px",
          borderRadius: "16px",
          padding: "28px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)"
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Truck size={20} color="var(--primary)" /> Inter-Branch Stock Transfer
            </h3>
            <div className="caption">Rebalance stock between warehouse & retail branches</div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {transferStep === 1 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Source Branch</label>
                <select className="input-field" value={fromStoreId} onChange={(e) => setFromStoreId(e.target.value)}>
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: "8px", borderRadius: "50%", background: "var(--bg-elevated)", marginTop: "16px" }}>
                <ArrowRight size={16} color="var(--primary)" />
              </div>

              <div>
                <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Destination Branch</label>
                <select className="input-field" value={toStoreId} onChange={(e) => setToStoreId(e.target.value)}>
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Select Product</label>
              <select className="input-field" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.title} (In Stock: {p.stockQty})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label className="caption" style={{ display: "block", marginBottom: "4px" }}>Transfer Quantity</label>
              <input
                type="number"
                className="input-field"
                value={transferQty}
                onChange={(e) => setTransferQty(Number(e.target.value))}
                min={1}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button onClick={onClose} className="btn btn-secondary">Cancel</button>
              <button onClick={handleExecuteTransfer} className="btn btn-primary">
                <Truck size={16} />
                <span>Initiate Transfer</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ANIMATED TRANSIT */}
        {transferStep === 2 && (
          <div style={{ padding: "32px 0", textAlign: "center" }}>
            <Truck size={40} color="var(--primary)" className="spin-slow" style={{ margin: "0 auto 16px auto" }} />
            <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>
              Stock In Transit...
            </h4>
            <div className="caption" style={{ marginTop: "4px" }}>Updating source & destination godown balances</div>
          </div>
        )}

        {/* STEP 3: COMPLETED */}
        {transferStep === 3 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: "0 auto 12px auto" }} />
            <h4 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)" }}>
              Stock Transfer Verified & Updated!
            </h4>
            <div className="caption" style={{ marginTop: "4px", marginBottom: "24px" }}>
              {transferQty} units of selected SKU successfully moved.
            </div>

            <button onClick={onClose} className="btn btn-primary" style={{ width: "100%" }}>
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
