import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  MessageSquare, 
  Send, 
  Camera, 
  ShoppingBag, 
  CheckCircle2, 
  DollarSign, 
  Image as ImageIcon,
  ArrowRight,
  Sparkles 
} from "lucide-react";

export const WhatsAppCommerceView = () => {
  const { products, reserveStock, addToast } = useRetail();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: "wa-1",
      sender: "customer",
      text: "Bhaiya 1 kg sugar and 2 Maggi bhej do urgent",
      timestamp: "10:32 AM"
    },
    {
      id: "wa-2",
      sender: "ai_bot",
      text: "Namaste! Haan 1kg Sugar ($1.20) aur 2 Maggi ($3.00) available hain.\n\nTotal Bill: $4.20 + $1.00 Delivery = **$5.20**.\n\nOrder confirm karna hai?",
      ctas: [{ label: "Confirm & Reserve Stock", action: "confirm" }],
      timestamp: "10:32 AM"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);

  const handleSendCustomerMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `wa-cust-${Date.now()}`,
      sender: "customer",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    let replyText = "";
    if (inputText.toLowerCase().includes("haan") || inputText.toLowerCase().includes("yes") || inputText.toLowerCase().includes("confirm")) {
      replyText = "Awesome! Order #WA-9821 created successfully.\nPayment Link sent: https://pay.vyapaarsaathi.com/wa-9821\nPacking task sent to storefront staff.";
      reserveStock(products[0].id, 1);
    } else {
      replyText = `AI WhatsApp Assistant:\nChecking catalog stock for "${inputText}"...\nProduct is in stock! Price: $399.99. Replying to customer automatically.`;
    }

    const botReply = {
      id: `wa-bot-${Date.now()}`,
      sender: "ai_bot",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInputText("");
  };

  const handleSimulateImageUpload = () => {
    setIsImageSearchActive(true);
    setTimeout(() => {
      setIsImageSearchActive(false);
      const imgSearchReply = {
        id: `wa-bot-img-${Date.now()}`,
        sender: "ai_bot",
        text: "📷 Image Visual Search Match:\nCustomer uploaded product photo.\nMatched Item: **Sony WH-1000XM5 Headphones** (98% match).\n\nOption 1: Sony WH-1000XM5 ($399.99) - In Stock (25 units)\nOption 2: Quantum Sound Pro ($299.99) - In Stock (12 units)",
        ctas: [{ label: "Send Options to WhatsApp", action: "send_options" }],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, imgSearchReply]);
      addToast("AI Visual Search matched catalog item!", "success");
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquare size={22} color="var(--success)" />
            <h1 className="h1-title">WhatsApp AI Commerce Engine</h1>
          </div>
          <p className="body-text" style={{ fontSize: "13px", marginTop: "4px" }}>
            Automated WhatsApp chat ordering, payment link generation, and customer image visual search
          </p>
        </div>
      </div>

      <div className="grid-12">
        
        {/* WHATSAPP CONVERSATION SIMULATOR */}
        <div className="col-8 card-panel" style={{ display: "flex", flexDirection: "column", minHeight: "520px" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800" }}>
                WA
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Ramesh Sharma (Customer)</div>
                <div style={{ fontSize: "10px", color: "var(--success)" }}>● Online - WhatsApp AI Active</div>
              </div>
            </div>
            <span className="status-badge badge-success">Auto Order Bot</span>
          </div>

          {/* CHAT BODY */}
          <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "var(--bg-app)" }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === "customer" ? "flex-start" : "flex-end",
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: m.sender === "customer" ? "var(--bg-elevated)" : "var(--primary-subtle)",
                  border: m.sender === "customer" ? "1px solid var(--border-color)" : "1px solid var(--primary)",
                  fontSize: "13px",
                  color: "var(--text-main)",
                  whiteSpace: "pre-line"
                }}
              >
                {m.text}
                {m.ctas && m.ctas.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <button onClick={() => addToast("Order #WA-9821 confirmed & reserved!", "success")} className="btn btn-primary btn-sm">
                      Confirm & Reserve Stock
                    </button>
                  </div>
                )}
                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px", textAlign: "right" }}>{m.timestamp}</div>
              </div>
            ))}
          </div>

          {/* INPUT BAR & IMAGE SEARCH TRIGGER */}
          <form onSubmit={handleSendCustomerMessage} style={{ padding: "12px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={handleSimulateImageUpload}
              className="btn btn-secondary btn-sm"
              title="Simulate Customer Uploading Product Image"
              style={{ gap: "4px" }}
            >
              <ImageIcon size={16} />
              <span>Image Search</span>
            </button>

            <input
              type="text"
              className="input-field"
              placeholder="Simulate customer WhatsApp message (e.g. '1kg sugar bhej do', 'Haan confirm')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <button type="submit" className="btn btn-primary btn-sm" style={{ gap: "4px" }}>
              <Send size={14} />
            </button>
          </form>

        </div>

        {/* COMMERCE FEATURES SIDEBAR */}
        <div className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
            WhatsApp AI Capabilities
          </div>

          {[
            { title: "Natural Language Orders", desc: "Understands Hinglish order requests directly" },
            { title: "Real-time Stock Check", desc: "Verifies available inventory instantly" },
            { title: "Payment Link Delivery", desc: "Auto-generates UPI/Card payment link" },
            { title: "Visual Product Search", desc: "Matches customer uploaded photos to catalog" },
            { title: "Fulfillment Sync", desc: "Triggers packing task for store staff" }
          ].map((feat, idx) => (
            <div key={idx} style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>✓ {feat.title}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{feat.desc}</div>
            </div>
          ))}

          <button onClick={() => navigate("/fulfillment")} className="btn btn-primary" style={{ gap: "6px", marginTop: "auto" }}>
            <span>Go to Fulfillment Autopilot</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </div>
  );
};
