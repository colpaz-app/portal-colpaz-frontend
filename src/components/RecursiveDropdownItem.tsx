import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { MenuChildItem } from '../types/MenuItem';

interface Props {
  item: MenuChildItem;
  t: (key: string) => string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecursiveDropdownItem: React.FC<Props> = ({ item, t, setOpen }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div className="dropdown-item-header">
        {item.path ? (
          <NavLink
            to={item.path}
            title={item.title ? t(item.title) : undefined}
            onClick={() => setOpen(false)}
          >
            {t(item.label)}
          </NavLink>
        ) : (
          <span>{t(item.label)}</span>
        )}

        {hasChildren && (
          <i
            className={`fas fa-chevron-${expanded ? 'up' : 'down'} toggle-icon`}
            onClick={() => setExpanded(prev => !prev)}
            aria-hidden="true"
          ></i>
        )}
      </div>

      {hasChildren && expanded && (
        <ul style={{ paddingLeft: '1rem' }}>
          {item.children!.map((child, i) => (
            <RecursiveDropdownItem key={i} item={child} t={t} setOpen={setOpen} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RecursiveDropdownItem;