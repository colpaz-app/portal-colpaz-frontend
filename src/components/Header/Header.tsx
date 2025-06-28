import '../../assets/styles/Header.css';
import logo from '../../assets/images/Logo.png';

const Header = () => {
    return (
        <>
            <header className="main-header">
                <div className="header-left">
                    <img
                        src={logo}
                        alt="Logo Colpaz"
                        className="header-logo"
                    />
                </div>

                <div className="header-right">
                    <select className="language-select" aria-label="Seleccionar idioma">
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