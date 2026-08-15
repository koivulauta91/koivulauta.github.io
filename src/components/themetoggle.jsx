import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ThemeToggle() {
  const { t } = useTranslation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "true" || (stored === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(isDark);
    if (isDark) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, []);

  useEffect(() => {
    // persist whenever changes
    localStorage.setItem("theme", dark ? "true" : "false");
  }, [dark]);

  const toggleTheme = () => {
    setDark(d => !d);
  };

  return (
    <button onClick={toggleTheme} aria-pressed={dark}>
      {dark ? "☀️ " + (t ? t('light_mode') : 'Light') : "🌙 " + (t ? t('dark_mode') : 'Dark')}
    </button>
  );
}

export default ThemeToggle;