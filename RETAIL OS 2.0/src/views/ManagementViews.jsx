import React from "react";
import { useRetail } from "../context/RetailContext";
import { Users, Building2, ShieldCheck, Store, Plus } from "lucide-react";

export const ManagementViews = () => {
  const { activeView, customers, stores, role, addToast } = useRetail();

  if (activeView === "customers") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="h1-title">Customer Ledger & VIP Tiers</h1>
            <p className="body-text" style={{ fontSize: "13px" }}>Manage customer accounts, purchase history, and loyalty tiers</p>
          </div>
          <button onClick={() => addToast("Added new customer", "success")} className="btn btn-primary" style={{ gap: "6px" }}>
            <Plus size={16} /> Add Customer
          </button>
        </div>

        <div className="table-container">
          <table className="business-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email & Phone</th>
                <th>Total Spent</th>
                <th>Orders</th>
                <th>Tier</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: "700", color: "var(--text-main)" }}>{c.name}</td>
                  <td>
                    <div>{c.email}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{c.phone}</div>
                  </td>
                  <td style={{ fontWeight: "700" }}>${c.totalSpent.toFixed(2)}</td>
                  <td>{c.totalPurchases} orders</td>
                  <td><span className="status-badge badge-primary">{c.tier}</span></td>
                  <td style={{ color: "var(--text-muted)" }}>{c.lastOrderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeView === "suppliers") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="h1-title">Suppliers & Vendor Management</h1>
            <p className="body-text" style={{ fontSize: "13px" }}>Active manufacturer contacts, lead times, and terms</p>
          </div>
          <button onClick={() => addToast("Added supplier", "success")} className="btn btn-primary" style={{ gap: "6px" }}>
            <Plus size={16} /> Add Supplier
          </button>
        </div>

        <div className="table-container">
          <table className="business-table">
            <thead>
              <tr>
                <th>Supplier Company</th>
                <th>Category</th>
                <th>Lead Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "AeroTech Audio Global", cat: "Electronics", lead: "3-5 days", status: "Verified" },
                { name: "Kinetic Dynamics Corp", cat: "Furniture", lead: "7-10 days", status: "Verified" },
                { name: "HydroVibe Outdoor Gear", cat: "Accessories", lead: "2-4 days", status: "Verified" }
              ].map((s, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: "700", color: "var(--text-main)" }}>{s.name}</td>
                  <td><span className="status-badge badge-muted">{s.cat}</span></td>
                  <td>{s.lead}</td>
                  <td><span className="status-badge badge-success">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeView === "stores") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="h1-title">Store Locations & Registers</h1>
            <p className="body-text" style={{ fontSize: "13px" }}>Retail outlets, warehouses, and thermal POS terminals</p>
          </div>
          <button onClick={() => addToast("Added store location", "success")} className="btn btn-primary" style={{ gap: "6px" }}>
            <Plus size={16} /> Add Store Location
          </button>
        </div>

        <div className="grid-12">
          {stores.map((s) => (
            <div key={s.id} className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>{s.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{s.code} • {s.city}</div>
                </div>
                <span className="status-badge badge-success">Online</span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{s.location}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", borderTop: "1px solid var(--border-color)", paddingTop: "8px" }}>
                <span>POS Terminals: {s.registerCount}</span>
                <span>Manager: {s.manager}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ROLES VIEW
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Users & Role Access Control (RBAC)</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>Team permissions, store roles, and access audit logs</p>
        </div>
        <button onClick={() => addToast("Added team member", "success")} className="btn btn-primary" style={{ gap: "6px" }}>
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Assigned Role</th>
              <th>Assigned Store</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Alex Vance", role: "Store Owner", store: "Flagship Retail Lab", status: "Active" },
              { name: "Elena Rostova", role: "Store Manager", store: "Metro Commerce Express", status: "Active" },
              { name: "Marcus Brody", role: "Warehouse Operator", store: "North Bay Distribution Center", status: "Active" }
            ].map((u, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: "700", color: "var(--text-main)" }}>{u.name}</td>
                <td><span className="status-badge badge-primary">{u.role}</span></td>
                <td>{u.store}</td>
                <td><span className="status-badge badge-success">{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
