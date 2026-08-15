// small i18n bridge created by script
import i18n from "./i18n";
window.i18n = i18n;
window.addEventListener('langChange', (e) => i18n.changeLanguage(e.detail));
