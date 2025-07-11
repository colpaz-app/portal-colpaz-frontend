import '../assets/styles/Table.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TableProps<T> {
    data: T[];
    columns: {
        header: string;
        accessor: keyof T | ((item: T) => React.ReactNode);
        render?: (value: unknown, item: T) => React.ReactNode;
    }[];
    actions?: (item: T) => React.ReactNode;
}

function Table<T>({ data, columns, actions }: TableProps<T>) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { t } = useTranslation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="mobile-cards">
                {data.map((item, i) => {
                    const titleColumn = columns[0];
                    const rawTitleValue =
                        typeof titleColumn.accessor === 'function'
                            ? titleColumn.accessor(item)
                            : item[titleColumn.accessor];
                    const titleValue = titleColumn.render
                        ? titleColumn.render(rawTitleValue, item)
                        : String(rawTitleValue);

                    return (
                        <div key={i} className="card-row">
                            <div className="card-header">
                                <h3 className="card-title">ID: {titleValue}</h3>
                            </div>

                            <div className="card-body">
                                {columns.slice(1).map((col, j) => {
                                    const rawValue =
                                        typeof col.accessor === 'function'
                                            ? col.accessor(item)
                                            : item[col.accessor];
                                    const renderedValue = col.render
                                        ? col.render(rawValue, item)
                                        : String(rawValue);

                                    return (
                                        <div key={j} className="card-field">
                                            <span className="card-field-label">{col.header}</span>
                                            <span className="card-field-value">{renderedValue}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {actions && (
                                <div className="card-actions">{actions(item)}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i}>{col.header}</th>
                        ))}
                        {actions && <th>{t('table.actions')}</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            {columns.map((col, j) => {
                                const rawValue =
                                    typeof col.accessor === 'function'
                                        ? col.accessor(item)
                                        : item[col.accessor];
                                const renderedValue = col.render
                                    ? col.render(rawValue, item)
                                    : String(rawValue);

                                return <td key={j}>{renderedValue}</td>;
                            })}
                            {actions && (
                                <td className="actions-cell">{actions(item)}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;