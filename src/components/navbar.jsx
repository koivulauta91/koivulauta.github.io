import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./themetoggle";
import { useTranslation } from "react-i18next";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
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

    const q = query(collection(db, 'users'), where('online', '==', true));
    const unsubOnline = onSnapshot(q, (snap) => {
      setOnlineCount(snap.size || 0);
    }, (err) => console.error('online snapshot error', err));

    return () => {
      try { unsubAuth(); } catch(e){}
      try { unsubOnline(); } catch(e){}
    };
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  const changeLang = (e) => {
    const val = e.target.value;
    i18n.changeLanguage(val);
  };

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div style={{display:'flex',alignItems:'center',gap:12}} className="logo">
        <div className="logo-k">K</div>
        <Link to="/" style={{color:'inherit',fontWeight:700,textDecoration:'none'}}>Koivulauta</Link>
      </div>

      <nav style={{display:'flex',gap:18,alignItems:'center'}} className="main-nav">
        <Link to="/">{t ? t('home') : 'Etusivu'}</Link>
        <Link to="/threads">{t ? t('threads') : 'Ketjut'}</Link>
        <Link to="/boards">{t ? t('boards') : 'Alueet'}</Link>
        <Link to="/profile">{t ? t('profile') : 'Profiili'}</Link>
        {isAdmin && <Link to="/admin">{t ? t('admin') : 'Admin'}</Link>}
        <a href="https://t.me/koivulauta" target="_blank" rel="noreferrer">Telegram</a>
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:8}} className="header-controls">
        <select className="lang-select" onChange={changeLang} defaultValue={i18n.language || 'fi'}>
          <option value="fi">Suomi</option>
          <option value="en">English</option>
        </select>
        <ThemeToggle />
      </div>

      <div style={{position:'absolute',right:16,top:12,fontSize:13,color:'#666'}}>
        {t ? t('users_online_label') || 'Käyttäjiä paikalla' : 'Users online'}: {onlineCount}
      </div>

      <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu">☰</button>

      <div className={open ? 'menu active' : 'menu'} onClick={(e)=>e.stopPropagation()}>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <Link to="/" onClick={close}>{t ? t('home') : 'Home'}</Link>
          <Link to="/threads" onClick={close}>{t ? t('threads') : 'Threads'}</Link>
          <Link to="/boards" onClick={close}>{t ? t('boards') : 'Boards'}</Link>
          <Link to="/profile" onClick={close}>{t ? t('profile') : 'Profile'}</Link>
          {isAdmin && <Link to="/admin" onClick={close}>{t ? t('admin') : 'Admin'}</Link>}
          <a href="https://t.me/koivulauta" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
