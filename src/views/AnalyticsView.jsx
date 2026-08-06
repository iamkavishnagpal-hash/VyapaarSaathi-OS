import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  ArrowUpRight, 
  FileSpreadsheet,
  Building2,
  Receipt
} from "lucide-react";

export const AnalyticsView = () => {
  const { orders, t, currency, addToast } = useRetail();

  const [activeTab, setActiveTab] = useState("accounting"); // accounting, gst, reports

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "AED" ? "د.إ" : "₹";

  const partyLedgers = [
    { partyName: "Rahul Sharma (Customer)", type: "Receivable", amount: 2450, status: "Due in 5 days" },
    { partyName: "EthnicVibe Suppliers (Vendor)", type: "Payable", amount: 14500, status: "Due in 12 days" },
    { partyName: "Priya Verma (Customer)", type: "Receivable", amount: 1200, status: "Overdue 3 days" },
    { partyName: "SoundBeats Electronics Ltd", type: "Payable", amount: 8900, status: "Paid via UPI" }
  ];

  const handleExportTally = () => {
    addToast("Exported Tally XML LEDGER & VOUCHER file successfully!", "success");
  };

  return (
    <div className="view-container">
      {/* LEVEL 1 HEADER & TALLY EXPORT */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2>{t("analytics")}</h2>
          <p className="caption" style={{ margin: "4px 0 0 0" }}>
            Accounting ledgers, GST compliance reports (GSTR-1, GSTR-3B), Tally XML export & cash flow analysis
          </p>
        </div>

        <button onClick={handleExportTally} className="btn btn-primary">
          <FileSpreadsheet size={18} />
          <span>Export Tally XML</span>
        </button>
      </div>

      {/* METRIC HIGHLIGHTS */}
      <div className="grid-3" style={{ marginBottom: "24px" }}>
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Total Gross Revenue</div>
          <div className="num-tabular" style={{ fontSize: "28px", color: "#ffffff", margin: "4px 0" }}>
            {currencySymbol}{totalSales.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "13px", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowUpRight size={16} /> +24% growth vs last month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "20px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Total Receivables (Khata)</div>
          <div className="num-tabular" style={{ fontSize: "28px", color: "#A78BFA", margin: "4px 0" }}>
            {currencySymbol}3,650
          </div>
          <div className="caption" style={{ fontSize: "12px" }}>Outstanding customer credit</div>
        </div>

        <div className="glass-panel" style={{ padding: "20px" }}>
          <div className="caption" style={{ fontWeight: "700" }}>Total Payables (Vendors)</div>
          <div className="num-tabular" style={{ fontSize: "28px", color: "#F87171", margin: "4px 0" }}>
            {currencySymbol}23,400
          </div>
          <div className="caption" style={{ fontSize: "12px" }}>Supplier purchase ledger due</div>
        </div>
      </div>

      {/* ACCOUNTING LEDGER & GST REPORTING SECTION */}
      <div className="glass-panel" style={{ padding: "24px", marginBottom: "24px" }}>
        
        {/* TABS */}
        <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("accounting")}
            className={`btn ${activeTab === "accounting" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "14px", minHeight: "40px" }}
          >
            <Building2 size={16} />
            <span>Party Ledgers & Khata</span>
          </button>

          <button
            onClick={() => setActiveTab("gst")}
            className={`btn ${activeTab === "gst" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "14px", minHeight: "40px" }}
          >
            <Receipt size={16} />
            <span>GST Reports (GSTR-1 & 3B)</span>
          </button>
        </div>

        {activeTab === "accounting" && (
          <div>
            <h3 style={{ fontSize: "18px", margin: "0 0 16px 0" }}>Party Ledger & Outstanding Ageing Report</h3>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Party Name & Contact</th>
                    <th>Ledger Type</th>
                    <th>Outstanding Amount</th>
                    <th>Status & Ageing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partyLedgers.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: "700", color: "#fff" }}>{p.partyName}</td>
                      <td>
                        <span className={`badge ${p.type === "Receivable" ? "badge-info" : "badge-warning"}`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="num-tabular" style={{ fontSize: "16px", color: p.type === "Receivable" ? "#34D399" : "#F87171" }}>
                        {currencySymbol}{p.amount.toLocaleString("en-IN")}
                      </td>
                      <td><span className="caption">{p.status}</span></td>
                      <td>
                        <button onClick={() => alert(`WhatsApp payment reminder sent to ${p.partyName}`)} className="btn btn-secondary" style={{ fontSize: "12px", padding: "4px 10px", minHeight: "34px" }}>
                          Send WhatsApp Reminder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "gst" && (
          <div>
            <h3 style={{ fontSize: "18px", margin: "0 0 16px 0" }}>GST Tax Compliance & GSTR Return Status</h3>
            <div className="grid-3" style={{ gap: "16px" }}>
              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700" }}>GSTR-1 (Outward Supplies)</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#fff", margin: "4px 0" }}>
                  {currencySymbol}{totalSales} Total Taxable
                </div>
                <span className="badge badge-success">Ready for Filing</span>
              </div>

              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700" }}>GSTR-2B (Input Tax Credit)</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#34D399", margin: "4px 0" }}>
                  {currencySymbol}1,450 ITC Available
                </div>
                <span className="badge badge-success">Auto Reconciled</span>
              </div>

              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700" }}>GSTR-3B (Net Tax Payable)</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#A78BFA", margin: "4px 0" }}>
                  {currencySymbol}526 Net Liability
                </div>
                <span className="badge badge-info">Filing Due 20th</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
