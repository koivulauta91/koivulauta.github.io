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
      <header className="site-header">
        <div className="logo">
          <div className="logo-k">K</div>
          Koivulauta
        </div>

        {/* language chooser is in the Navbar too, keep header minimal */}
      </header>

      <section className="hero">
        <h1 id="title">{isFi ? (t('welcome_title') || 'Tervetuloa Koivulautaan') : (t('welcome_title') || 'Welcome to Koivulauta')}</h1>
        <p id="desc">{isFi ? (t('welcome_desc') || 'Kaksikielinen keskustelufoorumi suomalaisille ja kansainvälisille käyttäjille.') : (t('welcome_desc') || 'A bilingual discussion forum for Finnish and international users.')}</p>
        <button className="btn" id="register">{t('register_button') || (isFi ? 'Rekisteröidy' : 'Register')}</button>
      </section>

      <div className="container">
        <div className="grid" id="categories">
          <a href="/boards?category=satunnainen" className="card" style={{textDecoration:'none'}}>
            <h3>{t('categories.satunnainen') || 'Satunnainen'}</h3>
          </a>

          <a href="/boards?category=politiikka" className="card" style={{textDecoration:'none'}}>
            <h3>{t('categories.politiikka') || 'Politiikka'}</h3>
          </a>

          <a href="/boards?category=vapaa-aika" className="card" style={{textDecoration:'none'}}>
            <h3>{t('categories.vapaa_aika') || 'Vapaa-aika'}</h3>
          </a>

          <a href="/boards?category=tietotekniikka" className="card" style={{textDecoration:'none'}}>
            <h3>{t('categories.tietotekniikka') || 'Tietotekniikka'}</h3>
          </a>

          <a href="/boards?category=ajoneuvot" className="card" style={{textDecoration:'none'}}>
            <h3>{t('categories.ajoneuvot') || 'Ajoneuvot'}</h3>
          </a>
        </div>
      </div>

      <footer className="site-footer">© 2026 Koivulauta.org</footer>
    </div>
  );
}

export default Home;
