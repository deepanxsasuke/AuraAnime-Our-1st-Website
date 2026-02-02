import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 1500); // smooth delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">

      {/* 🎉 TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 animate-fadeIn">
        🎉 Thanks for downloading!
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-400 mb-6 animate-fadeInDelay">
        Your wallpaper has been saved to your gallery.
      </p>

      {/* LOADING */}
      {!showAd && (
        <div className="flex flex-col items-center mb-6">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-gray-500 text-sm">
            Preparing something cool for you...
          </span>
        </div>
      )}

      {/* ADSENSE SLOT */}
      {showAd && (
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 animate-slideUp">
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXX"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>

          <script>
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </script>
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 transition"
      >
        🔙 Back to Home
      </button>

    </div>
  );
}
