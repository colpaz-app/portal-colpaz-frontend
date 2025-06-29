import Button from "../components/Button/Button"
import '../assets/styles/Login.css';
import { images } from "../assets/images";
import { useTranslation } from 'react-i18next';

const Login = () => {

    const { t } = useTranslation();

    return (
        <div className="login-container">
            <div className="login-image-section">
                <img src={images.fondoLogin} alt="Login Visual" />
            </div>

            <div className="login-form-section">
                <img
                    src={images.logoPNG}
                    alt={t('header.logoAlt')}
                    className="login-form-logo responsive-only"
                />

                <h2 className="login-title mb-4">{t('login.title')}</h2>
                <form className="login-form">
                    <label htmlFor="email">{t('login.email')}</label>
                    <input
                        type="email"
                        id="email"
                        placeholder={t('login.emailPlaceholder')}
                        required
                    />

                    <label htmlFor="password">{t('login.password')}</label>
                    <input
                        type="password"
                        id="password"
                        placeholder={t('login.passwordPlaceholder')}
                        required
                    />

                    <div className="section-button">
                        <Button variant="primary" type="submit">
                            {t('login.submit')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login