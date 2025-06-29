import { useEffect, useState } from 'react';
import menuItems from '../config/menuItem';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../types/MenuItem';
import H2 from '../components/H2';
import { filterVisibleItems } from '../utils/menuUtils';

const renderMenuItem = (item: MenuItem, t: (key: string) => string) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
        <li key={item.label}>
            {item.path ? (
                <NavLink to={item.path}>{t(item.label)}</NavLink>
            ) : (
                <span>{t(item.label)}</span>
            )}

            {hasChildren && (
                <ul>
                    {item.children!.map((section, i) => (
                        <li key={i}>
                            {section.title && <strong>{t(section.title)}</strong>}
                            <ul>
                                {section.items.map(child => (
                                    <li key={child.path}>
                                        <NavLink to={child.path}>{t(child.label)}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

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
            <H2>{t('siteMap.title')}</H2>
            <ul>
                {sitemapItems.map(item => renderMenuItem(item, t))}
            </ul>
        </div>
    );
};

export default SiteMap;