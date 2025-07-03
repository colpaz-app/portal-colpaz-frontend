import '../assets/styles/Header.css';
import { useState, useEffect } from 'react';
import logo from '../assets/images/Logo.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
    const { i18n, t } = useTranslation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <>
            <header className="main-header">
                <div className="header-left">
                    <img
                        src={logo}
                        alt={t('header.logoAlt')}
                        className="header-logo"
                    />
                </div>

                <div className="header-right">
                    <select
                        className="language-select"
                        aria-label={t('header.languageSelector')}
                        value={i18n.language}
                        onChange={handleChange}
                    >
                        <option value="es">ES</option>
                        <option value="en">EN</option>
                    </select>
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            className="login-icon"
                            aria-label={t('login.title')}
                            title={t('login.title')}
                        >
                            <i className="fas fa-user" aria-hidden="true"></i>
                        </Link>
                    )}
                </div>
            </header>

            <div className="header-separator">
                <nav className="header-socials" aria-label={t('header.socials')}>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('header.facebook')}
                        title={t('header.goFacebook')}
                        className="header-social-item"
                    >
                        <i className="fab fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('header.twitter')}
                        title={t('header.goTwitter')}
                        className="header-social-item"
                    >
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <Link
                        to="/sitemap"
                        aria-label={t('footer.sitemap')}
                        title={t('header.goSiteMap')}
                        className="header-social-item"
                    >
                        <i className="fas fa-sitemap" aria-hidden="true"></i>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;