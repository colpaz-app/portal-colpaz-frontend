import '../assets/styles/Pagination.css';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    const addPageButton = (page: number) => {
      pages.push(
        <Button
          variant='light'
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination__button ${currentPage === page ? 'active' : ''}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      );
    };

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        addPageButton(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) addPageButton(i);
        pages.push(<span key="dots-end" className="pagination__dots" aria-hidden="true">…</span>);
      } else if (currentPage >= totalPages - 1) {
        pages.push(<span key="dots-start" className="pagination__dots" aria-hidden="true">…</span>);
        for (let i = totalPages - 2; i <= totalPages; i++) addPageButton(i);
      } else {
        pages.push(<span key="dots-start" className="pagination__dots" aria-hidden="true">…</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) addPageButton(i);
        pages.push(<span key="dots-end" className="pagination__dots" aria-hidden="true">…</span>);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <>
          <Button
            variant='light'
            onClick={() => handlePageClick(1)}
            className="pagination__button"
            aria-label={t('pagination.firstPage')}
            title={t('pagination.firstPage')}
          >
            {t('pagination.firstPage')}
          </Button>
          <span className="pagination__separator" aria-hidden="true">|</span>
          <Button
            variant='light'
            onClick={() => handlePageClick(currentPage - 1)}
            className="pagination__button"
            aria-label={t('pagination.previousPage')}
            title={t('pagination.previousPage')}
          >
            {t('pagination.previousPage')}
          </Button>
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <>
          <Button
            variant='light'
            onClick={() => handlePageClick(currentPage + 1)}
            className="pagination__button"
            aria-label={t('pagination.nextPage')}
            title={t('pagination.nextPage')}
          >
            {t('pagination.nextPage')}
          </Button>
          <span className="pagination__separator" aria-hidden="true">|</span>
          <Button
            variant='light'
            onClick={() => handlePageClick(totalPages)}
            className="pagination__button"
            aria-label={t('pagination.lastPage')}
            title={t('pagination.lastPage')}
          >
            {t('pagination.lastPage')}
          </Button>
        </>
      )}
    </div>
  );
}