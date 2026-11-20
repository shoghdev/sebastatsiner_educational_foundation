import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Opportunities էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Opportunities() {
  const { t } = useTranslation();
  return <h1>{t('nav.opportunities')}</h1>;
}
