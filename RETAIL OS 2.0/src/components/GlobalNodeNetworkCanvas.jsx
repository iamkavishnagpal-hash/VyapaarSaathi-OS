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
      const displayHeight = 220;
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
    const getHeight = () => 220;

    // Define 10 Monochromatic Enterprise Channel Nodes
    const createNodes = () => {
      const w = getWidth();
      const h = getHeight();
      const centerX = w / 2;
      const centerY = h / 2;

      return [
        { id: "center", label: "Centralized Inventory", logo: "SYNC", x: centerX, y: centerY, isCenter: true },
        { id: "store", label: "POS Store", logo: "POS", x: w * 0.12, y: 45 },
        { id: "shopify", label: "Shopify", logo: "S", x: w * 0.3, y: 35 },
        { id: "amazon", label: "Amazon", logo: "AMZ", x: w * 0.5, y: 30 },
        { id: "flipkart", label: "Flipkart", logo: "FK", x: w * 0.7, y: 35 },
        { id: "whatsapp", label: "WhatsApp AI", logo: "WA", x: w * 0.88, y: 45 },
        { id: "meesho", label: "Meesho", logo: "MSH", x: w * 0.15, y: 175 },
        { id: "etsy", label: "Etsy", logo: "ETSY", x: w * 0.38, y: 180 },
        { id: "walmart", label: "Walmart", logo: "WMT", x: w * 0.62, y: 180 },
        { id: "instagram", label: "Instagram", logo: "IG", x: w * 0.85, y: 175 }
      ];
    };

    let nodes = createNodes();

    // Electric Blue dynamic order streams
    const particles = Array.from({ length: 18 }).map((_, i) => {
      const sourceIndex = (i % (nodes.length - 1)) + 1;
      return {
        sourceIndex,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005
      };
    });

    const render = () => {
      const w = getWidth();
      const h = getHeight();
      nodes = createNodes();

      ctx.clearRect(0, 0, w, h);

      const centerNode = nodes[0];

      // 1. Sleek monochromatic connecting lines
      nodes.forEach((node) => {
        if (!node.isCenter) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(centerNode.x, centerNode.y);
          ctx.strokeStyle = "rgba(59, 130, 246, 0.18)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // 2. Electric Blue particle sync stream
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const source = nodes[p.sourceIndex];
        if (!source) return;

        const currX = source.x + (centerNode.x - source.x) * p.progress;
        const currY = source.y + (centerNode.y - source.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#3B82F6";
        ctx.shadowColor = "#3B82F6";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Monochromatic Enterprise Nodes
      nodes.forEach((node) => {
        const radius = node.isCenter ? 24 : 16;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isCenter ? "#1E293B" : "#0F172A";
        ctx.strokeStyle = node.isCenter ? "#3B82F6" : "#334155";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 10px Inter, sans-serif";
        ctx.fillStyle = node.isCenter ? "#3B82F6" : "#94A3B8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.logo, node.x, node.y);

        // Crisp minimal label
        const badgeWidth = ctx.measureText(node.label).width + 12;
        const badgeY = node.y + radius + 6;

        ctx.fillStyle = "#0F172A";
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(node.x - badgeWidth / 2, badgeY, badgeWidth, 16, 3);
        ctx.fill();
        ctx.stroke();

        ctx.font = "600 9px Inter, sans-serif";
        ctx.fillStyle = "#F8FAFC";
        ctx.fillText(node.label, node.x, badgeY + 8);
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
    <div className="card-panel" style={{ padding: "16px", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
            Omni-Channel Sync Network
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            Monochromatic data stream connecting 10 active commerce nodes to Centralized Inventory
          </div>
        </div>
        <span className="status-badge badge-primary" style={{ fontSize: "10px" }}>● 10 Nodes Connected</span>
      </div>

      <canvas ref={canvasRef} style={{ width: "100%", height: "220px", display: "block" }} />
    </div>
  );
};
