import { useTranslation } from 'react-i18next';
import H2 from '../../components/H2';

const Banners = () => {
  const { t } = useTranslation();

  return (
    <div className="admin-banners-page">
        <H2>{t('adminPanel.banners.title')}</H2>
    </div>
  );
};

export default Banners;