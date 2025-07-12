import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/auth/Login.css';

const Logout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const timeout = setTimeout(() => {
      navigate('/');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={images.fondoLogin} alt="Logout Visual" />
      </div>

      <div className="login-form-section">
        <img
          src={images.logoPNG}
          alt={t('header.logoAlt')}
          className="login-form-logo responsive-only"
        />

        <h2 className="login-title mb-4">{t('logout.title')}</h2>

        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '1rem' }}>
          {t('logout.message')}
        </p>
      </div>
    </div>
  );
};

export default Logout;