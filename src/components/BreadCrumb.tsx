import { Link } from 'react-router-dom';
import '../assets/styles/BreadCrumb.css';
import { useTranslation } from 'react-i18next';

interface Crumb {
    label: string;
    to?: string;
}

interface BreadCrumbProps {
    items: Crumb[];
    title?: string;
    image?: string;
}

export function BreadCrumbBanner({ items, title, image }: BreadCrumbProps) {
    const { t } = useTranslation();

    const homeCrumb: Crumb = { label: t('home.home'), to: '/' };
    const allItems = [homeCrumb, ...items];

    const hasImage = !!image;
    const showBanner = hasImage;
    const noImage = !hasImage;

    const renderBreadcrumb = (className = 'breadcrumb') => (
        <nav className={className} aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                {allItems.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {item.to ? (
                            <Link to={item.to} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="breadcrumb-current">{item.label}</span>
                        )}
                        {index < allItems.length - 1 && (
                            <i className="fas fa-chevron-right breadcrumb-separator"></i>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );

    return (
        <>
            <div
                className={
                    showBanner
                        ? 'breadcrumb-banner-wrapper'
                        : 'breadcrumb-wrapper breadcrumb-no-image'
                }
            >
                {showBanner && (
                    <div
                        className="breadcrumb-banner"
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <div className="breadcrumb-overlay">
                            {title && <h1 className="breadcrumb-title">{title}</h1>}
                            {renderBreadcrumb()}
                        </div>
                    </div>
                )}

                {noImage && (
                    <div className="breadcrumb-no-image-header">
                        {title && <h1 className="breadcrumb-title">{title}</h1>}
                        {renderBreadcrumb()}
                    </div>
                )}
            </div>

            {showBanner && <div className="breadcrumb-below">{renderBreadcrumb()}</div>}
        </>
    );
}