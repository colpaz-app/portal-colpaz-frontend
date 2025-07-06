import '../assets/styles/FiltersBar.css';
import Button from './Button';
import { useTranslation } from 'react-i18next';

export interface FilterConfig {
  key: string;
  label: string;
  placeholder?: string;
}

interface FiltersBarProps {
  filters: { [key: string]: string };
  filterConfig: FilterConfig[];
  onFilterChange: (key: string, value: string) => void;
  onClear?: () => void;
}

export default function FiltersBar({
  filters,
  filterConfig,
  onFilterChange,
  onClear
}: FiltersBarProps) {
  const hasActiveFilters = Object.values(filters).some((val) => val.trim() !== '');

  const { t } = useTranslation();

  return (
    <div className="filters-bar">
      <div className="filters-inputs">
        {filterConfig.map(({ key, label, placeholder }) => (
          <div key={key} className="filter-group">
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              type="text"
              placeholder={placeholder || `Buscar por ${label.toLowerCase()}...`}
              value={filters[key] || ''}
              onChange={(e) => onFilterChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      {hasActiveFilters && onClear && (
        <div className="clear-filters">
          <Button variant="primary" onClick={onClear}>
            {t('filtersBar.clearFilters')}
          </Button>
        </div>
      )}
    </div>
  );
}