import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import H2 from '../../components/H2';
import FiltersBar from '../../components/FiltersBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';

import { useHttp } from '../../hooks/useHttp';
import { usePagination } from '../../hooks/usePagination';

interface Banner {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    modifiedAt: string;
    status?: string;
}

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
    } = useHttp<Banner[]>('/v1/banners');

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const [filters, setFilters] = useState<Record<string, string>>({});

    const filterConfig: FilterConfig[] = [
        { key: 'title', label: 'Título' },
        { key: 'status', label: 'Estado' }
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
                status: banner.isActive ? 'Activo' : 'Inactivo'
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
            <H2>{t('adminPanel.banners.title')}</H2>

            {loading && <p>{t('loading')}</p>}
            {error && <p style={{ color: 'red' }}>{t('error')}: {error}</p>}

            {!loading && !error && banners && banners.length > 0 && (
                <>
                    <FiltersBar
                        filters={filters}
                        filterConfig={filterConfig}
                        onFilterChange={handleFilterChange}
                    />

                    <Table
                        data={paginatedData}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Título', accessor: 'title' },
                            { header: 'Estado', accessor: 'status' }
                        ]}
                        actions={(item) => (
                            <>
                                <button className="btn btn-sm btn-warning" onClick={() => alert(`Editar ${item.id}`)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => alert(`Eliminar ${item.id}`)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
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
                <p>{t('noData')}</p>
            )}
        </div>
    );
};

export default Banners;