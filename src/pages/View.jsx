import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  // 🔹 Preload image so animation starts instantly
  useEffect(() => {
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
  // Get original full quality Cloudinary URL
  const originalUrl = state.includes("res.cloudinary.com")
    ? state.replace(/\/upload\/.*?\//, "/upload/")
    : state;

  const link = document.createElement("a");
  link.href = originalUrl;
  link.setAttribute("download", "AuraAnime-Wallpaper.jpg");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 🔥 Instant thanks page
  navigate("/thanks");
};
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* 🖼️ IMAGE */}
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
          className="
            w-full
            max-h-[85vh]
            object-contain
            rounded-2xl
            shadow-2xl
            cursor-grab active:cursor-grabbing
          "
        />

        {/* 🔥 BUTTONS */}
        <div className="flex flex-col gap-6 items-center md:items-start">
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={handleDownload}
            className="
              w-64 py-4 text-xl rounded-full bg-indigo-500 hover:bg-indigo-600
              font-semibold transition hover:scale-105 shadow-[0_0_35px_rgba(99,102,241,0.7)] download
            "
          >
            ❤️‍🔥 Download 📌
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            onClick={() => navigate(-1)}
            className="
              w-64 py-4 text-xl rounded-full bg-zinc-800 hover:bg-zinc-700
              font-semibold transition hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.25)]
              border border-white/20 download
            "
          >
            ← Back Button ←
          </motion.button>
        </div>
      </div>
    </div>
  );
}