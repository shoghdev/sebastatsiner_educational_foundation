import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const links = [
  ['/', 'home'], ['/about', 'about'], ['/programs', 'programs'], ['/opportunities', 'opportunities'],
  ['/impact', 'impact'], ['/news', 'news'], ['/reports', 'reports'], ['/partners', 'partners'],
  ['/donate', 'donate'], ['/contact', 'contact'],
] as const;

export default function Layout() {
  const { t } = useTranslation();
  return (
    <>
      <header>
        <nav aria-label="Main">
          {links.map(([to, key]) => (
            <NavLink key={to} to={to} end={to === '/'} style={{ marginRight: 12 }}>
              {t(`nav.${key}`)}
            </NavLink>
          ))}
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>{t('footer.rights')}</footer>
    </>
  );
}
