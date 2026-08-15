import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LocaleSwitcher from "./localeSwitcher";
import ThemeToggle from "./themetoggle";
import { useTranslation } from "react-i18next";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Don't render the Navbar on the homepage to avoid duplicate headers
  if (location && location.pathname === "/") return null;

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setIsAdmin(data.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Failed to read user role', err);
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header" style={{position:'relative'}}>
          <div className="logo">
            <div className="logo-k">K</div>
            <Link to="/" style={{color:'inherit',fontWeight:700,textDecoration:'none'}}>Koivulauta</Link>
      </div>

          <div style={{display:'flex',gap:8,alignItems:'center'}} className="header-controls">
            <select className="lang-select" onChange={(e) => { const val = e.target.value; if (window.i18n) window.i18n.changeLanguage(val); else { const event = new CustomEvent('langChange', {detail:val}); window.dispatchEvent(event); } }} defaultValue={typeof navigator !== 'undefined' ? (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fi') : 'fi'}>
              <option value="fi">Suomi</option>
              <option value="en">English</option>
            </select>
            <ThemeToggle />
            <LocaleSwitcher style={{display:'none'}} />
          </div>

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className={open ? "menu active" : "menu"} onClick={(e) => e.stopPropagation()}>
        <div className="menu-links" style={{display:'flex',flexDirection:'column',gap:10,paddingTop:10}}>
          <Link to="/" onClick={close}>{t ? t('home') : 'Home'}</Link>
          <Link to="/threads" onClick={close}>{t ? t('threads') : 'Threads'}</Link>
          <Link to="/boards" onClick={close}>{t ? t('boards') : 'Boards'}</Link>
          <Link to="/profile" onClick={close}>{t ? t('profile') : 'Profile'}</Link>
          {isAdmin && <Link to="/admin" onClick={close}>{t ? t('admin') : 'Admin'}</Link>}
          <a href="https://t.me/koivulauta" target="_blank" rel="noreferrer">{t ? t('telegram') : 'Telegram'}</a>
        </div>

        <div style={{marginTop:12,borderTop:'1px solid #eee',paddingTop:10,display:'flex',gap:8,justifyContent:'space-between',alignItems:'center'}}>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
