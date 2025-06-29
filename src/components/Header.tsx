import '../assets/styles/Header.css';
import logo from '../assets/images/Logo.png';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const { i18n, t } = useTranslation();

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
                    <select className="language-select" aria-label={t('header.languageSelector')} value={i18n.language} onChange={handleChange}>
                        <option value="es">ES</option>
                        <option value="en">EN</option>
                    </select>
                </div>
            </header>
            <div className="header-separator" />
        </>
    );
};

export default Header;