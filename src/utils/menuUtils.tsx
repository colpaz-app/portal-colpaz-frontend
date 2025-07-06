import type { MenuItem } from '../types/MenuItem';

type Context = 'menu' | 'sitemap';

interface FilterOptions {
  context: Context;
  isAuthenticated: boolean;
}

export function filterVisibleItems(items: MenuItem[], options: FilterOptions): MenuItem[] {
  return items
    .filter(item => {
      if (item.protected && !options.isAuthenticated) return false;
      if (options.context === 'menu' && item.isVisible === false) return false;
      if (options.context === 'sitemap' && item.isVisibleSitemap === false) return false;
      return true;
    })
    .map(item => {
      if (!item.children) return item;

      const filteredChildren = item.children
        .map(section => ({
          ...section,
          items: section.items.filter(child => {
            if (options.context === 'menu' && child.isVisible === false) return false;
            if (options.context === 'sitemap' && child.isVisibleSitemap === false) return false;
            return true;
          })
        }))
        .filter(section => section.items.length > 0);

      return { ...item, children: filteredChildren };
    })
    .filter(item => {
      if (!item.path && item.children && item.children.length === 0) return false;
      return true;
    });
}