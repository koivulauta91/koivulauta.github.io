import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div>© 2026 Koivulauta</div>
      <div style={{marginTop:8}}>
        <Link to="/privacy" style={{marginRight:12}}>Tietosuoja</Link>
        <Link to="/cookies" style={{marginRight:12}}>Evästeet</Link>
        <a href="https://t.me/koivulauta" target="_blank" rel="noreferrer">Telegram</a>
      </div>
    </footer>
  );
}
