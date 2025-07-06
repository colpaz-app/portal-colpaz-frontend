import { useEffect, useRef, useState } from 'react';
import menuItems from '../config/menuItem';
import MegaMenuItem from './MegaMenuItem';
import '../assets/styles/MegaMenu.css';
import { filterVisibleItems } from '../utils/menuUtils';
import Button from './Button';

const MegaNavbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const filteredItems = filterVisibleItems(menuItems, {
        context: 'menu',
        isAuthenticated
    });

    return (
        <nav className="mega-navbar" ref={navbarRef}>
            <Button
                variant='light'
                size='padding-0'
                className="mega-navbar-toggle"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                ☰
            </Button>
            <ul className={`mega-menu-list ${menuOpen ? 'open' : ''}`}>
                {filteredItems.map((item, index) => (
                    <MegaMenuItem key={index} item={item} parentRef={navbarRef} />
                ))}
            </ul>
        </nav>
    );
};

export default MegaNavbar;