import { useEffect } from 'react';
import { useHttp } from '../hooks/useHttp';
import BannerCarousel from '../components/BannerCarousel';
import type { Banner } from '../types/Banner';

const Home = () => {
  const {
    data: banners,
    loading,
    error,
    sendRequest
  } = useHttp<Banner[]>('/v1/banners/public/banners');

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const today = new Date().toISOString().split('T')[0];

  const validBanners = (banners || []).filter(b =>
    b.isActive && b.startDate <= today && b.endDate >= today
  );

  return (
    <div className="home-page">
      {loading && <p>Cargando banners...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {validBanners.length > 0 && (
        <div className="full-width-banner">
          <BannerCarousel banners={validBanners} />
        </div>
      )}
    </div>
  );
};

export default Home;