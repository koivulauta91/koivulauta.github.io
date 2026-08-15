import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import React, { Suspense, lazy } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
const Admin = lazy(() => import("./pages/Admin"));
const Threads = lazy(() => import("./pages/Threads"));
import Boards from "./pages/Boards";
import Privacy from "./pages/privacy";
import CookiesPage from "./pages/cookies";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

function AdminRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setChecked(true);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setIsAdmin( snap.exists() && snap.data().role === 'admin');
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      } finally {
        setChecked(true);
      }
    });
    return () => unsub();
  }, []);

  if (!checked) return <div>Loading...</div>;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/boards" element={<Boards />}/>
        <Route path="/threads" element={<Threads />}/>
        <Route path="/category/:slug" element={<Threads />}/>
        <Route path="/privacy" element={<Privacy />}/>
        <Route path="/cookies" element={<CookiesPage />}/>
      </Routes>
    </React.Suspense>
  );
}

function AppWrapper() {
  // useLocation must be inside Router; this wrapper will choose whether to render Navbar/Footer
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Navbar />}
      <main style={{padding:'20px',minHeight:'70vh'}}>
        <AppRoutes />
      </main>
      {!isHome && <Footer />}
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;