import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOContent from "../components/SEOContent";

const getOptimizedUrl = (url) => {
  if (!url) return "";
  return url.includes("res.cloudinary.com")
    ? url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/")
    : url;
};

export default function View() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const optimizedUrl = getOptimizedUrl(state);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Robustly force the browser to scroll to top after a tiny delay
    // This overrides any default scroll restoration by React Router
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);

    const img = new Image();
    img.src = optimizedUrl;
    img.onload = () => setLoaded(true);
  }, [optimizedUrl]);

  if (!state) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        No image found
      </div>
    );
  }

  const handleDownload = () => {
    const downloadUrl = state.includes("res.cloudinary.com")
      ? state.replace("/upload/", "/upload/fl_attachment/")
      : state;
    window.open(downloadUrl, "_self");
    setTimeout(() => {
      navigate("/thanks");
    }, 300);
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center pt-8 md:pt-16 px-0 w-full overflow-x-hidden">

      <style>{`
        @keyframes shimmer-btn {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes neon-pulse-dl {
          0%, 100% { box-shadow: 0 0 18px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2); }
          50%       { box-shadow: 0 0 32px rgba(255,255,255,0.55), 0 0 70px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.32); }
        }
        .view-btn span {
          background: linear-gradient(90deg, #888 0%, #fff 30%, #ccc 50%, #fff 70%, #888 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-btn 3s linear infinite;
          letter-spacing: 0.18em;
        }
        .view-btn { animation: neon-pulse-dl 3s ease-in-out infinite; }
        .view-btn:hover {
          animation: none;
          box-shadow: 0 0 45px rgba(255,255,255,0.6), 0 0 100px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.45) !important;
          border-color: rgba(255,255,255,0.7) !important;
        }
      `}</style>

      {/* Main Wallpaper Area */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center justify-items-center mb-32 mt-4 md:mt-8 px-4">

        {/* 🖼️ IMAGE */}
        <div className="relative p-2 rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_50px_rgba(255,255,255,0.05)] w-full max-w-sm md:max-w-md">
          <motion.img
            src={optimizedUrl}
            alt="Wallpaper"
            drag="x"
            dragConstraints={{ left: 0, right: 120 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x > 100) navigate(-1);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing bg-black block"
          />
        </div>
        <br />

        {/* 🔥 BUTTONS */}
        <div className="flex flex-col gap-4 w-full items-center px-4 max-w-[380px] mt-6 md:mt-0">
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={handleDownload}
            className="view-btn py-[0.85rem] px-10 text-sm font-bold uppercase rounded-full transition-all duration-300 hover:scale-[1.04] w-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <span>✨ Download</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={() => navigate(-1)}
            className="view-btn py-[0.85rem] px-10 text-sm font-bold uppercase rounded-full transition-all duration-300 hover:scale-[1.04] w-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <span>← Back</span>
          </motion.button>
        </div>

      </div>
      <br />
      <br/>

      {/* SEO Blog Content Area */}
      <div className="w-full bg-[#0a0c10] border-t border-white/5 pt-24 pb-16">
        <SEOContent />
      </div>

    </div>
  );
}