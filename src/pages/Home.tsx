import { useEffect, useState } from 'react';
import { useHttp } from '../hooks/useHttp';
import BannerCarousel from '../components/BannerCarousel';
import type { Banner } from '../types/Banner';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const {
    data: banners,
    loading,
    error,
    sendRequest
  } = useHttp<Banner[]>('/v1/banners/public/banners');

  const { t } = useTranslation();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const today = new Date().toISOString().split('T')[0];

  const validBanners = (banners || []).filter(b =>
    b.isActive && b.startDate <= today && b.endDate >= today
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('logout') === '1') {
      setShowModal(true);
      params.delete('logout');
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [location.search, navigate]);


  return (
    <>
      <Modal
        show={showModal}
        type="error"
        title={t('session.closedTitle')}
        message={t('session.closedMessage')}
        footer={
          <Button variant="primary" onClick={() => setShowModal(false)}>
            {t('common.close')}
          </Button>
        }
        onClose={() => setShowModal(false)}
      />
      <div className="home-page">
        {loading && <p>Cargando banners...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {validBanners.length > 0 && (
          <div className="full-width-banner">
            <BannerCarousel banners={validBanners} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;