import { useEffect, useState } from 'react';

export default function CookieBanner(){
  const [accepted, setAccepted] = useState(() => localStorage.getItem('cookies_accepted') === 'true');

  useEffect(() => {
    if (accepted) localStorage.setItem('cookies_accepted','true');
  }, [accepted]);

  if (accepted) return null;

  return (
    <div style={{position:'fixed',left:12,right:12,bottom:12,background:'#fff',padding:12,boxShadow:'0 6px 20px rgba(0,0,0,.12)',borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:2000}}>
      <div style={{maxWidth:'80%'}}>Tämä sivusto käyttää evästeitä parantaakseen käyttökokemusta. Jatkamalla hyväksyt evästeet.</div>
      <div style={{display:'flex',gap:8}}>
        <button onClick={()=>{setAccepted(true)}} style={{background:'#3b7d3c',color:'#fff',border:0,padding:'8px 12px',borderRadius:6}}>Hyväksy</button>
        <a href="/cookies" style={{alignSelf:'center',textDecoration:'underline',color:'#333'}}>Lisätietoja</a>
      </div>
    </div>
  );
}
