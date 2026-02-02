import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import View from "./pages/View";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DMCA from "./pages/DMCA";
import Terms from "./pages/Terms";
import Contact from "./pages/Contactus";
import Thanks from "./pages/Thanks";






export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return unsub;
  }, []);

  if (user === undefined) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Checking auth...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/view" element={<View />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/dmca" element={<DMCA />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/admin"
        element={user ? <Admin /> : <Navigate to="/login" />}
        

      />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="/thanks" element={<Thanks />} />

    </Routes>
  );
}
