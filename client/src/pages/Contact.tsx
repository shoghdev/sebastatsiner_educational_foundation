import { useTranslation } from 'react-i18next';

// TODO: իրականացնել Contact էջը ըստ Figma-ի (տես docs/TASKS.md)
export default function Contact() {
  const { t } = useTranslation();
  return <h1>{t('nav.contact')}</h1>;
}
