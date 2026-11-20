import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Partners էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Partners() {
  const { t } = useTranslation();
  return <h1>{t('nav.partners')}</h1>;
}
