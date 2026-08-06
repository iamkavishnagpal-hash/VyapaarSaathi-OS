import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { sampleShopifyData } from "../data/initialData";
import { 
  Upload, 
  Store, 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Sparkles 
} from "lucide-react";

export const MigrationView = () => {
  const { importShopifyData, t, setActiveView } = useRetail();

  const [step, setStep] = useState(1);
  const [migrationType, setMigrationType] = useState("shopify"); // "shopify" or "csv"
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState("ethnic-fashion-delhi.myshopify.com");
  const [isImporting, setIsImporting] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);

  const handleExecuteImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      importShopifyData(sampleShopifyData);
      setIsImporting(false);
      setImportCompleted(true);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
          {t("migration")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Seamlessly import catalog, stock counts, customers & past order history from Shopify or CSV
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="glass-panel" style={{ padding: "16px 24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {[
          { num: 1, title: "Select Source" },
          { num: 2, title: "Connect / Upload" },
          { num: 3, title: "Map & Validate" },
          { num: 4, title: "Complete" }
        ].map((s) => {
          const isActive = step === s.num;
          const isDone = step > s.num;

          return (
            <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: isDone ? "var(--success)" : isActive ? "var(--primary)" : "rgba(255,255,255,0.08)",
                  color: isDone || isActive ? "#fff" : "var(--text-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "0.88rem"
                }}
              >
                {isDone ? <CheckCircle2 size={18} /> : s.num}
              </div>
              <span style={{ fontSize: "0.88rem", fontWeight: isActive ? "700" : "500", color: isActive ? "#fff" : "var(--text-muted)" }}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Select Source */}
      {step === 1 && (
        <div className="grid-2">
          <div
            onClick={() => {
              setMigrationType("shopify");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "30px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "14px",
              border: migrationType === "shopify" ? "2px solid var(--primary)" : "1px solid var(--border-color)"
            }}
          >
            <div style={{ background: "rgba(99, 102, 241, 0.15)", padding: "16px", borderRadius: "16px" }}>
              <Store size={40} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              Shopify 1-Click Connector
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Connect your active Shopify webstore. Automatically syncs products, SKUs, inventory counts, and customer lists.
            </p>
            <button className="btn btn-primary" style={{ marginTop: "10px" }}>
              Select Shopify Importer <ArrowRight size={16} />
            </button>
          </div>

          <div
            onClick={() => {
              setMigrationType("csv");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "30px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "14px",
              border: migrationType === "csv" ? "2px solid var(--primary)" : "1px solid var(--border-color)"
            }}
          >
            <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "16px", borderRadius: "16px" }}>
              <FileSpreadsheet size={40} color="#10b981" />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              CSV / Excel Bulk Import
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Upload custom CSV spreadsheet containing product titles, cost prices, selling prices, GST slabs, and initial stock.
            </p>
            <button className="btn btn-secondary" style={{ marginTop: "10px" }}>
              Select CSV Upload <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Connection / Upload */}
      {step === 2 && (
        <div className="glass-panel" style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>
            {migrationType === "shopify" ? "Connect Shopify Merchant Account" : "Upload Product CSV File"}
          </h3>

          {migrationType === "shopify" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Shopify Store Domain (.myshopify.com)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={shopifyStoreUrl}
                  onChange={(e) => setShopifyStoreUrl(e.target.value)}
                />
              </div>

              <div style={{ padding: "12px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "8px", fontSize: "0.8rem", color: "#a5b4fc" }}>
                🔑 Ready Payload Detected: Found 3 Products, 10 variants, and stock counts ready for transfer.
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-primary">
                  Fetch Shopify Catalog <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ border: "2px dashed var(--border-color)", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
                <Upload size={32} color="var(--primary)" style={{ marginBottom: "8px" }} />
                <div style={{ fontSize: "0.9rem", color: "#fff", fontWeight: "700" }}>Drag & Drop CSV File Here</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Supports .csv, .xlsx up to 10MB</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-primary">
                  Process File <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Mapping & Validation */}
      {step === 3 && (
        <div className="glass-panel" style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            Field Mapping & Data Validation
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
            Confirm how external Shopify fields map to Retail OS core inventory entities:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {[
              { source: "product.title", target: "Title", status: "Mapped 100%" },
              { source: "variants[0].sku", target: "SKU", status: "Mapped 100%" },
              { source: "variants[0].price", target: "Selling Price", status: "Mapped 100%" },
              { source: "variants[0].inventory_quantity", target: "Available Stock Qty", status: "Mapped 100%" },
              { source: "product_type", target: "Category", status: "Mapped 100%" }
            ].map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#a5b4fc", fontWeight: "700" }}>{m.source}</span>
                  <span style={{ color: "var(--text-dim)", margin: "0 8px" }}>➔</span>
                  <span style={{ color: "#fff", fontWeight: "700" }}>{m.target}</span>
                </div>
                <span className="badge badge-success">{m.status}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(2)} className="btn btn-secondary">
              Back
            </button>
            <button onClick={handleExecuteImport} disabled={isImporting} className="btn btn-success">
              {isImporting ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
              <span>{isImporting ? "Importing Data..." : "Execute Migration"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Completion */}
      {step === 4 && importCompleted && (
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", background: "var(--success-glow)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
            <CheckCircle2 size={36} color="#34d399" />
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>
            Migration Successful!
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            3 Products and variants have been safely ingested into Retail OS inventory with full audit tracking.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button onClick={() => setActiveView("inventory")} className="btn btn-primary">
              View Inventory Catalog
            </button>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Import More Data
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
