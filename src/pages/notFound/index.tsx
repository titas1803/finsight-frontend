import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle grid effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = 12;
    const rows = 8;
    const dots: {
      x: number;
      y: number;
      alpha: number;
      speed: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: (canvas.width / (cols - 1)) * i,
          y: (canvas.height / (rows - 1)) * j,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      dots.forEach((dot) => {
        dot.alpha = 0.08 + 0.12 * Math.sin(t * dot.speed * 100 + dot.phase);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${dot.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby dots
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.04 * (1 - dist / 80)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0F1117" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(108,99,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 Display */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[10rem] font-black leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(108,99,255,0.25)",
              fontSize: "clamp(6rem, 20vw, 12rem)",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-[10rem] font-black leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, #6C63FF 0%, #a78bfa 50%, #6C63FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "clamp(6rem, 20vw, 12rem)",
              opacity: 0.15,
              filter: "blur(12px)",
            }}
          >
            404
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #6C63FF, transparent)",
          }}
        />

        {/* Text */}
        <h1
          className="text-2xl font-bold mb-2 tracking-tight"
          style={{ color: "#F1F5F9" }}
        >
          Page not found
        </h1>
        <p
          className="text-sm max-w-xs leading-relaxed mb-8"
          style={{ color: "#64748B" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.2)",
              color: "#6C63FF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(108,99,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(108,99,255,0.1)";
            }}
          >
            Go back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ background: "#6C63FF", color: "#fff" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5B54E8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#6C63FF";
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
