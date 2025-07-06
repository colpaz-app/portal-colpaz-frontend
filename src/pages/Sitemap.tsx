import { useEffect, useState } from 'react';
import menuItems from '../config/menuItem';
import { useTranslation } from 'react-i18next';
import H2 from '../components/H2';
import { filterVisibleItems } from '../utils/menuUtils';
import RenderMenuList from '../components/RenderMenuList';
import '../assets/styles/SiteMap.css';

const SiteMap = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const sitemapItems = filterVisibleItems(menuItems, {
    context: 'sitemap',
    isAuthenticated
  });

  return (
    <div className="site-map">
      <H2 className="title-sitemap">{t('siteMap.title')}</H2>
      <RenderMenuList items={sitemapItems} t={t} />
    </div>
  );
};

export default SiteMap;