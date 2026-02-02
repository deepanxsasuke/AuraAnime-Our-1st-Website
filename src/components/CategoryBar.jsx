import categories from "../data/categories";

export default function CategoryBar({ selected, setSelected }) {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
            ${
              selected === cat
                ? "bg-neon text-black"
                : "bg-cardDark text-gray-300"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
