import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../types/MenuItem';

interface MegaMenuItemProps {
    item: MenuItem;
    parentRef: React.RefObject<HTMLElement | null>;
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ item, parentRef }) => {
    const [open, setOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768);
    const itemRef = useRef<HTMLLIElement>(null);
    const { t } = useTranslation();

    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                itemRef.current &&
                !itemRef.current.contains(target) &&
                parentRef.current &&
                parentRef.current.contains(target)
            ) {
                setOpen(false);
            }

            if (
                parentRef.current &&
                !parentRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [parentRef]);

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
        <li className="mega-menu-item" ref={itemRef}>
            <div className="menu-title-container">
                {item.path ? (
                    <NavLink
                        to={item.path}
                        className="menu-title clickable"
                        title={item.title ? t(item.title) : undefined}
                        onClick={() => setOpen(false)}
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
                                                title={child.title ? t(child.title) : undefined}
                                                onClick={() => setOpen(false)}
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