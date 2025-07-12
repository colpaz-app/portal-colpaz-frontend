import { images } from '../assets/images';
import { useTranslation } from 'react-i18next';
import '../assets/styles/admin/AdminEntry.css';
import H2 from '../components/H2';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const AdminEntry = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/admin');
  };

  return (
    <div className="admin-entry-container">
      <div className="admin-entry-image-section">
        <img src={images.fondoLogin} alt={t('adminEntry.imageAlt')} />
      </div>

      <div className="admin-entry-section">
        <div className="admin-entry-logo-container">
          <img
            src={images.logoPNG}
            alt={t('header.logoAlt')}
            className="admin-entry-logo responsive-only"
          />
        </div>

        <H2>{t('adminEntry.welcomeTitle')}</H2>

        <p className="admin-entry-message">
          {t('adminEntry.welcomeMessage')}
        </p>

        <div className="button-container">
          <Button title={t('adminEntry.goEnterButton')} onClick={handleEnter} className="mt-4">
            {t('adminEntry.enterButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminEntry