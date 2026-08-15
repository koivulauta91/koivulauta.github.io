import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import './i18n-bridge'

import { auth, db } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// presence / online status handling
let presenceCleanup = null;

onAuthStateChanged(auth, (user) => {
  if (presenceCleanup) {
    try { presenceCleanup(); } catch(e){}
    presenceCleanup = null;
  }

  if (!user) return;

  const uid = user.uid;
  const userRef = doc(db, 'users', uid);

  // set online when connected
  updateDoc(userRef, { online: true, lastActive: serverTimestamp() }).catch(() => {});

  const onVisibility = () => {
    if (document.visibilityState === 'visible') {
      updateDoc(userRef, { online: true, lastActive: serverTimestamp() }).catch(() => {});
    } else {
      updateDoc(userRef, { online: false, lastActive: serverTimestamp() }).catch(() => {});
    }
  };

  const onUnload = () => {
    try { updateDoc(userRef, { online: false, lastActive: serverTimestamp() }); } catch(e){}
  };

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('beforeunload', onUnload);

  presenceCleanup = () => {
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('beforeunload', onUnload);
    try { updateDoc(userRef, { online: false, lastActive: serverTimestamp() }); } catch(e){}
  };
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker if available
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('Service worker registered.', reg);
    }).catch(err => console.warn('Service worker registration failed:', err));
  });
}
