import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Boards from "./pages/Boards";
import Threads from "./pages/Threads";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{padding:'20px',minHeight:'70vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/boards" element={<Boards />}/>
          <Route path="/threads" element={<Threads />}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;