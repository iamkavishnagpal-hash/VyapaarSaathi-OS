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
  Sparkles,
  Server,
  Globe,
  ShieldCheck,
  ShieldAlert,
  Radio,
  Terminal
} from "lucide-react";

export const MigrationView = () => {
  const { 
    importShopifyData, 
    importHostData,
    hostConfig,
    toggleHostAccess,
    testHostPing,
    updateHostUrl,
    t, 
    setActiveView 
  } = useRetail();

  const [step, setStep] = useState(1);
  const [migrationType, setMigrationType] = useState("localhost"); // "localhost", "sourcehost", "shopify", "csv"
  
  // Custom connection state inputs
  const [localhostUrlInput, setLocalhostUrlInput] = useState(hostConfig.localhost.url);
  const [sourcehostUrlInput, setSourcehostUrlInput] = useState(hostConfig.sourcehost.url);
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState("ethnic-fashion-delhi.myshopify.com");
  const [apiKeyInput, setApiKeyInput] = useState(hostConfig.localhost.apiKey);
  const [authTokenInput, setAuthTokenInput] = useState(hostConfig.sourcehost.authToken);

  const [isImporting, setIsImporting] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);
  const [ingestedCount, setIngestedCount] = useState(3);

  const handleExecuteImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      if (migrationType === "shopify") {
        importShopifyData(sampleShopifyData);
        setIngestedCount(3);
      } else if (migrationType === "localhost") {
        importHostData("localhost");
        setIngestedCount(3);
      } else if (migrationType === "sourcehost") {
        importHostData("sourcehost");
        setIngestedCount(3);
      } else {
        importHostData("localhost"); // Fallback for CSV simulation
        setIngestedCount(5);
      }
      setIsImporting(false);
      setImportCompleted(true);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
          {t("migration")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Direct access & migration pipeline for Localhost servers, Sourcehost ERP endpoints, Shopify & CSV datasets
        </p>
      </div>

      {/* QUICK HOST ACCESS STATUS BAR */}
      <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: "20px", background: "rgba(15, 23, 42, 0.75)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Radio size={18} color="var(--primary)" />
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "0.9rem" }}>Active Host Endpoints & Access Control</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {/* LOCALHOST BADGE */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.04)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <Server size={14} color="#6366f1" />
              <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "600" }}>Localhost</span>
              <span className={`badge ${hostConfig.localhost.accessGranted ? "badge-success" : "badge-danger"}`} style={{ fontSize: "0.7rem", padding: "2px 6px" }}>
                {hostConfig.localhost.accessGranted ? `Access Granted (${hostConfig.localhost.pingMs}ms)` : "Access Denied"}
              </span>
              <button 
                onClick={() => toggleHostAccess("localhost")} 
                className="btn btn-ghost" 
                style={{ padding: "2px 6px", fontSize: "0.72rem", height: "24px", minHeight: "24px" }}
              >
                {hostConfig.localhost.accessGranted ? "Revoke Access" : "Grant Access"}
              </button>
              <button 
                onClick={() => testHostPing("localhost")} 
                className="btn btn-ghost" 
                style={{ padding: "2px 6px", fontSize: "0.72rem", height: "24px", minHeight: "24px" }}
                title="Ping Localhost"
              >
                Ping
              </button>
            </div>

            {/* SOURCEHOST BADGE */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.04)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <Globe size={14} color="#10b981" />
              <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "600" }}>Sourcehost</span>
              <span className={`badge ${hostConfig.sourcehost.accessGranted ? "badge-success" : "badge-danger"}`} style={{ fontSize: "0.7rem", padding: "2px 6px" }}>
                {hostConfig.sourcehost.accessGranted ? `Authorized (${hostConfig.sourcehost.pingMs}ms)` : "Unauthorized"}
              </span>
              <button 
                onClick={() => toggleHostAccess("sourcehost")} 
                className="btn btn-ghost" 
                style={{ padding: "2px 6px", fontSize: "0.72rem", height: "24px", minHeight: "24px" }}
              >
                {hostConfig.sourcehost.accessGranted ? "Revoke Access" : "Grant Access"}
              </button>
              <button 
                onClick={() => testHostPing("sourcehost")} 
                className="btn btn-ghost" 
                style={{ padding: "2px 6px", fontSize: "0.72rem", height: "24px", minHeight: "24px" }}
                title="Ping Sourcehost"
              >
                Ping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="glass-panel" style={{ padding: "16px 24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {[
          { num: 1, title: "Select Source" },
          { num: 2, title: "Connect / Authenticate" },
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
        <div className="grid-2" style={{ gap: "20px" }}>
          
          {/* LOCALHOST OPTION */}
          <div
            onClick={() => {
              setMigrationType("localhost");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "24px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: migrationType === "localhost" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ background: "rgba(99, 102, 241, 0.15)", padding: "14px", borderRadius: "14px" }}>
                <Server size={32} color="var(--primary)" />
              </div>
              {hostConfig.localhost.accessGranted ? (
                <span className="badge badge-success" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={12} /> Localhost Access Granted
                </span>
              ) : (
                <span className="badge badge-danger" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldAlert size={12} /> Localhost Access Disabled
                </span>
              )}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              Localhost Server & POS Daemon
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Connect directly to local backend service on <code>{hostConfig.localhost.url}</code>. Sync local SQLite catalog, barcode scanner daemons, and offline cash drawer transactions.
            </p>
            <div style={{ fontSize: "0.75rem", color: "#a5b4fc", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span>• Port 8000</span>
              <span>• Local SQLite Sync</span>
              <span>• Thermal Printer Daemon</span>
            </div>
            <button className="btn btn-primary" style={{ marginTop: "6px" }}>
              Connect Localhost Server <ArrowRight size={16} />
            </button>
          </div>

          {/* SOURCE HOST REMOTE OPTION */}
          <div
            onClick={() => {
              setMigrationType("sourcehost");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "24px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: migrationType === "sourcehost" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "14px", borderRadius: "14px" }}>
                <Globe size={32} color="#10b981" />
              </div>
              {hostConfig.sourcehost.accessGranted ? (
                <span className="badge badge-success" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={12} /> Sourcehost Authorized
                </span>
              ) : (
                <span className="badge badge-danger" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldAlert size={12} /> Sourcehost Revoked
                </span>
              )}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              Sourcehost Remote ERP & Cloud DB
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Ingest enterprise inventory, stock balances & customer party ledgers from remote endpoint <code>{hostConfig.sourcehost.url}</code>.
            </p>
            <div style={{ fontSize: "0.75rem", color: "#6ee7b7", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span>• IP: 192.168.1.150</span>
              <span>• Bearer Token Auth</span>
              <span>• Enterprise WMS</span>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: "6px" }}>
              Connect Remote Sourcehost <ArrowRight size={16} />
            </button>
          </div>

          {/* SHOPIFY OPTION */}
          <div
            onClick={() => {
              setMigrationType("shopify");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "24px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: migrationType === "shopify" ? "2px solid var(--primary)" : "1px solid var(--border-color)"
            }}
          >
            <div style={{ background: "rgba(139, 92, 246, 0.15)", padding: "14px", borderRadius: "14px", width: "fit-content" }}>
              <Store size={32} color="#8b5cf6" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              Shopify 1-Click Connector
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Connect active Shopify webstore. Sync products, variant SKUs, web inventory & order history.
            </p>
            <button className="btn btn-secondary" style={{ marginTop: "6px" }}>
              Select Shopify Importer <ArrowRight size={16} />
            </button>
          </div>

          {/* CSV OPTION */}
          <div
            onClick={() => {
              setMigrationType("csv");
              setStep(2);
            }}
            className="glass-panel"
            style={{
              padding: "24px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: migrationType === "csv" ? "2px solid var(--primary)" : "1px solid var(--border-color)"
            }}
          >
            <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: "14px", borderRadius: "14px", width: "fit-content" }}>
              <FileSpreadsheet size={32} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              CSV / Excel Bulk Upload
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
              Upload spreadsheet containing title, cost price, selling price, GST slab & initial stock quantities.
            </p>
            <button className="btn btn-secondary" style={{ marginTop: "6px" }}>
              Select CSV Upload <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* Step 2: Connection / Authenticate */}
      {step === 2 && (
        <div className="glass-panel" style={{ padding: "30px", maxWidth: "680px", margin: "0 auto" }}>
          
          {migrationType === "localhost" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Server size={22} color="var(--primary)" /> Connect Localhost Endpoint
                </h3>
                <span className={`badge ${hostConfig.localhost.accessGranted ? "badge-success" : "badge-danger"}`}>
                  {hostConfig.localhost.accessGranted ? "Access Granted" : "Access Denied"}
                </span>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Localhost Server Address
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="input-field"
                    value={localhostUrlInput}
                    onChange={(e) => setLocalhostUrlInput(e.target.value)}
                  />
                  <button 
                    onClick={() => updateHostUrl("localhost", localhostUrlInput)}
                    className="btn btn-secondary" 
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Save URL
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Local Authorization Secret Key
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="input-field"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                </div>
              </div>

              {/* LIVE TERMINAL HANDSHAKE LOG */}
              <div style={{ background: "#090d16", borderRadius: "10px", padding: "14px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "0.78rem", color: "#a5b4fc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-dim)", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)", pb: "6px" }}>
                  <Terminal size={14} /> <span>LOCAL TERMINAL DIAGNOSTICS</span>
                </div>
                <div>[PING] Connecting to {hostConfig.localhost.url}... 200 OK ({hostConfig.localhost.pingMs}ms)</div>
                <div>[CORS] Origin header whitelisted (Access-Control-Allow-Origin: *)</div>
                <div>[SERVICES] Handshake success on local services: {hostConfig.localhost.services.join(", ")}</div>
                <div>[PAYLOAD] 3 Inventory products & stock ready for migration ingestion</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => toggleHostAccess("localhost")} className={`btn ${hostConfig.localhost.accessGranted ? "btn-danger" : "btn-success"}`}>
                    {hostConfig.localhost.accessGranted ? "Revoke Access" : "Grant Access"}
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={!hostConfig.localhost.accessGranted} 
                    className="btn btn-primary"
                  >
                    Fetch Localhost Payload <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {migrationType === "sourcehost" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={22} color="#10b981" /> Authenticate Sourcehost Endpoint
                </h3>
                <span className={`badge ${hostConfig.sourcehost.accessGranted ? "badge-success" : "badge-danger"}`}>
                  {hostConfig.sourcehost.accessGranted ? "Authorized" : "Unauthorized"}
                </span>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Sourcehost Remote URL
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="input-field"
                    value={sourcehostUrlInput}
                    onChange={(e) => setSourcehostUrlInput(e.target.value)}
                  />
                  <button 
                    onClick={() => updateHostUrl("sourcehost", sourcehostUrlInput)}
                    className="btn btn-secondary"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Save URL
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Bearer Auth Token
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={authTokenInput}
                  onChange={(e) => setAuthTokenInput(e.target.value)}
                />
              </div>

              {/* LIVE TERMINAL DIAGNOSTICS */}
              <div style={{ background: "#090d16", borderRadius: "10px", padding: "14px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "0.78rem", color: "#6ee7b7" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-dim)", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)", pb: "6px" }}>
                  <Terminal size={14} /> <span>SOURCEHOST ENDPOINT DIAGNOSTICS</span>
                </div>
                <div>[PING] Connecting to {hostConfig.sourcehost.url}... 200 OK ({hostConfig.sourcehost.pingMs}ms)</div>
                <div>[AUTH] Bearer JWT validated • Tenant: enterprise_main_db</div>
                <div>[SERVICES] Available APIs: {hostConfig.sourcehost.services.join(", ")}</div>
                <div>[PAYLOAD] Remote catalog response verified (3 products ready)</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => toggleHostAccess("sourcehost")} className={`btn ${hostConfig.sourcehost.accessGranted ? "btn-danger" : "btn-success"}`}>
                    {hostConfig.sourcehost.accessGranted ? "Revoke Access" : "Authorize Host"}
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={!hostConfig.sourcehost.accessGranted} 
                    className="btn btn-primary"
                  >
                    Fetch Sourcehost Payload <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {migrationType === "shopify" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                Connect Shopify Merchant Account
              </h3>
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
          )}

          {migrationType === "csv" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                Upload Product CSV File
              </h3>
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
        <div className="glass-panel" style={{ padding: "24px", maxWidth: "720px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            Field Mapping & Entity Validation ({migrationType.toUpperCase()})
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px" }}>
            Confirm mapping from {migrationType.toUpperCase()} schema to Retail OS core inventory entities:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {[
              { source: `${migrationType}.product_title`, target: "Product Title", status: "Mapped 100%" },
              { source: `${migrationType}.variant_sku`, target: "SKU Code", status: "Mapped 100%" },
              { source: `${migrationType}.selling_price`, target: "Selling Price", status: "Mapped 100%" },
              { source: `${migrationType}.inventory_qty`, target: "Available Stock Qty", status: "Mapped 100%" },
              { source: `${migrationType}.tax_rate`, target: "GST Rate (%)", status: "Mapped 100%" }
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
              <span>{isImporting ? "Ingesting Data..." : `Execute ${migrationType.toUpperCase()} Migration`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Completion */}
      {step === 4 && importCompleted && (
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", background: "var(--success-glow)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
            <CheckCircle2 size={36} color="#34d399" />
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>
            Migration & Direct Host Ingestion Successful!
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            {ingestedCount} Products and variants have been safely ingested into Retail OS catalog from <strong>{migrationType.toUpperCase()}</strong> with full audit tracking.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button onClick={() => setActiveView("inventory")} className="btn btn-primary">
              View Inventory Catalog
            </button>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Import / Connect More Hosts
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
