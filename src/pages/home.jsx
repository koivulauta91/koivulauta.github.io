import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation();
  const isFi = i18n.language === "fi" || !i18n.language;

  // ensure body classes from global CSS apply (reset any inline changes)
  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <div>
      <section className="hero" style={{minHeight:'40vh'}}>
        <h1 id="title">{isFi ? (t('welcome_title') || 'Tervetuloa Koivulautaan') : (t('welcome_title') || 'Welcome to Koivulauta')}</h1>
        <p id="desc">{isFi ? (t('welcome_desc') || 'Kaksikielinen keskustelufoorumi suomalaisille ja kansainvälisille käyttäjille.') : (t('welcome_desc') || 'A bilingual discussion forum for Finnish and international users.')}</p>
        <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:18}}>
          <Link to="/login" className="btn" style={{background:'#eee',color:'#111',padding:'10px 18px',borderRadius:6,textDecoration:'none'}}>Kirjaudu</Link>
          <Link to="/register" className="btn" style={{textDecoration:'none'}}>Rekisteröidy</Link>
        </div>
      </section>

      <div className="container">
        <div className="grid" id="categories">
          <div className="card">
            <h3>💬 <a href="/category/satunnainen" style={{textDecoration:'none',color:'inherit'}}>{t('categories.satunnainen') || 'Satunnainen'}</a></h3>
          </div>

          <div className="card">
            <h3>⚖️ <a href="/category/politiikka" style={{textDecoration:'none',color:'inherit'}}>{t('categories.politiikka') || 'Politiikka'}</a></h3>
          </div>

          <div className="card">
            <h3>🎯 <a href="/category/vapaa-aika" style={{textDecoration:'none',color:'inherit'}}>{t('categories.vapaa_aika') || 'Vapaa-aika'}</a></h3>
          </div>

          <div className="card">
            <h3>💻 <a href="/category/tietotekniikka" style={{textDecoration:'none',color:'inherit'}}>{t('categories.tietotekniikka') || 'Tietotekniikka'}</a></h3>
          </div>

          <div className="card">
            <h3>🚗 <a href="/category/ajoneuvot" style={{textDecoration:'none',color:'inherit'}}>{t('categories.ajoneuvot') || 'Ajoneuvot'}</a></h3>
          </div>
        </div>
      </div>

      <footer className="site-footer">© 2026 Koivulauta.org</footer>
    </div>
  );
}

export default Home;
