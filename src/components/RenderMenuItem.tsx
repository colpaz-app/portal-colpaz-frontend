import type { MenuItem } from '../types/MenuItem';
import { NavLink } from 'react-router-dom';
import RenderChildItem from './RenderChildItem';

interface Props {
  item: MenuItem;
  t: (key: string) => string;
  activePaths: Record<number, string | null>;
  setActivePaths: React.Dispatch<React.SetStateAction<Record<number, string | null>>>;
}

export const RenderMenuItem: React.FC<Props> = ({ item, t, activePaths, setActivePaths }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = activePaths[0] === item.label;

  const toggle = () => {
    if (isExpanded) {
      setActivePaths(prev => {
        const updated: Record<number, string | null> = {};
        for (const key in prev) {
          const level = Number(key);
          if (level !== 0) updated[level] = null;
        }
        updated[0] = null;
        return updated;
      });
    } else {
      setActivePaths({ 0: item.label });
    }
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
          {item.children!.map((section, i) => (
            <div key={i}>
              {section.title && <strong>{t(section.title)}</strong>}
              <ul>
                {section.items.map((child, j) => (
                  <RenderChildItem
                    key={`${child.label}-${j}`}
                    item={child}
                    t={t}
                    level={1}
                    activePaths={activePaths}
                    setActivePaths={setActivePaths}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};