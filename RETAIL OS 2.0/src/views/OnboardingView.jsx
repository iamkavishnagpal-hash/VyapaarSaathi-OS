import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  Store, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  Globe, 
  Sparkles,
  Zap
} from "lucide-react";

export const OnboardingView = () => {
  const navigate = useNavigate();
  const { addToast } = useRetail();

  const [step, setStep] = useState(1);

  const [bizType, setBizType] = useState("retail"); // 'retail' | 'wholesale' | 'distribution'
  const [bizName, setBizName] = useState("VyapaarSaathi Flagship Store");
  const [gstin, setGstin] = useState("07AAAAA0000A1Z5");
  const [storeName, setStoreName] = useState("Delhi Central Store");
  const [whName, setWhName] = useState("Main Logistics Hub");

  const totalSteps = 6;

  const handleFinish = () => {
    addToast("Business OS environment initialized successfully!", "success");
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "20px 0", display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div className="card-panel" style={{ textAlign: "center", padding: "24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", borderRadius: "var(--radius-pill)", backgroundColor: "var(--primary-subtle)", color: "var(--primary)", fontSize: "12px", fontWeight: "700", marginBottom: "12px" }}>
          <Sparkles size={14} /> Step {step} of {totalSteps}: Progressive Setup Wizard
        </div>

        <h1 className="h1-title">Welcome to VyapaarSaathi OS</h1>
        <p className="body-text" style={{ fontSize: "13px", marginTop: "4px" }}>
          Let's configure your complete Business Operating System parameters
        </p>

        {/* PROGRESS BAR */}
        <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-pill)", overflow: "hidden", marginTop: "16px" }}>
          <div
            style={{
              width: `${(step / totalSteps) * 100}%`,
              height: "100%",
              backgroundColor: "var(--primary)",
              transition: "width 0.3s ease"
            }}
          />
        </div>
      </div>

      {/* STEP 1: BUSINESS TYPE */}
      {step === 1 && (
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Select Your Business Category</div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              { id: "retail", label: "Retail Shop", desc: "Single or multi-storefront retail selling directly to consumers" },
              { id: "wholesale", label: "Wholesale Business", desc: "Bulk quantity sales, customer credit ledgers, & tier pricing" },
              { id: "distribution", label: "Distributor & Logistics", desc: "Multi-warehouse stock distribution & supplier purchasing" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setBizType(cat.id)}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: bizType === cat.id ? "var(--primary-subtle)" : "var(--bg-elevated)",
                  border: bizType === cat.id ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{cat.label}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{cat.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <button onClick={() => setStep(2)} className="btn btn-primary" style={{ gap: "6px" }}>
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BUSINESS NAME & GSTIN */}
      {step === 2 && (
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Business & Legal Profile</div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>Business / Storefront Name</label>
            <input
              type="text"
              className="input-field"
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>GSTIN / Tax Identification (Optional)</label>
            <input
              type="text"
              className="input-field"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ gap: "6px" }}>
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep(3)} className="btn btn-primary" style={{ gap: "6px" }}>
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: STORES & WAREHOUSES */}
      {step === 3 && (
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Storefront & Warehouse Setup</div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>Primary Store Location</label>
            <input
              type="text"
              className="input-field"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>Primary Warehouse Location</label>
            <input
              type="text"
              className="input-field"
              value={whName}
              onChange={(e) => setWhName(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ gap: "6px" }}>
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep(4)} className="btn btn-primary" style={{ gap: "6px" }}>
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TAX & CURRENCY */}
      {step === 4 && (
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Tax Rates & Currency Settings</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>Currency Symbol</label>
              <select className="input-field">
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>Default GST Tax Rate</label>
              <select className="input-field">
                <option value="18">18% Standard GST</option>
                <option value="12">12% Reduced GST</option>
                <option value="5">5% Essential Goods GST</option>
                <option value="0">0% Exempted</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <button onClick={() => setStep(3)} className="btn btn-secondary" style={{ gap: "6px" }}>
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep(5)} className="btn btn-primary" style={{ gap: "6px" }}>
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: IMPORT DATA */}
      {step === 5 && (
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Import Catalog & Opening Balances</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Upload existing product list CSV/Excel or start with standard retail demo catalog
          </div>

          <div
            style={{
              padding: "24px",
              border: "2px dashed var(--border-color)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer"
            }}
            onClick={() => addToast("Loaded default demo retail catalog with 5 active SKUs", "info")}
          >
            <Upload size={32} color="var(--primary)" />
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Click to Upload Product CSV</div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Supports SKU, Title, Price, Cost, Stock, & Barcode columns</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <button onClick={() => setStep(4)} className="btn btn-secondary" style={{ gap: "6px" }}>
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep(6)} className="btn btn-primary" style={{ gap: "6px" }}>
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: READY TO LAUNCH */}
      {step === 6 && (
        <div className="card-panel" style={{ textAlign: "center", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <CheckCircle2 size={48} color="var(--success)" />
          <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)" }}>Setup Complete!</div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "480px" }}>
            Your business operating system is ready for **{bizName}**. Start billing, analyzing physical products with AI, and tracking inventory!
          </div>

          <button onClick={handleFinish} className="btn btn-primary btn-lg" style={{ gap: "8px", marginTop: "8px" }}>
            <Zap size={18} /> Launch Business Command Center
          </button>
        </div>
      )}

    </div>
  );
};
