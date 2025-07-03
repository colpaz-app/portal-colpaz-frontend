import { Link } from 'react-router-dom';
import '../assets/styles/NotFoundPage.css';
import { images } from '../assets/images';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <img src={images.logoPNG} alt={t('notFound.imageAlt')} className="not-found-logo" />
      <div className="not-found-content">
        <h1>404</h1>
        <h2>{t('notFound.title')}</h2>
        <p>{t('notFound.description')}</p>
        <Link to="/">
          <Button>{t('notFound.goHome')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;