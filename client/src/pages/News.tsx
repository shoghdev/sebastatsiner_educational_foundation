import { useTranslation } from 'react-i18next';

// TODO: իրականացնել News էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function News() {
  const { t } = useTranslation();
  return <h1>{t('nav.news')}</h1>;
}
