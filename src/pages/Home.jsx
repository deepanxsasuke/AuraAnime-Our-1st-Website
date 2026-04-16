import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate, useLocation } from "react-router-dom";

import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import HomeSEOContent from "../components/HomeSEOContent";


const COUPLES = "Matching Lock-Screen (Couples)";
//optimation
const getOptimizedUrl = (url) => {
  if (!url) return "";

  return url.includes("res.cloudinary.com")
    ? url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_900/"
      )
    : url;
};


// 🔥 CATEGORY HEADINGS
const CATEGORY_TITLES = {
  "Matching Lock-Screen (Couples)": "👩🏻‍❤️‍👨🏻 Couples Special 🧿❤️🔐",
  "Naruto": "🍃🔥 Shinobi Legends ⚔️🍥",
  "Attack on Titan": "🧱⚔️ Beyond the Walls 🔥",
  "Demon Slayer": "🌙🔥 Blade of the Night ⚔️",
  "One Piece": "🏴‍☠️🌊 Journey to the Grand Line ⚓",
  "Aesthetic": "🌙✨ Aesthetic Dreams 💫",
  "Jujutsu Kaisen": "👁️‍🗨️🔥 Cursed Energy Realm ⚡"
};

export default function Home() {
  const [images, setImages] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Restore category when user navigates back from View/Thanks
  useEffect(() => {
    if (location.state?.restoreCategory) {
      setSelected(location.state.restoreCategory);
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setImages([]);
      setPairs([]);
  

      // 🔥 COUPLES MODE
      if (selected === COUPLES) {
        const q = query(
          collection(db, "wallpapers2"),
          where("category", "==", COUPLES)
        );

        const snap = await getDocs(q);
        const temp = {};

        snap.forEach(doc => {
          const data = doc.data();
          if (!data.pairTag || !data.side || !data.image) return;

          if (!temp[data.pairTag]) {
            temp[data.pairTag] = { pairTag: data.pairTag, left: null, right: null };
          }

          if (data.side === "left") temp[data.pairTag].left = data.image;
          if (data.side === "right") temp[data.pairTag].right = data.image;
        });

        setPairs(Object.values(temp).filter(p => p.left && p.right));
        return;
      }

      // 🧱 NORMAL WALLPAPERS
      const q =
        selected === "All"
          ? collection(db, "wallpapers")
          : query(collection(db, "wallpapers"), where("category", "==", selected));

      const snap = await getDocs(q);
      setImages(snap.docs.map(d => d.data()));
    };

    fetchData();
    setShowAll(false); // reset when category changes
  }, [selected]);

  const filteredImages = images.filter(img =>
    img.title?.toLowerCase().includes(search.toLowerCase()) ||
    img.category?.toLowerCase().includes(search.toLowerCase())
  );

  const LIMIT = 20;
  const isAllCategory = selected === "All";
  const displayedImages = isAllCategory && !showAll
    ? filteredImages.slice(0, LIMIT)
    : filteredImages;

  return (
    <div className="bg-[#0b0f19] min-h-screen text-white flex flex-col">

      <header className="px-6 py-10 text-center">


        <h1 className='tracking-in-expand
        text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]'>
          Aura Anime
        </h1>
        <p className='focus-in-expand-fwd
        
        text-gray-400 text-sm mt-2
        delay-slow
 '
        >
          

          High quality • AI Generated • Mobile Wallpapers
        </p>
        
      </header>

      <div className="mt-8 flex justify-center px-4">
        <SearchBar query={search} setQuery={setSearch} />
      </div>

      <div className="mt-6 flex justify-center px-4">
        <CategoryBar selected={selected} setSelected={setSelected} />
      </div>
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.5,       // ⏱️ AFTER category bar animation
    duration: 0.8,
    ease: "easeOut",
  }}
  className="mt-10 flex justify-center"
>
  
  <h2
    className="
      neon-text
      text-xl
      sm:text-2xl
      font-semibold
      tracking-wide
    "
  >
    Premium AI Anime Wallpapers
  </h2>
  
</motion.div>

      <main className="flex-1 px-4 sm:px-6 py-10">
{selected !== "All" && CATEGORY_TITLES[selected] && (
 <motion.div
  key={selected}
  initial={{ opacity: 0, y: 28, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1]
  }}
  className="mb-8 text-center"
>

    <h1 className="font-bold 
      text-xl 
      sm:text-2xl 
      md:text-3xl 
      lg:text-4xl 
      drop-shadow-[0_0_15px_#6366f1]"
    >
      {CATEGORY_TITLES[selected]}
    </h1>
  </motion.div>
)}


        
       {/* ❤️ COUPLES EXAMPLE IMAGE */}
{selected === COUPLES && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10 text-center"
  >
    <p className="text-gray-400 text-sm mb-3">
      Example Matching Lock-Screen ❤︎
    </p>

   <img
  src="/couples-example.jpg"
  alt="Couples Example"
  className="
    mx-auto
    w-full
    max-w-2xl
    aspect-video
    object-contain
    rounded-2xl
    shadow-xl
    bg-black
    opacity-50
    hover:opacity-100
    transition
    duration-500
    ease-in-out
    hover:scale-[1.02]

  "
/>

  </motion.div>
)}
<br></br>
<br></br>
{/* 🔥 COUPLES GRID */}
        {selected === COUPLES && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pairs.length > 0 ? (
              pairs.map(pair => (
                <div
                  key={pair.pairTag}
                  className="grid grid-cols-2 rounded-xl overflow-hidden bg-black shadow-xl"
                >
                  <img
                    src={getOptimizedUrl(pair.left)}
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate("/view", { state: { image: pair.left, category: selected } })}
                  />
                  <img
                    src={getOptimizedUrl(pair.right)}
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate("/view", { state: { image: pair.right, category: selected } })}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full">
                𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠 ‪‪❤︎‬. .
              </p>
            )}
          </div>
        )}

        {/* 🧱 NORMAL GRID */}
        {selected !== COUPLES && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedImages.length > 0 ? (
                displayedImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => navigate("/view", { state: { image: img.image, category: selected } })}
                    className="group cursor-pointer rounded-xl bg-black shadow-lg"
                  >
                    <img src={getOptimizedUrl(img.image)}
                      loading="lazy"
                      className="w-full h-auto" />
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠 ‪‪❤︎‬. .
                </p>
              )}
            </div>

            {/* Show "View All" button only on All category when more than 20 exist */}
            {isAllCategory && !showAll && filteredImages.length > LIMIT && (
              <div className="flex flex-col items-center gap-4 mt-12 mb-6">

                {/* Glowing divider */}
                <div style={{
                  width: "120px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                }} />

                <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
                  More wallpapers await
                </p>

                {/* Premium Pill Button */}
                <style>{`
                  @keyframes shimmer-text {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                  }
                  @keyframes neon-pulse {
                    0%, 100% { box-shadow: 0 0 18px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.25); }
                    50% { box-shadow: 0 0 28px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.35); }
                  }
                  .btn-neon span {
                    background: linear-gradient(90deg, #999 0%, #fff 30%, #ddd 50%, #fff 70%, #999 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer-text 3s linear infinite;
                  }
                  .btn-neon {
                    animation: neon-pulse 3s ease-in-out infinite;
                  }
                  .btn-neon:hover {
                    animation: none;
                    box-shadow: 0 0 40px rgba(255,255,255,0.6), 0 0 90px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.5) !important;
                    border-color: rgba(255,255,255,0.7) !important;
                  }
                `}</style>

                <button
                  onClick={() => setShowAll(true)}
                  className="btn-neon px-12 py-3.5 rounded-full text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  <span>✦ View All Wallpapers</span>
                </button>

                {/* Bottom glowing divider */}
                <div style={{
                  width: "80px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }} />
              </div>
            )}
          </>
        )}
      </main>

      <HomeSEOContent />
      <Footer />
    </div>
  );
} 

