import { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { uploadImage } from "../services/cloudinary";

export default function Admin() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [success, setSuccess] = useState("");

  const holdTimer = useRef(null);

  const categories = [
    "Naruto",
    "One Piece",
    "Attack on Titan",
    "Demon Slayer",
    "Jujutsu Kaisen",
    "Aesthetic",
    "Matching Lock-Screen (Couples)",
    
  ];

  /* ================= FETCH BOTH COLLECTIONS ================= */
  const fetchImages = async () => {
    const snap1 = await getDocs(collection(db, "wallpapers"));
    const snap2 = await getDocs(collection(db, "wallpapers2"));

    const normal = snap1.docs.map(d => ({
      id: d.id,
      ...d.data(),
      _collection: "wallpapers",
    }));

    const matching = snap2.docs.map(d => ({
      id: d.id,
      ...d.data(),
      _collection: "wallpapers2",
    }));

    setImages([...matching, ...normal]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= CATEGORY TOGGLE ================= */
  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!files.length) return alert("Select images");
    if (!title) return alert("Title required");
    if (!selectedCategories.length)
      return alert("Select at least one category");

    const isMatching = selectedCategories.includes(
      "Matching Lock-Screen (Couples)"
    );

    if (isMatching && files.length !== 2) {
      return alert("Matching Lock-Screen needs EXACTLY 2 images");
    }

    setLoading(true);
    setSuccess("");

    try {
      /* 🔥 MATCHING PAIR */
      if (isMatching) {
        const pairTag = `${title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")}-${Date.now()}`;

        for (let i = 0; i < 2; i++) {
          const data = await uploadImage(files[i]);

          await addDoc(collection(db, "wallpapers2"), {
            title,
            category: "Matching Lock-Screen (Couples)",
            image: data.secure_url,
            side: i === 0 ? "left" : "right",
            pairTag,
            createdAt: serverTimestamp(),
          });
        }

        setSuccess("✅ Matching pair uploaded 🔥");
      }

      /* 🧱 NORMAL WALLPAPERS */
      else {
        for (const file of files) {
          const data = await uploadImage(file);

          for (const category of selectedCategories) {
            await addDoc(collection(db, "wallpapers"), {
              title,
              category,
              image: data.secure_url,
              createdAt: serverTimestamp(),
            });
          }
        }

        setSuccess("✅ Uploaded to selected categories 🔥");
      }

      await fetchImages();
      setFiles([]);
      setTitle("");
      setSelectedCategories([]);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (img) => {
    if (!confirm("Delete this wallpaper?")) return;

    await deleteDoc(doc(db, img._collection, img.id));
    fetchImages();
  };

  /* ================= HOLD DELETE ================= */
  const startHold = (img) => {
    holdTimer.current = setTimeout(() => {
      handleDelete(img);
    }, 1200);
  };

  const endHold = () => {
    clearTimeout(holdTimer.current);
  };

  return (
    <div className="bg-[#0b0f19] min-h-screen text-white p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* UPLOAD */}
      <div className="bg-gray-900 p-4 rounded-xl mb-8 max-w-xl space-y-4">
        {success && (
          <div className="bg-green-500 text-black p-3 rounded text-center font-semibold">
            {success}
          </div>
        )}

        <input
          placeholder="Wallpaper Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <div className="space-y-2">
          <p className="font-semibold text-sm text-gray-300">
            Select Categories (Multiple allowed)
          </p>

          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <label
                key={cat}
                className="flex items-center gap-2 bg-black border border-gray-700 rounded px-2 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="file"
          multiple
          onChange={e => setFiles([...e.target.files])}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-500 text-black w-full py-2 rounded font-semibold"
        >
          {loading ? "Uploading..." : "Upload Wallpapers"}
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div
            key={img.id}
            className="rounded overflow-hidden bg-gray-800 select-none"
            onMouseDown={() => startHold(img)}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={() => startHold(img)}
            onTouchEnd={endHold}
            onContextMenu={(e) => {
              e.preventDefault();
              handleDelete(img);
            }}
          >
            <img
              src={img.image}
              className="h-[220px] w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
