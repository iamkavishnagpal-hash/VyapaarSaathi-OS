import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Building2, 
  ShieldCheck, 
  Check, 
  X as CrossIcon 
} from "lucide-react";

export const SettingsView = () => {
  const { stores, currentStore, role, t } = useRetail();

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
      {/* View Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
          {t("settings")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Manage business GST profile, multi-branch stores, and security roles
        </p>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        
        {/* Left Business & Store Config */}
        <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Business GSTIN Profile */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Building2 size={18} color="var(--primary)" /> Business GST Profile
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Legal Registered Business Name</label>
                <input type="text" className="input-field" defaultValue="Retail OS Enterprises Pvt Ltd" />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>GSTIN Number</label>
                <input type="text" className="input-field" defaultValue={currentStore.GSTIN} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Default Currency</label>
                <input type="text" disabled className="input-field" value="INR (₹) - Indian Rupee" />
              </div>

              <button className="btn btn-primary" style={{ marginTop: "6px" }}>Save Business Info</button>
            </div>
          </div>

          {/* Active Stores List */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "14px" }}>
              Multi-Branch Store Locations
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {stores.map((s) => (
                <div key={s.id} className="glass-card" style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff" }}>{s.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{s.city} • GSTIN: {s.GSTIN}</div>
                  </div>
                  {s.id === currentStore.id && (
                    <span className="badge badge-success">Active</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Role-Based Access Control (RBAC) Matrix */}
        <div className="glass-panel" style={{ flex: 1, padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={20} color="#10b981" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                Role Permissions Matrix (RBAC)
              </h3>
            </div>
            <span className="badge badge-info">Active as {role}</span>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Feature Module</th>
                  <th style={{ textAlign: "center" }}>Owner</th>
                  <th style={{ textAlign: "center" }}>Admin</th>
                  <th style={{ textAlign: "center" }}>Manager</th>
                  <th style={{ textAlign: "center" }}>Salesman</th>
                  <th style={{ textAlign: "center" }}>Warehouse</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((p, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: "600" }}>{p.module}</td>
                    <td style={{ textAlign: "center" }}><Check size={16} color="#34d399" style={{ margin: "0 auto" }} /></td>
                    <td style={{ textAlign: "center" }}><Check size={16} color="#34d399" style={{ margin: "0 auto" }} /></td>
                    <td style={{ textAlign: "center" }}>{p.Manager ? <Check size={16} color="#34d399" style={{ margin: "0 auto" }} /> : <CrossIcon size={16} color="#6b7280" style={{ margin: "0 auto" }} />}</td>
                    <td style={{ textAlign: "center" }}>{p.Salesman ? <Check size={16} color="#34d399" style={{ margin: "0 auto" }} /> : <CrossIcon size={16} color="#6b7280" style={{ margin: "0 auto" }} />}</td>
                    <td style={{ textAlign: "center" }}>{p.Warehouse ? <Check size={16} color="#34d399" style={{ margin: "0 auto" }} /> : <CrossIcon size={16} color="#6b7280" style={{ margin: "0 auto" }} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
