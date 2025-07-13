import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import H2 from '../../components/H2';
import FiltersBar from '../../components/FiltersBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';

import { useHttp } from '../../hooks/useHttp';
import { usePagination } from '../../hooks/usePagination';

import type { Language } from '../../types/Language';
import Message from '../../components/Message';

interface FilterConfig {
    key: keyof Language;
    label: string;
}

const Languages = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<Record<string, string>>({});

    const {
        data: languages,
        loading,
        error,
        sendRequest
    } = useHttp<Language[]>('/v1/languages', {
        token: localStorage.getItem('token') || ''
    });

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => setFilters({});

    const filterConfig: FilterConfig[] = [
        { key: 'name', label: t('filtersBar.name') },
        { key: 'code', label: t('filtersBar.code') },
        { key: 'createdBy', label: t('filtersBar.createdBy') }
    ];

    const filteredData = useMemo(() => {
        return (languages || []).filter((lang) =>
            Object.entries(filters).every(([key, value]) =>
                String(lang[key as keyof Language] || '')
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );
    }, [languages, filters]);

    const {
        currentPage,
        totalPages,
        paginatedData,
        goToPage
    } = usePagination(filteredData, 5);

    return (
        <div className="admin-languages-page">
            <H2>{t('adminPanel.languages.title')}</H2>

            {loading && <p>{t('loading')}</p>}
            {error && <p style={{ color: 'red' }}>{t('error')}: {error}</p>}

            {!loading && !error && Array.isArray(languages) && languages.length > 0 && (
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
                            { header: t('table.name'), accessor: 'name' },
                            { header: t('table.code'), accessor: 'code' },
                            { header: t('table.createdBy'), accessor: 'createdBy' }
                        ]}
                        actions={(item) => (
                            <Button
                                variant='warning'
                                size="icon"
                                title={t('table.view')}
                                onClick={() => alert(`${t('table.view')} ${item.code}`)}
                            >
                                <i className="fa-solid fa-eye"></i>
                            </Button>
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

export default Languages;