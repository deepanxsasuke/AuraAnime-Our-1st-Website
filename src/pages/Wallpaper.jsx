import { useParams } from "react-router-dom";
import wallpapers from "../data/wallpapers";

export default function Wallpaper() {
  const { id } = useParams();
  const wall = wallpapers.find((w) => w.id === id);

  if (!wall) return <div className="p-5">Wallpaper not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{wall.title}</h1>

      <img
        src={wall.image}
        alt={wall.title}
        className="mx-auto rounded-xl max-h-[75vh]"
      />

      <a
        href={wall.image}
        download
        className="inline-block mt-5 bg-[#8b5cf6] px-6 py-3 rounded-full font-semibold"
      >
        Download Wallpaper
      </a>

      <p className="text-xs text-gray-400 mt-3">
        For personal use only. Fan-made / AI-generated.
      </p>
    </div>
  );
}
