import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  ShieldCheck, 
  Check, 
  X as CrossIcon,
  Globe,
  Layers,
  Lock
} from "lucide-react";

export const SettingsView = () => {
  const { stores, currentStore, role, t, industryTemplate, setIndustryTemplate, currency, setCurrency, addToast } = useRetail();

  const industryVerticals = [
    { id: "Retail", name: "General Retail Store", desc: "Fast POS counter billing & barcode scanning" },
    { id: "Wholesale", name: "Wholesale & B2B Distribution", desc: "Bulk discounts, credit limits & party ledgers" },
    { id: "Pharmacy", name: "Pharmacy & Healthcare", desc: "Batch management, expiry alerts & drug licenses" },
    { id: "Electronics", name: "Electronics & Mobile Shop", desc: "Serial number IMEI tracking & warranty cards" },
    { id: "Apparel", name: "Apparel & Garments", desc: "Size/Color variant matrix & seasonal barcodes" },
    { id: "Kirana", name: "Kirana & Grocery Store", desc: "Loose product billing, weights & quick item library" },
    { id: "Hardware", name: "Hardware & Construction", desc: "Multi-unit conversions & delivery challans" },
    { id: "Restaurant", name: "Restaurant & QSR", desc: "Kitchen order tickets (KOT) & table billing" }
  ];

  const currenciesList = [
    { code: "INR", symbol: "₹", name: "INR (₹) - Indian Rupee" },
    { code: "USD", symbol: "$", name: "USD ($) - US Dollar" },
    { code: "EUR", symbol: "€", name: "EUR (€) - Euro" },
    { code: "GBP", symbol: "£", name: "GBP (£) - British Pound" },
    { code: "AED", symbol: "د.إ", name: "AED (د.إ) - UAE Dirham" }
  ];

  const permissionsMatrix = [
    { module: "Dashboard & Sales Summary", Owner: true, Admin: true, Manager: true, Salesman: true, Warehouse: false },
    { module: "Add / Edit Products", Owner: true, Admin: true, Manager: true, Salesman: false, Warehouse: false },
    { module: "Stock Adjustments (In/Out)", Owner: true, Admin: true, Manager: true, Salesman: false, Warehouse: true },
    { module: "POS Billing & Checkout", Owner: true, Admin: true, Manager: true, Salesman: true, Warehouse: false },
    { module: "Store Builder & Themes", Owner: true, Admin: true, Manager: false, Salesman: false, Warehouse: false },
    { module: "AI Business Advisor", Owner: true, Admin: true, Manager: true, Salesman: true, Warehouse: true },
    { module: "Shopify / CSV Importer", Owner: true, Admin: true, Manager: false, Salesman: false, Warehouse: false },
    { module: "Financial Reports & Tax", Owner: true, Admin: true, Manager: false, Salesman: false, Warehouse: false }
  ];

  return (
    <div className="view-container">
      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h2>{t("settings")}</h2>
        <p className="caption" style={{ margin: "4px 0 0 0" }}>
          Industry vertical workflows, multi-currency preferences, RBAC permissions & bank-grade security
        </p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        
        {/* LEFT COLUMN: INDUSTRY VERTICAL TEMPLATES & CURRENCY */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* INDUSTRY WORKFLOW TEMPLATE SELECTOR */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "16px", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={18} color="var(--primary)" /> Industry Vertical Workflow
            </h3>
            <p className="caption" style={{ marginBottom: "16px" }}>
              Select dedicated workflow template tailored for your business domain
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {industryVerticals.map((ind) => (
                <div
                  key={ind.id}
                  onClick={() => {
                    setIndustryTemplate(ind.id);
                    addToast(`Switched workflow template to ${ind.name}`, "success");
                  }}
                  className="glass-card"
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    background: industryTemplate === ind.id ? "rgba(139, 92, 246, 0.18)" : "var(--bg-card)",
                    borderColor: industryTemplate === ind.id ? "var(--primary)" : "var(--border-color)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "#fff", fontSize: "14px" }}>{ind.name}</span>
                    {industryTemplate === ind.id && <span className="badge badge-success">Active Workflow</span>}
                  </div>
                  <div className="caption" style={{ fontSize: "12px", marginTop: "2px" }}>{ind.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CURRENCY & BANK-GRADE SECURITY */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "16px", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={18} color="var(--primary)" /> Billing Currency & Encryption
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="caption" style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>Default Invoice Currency</label>
                <select
                  className="input-field"
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    addToast(`Updated currency to ${e.target.value}`, "info");
                  }}
                >
                  {currenciesList.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.25)", display: "flex", alignItems: "center", gap: "10px" }}>
                <Lock size={20} color="#10B981" />
                <div>
                  <div style={{ fontWeight: "700", color: "#fff", fontSize: "13px" }}>256-Bit Bank-Grade Encryption</div>
                  <div className="caption" style={{ fontSize: "11px" }}>Data stored with AES-256 cloud backup & SSL sync</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RBAC PERMISSIONS MATRIX & BRANCHES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* RBAC MATRIX */}
          <div className="glass-panel" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={20} color="#10B981" />
                <h3 style={{ fontSize: "18px", margin: 0 }}>Role Permissions Matrix (RBAC)</h3>
              </div>
              <span className="badge badge-info">Active Persona: {role}</span>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Module / Feature</th>
                    <th>Owner</th>
                    <th>Admin</th>
                    <th>Manager</th>
                    <th>Sales</th>
                    <th>Warehouse</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionsMatrix.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: "600" }}>{p.module}</td>
                      <td>{p.Owner ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}</td>
                      <td>{p.Admin ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}</td>
                      <td>{p.Manager ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}</td>
                      <td>{p.Salesman ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}</td>
                      <td>{p.Warehouse ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hide-on-desktop" style={{ display: "none", flexDirection: "column", gap: "12px" }}>
              {permissionsMatrix.map((p, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "700", color: "#fff", fontSize: "15px", lineHeight: 1.35 }}>{p.module}</div>
                    <span className="badge badge-info">RBAC</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                    {[
                      ["Owner", p.Owner],
                      ["Admin", p.Admin],
                      ["Manager", p.Manager],
                      ["Sales", p.Salesman],
                      ["Warehouse", p.Warehouse]
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <span className="caption" style={{ color: "var(--text-main)", fontSize: "12px" }}>{label}</span>
                        {value ? <Check size={16} color="#10b981" /> : <CrossIcon size={16} color="#ef4444" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MULTI-BRANCH STORE LOCATIONS */}
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 16px 0" }}>Multi-Branch Store Outlets</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {stores.map((s) => (
                <div key={s.id} className="glass-card" style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>{s.name}</div>
                    <div className="caption">{s.city} • GSTIN: {s.GSTIN}</div>
                  </div>
                  {s.id === currentStore.id && (
                    <span className="badge badge-success">Active Branch</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
