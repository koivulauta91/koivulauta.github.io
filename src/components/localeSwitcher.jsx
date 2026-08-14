import { useTranslation } from 'react-i18next';

export default function LocaleSwitcher(){
  const { i18n } = useTranslation();
  const change = (e) => i18n.changeLanguage(e.target.value);
  return (
    <select onChange={change} defaultValue={i18n.language || 'fi'}>
      <option value="fi">Suomi</option>
      <option value="en">English</option>
    </select>
  );
}
