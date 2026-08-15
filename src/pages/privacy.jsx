import { useTranslation } from 'react-i18next';

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <div style={{padding:20}}>
      <h1>Tietosuoja</h1>
      <p>Tämä on paikkamerkki tietosuojasivulle. Täydennä sisältöä tarpeen mukaan.</p>
      <h2>Rekisterinpitäjä</h2>
      <p>Alex Fagerström & Niilo Mäki-Mantila</p>
    </div>
  );
}
