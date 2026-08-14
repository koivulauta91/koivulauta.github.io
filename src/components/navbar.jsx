import { useState } from "react";
import { Link } from "react-router-dom";
import LocaleSwitcher from "./localeSwitcher";
import ThemeToggle from "./themetoggle";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src="/favicon.svg" alt="koivu" style={{width:28,height:28}} />
        <Link to="/" style={{color:'white',fontWeight:600}}>Koivulauta</Link>
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

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