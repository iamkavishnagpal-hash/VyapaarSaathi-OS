import React, { useEffect, useRef } from "react";

export const GlobalNodeNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 180;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Global Channel Nodes
    const nodes = [
      { id: "center", label: "Master Stock Brain", x: canvas.width / 2, y: canvas.height / 2, color: "#3B82F6", radius: 24, isCenter: true },
      { id: "store", label: "POS Store", x: canvas.width * 0.15, y: 40, color: "#10B981", radius: 14 },
      { id: "amazon", label: "Amazon", x: canvas.width * 0.3, y: 140, color: "#F59E0B", radius: 14 },
      { id: "shopify", label: "Shopify", x: canvas.width * 0.5, y: 30, color: "#14B8A6", radius: 14 },
      { id: "flipkart", label: "Flipkart", x: canvas.width * 0.7, y: 140, color: "#8B5CF6", radius: 14 },
      { id: "whatsapp", label: "WhatsApp", x: canvas.width * 0.85, y: 50, color: "#22C55E", radius: 14 }
    ];

    // Order particles flowing into center
    const particles = Array.from({ length: 14 }).map((_, i) => {
      const sourceNode = nodes[(i % (nodes.length - 1)) + 1];
      return {
        source: sourceNode,
        target: nodes[0],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
        color: sourceNode.color
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting glowing line network
      nodes.forEach((node) => {
        if (!node.isCenter) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[0].x, nodes[0].y);
          ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw animated particles (order & inventory sync stream)
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const currX = p.source.x + (p.target.x - p.source.x) * p.progress;
        const currY = p.source.y + (p.target.y - p.source.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Channel Nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isCenter ? "var(--primary)" : "var(--bg-elevated)";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = node.isCenter ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + (node.isCenter ? 4 : 26));
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
    <div className="card-panel" style={{ padding: "12px", overflow: "hidden", position: "relative" }}>
      <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
        Live Global Omni-Channel Sync Network
      </div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "180px", display: "block" }} />
    </div>
  );
};
