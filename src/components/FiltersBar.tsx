import '../assets/styles/FiltersBar.css';

export interface FilterConfig {
  key: string;
  label: string;
  placeholder?: string;
}

interface FiltersBarProps {
  filters: { [key: string]: string };
  filterConfig: FilterConfig[];
  onFilterChange: (key: string, value: string) => void;
}

export default function FiltersBar({
  filters,
  filterConfig,
  onFilterChange
}: FiltersBarProps) {
  return (
    <div className="filters-bar">
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
  );
}