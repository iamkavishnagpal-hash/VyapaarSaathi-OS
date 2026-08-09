import React, { useEffect, useRef } from "react";

export const GlobalNodeNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 900;
      const displayHeight = 240;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = containerWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getWidth = () => canvas.parentElement?.clientWidth || 900;
    const getHeight = () => 240;

    // Define 10 Channel Nodes with brand logos/badge markers
    const createNodes = () => {
      const w = getWidth();
      const h = getHeight();
      const centerX = w / 2;
      const centerY = h / 2;

      return [
        { id: "center", label: "Master Stock Brain", logo: "BRAIN", x: centerX, y: centerY, color: "#3B82F6", bg: "#1D4ED8", radius: 26, isCenter: true },
        { id: "store", label: "Kapda & Shoe POS", logo: "POS", x: w * 0.12, y: 50, color: "#10B981", bg: "#065F46", radius: 18 },
        { id: "shopify", label: "Shopify Store", logo: "S", x: w * 0.3, y: 40, color: "#95BF47", bg: "#365314", radius: 18 },
        { id: "amazon", label: "Amazon", logo: "a", x: w * 0.5, y: 35, color: "#FF9900", bg: "#78350F", radius: 18 },
        { id: "flipkart", label: "Flipkart", logo: "fk", x: w * 0.7, y: 40, color: "#2874F0", bg: "#1E3A8A", radius: 18 },
        { id: "whatsapp", label: "WhatsApp AI", logo: "WA", x: w * 0.88, y: 50, color: "#25D366", bg: "#14532D", radius: 18 },
        { id: "meesho", label: "Meesho", logo: "m", x: w * 0.15, y: 190, color: "#F43F5E", bg: "#881337", radius: 18 },
        { id: "etsy", label: "Etsy Global", logo: "E", x: w * 0.38, y: 195, color: "#F1641E", bg: "#7C2D12", radius: 18 },
        { id: "walmart", label: "Walmart", logo: "★", x: w * 0.62, y: 195, color: "#0071DC", bg: "#1E3A8A", radius: 18 },
        { id: "instagram", label: "Instagram Shop", logo: "IG", x: w * 0.85, y: 190, color: "#E6683C", bg: "#831843", radius: 18 }
      ];
    };

    let nodes = createNodes();

    // Create 20 dynamic particles flowing between nodes and center
    const particles = Array.from({ length: 22 }).map((_, i) => {
      const sourceIndex = (i % (nodes.length - 1)) + 1;
      return {
        sourceIndex,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006
      };
    });

    const render = () => {
      const w = getWidth();
      const h = getHeight();
      nodes = createNodes();

      ctx.clearRect(0, 0, w, h);

      const centerNode = nodes[0];

      // 1. Draw glowing connecting lines between channels and central brain
      nodes.forEach((node) => {
        if (!node.isCenter) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(centerNode.x, centerNode.y);
          ctx.strokeStyle = "rgba(59, 130, 246, 0.22)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // 2. Draw moving order & inventory sync particles
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const source = nodes[p.sourceIndex];
        if (!source) return;

        const currX = source.x + (centerNode.x - source.x) * p.progress;
        const currY = source.y + (centerNode.y - source.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = source.color;
        ctx.shadowColor = source.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Channel Nodes with Brand Logos & Crisp Text
      nodes.forEach((node) => {
        // Outer glowing ring for central brain
        if (node.isCenter) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node Circle Background
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.bg;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // Brand Logo Text inside circle
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.logo, node.x, node.y);

        // High-Contrast Label Badge below node
        const badgeWidth = ctx.measureText(node.label).width + 16;
        const badgeHeight = 18;
        const badgeY = node.isCenter ? node.y + node.radius + 10 : node.y + node.radius + 6;

        ctx.fillStyle = "rgba(16, 22, 34, 0.88)";
        ctx.strokeStyle = "rgba(36, 48, 72, 0.9)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(node.x - badgeWidth / 2, badgeY, badgeWidth, badgeHeight, 4);
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 10px Inter, sans-serif";
        ctx.fillStyle = node.isCenter ? "var(--primary)" : "#F8FAFC";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, badgeY + badgeHeight / 2);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="card-panel" style={{ padding: "16px", overflow: "hidden", position: "relative", backgroundColor: "var(--bg-surface)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
            Live Global Omni-Channel Sync Network
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            Real-time visual node stream connecting Shopify, Amazon, Flipkart, WhatsApp, & POS to Central Master Brain
          </div>
        </div>
        <span className="status-badge badge-success" style={{ fontSize: "10px" }}>● 10 Nodes Connected</span>
      </div>

      <canvas ref={canvasRef} style={{ width: "100%", height: "240px", display: "block" }} />
    </div>
  );
};
