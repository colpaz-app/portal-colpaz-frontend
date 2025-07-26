import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import H2 from '../../components/H2';
import FiltersBar from '../../components/FiltersBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';

import { useHttp } from '../../hooks/useHttp';
import { usePagination } from '../../hooks/usePagination';
import type { Banner } from '../../types/Banner';

import '../../assets/styles/admin/Banners.css';

import Button from '../../components/Button';
import Message from '../../components/Message';
import { BreadCrumbBanner } from '../../components/Breadcrumb';

interface FilterConfig {
    key: keyof Banner | 'status';
    label: string;
}

const Banners = () => {
    const { t } = useTranslation();

    const {
        data: banners,
        loading,
        error,
        sendRequest
    } = useHttp<Banner[]>('/v1/banners', {
        token: localStorage.getItem('token') || ''
    });

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const handleClearFilters = () => {
        setFilters({});
    };

    const [filters, setFilters] = useState<Record<string, string>>({});

    const filterConfig: FilterConfig[] = [
        { key: 'status', label: t('filtersBar.status') },
        { key: 'createdAt', label: t('filtersBar.createdAt') },
        { key: 'createdBy', label: t('filtersBar.createdBy') }
    ];

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const filteredData = useMemo(() => {
        return (banners || [])
            .map((banner) => ({
                ...banner,
                status: banner.isActive ? 'Activo' : 'Inactivo',
                createdAt: banner.createdAt.slice(0, 10),
            }))
            .filter((banner) =>
                Object.entries(filters).every(([key, value]) =>
                    String(banner[key as keyof typeof banner] || '')
                        .toLowerCase()
                        .includes(value.toLowerCase())
                )
            );
    }, [banners, filters]);

    const {
        currentPage,
        totalPages,
        paginatedData,
        goToPage
    } = usePagination(filteredData, 5);

    return (
        <div className="admin-banners-page">
            <BreadCrumbBanner
                items={[
                    { label: 'Panel de administración', to: '/admin' },
                    { label: 'Banners' }
                ]}
            />
            <H2>{t('adminPanel.banners.title')}</H2>

            <div className="button-add-section">
                <Button variant="primary" onClick={() => alert('Abrir formulario de creación')}>
                    {t('adminPanel.banners.addNew')}
                </Button>
            </div>

            {loading && <p>{t('loading')}</p>}
            {error && (
                <Message type="error" title={t('error')}>
                    {t('messages.errors.tokenExpired')}
                    <br />
                    {error}
                </Message>
            )}

            {!loading && !error && banners && banners.length > 0 && (
                <>
                    <FiltersBar
                        filters={filters}
                        filterConfig={filterConfig}
                        onFilterChange={handleFilterChange}
                        onClear={handleClearFilters}
                    />

                    <Table
                        data={paginatedData}
                        columns={[
                            {
                                header: t('table.imageUrl'),
                                accessor: 'imageUrl',
                                render: (value: unknown) => {
                                    const url = String(value);
                                    const isUrl = /^https?:\/\//i.test(url);
                                    return isUrl ? (
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            {t('table.viewImage')}
                                        </a>
                                    ) : (
                                        url
                                    );
                                }
                            },
                            { header: t('table.createdAt'), accessor: 'createdAt' },
                            { header: t('table.createdBy'), accessor: 'createdBy' },
                            { header: t('table.status'), accessor: 'status' },
                        ]}
                        actions={(item) => (
                            <>
                                <Button variant='primary' size="icon" title={t('table.edit')} onClick={() => alert(`${t('table.edit')} ${item.id}`)}>
                                    <i className="fa-solid fa-pen"></i>
                                </Button>
                                <Button variant='danger' size="icon" title={t('table.delete')} onClick={() => alert(`${t('table.delete')} ${item.id}`)}>
                                    <i className="fa-solid fa-trash"></i>
                                </Button>
                            </>
                        )}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                </>
            )}

            {!loading && !error && filteredData.length === 0 && (
                <Message type="info" title={t('messages.noDataTitle')}>
                    {t('messages.noDataMessage')}
                </Message>
            )}
        </div>
    );
};

export default Banners;