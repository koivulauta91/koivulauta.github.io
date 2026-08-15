import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocaleSwitcher from "./localeSwitcher";
import ThemeToggle from "./themetoggle";
import { useTranslation } from "react-i18next";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

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
    <nav className="navbar" style={{position:'relative'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src="/favicon.svg" alt="koivu" style={{width:28,height:28}} />
        <Link to="/" style={{color:'white',fontWeight:600,textDecoration:'none'}}>Koivulauta</Link>
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center'}} className="desktop-controls">
        <LocaleSwitcher />
        <ThemeToggle />
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
        <div className="menu-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:8,borderBottom:'1px solid #eee'}}>
          <strong>{t ? t('users') : 'Users'}</strong>
          <span style={{fontSize:12,color: online ? 'green' : 'gray'}}>{online ? (t ? t('online') : 'Online') : (t ? t('offline') : 'Offline')}</span>
        </div>

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
    </nav>
  );
}

export default Navbar;
