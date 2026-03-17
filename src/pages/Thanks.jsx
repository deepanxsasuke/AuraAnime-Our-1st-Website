import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Lightweight floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const COUNT = 18;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.4 + 0.1),
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="thanks-page">
      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="thanks-particles" />

      {/* Content */}
      <div className="thanks-content">
        <h1 className="thanks-title thanks-fadein">
          🎉 Thanks for downloading!
        </h1>

        <p className="thanks-subtitle thanks-fadein thanks-delay-1">
          Your wallpaper has been saved to your gallery.
        </p>

        <p className="thanks-small thanks-fadein thanks-delay-2">
          Get more AI anime wallpapers ❤️
        </p>

        {/* Buttons */}
        <div className="thanks-buttons thanks-fadein thanks-delay-3">
          <button
            onClick={() => {
              window.open("https://linkpays.in/NsgObSTM", "_blank");
              setTimeout(() => navigate("/"), 300);
            }}
            className="thanks-btn-continue"
          >
            ✨ Continue
          </button>

          <button
            onClick={() => {
              window.open("https://shrinkme.click/sB6JQks", "_blank");
              setTimeout(() => navigate("/"), 300);
            }}
            className="thanks-btn-outline"
          >
            🖼 More HD Wallpapers
          </button>

          <button
            onClick={() => navigate("/")}
            className="thanks-btn-back"
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
