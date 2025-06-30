import type { MenuChildItem } from '../types/MenuItem';
import { NavLink } from 'react-router-dom';

interface Props {
  item: MenuChildItem;
  t: (key: string) => string;
  level: number;
  activePaths: Record<number, string | null>;
  setActivePaths: React.Dispatch<React.SetStateAction<Record<number, string | null>>>;
}

const RenderChildItem: React.FC<Props> = ({ item, t, level, activePaths, setActivePaths }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = activePaths[level] === item.label;

  const toggle = () => {
    setActivePaths(prev => ({
      ...prev,
      [level]: isExpanded ? null : item.label
    }));
  };

  return (
    <li>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {item.path ? (
          <NavLink to={item.path}>{t(item.label)}</NavLink>
        ) : (
          <span className="no-link">{t(item.label)}</span>
        )}
        {hasChildren && (
          <i
            className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} toggle-icon`}
            onClick={toggle}
          />
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="dropdown">
          <ul>
            {item.children!.map((child, i) => (
              <RenderChildItem
                key={`${child.label}-${i}`}
                item={child}
                t={t}
                level={level + 1}
                activePaths={activePaths}
                setActivePaths={setActivePaths}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default RenderChildItem;