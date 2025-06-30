import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { MenuItem, MenuChildItem } from '../types/MenuItem';

export const RenderMenuItem = ({ item, t }: { item: MenuItem; t: (key: string) => string }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {item.path ? (
          <NavLink to={item.path}>{t(item.label)}</NavLink>
        ) : (
          <span className="no-link">{t(item.label)}</span>
        )}
        {hasChildren && (
          <i
            className={`fas fa-chevron-${expanded ? 'up' : 'down'} toggle-icon`}
            onClick={() => setExpanded(prev => !prev)}
          />
        )}
      </div>

      {hasChildren && expanded && (
        <div className="dropdown">
          {item.children!.map((section, i) => (
            <div key={i}>
              {section.title && <strong>{t(section.title)}</strong>}
              <ul>
                {section.items.map((child, j) => (
                  <RenderChildItem key={`${child.label}-${j}`} item={child} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

const RenderChildItem = ({ item, t }: { item: MenuChildItem; t: (key: string) => string }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {item.path ? (
          <NavLink to={item.path}>{t(item.label)}</NavLink>
        ) : (
          <span className="no-link">{t(item.label)}</span>
        )}
        {hasChildren && (
          <i
            className={`fas fa-chevron-${expanded ? 'up' : 'down'} toggle-icon`}
            onClick={() => setExpanded(prev => !prev)}
          />
        )}
      </div>

      {hasChildren && expanded && (
        <div className="dropdown">
          <ul>
            {item.children!.map((child, i) => (
              <RenderChildItem key={`${child.label}-${i}`} item={child} t={t} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};