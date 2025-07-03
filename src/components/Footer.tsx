import '../assets/styles/Footer.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-line" />

      <div className="footer-background">
        <div className="footer-box">
          <div className="footer-section">
            <h4>{t('footer.about')}</h4>
            <p>
              <a href="https://sedboyaca.gov.co/" title={t('footer.goSecretary')} target="_blank" rel="noopener noreferrer">
                {t('footer.secretary')}
              </a>
            </p>
            <p>
              <a href="https://www.mineducacion.gov.co/" title={t('footer.goEducationMinistry')} target="_blank" rel="noopener noreferrer">
                {t('footer.educationMinistry')}
              </a>
            </p>
            <p>
              <a href="https://www.mintrabajo.gov.co/" title={t('footer.goLaborMinistry')} target="_blank" rel="noopener noreferrer">
                {t('footer.laborMinistry')}
              </a>
            </p>
            <p>
              <Link title={t('footer.goSiteMap')} to="/sitemap">{t('footer.sitemap')}</Link>
            </p>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <p>
              <strong>{t('footer.phone')}:</strong> (7) 789-1234
            </p>
            <p>
              <strong>{t('footer.email')}:</strong>{' '}
              <a title={t('footer.goEmail')} href="mailto:ticolpaz@gmail.com">
                ticolpaz@gmail.com
              </a>
            </p>
            <p>
              <strong>{t('footer.address')}:</strong> Quípama, Boyacá
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <img
            src={images.logoPNG}
            alt={t('header.logoAlt')}
            className="header-logo"
          />
          <span>Colpaz</span>
        </div>
        <div className="footer-copy">
          © 2025 Colpaz. {t('footer.rightsReserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;