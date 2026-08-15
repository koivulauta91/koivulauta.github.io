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
          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>{t('categories.general') || 'Yleinen keskustelu'}</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>{t('categories.tech') || 'Teknologia'}</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>{t('categories.gaming') || 'Pelit'}</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>{t('categories.education') || 'Opinnot'}</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>{t('categories.general') || 'General Discussion'}</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>{t('categories.tech') || 'Technology'}</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>{t('categories.gaming') || 'Gaming'}</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>{t('categories.education') || 'Education'}</h3>
          </div>
        </div>

        <h2>{t('users') || 'Käyttäjät'}</h2>

        <div className="card">
          Matti92 <span className="online">● {t('online') || 'Online'}</span>
        </div>

        <div className="card">
          JohnSmith <span className="offline">● {t('offline') || 'Offline'}</span>
        </div>
      </div>

      <footer className="site-footer">© 2026 Koivulauta.org</footer>
    </div>
  );
}

export default Home;
