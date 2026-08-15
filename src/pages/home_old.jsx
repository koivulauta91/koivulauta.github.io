import { useState } from "react";

function Home() {
  const [lang, setLang] = useState("fi");

  const isFi = lang === "fi";

  return (
    <div>
      <style>{`
:root{
  --green:#3b7d3c;
  --birch:#f5f5f0;
  --dark:#222;
}

body{
  margin:0;
  font-family:Arial,sans-serif;
  background:#fafafa;
  color:var(--dark);
}

header{
  background:white;
  box-shadow:0 2px 10px rgba(0,0,0,.1);
  padding:15px 30px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.logo{
  display:flex;
  align-items:center;
  gap:12px;
  font-weight:bold;
  font-size:28px;
}

.logo-k{
  width:50px;
  height:50px;
  border-radius:10px;
  background:
    repeating-linear-gradient(
      90deg,
      #fff 0 8px,
      #111 8px 10px
    );
  color:#111;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:32px;
  font-weight:bold;
}

.hero{
  text-align:center;
  padding:80px 20px;
}

.hero h1{
  font-size:48px;
}

.btn{
  background:var(--green);
  color:white;
  border:none;
  padding:12px 24px;
  border-radius:6px;
  cursor:pointer;
}

.container{
  max-width:1200px;
  margin:auto;
  padding:20px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:20px;
}

.card{
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
}

.online{
  color:green;
  font-weight:bold;
}

.offline{
  color:gray;
  font-weight:bold;
}

.lang{
  padding:8px;
}

footer{
  text-align:center;
  padding:30px;
}

@media (max-width:600px){
  .hero h1{font-size:32px}
  header{padding:12px}
}
      `}</style>

      <header>
        <div className="logo">
          <div className="logo-k">K</div>
          Koivulauta
        </div>

        <select
          className="lang"
          id="language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="fi">Suomi</option>
          <option value="en">English</option>
        </select>
      </header>

      <section className="hero">
        <h1 id="title">{isFi ? "Tervetuloa Koivulautaan" : "Welcome to Koivulauta"}</h1>
        <p id="desc">
          {isFi
            ? "Kaksikielinen keskustelufoorumi suomalaisille ja kansainvälisille käyttäjille."
            : "A bilingual discussion forum for Finnish and international users."}
        </p>
        <button className="btn" id="register">
          {isFi ? "Rekisteröidy" : "Register"}
        </button>
      </section>

      <div className="container">
        <div className="grid" id="categories">
          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>Yleinen keskustelu</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>Teknologia</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>Pelit</h3>
          </div>

          <div className="card fi" style={{ display: isFi ? "block" : "none" }}>
            <h3>Opinnot</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>General Discussion</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>Technology</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>Gaming</h3>
          </div>

          <div className="card en" style={{ display: !isFi ? "block" : "none" }}>
            <h3>Education</h3>
          </div>
        </div>
n        <h2>Käyttäjät</h2>

        <div className="card">
          Matti92 <span className="online">● Online</span>
        </div>

        <div className="card">
          JohnSmith <span className="offline">● Offline</span>
        </div>
      </div>

      <footer>© 2026 Koivulauta.org</footer>
    </div>
  );
}

export default Home;