import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/styles/Navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { t } = useTranslation();

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav className="main-navbar">
      <button className="navbar-toggle" onClick={toggleNavbar} aria-label="Menú">
        ☰
      </button>

      <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" className="navbar-link" onClick={() => setIsOpen(false)}>{t('home.home')}</NavLink>
        </li>

        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/admin" className="navbar-link" onClick={() => setIsOpen(false)}>{t('home.administration')}</NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="navbar-link" onClick={() => setIsOpen(false)}>
                {t('home.logout')}
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;