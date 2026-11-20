import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Reports էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Reports() {
  const { t } = useTranslation();
  return <h1>{t('nav.reports')}</h1>;
}
