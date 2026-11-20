import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Home էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Home() {
  const { t } = useTranslation();
  return <h1>{t('nav.home')}</h1>;
}
