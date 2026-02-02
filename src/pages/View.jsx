import { useLocation, useNavigate } from "react-router-dom";

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

      // 🔥 AFTER DOWNLOAD → THANK YOU PAGE
      setTimeout(() => {
        navigate("/thanks");
      }, 500);

    } catch (err) {
      alert("Download failed");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4">
      <img
        src={state}
        alt="Wallpaper"
        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
      />

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-black px-6 py-2 rounded font-semibold hover:bg-green-400"
        >
          Download
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}
