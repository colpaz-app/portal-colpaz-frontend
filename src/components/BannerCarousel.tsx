import { useEffect, useState } from 'react';
import '../assets/styles/BannerCarousel.css';
import Button from './Button';
import type { Banner } from '../types/Banner';

interface BannerCarouselProps {
    banners: Banner[];
}

const BannerCarousel = ({ banners }: BannerCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const hasMultiple = banners.length > 1;

    useEffect(() => {
        if (!hasMultiple || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length, hasMultiple, isPaused]);

    const goTo = (index: number) => setCurrentIndex(index);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    const next = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
    const togglePause = () => setIsPaused((prev) => !prev);

    if (banners.length === 0) return null;

    return (
        <div className="banner-carousel">
            <div className="carousel-inner">
                {banners[currentIndex].link ? (
                    <a
                        href={banners[currentIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="banner-slide"
                    >
                        <img src={banners[currentIndex].imageUrl} alt={banners[currentIndex].title || 'Banner'} />
                        {(banners[currentIndex].title || banners[currentIndex].description) && (
                            <div className="banner-info">
                                {banners[currentIndex].title && (
                                    <div className="banner-title">{banners[currentIndex].title}</div>
                                )}
                                {banners[currentIndex].description && (
                                    <div className="banner-description">{banners[currentIndex].description}</div>
                                )}
                            </div>
                        )}
                    </a>
                ) : (
                    <div className="banner-slide">
                        <img src={banners[currentIndex].imageUrl} alt={banners[currentIndex].title || 'Banner'} />
                        {(banners[currentIndex].title || banners[currentIndex].description) && (
                            <div className="banner-info">
                                {banners[currentIndex].title && (
                                    <div className="banner-title">{banners[currentIndex].title}</div>
                                )}
                                {banners[currentIndex].description && (
                                    <div className="banner-description">{banners[currentIndex].description}</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>


            {hasMultiple && (
                <>
                    <Button size='medium' variant='light' className="carousel-control prev" onClick={prev}>‹</Button>
                    <Button size='medium' variant='light' className="carousel-control next" onClick={next}>›</Button>
                    <div className="carousel-controls-group">
                        <div className="carousel-dots">
                            {banners.map((_, i) => (
                                <span
                                    key={i}
                                    className={`dot ${i === currentIndex ? 'active' : ''}`}
                                    onClick={() => goTo(i)}
                                ></span>
                            ))}
                        </div>
                        <Button size='icon' className="pause-button" onClick={togglePause}>
                            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BannerCarousel;