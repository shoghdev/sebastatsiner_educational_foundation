import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Programs էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Programs() {
  const { t } = useTranslation();
  return <h1>{t('nav.programs')}</h1>;
}
