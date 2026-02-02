import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export default function CoupleWallpapers() {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    fetchPairs();
  }, []);

  const fetchPairs = async () => {
    const q = query(
      collection(db, "wallpapers2"),
      where("category", "==", "Matching Lock-Screen (Couples)")
    );

    const snapshot = await getDocs(q);

    const temp = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const tag = data.pairTag;

      if (!temp[tag]) {
        temp[tag] = {};
      }

      temp[tag][data.side] = data.image;
    });

    // convert to array (only valid pairs)
    const finalPairs = Object.values(temp).filter(
      pair => pair.left && pair.right
    );

    setPairs(finalPairs);
  };

  return (
    <div className="pairs-grid">
      {pairs.map((pair, index) => (
        <div className="pair-card" key={index}>
          <img src={pair.left} alt="Left" />
          <img src={pair.right} alt="Right" />
        </div>
      ))}
    </div>
  );
}
