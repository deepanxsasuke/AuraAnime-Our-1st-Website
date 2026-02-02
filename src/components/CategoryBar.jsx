import { motion } from "framer-motion";
import categories from "../data/categories";

export default function CategoriesBar({ selected, setSelected }) {
  return (
    <div className="w-full py-8">

      {/* 🔥 CATEGORY BAR */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.3,
            },
          },
        }}
        className="
          px-4

          /* 📱 MOBILE ONLY */
          grid grid-cols-3 gap-3

          /* 💻 DESKTOP ONLY (OLD STYLE) */
          md:flex md:flex-nowrap md:gap-6 md:px-6
          md:overflow-x-auto md:no-scrollbar
          md:justify-center
        "
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(cat)}
            className={`
              h-12 md:h-14
              px-3 md:px-8
              rounded-full
              colourforcategories
              text-black font-medium
              tracking-wide
              whitespace-nowrap
              transition-all duration-300
              ${
                selected === cat
                  ? "ring-2 ring-indigo-500/70 shadow-[0_0_35px_rgba(99,102,241,0.5)]"
                  : ""
              }
            `}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      

    </div>
  );
}
