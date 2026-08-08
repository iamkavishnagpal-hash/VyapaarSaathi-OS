import { Camera, Barcode, X } from "lucide-react";
import { useRetail } from "../context/RetailContext";

export const UnifiedScannerModal = ({ isOpen, onClose, context = "Sale" }) => {
  const { products, addToCart, addToast } = useRetail();
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(false);
    const target = products[0] || { title: "Demo Product", barcode: "8901234567890", sellingPrice: 2499 };
    setScannedProduct(target);
  };

  const handleConfirmAction = () => {
    if (context === "Sale" && scannedProduct) {
      addToCart(scannedProduct);
      addToast(`Added ${scannedProduct.title} to POS cart!`);
    } else {
      addToast(`Action [${context}] logged for barcode scan!`);
    }
    onClose();
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
          maxWidth: "520px",
          borderRadius: "16px",
          padding: "28px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)"
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <div className="badge badge-info" style={{ marginBottom: "4px" }}>
              Operational Context: {context.toUpperCase()}
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Barcode size={20} color="var(--primary)" /> Unified Scanning Engine
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        {/* SCANNER VIEWPORT */}
        {isScanning ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "12px",
                background: "#04060A",
                border: "2px dashed var(--primary)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <Camera size={40} color="var(--primary)" style={{ marginBottom: "12px" }} />
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>
                Align Barcode / QR Code inside box
              </div>
              <div className="caption" style={{ marginTop: "4px" }}>
                Targeting Operational Mode: <strong>{context}</strong>
              </div>
            </div>

            <button onClick={handleSimulateScan} className="btn btn-primary" style={{ width: "100%", minHeight: "44px" }}>
              Simulate Barcode Scan
            </button>
          </div>
        ) : (
          <div>
            <div style={{ padding: "16px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px solid var(--border-color)", marginBottom: "20px" }}>
              <div className="caption">Scanned Item Identified</div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", marginTop: "2px" }}>
                {scannedProduct?.title}
              </div>
              <div className="caption" style={{ marginTop: "4px" }}>
                Barcode: <strong className="num-tabular">{scannedProduct?.barcode || "8901234567890"}</strong> • ₹{scannedProduct?.sellingPrice}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setIsScanning(true)} className="btn btn-secondary">Rescan</button>
              <button onClick={handleConfirmAction} className="btn btn-primary">
                Confirm {context}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
