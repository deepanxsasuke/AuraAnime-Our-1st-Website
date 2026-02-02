import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function View() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        No image found
      </div>
    );
  }
  

  const handleDownload = async () => {
    try {
      const response = await fetch(state);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "AuraAnime-Wallpaper.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setTimeout(() => navigate("/thanks"), 500);
    } catch {
      alert("Download failed");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center px-4">

      {/* MAIN LAYOUT */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* 🖼️ IMAGE LEFT */}
<motion.img
  src={state}
  alt="Wallpaper"

  /* 👆 DRAG ENABLE (MOBILE SWIPE) */
  drag="x"
  dragConstraints={{ left: 0, right: 120 }}
  dragElastic={0.2}

  /* 👉 SWIPE RIGHT = BACK */
  onDragEnd={(event, info) => {
    if (info.offset.x > 100) {
      navigate(-1);
    }
  }}

  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}

  className="
    w-full
    max-h-[85vh]
    object-contain
    rounded-2xl
    shadow-2xl
    cursor-grab active:cursor-grabbing
  "
/>


        {/* 🔥 BUTTONS RIGHT */}
        <div className="flex flex-col gap-6 items-center md:items-start">

          <motion.button
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  onClick={handleDownload}
  className="
    w-64
    py-4
    text-xl
    rounded-full
    bg-indigo-500
    hover:bg-indigo-600
    font-semibold
    transition
    hover:scale-105
    shadow-[0_0_35px_rgba(99,102,241,0.7)]
    download
  "
>
  ❤️‍🔥 Download 📌
</motion.button>


          {/* BACK */}
        <motion.button
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.65, duration: 0.6 }}
  onClick={() => navigate(-1)}
  className="
    w-64
    py-4
    text-xl
    rounded-full
    bg-zinc-800
    hover:bg-zinc-700
    font-semibold
    transition
    hover:scale-105
    shadow-[0_0_30px_rgba(255,255,255,0.25)]
    border border-white/20
    download
  "
>
  ← Back Button ←
</motion.button>


        </div>
      </div>
    </div>
  );
}