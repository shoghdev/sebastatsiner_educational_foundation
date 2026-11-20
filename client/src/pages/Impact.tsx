import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Impact էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Impact() {
  const { t } = useTranslation();
  return <h1>{t('nav.impact')}</h1>;
}
