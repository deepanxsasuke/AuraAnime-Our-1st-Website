import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";


const COUPLES = "Matching Lock-Screen (Couples)";

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
  const navigate = useNavigate();

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
  }, [selected]);

  const filteredImages = images.filter(img =>
    img.title?.toLowerCase().includes(search.toLowerCase()) ||
    img.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0b0f19] min-h-screen text-white flex flex-col">

      <header className="px-6 py-10 text-center">


        <h1 className="text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]">
          Anime Wallpapers
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          High quality • AI Generated • Mobile & Desktop
        </p>
      </header>

      <div className="mt-8 flex justify-center px-4">
        <SearchBar query={search} setQuery={setSearch} />
      </div>

      <div className="mt-6 flex justify-center px-4">
        <CategoryBar selected={selected} setSelected={setSelected} />
      </div>

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
                    src={pair.left}
                    className="aspect-[9/16] w-full object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate("/view", { state: pair.left })}
                  />
                  <img
                    src={pair.right}
                    className="aspect-[9/16] w-full object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate("/view", { state: pair.right })}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.length > 0 ? (
              filteredImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => navigate("/view", { state: img.image })}
                  className="group cursor-pointer rounded-xl bg-black shadow-lg"
                >
                  <img src={img.image} className="w-full h-auto" />
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠 ‪‪❤︎‬. .
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
