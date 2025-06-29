import { useEffect, useRef, useState } from 'react';
import menuItems from '../config/menuItem';
import MegaMenuItem from './MegaMenuItem';
import type { MenuItem } from '../types/MenuItem';
import '../assets/styles/MegaMenu.css';

const MegaNavbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const filteredItems: MenuItem[] = menuItems.filter(
        item => !item.protected || isAuthenticated
    );

    return (
        <nav className="mega-navbar" ref={navbarRef}>
            <button
                className="mega-navbar-toggle"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                ☰
            </button>
            <ul className={`mega-menu-list ${menuOpen ? 'open' : ''}`}>
                {filteredItems.map((item, index) => (
                    <MegaMenuItem key={index} item={item} parentRef={navbarRef} />
                ))}
            </ul>
        </nav>
    );
};

export default MegaNavbar;