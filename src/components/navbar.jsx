import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Koivulauta</div>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={open ? "menu active" : "menu"}>

        <Link to="/">Etusivu</Link>

        <Link to="/threads">
          Keskustelut
        </Link>

        <Link to="/boards">
          Luo lanka
        </Link>

        <Link to="/profile">
          Profiili
        </Link>

        <Link to="/admin">
          Admin
        </Link>

        <a
          href="https://t.me/koivulauta"
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>

      </div>
    </nav>
  );
}

export default Navbar;