import { useTranslation } from 'react-i18next';

export default function Cookies() {
  const { t } = useTranslation();
  return (
    <div style={{padding:20}}>
      <h1>Evästeet</h1>
      <p>Tämä sivu kertoo mitä evästeitä sivusto käyttää ja miten voit hallita niitä.</p>
    </div>
  );
}
