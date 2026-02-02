export default function WallpaperCard({ image }) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src={"https://res.cloudinary.com/dcgv1ubxh/image/upload/v1766083110/qwwaxtoxczybhfgzbv1z.jpg"}
        className="w-full h-60 object-cover"
        alt="Anime wallpaper"
      />

      <a
        href={image}
        download
        className="absolute bottom-3 right-3 bg-purple-600 px-4 py-2 rounded"
      >
        Download
      </a>
    </div>
  );
}
