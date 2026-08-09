import React, { useEffect, useRef } from "react";
import { useRetail } from "../context/RetailContext";

export const InventoryCubeCanvas3D = () => {
  const canvasRef = useRef(null);
  const { products } = useRetail();

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

    let hoverIndex = -1;

    // Handle mouse move for interactive 3D stack highlighting
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const w = getWidth();
      const items = products.slice(0, 6);
      const colWidth = w / (items.length || 1);
      hoverIndex = Math.floor(mouseX / colWidth);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => { hoverIndex = -1; });

    let angle = 0;

    const render = () => {
      const w = getWidth();
      const h = getHeight();
      ctx.clearRect(0, 0, w, h);

      angle += 0.015;

      const items = products.slice(0, 6);
      const colWidth = w / (items.length || 1);

      items.forEach((p, idx) => {
        const isHovered = idx === hoverIndex;
        const centerX = idx * colWidth + colWidth / 2;
        const baseY = h - 45;
        const maxStock = 70;
        const targetHeight = Math.min(130, Math.max(30, (p.stockQty / maxStock) * 120));
        
        // Gentle 3D floating effect
        const floatOffset = Math.sin(angle + idx * 0.8) * 3;
        const topY = baseY - targetHeight + floatOffset;

        const size = Math.min(42, colWidth * 0.45);

        // Colors
        const isLow = p.stockQty <= p.lowStockThreshold;
        const mainColor = isLow ? "#F59E0B" : (isHovered ? "#3B82F6" : "#10B981");
        const sideColor = isLow ? "#B45309" : (isHovered ? "#1D4ED8" : "#047857");
        const topColor = isLow ? "#FDE68A" : (isHovered ? "#93C5FD" : "#6EE7B7");

        // Draw 3D Isometric Cube Top Face
        ctx.beginPath();
        ctx.moveTo(centerX, topY - size / 2);
        ctx.lineTo(centerX + size / 1.5, topY - size / 4);
        ctx.lineTo(centerX, topY);
        ctx.lineTo(centerX - size / 1.5, topY - size / 4);
        ctx.closePath();
        ctx.fillStyle = topColor;
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Draw 3D Left Face
        ctx.beginPath();
        ctx.moveTo(centerX - size / 1.5, topY - size / 4);
        ctx.lineTo(centerX, topY);
        ctx.lineTo(centerX, baseY);
        ctx.lineTo(centerX - size / 1.5, baseY - size / 4);
        ctx.closePath();
        ctx.fillStyle = mainColor;
        ctx.fill();

        // Draw 3D Right Face
        ctx.beginPath();
        ctx.moveTo(centerX + size / 1.5, topY - size / 4);
        ctx.lineTo(centerX, topY);
        ctx.lineTo(centerX, baseY);
        ctx.lineTo(centerX + size / 1.5, baseY - size / 4);
        ctx.closePath();
        ctx.fillStyle = sideColor;
        ctx.fill();

        // Highlighting glow effect on hover
        if (isHovered) {
          ctx.shadowColor = mainColor;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Product SKU & Stock Label below cube
        ctx.font = isHovered ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.fillStyle = isHovered ? "var(--primary)" : "#F8FAFC";
        ctx.textAlign = "center";
        ctx.fillText(`${p.stockQty} Qty`, centerX, baseY + 18);

        ctx.font = "9px Inter, sans-serif";
        ctx.fillStyle = "var(--text-muted)";
        const truncatedTitle = p.title.length > 14 ? p.title.substring(0, 12) + ".." : p.title;
        ctx.fillText(truncatedTitle, centerX, baseY + 32);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [products]);

  return (
    <div className="card-panel" style={{ padding: "16px", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
            3D Interactive Inventory Stack Visualizer
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            Real-time isometric 3D height scaling for Kapda Mafia & Shoe Mafia stock levels
          </div>
        </div>
        <span className="status-badge badge-primary" style={{ fontSize: "10px" }}>3D Isometric Rendering</span>
      </div>

      <canvas ref={canvasRef} style={{ width: "100%", height: "220px", display: "block" }} />
    </div>
  );
};
