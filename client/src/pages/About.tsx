import { useTranslation } from 'react-i18next';

// TODO: իրականացնել About էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function About() {
  const { t } = useTranslation();
  return <h1>{t('nav.about')}</h1>;
}
