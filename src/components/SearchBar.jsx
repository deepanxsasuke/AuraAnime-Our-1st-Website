import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

export default function SearchBar({ query, setQuery }) {
  return (
    
    <motion.div
  initial={{ opacity: 0, y: 48, scale: 0.94 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 2.5,              // ⏳ slower & premium
    ease: [0.16, 1, 0.3, 1],     // 🍎 Apple-style smooth easing
    delay: 0.20                // ✨ slight cinematic delay
  }}
  className="relative w-full max-w-3xl mx-auto
  "
>

      {/* SEARCH BAR */}
      <div className='relative flex items-center bg-[#1f232a] rounded-full h-14 px-5 shadow-lg border border-white/10'>

        {/* 🔍 SEARCH ICON */}
        <Search className="text-gray-400 w-5 h-5 mr-4" />

        {/* INPUT */}
       <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search wallpapers..."
  style={{ color: "#ffffff" }}   // 🔥 FORCE WHITE
  className="
    flex-1
    bg-transparent
    caret-white
    placeholder-gray-400
    appearance-none
    text-base
    focus:outline-none
  "
/>

        {/* ❌ CLEAR ICON */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-4 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
