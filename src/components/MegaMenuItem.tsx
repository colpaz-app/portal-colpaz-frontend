import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../types/MenuItem';

interface MegaMenuItemProps {
    item: MenuItem;
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768);
    const { t } = useTranslation();

    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobileScreen(mobile);
            if (!mobile) setOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleOpen = () => {
        if (hasChildren) {
            setOpen(prev => !prev);
        }
    };

    return (
        <li className="mega-menu-item">
            <div className="menu-title-container">
                {item.path ? (
                    <NavLink
                        to={item.path}
                        className="menu-title clickable"
                        onClick={() => isMobileScreen && setOpen(false)}
                    >
                        {t(item.label)}
                    </NavLink>
                ) : (
                    <span className="menu-title">{t(item.label)}</span>
                )}
                {hasChildren && (
                    <i
                        className={`menu-toggle-icon fas fa-chevron-${open ? 'up' : 'down'}`}
                        onClick={toggleOpen}
                        aria-hidden="true"
                        style={{ cursor: 'pointer', marginLeft: '0.5rem' }}
                    ></i>
                )}
            </div>

            {hasChildren && open && (
                <div className={`mega-dropdown ${isMobileScreen ? 'mobile' : ''}`}>
                    <div className="mega-dropdown-inner">
                        {item.children!.map((section, i) => (
                            <div key={i} className="dropdown-section">
                                {section.title && (
                                    <h4 className="section-title">{t(section.title)}</h4>
                                )}
                                <ul>
                                    {section.items.map((child, j) => (
                                        <li key={j}>
                                            <NavLink
                                                to={child.path}
                                                onClick={() => isMobileScreen && setOpen(false)}
                                            >
                                                {t(child.label)}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </li>
    );
};

export default MegaMenuItem;