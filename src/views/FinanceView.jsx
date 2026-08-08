import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { DollarSign, TrendingUp, TrendingDown, FileText, Camera, Plus, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const FinanceView = () => {
  const { orders, purchases, addToast } = useRetail();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalPurchasesCost = purchases.reduce((sum, p) => sum + (p.totalAmount || 1200), 0);
  const grossProfit = totalRevenue - totalPurchasesCost;

  const [expenses, setExpenses] = useState([
    { id: "exp-1", title: "Storefront Rent - Flagship", category: "Rent", amount: 4500.0, date: "2026-08-01", status: "Paid" },
    { id: "exp-2", title: "Electricity & Utility Bill", category: "Utilities", amount: 620.0, date: "2026-08-04", status: "Paid" },
    { id: "exp-3", title: "Staff Payroll - August", category: "Salary", amount: 8200.0, date: "2026-08-05", status: "Paid" },
    { id: "exp-4", title: "Inter-store Logistics", category: "Transport", amount: 340.0, date: "2026-08-07", status: "Paid" }
  ]);

  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("Utilities");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpenseTitle || !newExpenseAmount) return;

    const entry = {
      id: `exp-${Date.now()}`,
      title: newExpenseTitle,
      category: newExpenseCategory,
      amount: Number(newExpenseAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Paid"
    };

    setExpenses([entry, ...expenses]);
    setNewExpenseTitle("");
    setNewExpenseAmount("");
    addToast(`Added expense "${entry.title}" ($${entry.amount})`, "success");
  };

  const totalExpensesAmt = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = grossProfit - totalExpensesAmt;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Finance, Expenses & Cash Flow</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Real-time cash flow position, profit & loss, expenses, and ledger tracking
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid-12">
        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Revenue (Sales)</span>
            <ArrowUpRight size={16} color="var(--success)" />
          </div>
          <div className="kpi-text" style={{ marginTop: "4px", color: "var(--success)" }}>
            ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Operating Expenses</span>
            <ArrowDownRight size={16} color="var(--warning)" />
          </div>
          <div className="kpi-text" style={{ marginTop: "4px" }}>
            ${totalExpensesAmt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Net Profit (P&L)</span>
            <DollarSign size={16} color="var(--primary)" />
          </div>
          <div className="kpi-text" style={{ marginTop: "4px", color: netProfit >= 0 ? "var(--success)" : "var(--error)" }}>
            ${netProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="col-3 card-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Receivables Overdue</span>
            <span className="status-badge badge-warning">Net-30</span>
          </div>
          <div className="kpi-text" style={{ marginTop: "4px" }}>$42,000.00</div>
        </div>
      </div>

      {/* EXPENSE ENTRY FORM & RECEIPT SCANNER */}
      <div className="grid-12">
        <div className="col-5 card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Record New Expense / Receipt OCR</div>
          
          <form onSubmit={handleAddExpense} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)" }}>Expense Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Marketing Flyers, Utility Bill..."
                value={newExpenseTitle}
                onChange={(e) => setNewExpenseTitle(e.target.value)}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)" }}>Category</label>
                <select
                  className="input-field"
                  value={newExpenseCategory}
                  onChange={(e) => setNewExpenseCategory(e.target.value)}
                >
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Transport">Transport</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Misc">Misc Expenses</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)" }}>Amount ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0.00"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, gap: "6px" }}>
                <Plus size={14} /> Record Expense
              </button>
              <button type="button" onClick={() => addToast("Receipt OCR simulated — detected $145.00 Transport receipt", "info")} className="btn btn-secondary" style={{ gap: "6px" }}>
                <Camera size={14} /> OCR Scan
              </button>
            </div>
          </form>
        </div>

        {/* EXPENSES TABLE */}
        <div className="col-7 card-panel">
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)", marginBottom: "12px" }}>
            Operating Expenses Ledger ({expenses.length} Records)
          </div>

          <div className="table-container">
            <table className="business-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title & Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{e.date}</td>
                    <td>
                      <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{e.title}</div>
                      <span className="status-badge badge-muted" style={{ fontSize: "10px", marginTop: "2px" }}>{e.category}</span>
                    </td>
                    <td style={{ fontWeight: "700", color: "var(--text-main)" }}>${e.amount.toFixed(2)}</td>
                    <td>
                      <span className="status-badge badge-success">● {e.status}</span>
                    </td>
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
