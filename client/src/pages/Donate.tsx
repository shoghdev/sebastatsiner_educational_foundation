import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Donate էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Donate() {
  const { t } = useTranslation();
  return <h1>{t('nav.donate')}</h1>;
}
